export interface GlossaryTerm {
  term: string;
  definition: string;
  domain: string;
  domainId: string;
  lessonPath: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Zero-Sum Game",
    definition:
      "A situation where one player's gain is exactly equal to another's loss — the total value never changes.",
    domain: "Game Theory",
    domainId: "game-theory",
    lessonPath: "/domain/game-theory/module/1/lesson",
  },
  {
    term: "Nash Equilibrium",
    definition:
      "A stable state where no player can improve their outcome by changing their strategy alone.",
    domain: "Game Theory",
    domainId: "game-theory",
    lessonPath: "/domain/game-theory/module/3/lesson",
  },
  {
    term: "Prisoner's Dilemma",
    definition:
      "A scenario where two rational individuals choose not to cooperate even when cooperation would benefit both.",
    domain: "Game Theory",
    domainId: "game-theory",
    lessonPath: "/domain/game-theory/module/2/lesson",
  },
  {
    term: "Dominant Strategy",
    definition:
      "A choice that produces the best outcome for a player regardless of what the other player does.",
    domain: "Game Theory",
    domainId: "game-theory",
    lessonPath: "/domain/game-theory/module/2/lesson",
  },
  {
    term: "Tit-for-Tat",
    definition:
      "A strategy that starts by cooperating and then mirrors whatever the opponent did in the previous round.",
    domain: "Game Theory",
    domainId: "game-theory",
    lessonPath: "/domain/game-theory/module/4/lesson",
  },
  {
    term: "Repeated Game",
    definition:
      "A game played multiple times between the same players, where past behaviour influences future decisions.",
    domain: "Game Theory",
    domainId: "game-theory",
    lessonPath: "/domain/game-theory/module/4/lesson",
  },
  {
    term: "Defection",
    definition:
      "Choosing to act in your own interest at the expense of the other player.",
    domain: "Game Theory",
    domainId: "game-theory",
    lessonPath: "/domain/game-theory/module/2/lesson",
  },
  {
    term: "Cooperation",
    definition:
      "Choosing an action that benefits both players, even at some personal risk.",
    domain: "Game Theory",
    domainId: "game-theory",
    lessonPath: "/domain/game-theory/module/2/lesson",
  },
  {
    term: "Payoff Matrix",
    definition:
      "A grid showing the outcomes for each combination of choices available to players.",
    domain: "Game Theory",
    domainId: "game-theory",
    lessonPath: "/domain/game-theory/module/1/lesson",
  },
  {
    term: "Shadow of the Future",
    definition:
      "The influence that the prospect of future interactions has on present behaviour.",
    domain: "Game Theory",
    domainId: "game-theory",
    lessonPath: "/domain/game-theory/module/4/lesson",
  },
  // ─── Behavioural Economics ─────────────────────────────────────
  {
    term: "Loss Aversion",
    definition:
      "The tendency for losses to feel roughly twice as painful as equivalent gains feel good.",
    domain: "Behavioural Economics",
    domainId: "behavioural-economics",
    lessonPath: "/domain/behavioural-economics/module/1/lesson",
  },
  {
    term: "Anchoring",
    definition:
      "The cognitive bias where the first piece of information encountered (an anchor) disproportionately influences all subsequent judgments.",
    domain: "Behavioural Economics",
    domainId: "behavioural-economics",
    lessonPath: "/domain/behavioural-economics/module/2/lesson",
  },
  {
    term: "Sunk Cost Fallacy",
    definition:
      "Continuing to invest time, money, or effort in something because of past investments, rather than because of future expected value.",
    domain: "Behavioural Economics",
    domainId: "behavioural-economics",
    lessonPath: "/domain/behavioural-economics/module/3/lesson",
  },
  {
    term: "Confirmation Bias",
    definition:
      "The tendency to search for, interpret, and recall information in a way that confirms pre-existing beliefs.",
    domain: "Behavioural Economics",
    domainId: "behavioural-economics",
    lessonPath: "/domain/behavioural-economics/module/4/lesson",
  },
  {
    term: "Planning Fallacy",
    definition:
      "The systematic tendency to underestimate the time, costs, and risks of future actions while overestimating the benefits.",
    domain: "Behavioural Economics",
    domainId: "behavioural-economics",
    lessonPath: "/domain/behavioural-economics/module/5/lesson",
  },
  {
    term: "Reference Point",
    definition:
      "The baseline against which gains and losses are evaluated. Changing what counts as the reference point can completely change how a choice feels.",
    domain: "Behavioural Economics",
    domainId: "behavioural-economics",
    lessonPath: "/domain/behavioural-economics/module/1/lesson",
  },
  {
    term: "Inside View",
    definition:
      "Forecasting based on the specific details of the current task, which typically produces optimistic estimates.",
    domain: "Behavioural Economics",
    domainId: "behavioural-economics",
    lessonPath: "/domain/behavioural-economics/module/5/lesson",
  },
  {
    term: "Outside View",
    definition:
      "Forecasting based on base rates from similar tasks in the past, which produces more accurate estimates.",
    domain: "Behavioural Economics",
    domainId: "behavioural-economics",
    lessonPath: "/domain/behavioural-economics/module/5/lesson",
  },
  {
    term: "Motivated Reasoning",
    definition:
      "Using reasoning skills to reach a predetermined conclusion rather than to find truth — intelligence amplifies this effect.",
    domain: "Behavioural Economics",
    domainId: "behavioural-economics",
    lessonPath: "/domain/behavioural-economics/module/4/lesson",
  },
  {
    term: "Status Quo Bias",
    definition:
      "The preference for the current state of affairs; the cost of changing feels greater than the cost of staying the same.",
    domain: "Behavioural Economics",
    domainId: "behavioural-economics",
    lessonPath: "/domain/behavioural-economics/module/1/lesson",
  },
];
