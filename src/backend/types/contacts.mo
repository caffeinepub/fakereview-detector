/// Domain-specific types for the contact form domain.
import CommonTypes "common";

module {
  public type Timestamp = CommonTypes.Timestamp;

  /// A contact form submission stored in canister state.
  public type ContactMessage = {
    id        : Nat;
    name      : Text;
    email     : Text;
    message   : Text;
    timestamp : Timestamp;
  };

  /// Input payload for submitting a contact message.
  public type ContactInput = {
    name    : Text;
    email   : Text;
    message : Text;
  };
};
