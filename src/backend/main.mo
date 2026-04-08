/// Composition root for the Fake Review Detection System canister.
///
/// Wires together:
///   - Authorization (Internet Identity via caffeineai-authorization)
///   - User profiles
///   - Review submission, history, analytics, and CSV bulk classification
///   - Contact form storage
///
/// No business logic lives here — all implementation is in lib/ and mixins/.
import Map  "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

import AccessControl      "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";

import ProfileMixin  "mixins/profile-api";
import ReviewsMixin  "mixins/reviews-api";
import ContactsMixin "mixins/contacts-api";

actor {
  // ─── Authorization state (managed by the authorization extension) ─────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ─── User profile state ───────────────────────────────────────────────────
  let userProfiles = Map.empty<Principal, { name : Text; username : Text }>();
  include ProfileMixin(accessControlState, userProfiles);

  // ─── Review state ─────────────────────────────────────────────────────────
  let reviews      = List.empty<{ id : Nat; userId : Principal; reviewText : Text; prediction : { #Real; #Fake }; confidence : Nat; suspiciousWords : [Text]; timestamp : Int }>();
  var nextReviewId = { var value : Nat = 0 };
  include ReviewsMixin(accessControlState, reviews, nextReviewId);

  // ─── Contact form state ───────────────────────────────────────────────────
  let contacts      = List.empty<{ id : Nat; name : Text; email : Text; message : Text; timestamp : Int }>();
  var nextContactId = { var value : Nat = 0 };
  include ContactsMixin(contacts, nextContactId);
};
