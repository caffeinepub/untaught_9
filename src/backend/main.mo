import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Progress tracking types
  public type QuizResult = {
    quizId : Text;
    score : Nat;
    passed : Bool;
  };

  public type UserProgress = {
    readLessons : [Text];
    completedSimulations : [Text];
    quizResults : [QuizResult];
    completedModules : [Text];
    completedDomains : [Text];
  };

  let progressStore = Map.empty<Principal, UserProgress>();

  let allDomains = [
    "game-theory",
    "behavioural-economics",
    "ethics",
    "negotiation",
    "systems-thinking",
    "statistics",
    "epistemology",
    "philosophy-of-mind",
  ];

  let gameTheoryModules = [
    "intro",
    "decision-theory",
    "dominance-principle",
    "nash-equilibrium",
    "mixed-strategies",
    "best-response",
    "risk-factor",
    "iterated-dominance",
    "advantages-equilibrium",
    "coordination-problems",
    "incomplete-information",
    "dynamic-games",
  ];

  func getUserProgressInternal(caller : Principal) : UserProgress {
    switch (progressStore.get(caller)) {
      case (null) {
        let newProgress : UserProgress = {
          readLessons = [];
          completedSimulations = [];
          quizResults = [];
          completedModules = [];
          completedDomains = [];
        };
        progressStore.add(caller, newProgress);
        newProgress;
      };
      case (?progress) { progress };
    };
  };

  public query ({ caller }) func getMyProgress() : async UserProgress {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access progress");
    };
    getUserProgressInternal(caller);
  };

  public shared ({ caller }) func markLessonRead(lessonId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can mark lessons as read");
    };
    var progress = getUserProgressInternal(caller);
    if (not progress.readLessons.values().any(func(id) { id == lessonId })) {
      progress := {
        progress with
        readLessons = progress.readLessons.concat([lessonId]);
      };
      progressStore.add(caller, progress);
    };
  };

  public shared ({ caller }) func markSimulationDone(simulationId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can mark simulations as done");
    };
    var progress = getUserProgressInternal(caller);
    if (not progress.completedSimulations.values().any(func(id) { id == simulationId })) {
      progress := {
        progress with
        completedSimulations = progress.completedSimulations.concat([simulationId]);
      };
      progressStore.add(caller, progress);
    };
  };

  public shared ({ caller }) func submitQuiz(quizId : Text, score : Nat, passed : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit quizzes");
    };
    let progress = getUserProgressInternal(caller);
    let newResult : QuizResult = {
      quizId;
      score;
      passed;
    };
    let updatedResults = Array.singleton(newResult).concat(progress.quizResults);
    let updatedProgress = {
      progress with
      quizResults = updatedResults;
    };
    progressStore.add(caller, updatedProgress);
  };

  public shared ({ caller }) func markModuleComplete(moduleId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can mark modules as complete");
    };
    var progress = getUserProgressInternal(caller);

    if (not gameTheoryModules.values().any(func(m) { m == moduleId })) {
      Runtime.trap("Module does not exist");
    };

    if (not progress.completedModules.values().any(func(id) { id == moduleId })) {
      progress := {
        progress with
        completedModules = progress.completedModules.concat([moduleId]);
      };
      progressStore.add(caller, progress);
    };
  };

  public shared ({ caller }) func markDomainComplete(domainId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can mark domains as complete");
    };
    var progress = getUserProgressInternal(caller);

    if (not allDomains.values().any(func(d) { d == domainId })) {
      Runtime.trap("Domain does not exist");
    };

    if (not progress.completedDomains.values().any(func(id) { id == domainId })) {
      progress := {
        progress with
        completedDomains = progress.completedDomains.concat([domainId]);
      };
      progressStore.add(caller, progress);
    };
  };

  public query ({ caller }) func getCompletionStats() : async {
    modulesCompleted : Nat;
    domainsCompleted : Nat;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access completion stats");
    };
    let progress = getUserProgressInternal(caller);
    {
      modulesCompleted = progress.completedModules.size();
      domainsCompleted = progress.completedDomains.size();
    };
  };

  // New types and methods for time and streak tracking
  public type TimeStats = {
    domain : Text;
    seconds : Nat;
  };

  public type TimeBreakdown = {
    totalTime : Nat;
    perDomain : [TimeStats];
  };

  public type StreakStats = {
    today : Nat;
    currentStreak : Nat;
    longestStreak : Nat;
  };

  let timeStore = Map.empty<Principal, Map.Map<Text, Nat>>();
  let streakStore = Map.empty<Principal, (Nat, Nat, Nat)>();

  // Record time spent by domain
  public shared ({ caller }) func recordTimeSpent(domain : Text, seconds : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record time");
    };

    let domains = switch (timeStore.get(caller)) {
      case (null) {
        let m = Map.empty<Text, Nat>();
        m.add(domain, seconds);
        m;
      };
      case (?existing) {
        let current = switch (existing.get(domain)) {
          case (null) { 0 };
          case (?val) { val };
        };
        existing.add(domain, current + seconds);
        existing;
      };
    };

    timeStore.add(caller, domains);
  };

  // Get time breakdown for user
  public query ({ caller }) func getTimeBreakdown() : async TimeBreakdown {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get time breakdown");
    };

    let myDomains = switch (timeStore.get(caller)) {
      case (null) { Map.empty<Text, Nat>() };
      case (?m) { m };
    };

    var totalTime = 0;
    let perDomain = myDomains.toArray().map(
      func((domain, seconds)) {
        totalTime += seconds;
        {
          domain;
          seconds;
        };
      }
    );

    {
      totalTime;
      perDomain;
    };
  };

  // Update and get streak stats
  public shared ({ caller }) func updateStreakStats(today : Nat) : async StreakStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update streak stats");
    };

    var currentStreak = 1;
    var longestStreak = 1;

    switch (streakStore.get(caller)) {
      case (null) {
        streakStore.add(caller, (today, 1, 1));
      };
      case (?record) {
        let (lastDay, cStreak, lStreak) = record;
        if (today == lastDay + 1) {
          currentStreak := cStreak + 1;
          longestStreak := if (currentStreak > lStreak) { currentStreak } else { lStreak };
        } else if (today == lastDay) {
          currentStreak := cStreak;
          longestStreak := lStreak;
        } else {
          currentStreak := 1;
          longestStreak := lStreak;
        };
        streakStore.add(caller, (today, currentStreak, longestStreak));
      };
    };

    {
      today;
      currentStreak;
      longestStreak;
    };
  };

  public query ({ caller }) func getMyStreakStats() : async StreakStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get streak stats");
    };

    switch (streakStore.get(caller)) {
      case (null) { { today = 0; currentStreak = 0; longestStreak = 0 } };
      case (?record) {
        let (today, currentStreak, longestStreak) = record;
        { today; currentStreak; longestStreak };
      };
    };
  };
};
