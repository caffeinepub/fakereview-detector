/// Domain logic for the fake review detection system.
///
/// === NLP CLASSIFICATION ALGORITHM ===
///
/// This module implements a heuristics-based NLP classifier that mimics the
/// approach of TF-IDF + Logistic Regression without requiring a trained ML model.
/// The pipeline is:
///
///   1. Lowercase + Tokenise  — split text into individual word tokens
///   2. Stopword Removal       — discard common English function words
///   3. TF-IDF style scoring   — compute normalised term frequencies
///   4. Fake indicator rules   — add score for spam keywords, ALL_CAPS, !!!,
///                               excessive repetition, and suspicious pronoun use
///   5. Length heuristics      — very short reviews lower confidence;
///                               very long all-positive reviews raise suspicion
///   6. Binary classification  — score >= 0.5 → Fake, else → Real
///   7. Confidence mapping     — fake: min(score*100, 95),  real: max(100-score*100, 55)
///   8. Suspicious word list   — terms that contributed to the fake score
///
/// === TEST ACCOUNT DOCUMENTATION ===
///
/// Because the Internet Computer uses principal-based identity (not passwords),
/// "accounts" are just Internet Identity (II) anchors. For demo/testing purposes,
/// pre-seed data is documented here so reviewers can understand the data model:
///
///   Demo Account A — any authenticated principal; expected to submit positive spam
///   Demo Account B — any authenticated principal; expected to submit genuine reviews
///
/// No special setup is required: any II principal can register and use the app.
///
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import ReviewTypes "../types/reviews";
import CommonTypes "../types/common";

module {
  public type ReviewRecord         = ReviewTypes.ReviewRecord;
  public type ClassificationResult = ReviewTypes.ClassificationResult;
  public type ReviewPage           = ReviewTypes.ReviewPage;
  public type ReviewResult         = ReviewTypes.ReviewResult;
  public type AnalyticsSummary     = ReviewTypes.AnalyticsSummary;
  public type DailyBreakdown       = ReviewTypes.DailyBreakdown;
  public type Prediction           = CommonTypes.Prediction;
  public type ReviewFilter         = CommonTypes.ReviewFilter;
  public type PaginationParams     = CommonTypes.PaginationParams;

  // ─── Stopwords ───────────────────────────────────────────────────────────────
  // Common English stopwords that are removed before scoring.
  // Keeping this as a flat array and searching linearly is fine for <200 words.
  let STOPWORDS : [Text] = [
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "up", "out", "as", "is", "was", "are",
    "were", "be", "been", "being", "have", "has", "had", "do", "does",
    "did", "will", "would", "could", "should", "may", "might", "shall",
    "not", "no", "nor", "so", "yet", "both", "either", "neither", "each",
    "few", "more", "most", "other", "some", "such", "than", "too", "very",
    "just", "also", "how", "what", "which", "who", "whom", "this", "that",
    "these", "those", "it", "its", "if", "then", "because", "while",
    "although", "though", "after", "before", "about", "into", "through",
    "during", "above", "below", "between", "all", "any", "every", "own",
    "same", "only", "even", "back", "there", "when", "where", "why",
    "can", "my", "your", "his", "her", "our", "their", "we", "they",
    "he", "she", "you", "me", "him", "us", "them", "am",
  ];

  // ─── Spam / Fake Indicator Keywords ─────────────────────────────────────────
  // Tokens commonly found in fake/incentivised reviews. Each hit adds score.
  let SPAM_KEYWORDS : [Text] = [
    "excellent", "amazing", "perfect", "outstanding", "exceptional",
    "fantastic", "wonderful", "incredible", "unbelievable", "superb",
    "best", "greatest", "awesome", "terrific", "magnificent", "fabulous",
    "brilliant", "spectacular", "phenomenal", "extraordinary",
    "mustbuy", "must", "buy", "highly", "recommend", "recommended",
    "loveit", "love", "loved", "adore", "obsessed", "addicted",
    "flawless", "faultless", "spotless", "immaculate", "impeccable",
    "everytime", "always", "never", "everyone", "everybody",
    "five", "stars", "rating", "review", "product", "item",
    "value", "quality", "worth", "price", "money", "deal",
    "changed", "life", "lifechanger", "gamechanger", "miracle", "magical",
    "100percent", "guarantee", "guaranteed", "promise", "trust",
  ];

  // ─── Helper: is a character alphabetic or digit? ─────────────────────────────
  func isAlphanumeric(c : Char) : Bool {
    (c >= 'a' and c <= 'z') or
    (c >= 'A' and c <= 'Z') or
    (c >= '0' and c <= '9')
  };

  // ─── Helper: check if a word is all uppercase letters ───────────────────────
  func isAllCaps(word : Text) : Bool {
    if (word.size() < 2) return false;
    word.toIter().all(func(c : Char) : Bool {
      (c >= 'A' and c <= 'Z') or (c >= '0' and c <= '9')
    })
  };

  // ─── Helper: check if a token is in a list (linear scan) ────────────────────
  func inList(token : Text, list : [Text]) : Bool {
    list.any(func(w : Text) : Bool { Text.equal(w, token) })
  };

  // ─── Step 1 + 2: Tokenise and remove stopwords ───────────────────────────────
  /// Split `text` on non-alphanumeric boundaries and return lowercase tokens
  /// that are not stopwords and are at least 2 characters long.
  func tokenise(text : Text) : ([Text], [Text]) {
    // Pass 1: extract all raw tokens (preserving original case for ALL_CAPS check)
    let rawTokens = List.empty<Text>();
    var current = List.empty<Char>();

    for (c in text.toIter()) {
      if (isAlphanumeric(c)) {
        current.add(c);
      } else {
        if (current.size() > 0) {
          rawTokens.add(Text.fromIter(current.values()));
          current.clear();
        };
      };
    };
    if (current.size() > 0) {
      rawTokens.add(Text.fromIter(current.values()));
    };

    // Pass 2: build lowercase tokens (for scoring) and preserve raw for ALL_CAPS
    let rawArr     = rawTokens.toArray();
    let lowerTokens = List.empty<Text>();

    for (raw in rawArr.values()) {
      let lower = raw.toLower();
      if (lower.size() >= 2 and not inList(lower, STOPWORDS)) {
        lowerTokens.add(lower);
      };
    };

    (rawArr, lowerTokens.toArray())
  };

  // ─── Step 3: TF-IDF style scoring ────────────────────────────────────────────
  /// For each token that appears in SPAM_KEYWORDS, accumulate a frequency score.
  /// Returns (score, suspicious_words) where score is in [0, ∞).
  func spamTermScore(tokens : [Text]) : (Float, [Text]) {
    let totalTokens = tokens.size();
    if (totalTokens == 0) return (0.0, []);

    // Count occurrences of each spam keyword in the token list
    let suspiciousFound = List.empty<Text>();
    var rawScore : Float = 0.0;

    for (kw in SPAM_KEYWORDS.values()) {
      var count = 0;
      for (tok in tokens.values()) {
        if (Text.equal(tok, kw)) { count += 1 };
      };
      if (count > 0) {
        // TF = count / totalTokens; bump weight by 1.5 for higher-impact keywords
        let tf : Float = count.toFloat() / totalTokens.toFloat();
        rawScore += tf * 1.5;
        suspiciousFound.add(kw);
      };
    };

    (rawScore, suspiciousFound.toArray())
  };

  // ─── Step 4: Pattern-based fake indicators ───────────────────────────────────
  /// Returns additional score contribution and extra suspicious words for:
  ///   - ALL_CAPS words
  ///   - Excessive exclamation marks (3+ in total)
  ///   - Same word repeated 3+ times
  ///   - First-person singular pronoun overuse ("i" appearing > 15% of tokens)
  func patternScore(rawTokens : [Text], lowerTokens : [Text], originalText : Text) : (Float, [Text]) {
    var score : Float = 0.0;
    let extra = List.empty<Text>();

    // ALL_CAPS check (skip very short words like "OK", "US", "IT")
    var capsCount = 0;
    for (raw in rawTokens.values()) {
      if (raw.size() >= 3 and isAllCaps(raw)) {
        capsCount += 1;
        if (capsCount <= 3) { // avoid duplication in suspicious list
          extra.add(raw.toLower());
        };
      };
    };
    if (capsCount >= 2) {
      score += capsCount.toFloat() * 0.08;
    };

    // Excessive exclamation marks (3 or more)
    var exclCount = 0;
    for (c in originalText.toIter()) {
      if (c == '!') { exclCount += 1 };
    };
    if (exclCount >= 3) {
      score += 0.15;
      extra.add("!!!");
    };

    // Extreme word repetition: same word appearing 3+ times
    let totalLower = lowerTokens.size();
    if (totalLower > 0) {
      // For each unique token, count occurrences
      let counted = List.empty<(Text, Nat)>();
      for (tok in lowerTokens.values()) {
        let existing = counted.find(func(pair : (Text, Nat)) : Bool {
          Text.equal(pair.0, tok)
        });
        switch (existing) {
          case (?(_, _)) {
            // update count in place
          counted.mapInPlace(func(pair) : (Text, Nat) {
              if (Text.equal(pair.0, tok)) { (pair.0, pair.1 + 1) } else { pair }
            });
          };
          case null {
            counted.add((tok, 1));
          };
        };
      };

      for ((word, cnt) in counted.values()) {
        if (cnt >= 3) {
          score += cnt.toFloat() * 0.05;
          extra.add(word # "(repeated)");
        };
      };
    };

    // First-person singular overuse: "i" token > 15% of all lower tokens
    if (totalLower > 0) {
      var iCount = 0;
      for (tok in lowerTokens.values()) {
        if (Text.equal(tok, "i")) { iCount += 1 };
      };
      let iRatio : Float = iCount.toFloat() / totalLower.toFloat();
      if (iRatio > 0.15) {
        score += 0.10;
        extra.add("i(overuse)");
      };
    };

    (score, extra.toArray())
  };

  // ─── Step 5: Length heuristics ───────────────────────────────────────────────
  /// Very short reviews (<10 words): lower confidence adjustment (reduce abs score).
  /// Very long all-positive reviews (>200 words with high spam score): raise suspicion.
  func lengthAdjustment(wordCount : Nat, spamScore : Float) : Float {
    if (wordCount < 10) {
      // Penalise very short reviews — not enough signal to be confident either way
      // We reduce the score magnitude toward 0.25 (neutral) to lower confidence
      -(0.10)
    } else if (wordCount > 200 and spamScore > 0.3) {
      // Long review that is still heavily positive → more suspicious
      0.15
    } else {
      0.0
    }
  };

  // ─── NLP / Classification ────────────────────────────────────────────────────

  /// Classify a single review text using heuristic NLP scoring.
  ///
  /// Pipeline:
  ///   1. Tokenise + strip stopwords
  ///   2. Score spam/fake indicator keywords (TF-IDF style)
  ///   3. Score structural patterns (ALL_CAPS, !!!, repetition, pronoun overuse)
  ///   4. Apply length heuristic adjustment
  ///   5. Combine into [0,1] score; >= 0.5 → Fake
  ///   6. Map score to confidence percentage
  ///
  /// Returns prediction, confidence (0-100), and suspicious word list.
  public func classify(text : Text) : ClassificationResult {
    let (rawTokens, lowerTokens) = tokenise(text);
    let wordCount = lowerTokens.size();

    // Step 2: TF-IDF style spam keyword scoring
    let (termScore, spamWords) = spamTermScore(lowerTokens);

    // Step 3: Pattern-based scoring
    let (patScore, patWords)   = patternScore(rawTokens, lowerTokens, text);

    // Step 4: Length heuristic
    let lenAdj = lengthAdjustment(wordCount, termScore + patScore);

    // Combine and clamp to [0, 1]
    var combinedScore : Float = termScore + patScore + lenAdj;
    if (combinedScore < 0.0) { combinedScore := 0.0 };
    if (combinedScore > 1.0) { combinedScore := 1.0 };

    // Step 5: Binary classification threshold
    let prediction : Prediction = if (combinedScore >= 0.5) { #Fake } else { #Real };

    // Step 6: Confidence mapping
    //   Fake:  min(score * 100, 95)       — capped at 95% to avoid overconfidence
    //   Real:  max(100 - score*100, 55)   — at least 55% so real is meaningful
    let confidence : Nat = switch (prediction) {
      case (#Fake) {
        let c = Int.abs((combinedScore * 100.0).toInt());
        if (c > 95) 95 else c
      };
      case (#Real) {
        let c = 100 - Int.abs((combinedScore * 100.0).toInt());
        if (c < 55) 55 else c
      };
    };

    // Merge suspicious word lists, deduplicate (simple linear dedup)
    let allSuspicious = List.empty<Text>();
    for (w in spamWords.values()) {
      if (not allSuspicious.any(func(x : Text) : Bool { Text.equal(x, w) })) {
        allSuspicious.add(w);
      };
    };
    for (w in patWords.values()) {
      if (not allSuspicious.any(func(x : Text) : Bool { Text.equal(x, w) })) {
        allSuspicious.add(w);
      };
    };

    {
      reviewText      = text;
      prediction      = prediction;
      confidence      = confidence;
      suspiciousWords = allSuspicious.toArray();
    }
  };

  // ─── CRUD helpers ────────────────────────────────────────────────────────────

  /// Build a new ReviewRecord from a classification result.
  /// Wires the auto-increment id, userId, and timestamp in.
  public func buildRecord(
    id        : Nat,
    userId    : Principal,
    result    : ClassificationResult,
    timestamp : Int,
  ) : ReviewRecord {
    {
      id             = id;
      userId         = userId;
      reviewText     = result.reviewText;
      prediction     = result.prediction;
      confidence     = result.confidence;
      suspiciousWords = result.suspiciousWords;
      timestamp      = timestamp;
    }
  };

  /// Project a ReviewRecord to a ReviewResult (public shared type, no userId).
  public func toResult(record : ReviewRecord) : ReviewResult {
    {
      id              = record.id;
      reviewText      = record.reviewText;
      prediction      = record.prediction;
      confidence      = record.confidence;
      suspiciousWords = record.suspiciousWords;
      timestamp       = record.timestamp;
    }
  };

  /// Return paginated, filtered review records for a specific user.
  /// Results are sorted newest-first by timestamp before pagination.
  ///
  /// Pagination: page is 0-indexed. If pageSize is 0, defaults to 10.
  public func getPage(
    reviews    : List.List<ReviewRecord>,
    userId     : Principal,
    filter     : ReviewFilter,
    pagination : PaginationParams,
  ) : ReviewPage {
    // 1. Filter by owner
    let owned = reviews.filter(func(r : ReviewRecord) : Bool {
      Principal.equal(r.userId, userId)
    });

    // 2. Apply prediction filter
    let filtered = switch (filter) {
      case (#All)  { owned };
      case (#Real) { owned.filter(func(r : ReviewRecord) : Bool {
        switch (r.prediction) { case (#Real) true; case (_) false };
      })};
      case (#Fake) { owned.filter(func(r : ReviewRecord) : Bool {
        switch (r.prediction) { case (#Fake) true; case (_) false };
      })};
    };

    // 3. Sort newest-first (descending timestamp)
    let sorted = filtered.sort(func(a : ReviewRecord, b : ReviewRecord) : { #less; #equal; #greater } {
      // Reverse order: b.timestamp vs a.timestamp
      if (a.timestamp > b.timestamp) { #less }
      else if (a.timestamp < b.timestamp) { #greater }
      else { #equal }
    });

    // 4. Compute pagination
    let totalItems = sorted.size();
    let effectivePageSize = if (pagination.pageSize == 0) 10 else pagination.pageSize;
    let totalPages = if (totalItems == 0) 1
                     else (totalItems + effectivePageSize - 1) / effectivePageSize;
    let startIdx = pagination.page * effectivePageSize;

    // 5. Slice the page
    let pageItems : [ReviewResult] = if (startIdx >= totalItems) {
      []
    } else {
      let endIdx = Nat.min(startIdx + effectivePageSize, totalItems);
      let sliced = sorted.sliceToArray(startIdx, endIdx);
      sliced.map<ReviewRecord, ReviewResult>(func(r) { toResult(r) })
    };

    {
      items      = pageItems;
      totalItems = totalItems;
      page       = pagination.page;
      pageSize   = effectivePageSize;
      totalPages = totalPages;
    }
  };

  /// Find the index of a review by id that belongs to the given user.
  /// Returns null if the review does not exist or belongs to a different user.
  public func findIndex(
    reviews : List.List<ReviewRecord>,
    id      : Nat,
    userId  : Principal,
  ) : ?Nat {
    reviews.findIndex(func(r : ReviewRecord) : Bool {
      r.id == id and Principal.equal(r.userId, userId)
    })
  };

  // ─── Analytics ───────────────────────────────────────────────────────────────

  /// Nanoseconds per day (used to convert IC timestamps to calendar days)
  let NS_PER_DAY : Int = 86_400_000_000_000;

  /// Convert a nanosecond IC timestamp to an approximate ISO date string "YYYY-MM-DD".
  /// Uses a proleptic Gregorian calendar calculation from the Unix epoch (1970-01-01).
  func nsToDateText(nsTimestamp : Int) : Text {
    // Convert nanoseconds → days since Unix epoch
    let daysSinceEpoch : Int = nsTimestamp / NS_PER_DAY;

    // Gregorian calendar algorithm (Tomohiko Sakamoto / Julian)
    // Adjust to a positive integer for arithmetic
    let z : Int = daysSinceEpoch + 719468; // days from Mar 1, 0 AD
    let era : Int = (if (z >= 0) z else z - 146096) / 146097;
    let doe : Int = z - era * 146097;
    let yoe : Int = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y   : Int = yoe + era * 400;
    let doy : Int = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp  : Int = (5 * doy + 2) / 153;
    let d   : Int = doy - (153 * mp + 2) / 5 + 1;
    let m   : Int = mp + (if (mp < 10) 3 else -9);
    let yr  : Int = y + (if (m <= 2) 1 else 0);

    // Format as YYYY-MM-DD with zero-padding
    let yStr = yr.toText();
    let mStr = if (m < 10) ("0" # m.toText()) else m.toText();
    let dStr = if (d < 10) ("0" # d.toText()) else d.toText();

    yStr # "-" # mStr # "-" # dStr
  };

  /// Compute the analytics summary (total/real/fake counts, 7-day breakdown).
  /// `nowNs` is the current canister time in nanoseconds (from Time.now()).
  public func computeAnalytics(
    reviews : List.List<ReviewRecord>,
    userId  : Principal,
    nowNs   : Int,
  ) : AnalyticsSummary {
    // Filter to this user's reviews only
    let owned = reviews.filter(func(r : ReviewRecord) : Bool {
      Principal.equal(r.userId, userId)
    });

    // Overall counts
    var totalReviews = 0;
    var realCount    = 0;
    var fakeCount    = 0;

    owned.forEach(func(r : ReviewRecord) {
      totalReviews += 1;
      switch (r.prediction) {
        case (#Real) { realCount += 1 };
        case (#Fake) { fakeCount += 1 };
      };
    });

    // 7-day breakdown: compute date strings for the past 7 calendar days
    // Day 0 = today, Day 6 = 6 days ago (all in UTC)
    let today    = nowNs / NS_PER_DAY; // integer day index
    let dayLabels = Array.tabulate(7, func(i : Nat) : Text {
      // (6 - i) is safe since i in 0..6; .toInt() converts Nat → Int for subtraction
      nsToDateText((today - (6 - i).toInt()) * NS_PER_DAY)
    });

    // Accumulate counts per day using mutable arrays
    var mReal = [var 0, 0, 0, 0, 0, 0, 0];
    var mFake = [var 0, 0, 0, 0, 0, 0, 0];

    owned.forEach(func(r : ReviewRecord) {
      let rDay = r.timestamp / NS_PER_DAY;
      let diff = today - rDay;
      if (diff >= 0 and diff <= 6) {
        let idx = Nat.sub(6, Int.abs(diff));
        switch (r.prediction) {
          case (#Real) { mReal[idx] += 1 };
          case (#Fake) { mFake[idx] += 1 };
        };
      };
    });

    let daily = Array.tabulate(7, func(i : Nat) : DailyBreakdown {
      {
        date      = dayLabels[i];
        realCount = mReal[i];
        fakeCount = mFake[i];
      }
    });

    {
      totalReviews   = totalReviews;
      realCount      = realCount;
      fakeCount      = fakeCount;
      dailyBreakdown = daily;
    }
  };
};
