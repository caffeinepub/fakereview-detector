/// Public API mixin for the contact form domain.
///
/// Exposes a single endpoint:
///   - submitContact — store a contact form submission (no auth required)
///
/// The contact form is intentionally open to all callers including anonymous
/// principals, so that unauthenticated visitors can still reach out.
import List "mo:core/List";
import Time "mo:core/Time";
import ContactLib "../lib/contacts";
import ContactTypes "../types/contacts";

mixin (
  contacts      : List.List<ContactLib.ContactMessage>,
  nextContactId : { var value : Nat },
) {

  /// Accept a contact form submission and persist it.
  ///
  /// No authentication required — open to any caller (including anonymous).
  /// Basic sanity: name and email must be non-empty, message must be at least 5 chars.
  /// Returns true on success.
  public shared func submitContact(
    input : ContactTypes.ContactInput,
  ) : async Bool {
    // Basic validation: all fields must be non-empty
    if (input.name.size() == 0 or input.email.size() == 0 or input.message.size() < 5) {
      return false;
    };

    // Assign id, capture timestamp, build and store the message
    let id        = nextContactId.value;
    nextContactId.value += 1;
    let timestamp = Time.now();

    let msg = ContactLib.buildMessage(id, input, timestamp);
    contacts.add(msg);

    true
  };
};
