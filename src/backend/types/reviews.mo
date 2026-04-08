/// Domain-specific types for the reviews and NLP classification domain.
import CommonTypes "common";
import Principal "mo:core/Principal";

module {
  public type ReviewId    = CommonTypes.ReviewId;
  public type Timestamp   = CommonTypes.Timestamp;
  public type Prediction  = CommonTypes.Prediction;

  /// Internal review record stored in canister state.
  /// Uses mutable fields so records can be updated in-place if needed.
  public type ReviewRecord = {
    id             : ReviewId;
    userId         : Principal;
    reviewText     : Text;
    prediction     : Prediction;
    confidence     : Nat;          // 0-100 confidence percentage
    suspiciousWords : [Text];      // tokens flagged as suspicious
    timestamp      : Timestamp;
  };

  /// Public (shared) projection of a ReviewRecord returned to the frontend.
  public type ReviewResult = {
    id              : ReviewId;
    reviewText      : Text;
    prediction      : Prediction;
    confidence      : Nat;
    suspiciousWords : [Text];
    timestamp       : Timestamp;
  };

  /// Input payload for a single review submission.
  public type ReviewInput = {
    reviewText : Text;
  };

  /// Result returned for a single classification (used in both single and CSV batch).
  public type ClassificationResult = {
    reviewText      : Text;
    prediction      : Prediction;
    confidence      : Nat;
    suspiciousWords : [Text];
  };

  /// Paginated response wrapper for review history.
  public type ReviewPage = {
    items      : [ReviewResult];
    totalItems : Nat;
    page       : Nat;
    pageSize   : Nat;
    totalPages : Nat;
  };

  /// Analytics summary for the dashboard.
  public type AnalyticsSummary = {
    totalReviews : Nat;
    realCount    : Nat;
    fakeCount    : Nat;
    dailyBreakdown : [DailyBreakdown]; // last 7 days
  };

  /// Per-day analytics entry for the 7-day chart.
  public type DailyBreakdown = {
    date      : Text;  // ISO date string "YYYY-MM-DD"
    realCount : Nat;
    fakeCount : Nat;
  };
};
