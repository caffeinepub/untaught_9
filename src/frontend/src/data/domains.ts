export interface DomainCard {
  id: string;
  name: string;
  description: string;
  accentClass: string;
  accentVar: string;
  available: boolean;
  path: string;
  moduleCount: number;
}

export const DOMAINS: DomainCard[] = [
  {
    id: "game-theory",
    name: "Game Theory",
    description:
      "Understand why rational people make irrational decisions together",
    accentClass: "accent-indigo",
    accentVar: "var(--domain-indigo)",
    available: true,
    path: "/domain/game-theory",
    moduleCount: 4,
  },
  {
    id: "behavioural-economics",
    name: "Behavioural Economics",
    description: "Discover the predictable ways your brain tricks you",
    accentClass: "accent-amber",
    accentVar: "var(--domain-amber)",
    available: true,
    path: "/domain/behavioural-economics",
    moduleCount: 5,
  },
  {
    id: "ethics",
    name: "Ethics",
    description: "Develop the tools to reason about right and wrong",
    accentClass: "accent-red",
    accentVar: "var(--domain-red)",
    available: false,
    path: "/domain/ethics",
    moduleCount: 5,
  },
  {
    id: "negotiation",
    name: "Negotiation",
    description: "Learn what's actually happening in every negotiation",
    accentClass: "accent-teal",
    accentVar: "var(--domain-teal)",
    available: false,
    path: "/domain/negotiation",
    moduleCount: 4,
  },
  {
    id: "systems-thinking",
    name: "Systems Thinking",
    description: "See the hidden structures driving outcomes around you",
    accentClass: "accent-green",
    accentVar: "var(--domain-green)",
    available: false,
    path: "/domain/systems-thinking",
    moduleCount: 4,
  },
  {
    id: "statistics",
    name: "Statistics for Real Life",
    description: "Never be misled by a number again",
    accentClass: "accent-blue",
    accentVar: "var(--domain-blue)",
    available: false,
    path: "/domain/statistics",
    moduleCount: 4,
  },
  {
    id: "epistemology",
    name: "Epistemology",
    description: "Question what you know and how you know it",
    accentClass: "accent-violet",
    accentVar: "var(--domain-violet)",
    available: false,
    path: "/domain/epistemology",
    moduleCount: 4,
  },
  {
    id: "philosophy-of-mind",
    name: "Philosophy of Mind",
    description: "Explore the hardest problem in science",
    accentClass: "accent-slate",
    accentVar: "var(--domain-slate)",
    available: false,
    path: "/domain/philosophy-of-mind",
    moduleCount: 4,
  },
];
