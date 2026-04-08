/// Domain logic for contact form storage.
///
/// Provides a simple builder function to create ContactMessage records from
/// validated input. The mixin layer is responsible for id/timestamp injection.
import List "mo:core/List";
import ContactTypes "../types/contacts";

module {
  public type ContactMessage = ContactTypes.ContactMessage;
  public type ContactInput   = ContactTypes.ContactInput;

  /// Build a new ContactMessage record by combining the auto-increment id,
  /// the contact form input, and the canister's current timestamp.
  ///
  /// Parameters:
  ///   id        — auto-incremented unique identifier from the mixin layer
  ///   input     — validated contact form payload (name, email, message)
  ///   timestamp — nanosecond timestamp from Time.now()
  public func buildMessage(
    id        : Nat,
    input     : ContactInput,
    timestamp : Int,
  ) : ContactMessage {
    {
      id        = id;
      name      = input.name;
      email     = input.email;
      message   = input.message;
      timestamp = timestamp;
    }
  };
};
