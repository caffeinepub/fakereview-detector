/// Public API mixin for user profile management (required by the authorization extension).
///
/// Exposes:
///   - getCallerUserProfile  — fetch the calling user's own profile
///   - saveCallerUserProfile — create or update the calling user's profile
///   - getUserProfile        — fetch any user's profile (self or admin only)
///
/// Profile structure: { name: Text; username: Text }
/// The profile is stored in a Map keyed by Principal (Internet Identity principal).
///
/// === TEST ACCOUNT NOTES (Internet Computer) ===
///
/// On the Internet Computer, users authenticate via Internet Identity (II) and
/// receive a unique principal per app. There are no pre-seeded credentials.
/// To test with multiple accounts, create two II anchors in the browser and
/// register each with a different name/username on first login.
///
/// Suggested demo accounts for the college submission demonstration:
///   Demo User A: name = "Alice Johnson",  username = "alicej"
///   Demo User B: name = "Bob Smith",      username = "bobs"
///
/// These are documentation-only; no secrets or passwords exist on the IC.
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles       : Map.Map<Principal, { name : Text; username : Text }>,
) {

  /// Return the calling user's profile, or null if not yet created.
  ///
  /// Called immediately after login to check whether profile setup is required.
  /// Returns null for first-time users, triggering the profile setup modal.
  public query ({ caller }) func getCallerUserProfile() : async ?{ name : Text; username : Text } {
    // Any authenticated principal can read their own profile
    // Anonymous principals should not have profiles
    if (caller.isAnonymous()) {
      return null;
    };
    userProfiles.get(caller)
  };

  /// Create or update the calling user's profile.
  ///
  /// Requires an authenticated (non-anonymous) user. The profile stores
  /// display name and username for use across the dashboard.
  public shared ({ caller }) func saveCallerUserProfile(
    profile : { name : Text; username : Text },
  ) : async () {
    // Guard: only authenticated users can create/update profiles
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be logged in to save a profile");
    };

    // Validate: name must be non-empty
    if (profile.name.size() == 0) {
      Runtime.trap("Invalid: Profile name cannot be empty");
    };

    userProfiles.add(caller, profile)
  };

  /// Fetch any user's profile — only accessible by the profile owner or an admin.
  ///
  /// Used by admin dashboards or when one user needs to see another user's
  /// display name. Guests and non-owners receive an authorization trap.
  public query ({ caller }) func getUserProfile(
    user : Principal,
  ) : async ?{ name : Text; username : Text } {
    // Allow self-access or admin access only
    let isSelf  = Principal.equal(caller, user);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);

    if (not isSelf and not isAdmin) {
      Runtime.trap("Unauthorized: You can only view your own profile");
    };

    userProfiles.get(user)
  };
};
