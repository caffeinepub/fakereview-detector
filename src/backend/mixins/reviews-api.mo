/// Public API mixin for the reviews and NLP classification domain.
///
/// Exposes all review-related endpoints to the frontend:
///   - submitReview       — classify and persist a single review
///   - bulkClassify       — classify an array of texts (CSV upload) without persisting
///   - getReviewHistory   — paginated, filtered history for the calling user
///   - deleteReview       — remove a review owned by the calling user
///   - getAnalytics       — dashboard analytics for the calling user
///
/// Authentication:
///   - All endpoints require the caller to be an authenticated user (not anonymous).
///   - Delete ownership is enforced: callers can only delete their own reviews.
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReviewLib "../lib/reviews";
import ReviewTypes "../types/reviews";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reviews            : List.List<ReviewLib.ReviewRecord>,
  nextReviewId       : { var value : Nat },
) {

  /// Classify a single review text and persist the result for the calling user.
  ///
  /// Requires authenticated user (not anonymous). The NLP classifier in
  /// ReviewLib.classify() runs the full heuristic pipeline and returns the
  /// prediction, confidence score, and suspicious words. The result is stored
  /// and returned immediately.
  public shared ({ caller }) func submitReview(
    reviewText : Text,
  ) : async ReviewTypes.ReviewResult {
    // Guard: only authenticated (non-anonymous) users may submit reviews
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be logged in to submit a review");
    };

    // Run the NLP classifier
    let classResult = ReviewLib.classify(reviewText);

    // Assign a unique id and capture the current timestamp (nanoseconds)
    let id        = nextReviewId.value;
    nextReviewId.value += 1;
    let timestamp = Time.now();

    // Build and persist the review record
    let record = ReviewLib.buildRecord(id, caller, classResult, timestamp);
    reviews.add(record);

    // Return the public projection (no internal userId field)
    ReviewLib.toResult(record)
  };

  /// Classify an array of review texts (CSV bulk upload) and return results.
  ///
  /// Results are NOT persisted — suitable for one-off batch checks.
  /// The caller can choose to call submitReview for any individual result they
  /// wish to save to their history.
  ///
  /// Requires authenticated user. Empty input array returns empty array.
  public shared ({ caller }) func bulkClassify(
    texts : [Text],
  ) : async [ReviewTypes.ClassificationResult] {
    // Guard: only authenticated users may use the classifier
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be logged in to classify reviews");
    };

    // Classify each text independently using the same NLP pipeline
    texts.map<Text, ReviewTypes.ClassificationResult>(func(t : Text) : ReviewTypes.ClassificationResult {
      ReviewLib.classify(t)
    })
  };

  /// Return a paginated, filtered list of review records for the calling user.
  ///
  /// This is a query (read-only, fast). Results are sorted newest-first.
  /// Filter options: #All | #Real | #Fake
  /// Pagination: { page: Nat (0-indexed), pageSize: Nat }
  public query ({ caller }) func getReviewHistory(
    filter     : CommonTypes.ReviewFilter,
    pagination : CommonTypes.PaginationParams,
  ) : async ReviewTypes.ReviewPage {
    // Guard: only authenticated users have a review history
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be logged in to view review history");
    };

    ReviewLib.getPage(reviews, caller, filter, pagination)
  };

  /// Delete a review record owned by the calling user.
  ///
  /// Returns true if the review was found and deleted, false if not found.
  /// A user cannot delete another user's review (ownership enforced in ReviewLib.findIndex).
  public shared ({ caller }) func deleteReview(
    id : Nat,
  ) : async Bool {
    // Guard: only authenticated users may delete reviews
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be logged in to delete reviews");
    };

    // Find the record belonging to this user (ownership check is inside findIndex)
    switch (ReviewLib.findIndex(reviews, id, caller)) {
      case null { false }; // not found or belongs to different user
      case (?_idx) {
        // Filter out the matching record. Since findIndex already verified
        // that r.id == id AND r.userId == caller, we can safely remove by id.
        let retained = reviews.filter(func(r : ReviewLib.ReviewRecord) : Bool {
          r.id != id
        });
        reviews.clear();
        reviews.append(retained);
        true
      };
    }
  };

  /// Return analytics summary (totals + 7-day breakdown) for the calling user.
  ///
  /// This is a query (read-only, fast). The 7-day breakdown covers the last 7
  /// calendar days in UTC, including today. Chart data is suitable for a
  /// Recharts bar chart on the dashboard.
  public query ({ caller }) func getAnalytics() : async ReviewTypes.AnalyticsSummary {
    // Guard: only authenticated users have analytics
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be logged in to view analytics");
    };

    ReviewLib.computeAnalytics(reviews, caller, Time.now())
  };
};
