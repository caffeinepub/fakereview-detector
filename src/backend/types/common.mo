/// Common cross-cutting types shared across all domains of the Fake Review Detection System.
module {
  /// Unique identifier for a review record (auto-incremented Nat)
  public type ReviewId = Nat;

  /// Monotonic nanosecond timestamp from Time.now()
  public type Timestamp = Int;

  /// Prediction classification: either Real or Fake
  public type Prediction = { #Real; #Fake };

  /// Pagination parameters for list queries
  public type PaginationParams = {
    page : Nat;     // 0-indexed page number
    pageSize : Nat; // number of items per page
  };

  /// Filter for review history queries
  public type ReviewFilter = { #All; #Real; #Fake };
};
