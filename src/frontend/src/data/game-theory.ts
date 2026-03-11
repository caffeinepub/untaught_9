export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Module {
  id: number;
  title: string;
  lessonId: string;
  simulationId: string;
  simulation2Id?: string;
  quizId: string;
}

export type LessonSectionType =
  | "concept"
  | "mechanism"
  | "warning"
  | "example"
  | "trap"
  | "fix";

export interface LessonSection {
  heading: string;
  body: string | string[];
  type?: LessonSectionType;
  example?: string;
  check?: {
    question: string;
    options: string[];
    correctIndex: number;
    hint: string;
  };
}

export interface Lesson {
  title: string;
  sections: LessonSection[];
}

export const GAME_THEORY_MODULES: Module[] = [
  {
    id: 1,
    title: "Zero-Sum Games",
    lessonId: "gt-m1-lesson",
    simulationId: "gt-m1-sim",
    simulation2Id: "gt-m1-sim2",
    quizId: "gt-m1-quiz",
  },
  {
    id: 2,
    title: "The Prisoner's Dilemma",
    lessonId: "gt-m2-lesson",
    simulationId: "gt-m2-sim",
    simulation2Id: "gt-m2-sim2",
    quizId: "gt-m2-quiz",
  },
  {
    id: 3,
    title: "Nash Equilibrium",
    lessonId: "gt-m3-lesson",
    simulationId: "gt-m3-sim",
    simulation2Id: "gt-m3-sim2",
    quizId: "gt-m3-quiz",
  },
  {
    id: 4,
    title: "Repeated Games",
    lessonId: "gt-m4-lesson",
    simulationId: "gt-m4-sim",
    simulation2Id: "gt-m4-sim2",
    quizId: "gt-m4-quiz",
  },
];

// ─── Module 1 ────────────────────────────────────────────────────
export const M1_LESSON: Lesson = {
  title: "Zero-Sum Games",
  sections: [
    {
      heading: "Everything you gain, I lose — that's the whole game",
      type: "concept",
      body: [
        "In a zero-sum game, the total value in play is fixed. Whatever one player gains, another must lose by exactly the same amount. The name comes from the maths: add up all the gains and losses across all players, and you always get zero.",
        "This is completely different from ordinary life, where both parties in a transaction can walk away better off. In a zero-sum world, there is no creating new value — only transferring it. Every gain is extracted from someone else's loss.",
        "Most people intuitively understand this in sports and poker. Where it gets dangerous is when people apply zero-sum thinking to situations that aren't zero-sum — negotiations, partnerships, trade agreements — and destroy mutual value by treating cooperation as a defeat.",
      ],
      example:
        "In a penalty shootout, there are exactly two possible outcomes per kick: the striker scores (gain +1) or the keeper saves it (gain +1 for the keeper). One point always moves from one side to the other. Nothing is created. The entire game is a redistribution of a fixed prize.",
      check: {
        question:
          "A stranger offers to trade you a £10 note for two £5 notes. Is this zero-sum?",
        options: [
          "Yes — the total money in the trade is fixed",
          "No — both people gain from the convenience",
          "Only if one person benefits more",
          "It depends on the exchange rate",
        ],
        correctIndex: 0,
        hint: "In this trade, no money is created or destroyed — the total is fixed at £10. Whether it feels beneficial depends on framing, but the maths is zero-sum. This is why the feeling of mutual benefit and the maths of zero-sum can coexist — the difference is in what's being measured.",
      },
    },
    {
      heading: "The moment you're predictable, you've already lost",
      type: "warning",
      body: [
        "In a zero-sum game, your opponent wins by exploiting what you'll do next. If you always kick to the right, a smart goalkeeper will always dive right. The moment you become predictable, you hand your opponent a reliable, repeatable advantage.",
        "The optimal strategy against a rational opponent is to be genuinely unpredictable — not randomly chaotic, but strategically mixed. You want your opponent to have no basis for guessing what you'll do, so every preparation they make is a gamble.",
        "This is counterintuitive because we associate predictability with strength. 'I always do X and I'm good at X.' But in a zero-sum game, your best shot becomes worthless the moment your opponent knows it's coming.",
      ],
      example:
        "Research on penalty kicks shows that professional goalkeepers who study a striker's history can significantly improve their save rate. Once a striker's preference becomes known — left corner, always — the keeper no longer needs to guess. The striker's skill becomes irrelevant: predictability neutralised it.",
      check: {
        question:
          "You're a tennis player who always serves to the backhand on match point. Your opponent knows this. What should you do?",
        options: [
          "Keep serving backhand — it's your best shot",
          "Mix up your serve to remove the predictability",
          "Serve harder to overpower their preparation",
          "Ask your coach",
        ],
        correctIndex: 1,
        hint: "A good shot becomes worse when it's predictable. Your opponent's preparation neutralises your advantage. In zero-sum games, randomness isn't weakness — it's a rational defence against exploitation. Your second-best shot, served unpredictably, will outperform your best shot served predictably.",
      },
    },
    {
      heading: "The mathematics of unpredictability",
      type: "mechanism",
      body: [
        "When both players act rationally in a zero-sum game, neither can do better by switching strategy unilaterally. This is called a minimax strategy — you minimise the maximum your opponent can take from you.",
        "In simple games like penalty kicks, it means mixing strategies so your opponent can't reliably predict you. The maths shows there's always an optimal mixing ratio — a precise balance of left and right, high and low, that makes your opponent's every preparation equally useful.",
        "The key insight: the right mixing ratio doesn't maximise your chance of success on any single shot. It maximises your expected success over many shots, by making your opponent's information worthless.",
      ],
      example:
        "Studies of professional football show that when players mix their kick direction close to the game-theoretically optimal ratio, save rates drop to their lowest. The math and the instinct converge. Players who deviate from the optimal ratio — by favouring one side too heavily — can be exploited by goalkeepers who study the data.",
    },
    {
      heading:
        "The most dangerous mistake: seeing war where there's opportunity",
      type: "warning",
      body: [
        "The dangerous mistake is applying zero-sum thinking to non-zero-sum situations. A business negotiation, a marriage, a long-term partnership — these are usually positive-sum: both sides can gain more than either could alone.",
        "When you treat every interaction as a competition to be won, you destroy value that both sides could have shared. You refuse compromises that would leave everyone better off. You antagonise people who could have been allies.",
        "The zero-sum assumption is a mental habit that makes the world worse — not because competition is bad, but because applying it everywhere misidentifies when cooperation is the better strategy.",
      ],
      example:
        "Two companies competing for the same customer are in a zero-sum battle for that customer's spend. But two companies negotiating a supply contract can both gain: one gets reliability, the other gets volume. Confusing these two situations produces bad strategy. The first requires competitive thinking. The second requires collaborative thinking. Getting them backwards is expensive.",
      check: {
        question:
          "Two countries are negotiating a trade agreement where both can export more goods. Is this zero-sum?",
        options: [
          "Yes — one country must lose for the other to gain",
          "No — both can gain through comparative advantage",
          "Only if the trade is perfectly balanced",
          "It depends on the goods traded",
        ],
        correctIndex: 1,
        hint: "Trade creates value rather than just redistributing it. When countries specialise in what they're relatively better at, total output increases — both sides can gain. This is why economists nearly universally support free trade, even when the politics is complicated. It's a positive-sum game being played as if it were zero-sum by its critics.",
      },
    },
  ],
};

export const M1_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "Chess",
      description:
        "Every piece captured is a permanent loss for one player — what you take, they lose.",
    },
    {
      title: "Negotiating for a car",
      description:
        "The seller's higher price is the buyer's higher cost. Every pound gained by one is lost by the other.",
    },
    {
      title: "Political elections",
      description:
        "Votes for one candidate come at the direct expense of others — there's no creating new votes.",
    },
  ],
};

export const M1_QUIZ: QuizQuestion[] = [
  {
    id: "m1q1",
    question: "If you score, what is the goalkeeper's score?",
    options: ["1", "0", "-1", "It depends"],
    correctIndex: 1,
    explanation:
      "In a zero-sum game the total is always fixed. Your score of 1 and the goalkeeper's score of 0 add up to 1 — the keeper didn't gain anything because you did. There's no uncertainty here; the sum is invariant.",
  },
  {
    id: "m1q2",
    question:
      "Your opponent always kicks left. What is your best response as goalkeeper?",
    options: [
      "Always dive left",
      "Randomly pick a side",
      "Always dive right",
      "Stay in the middle",
    ],
    correctIndex: 0,
    explanation:
      "A predictable opponent removes the risk from your decision. If they always kick left, diving left guarantees a save every time. Randomness only helps when you face genuine uncertainty — against a predictable player, it just introduces avoidable failure.",
  },
  {
    id: "m1q3",
    question: "A trade deal where both countries benefit — is this zero-sum?",
    options: [
      "Yes, one country must lose",
      "No, both can gain",
      "Only if trade is balanced",
      "Depends on the goods",
    ],
    correctIndex: 1,
    explanation:
      "Mutual benefit is the defining feature of a non-zero-sum situation. Zero-sum requires that any gain for one side comes at the direct expense of another. A trade that creates new value for both sides breaks that rule entirely — value isn't merely transferred, it's created.",
  },
];

// ─── Module 2 ────────────────────────────────────────────────────
export const M2_LESSON: Lesson = {
  title: "The Prisoner's Dilemma",
  sections: [
    {
      heading: "Two suspects, two choices, one trap",
      type: "concept",
      body: [
        "Two suspects are arrested and held in separate rooms. Neither can communicate with the other. Each must decide independently: stay silent (cooperate with each other) or testify against the other (defect).",
        "The police offer the same deal to both: if you testify and your partner stays silent, you go free and they get 10 years. If both testify, both get 5 years. If both stay silent, both get 1 year.",
        "Understanding the structure of this choice is the whole game. The genius of the dilemma is that no additional information would help — the trap is built into the structure itself.",
      ],
      example:
        "The scenario was formalised by mathematicians at RAND Corporation in 1950, studying nuclear strategy. They needed a simple model for situations where two rational actors might both choose the outcome that harms them both. It remains the most studied problem in game theory.",
      check: {
        question:
          "Before we look at the outcomes — what's the key feature that makes this a dilemma?",
        options: [
          "The suspects can't talk to each other",
          "The police are lying",
          "One suspect is innocent",
          "The prison sentences are too long",
        ],
        correctIndex: 0,
        hint: "The dilemma exists precisely because the players can't coordinate. If they could communicate and commit to a shared strategy, they'd both stay silent. The isolation is the trap — it prevents the cooperative solution that would benefit both. The dilemma is in the structure, not in the players.",
      },
    },
    {
      heading: "Map the battlefield before you choose",
      type: "mechanism",
      body: [
        "Map out what happens in each combination: Both stay silent → both get 1 year. You testify, they stay silent → you go free, they get 10 years. They testify, you stay silent → you get 10 years, they go free. Both testify → both get 5 years.",
        "Notice that the best collective outcome (both silent, 2 years total) and the worst collective outcome (both testify, 10 years total) are both stable states. But they're very different for you individually.",
        "The crucial asymmetry: the outcome that's best for everyone combined (both silent) is also the most fragile. It requires both players to resist their individual incentive to defect. One deviation destroys it.",
      ],
      example:
        "In a payoff matrix, you can see all four outcomes at once. What jumps out is that 'both silent' is the best total — but each individual has an incentive to deviate from it. The stability of cooperation depends entirely on trust, which the structure of the game makes impossible to verify.",
      check: {
        question: "Which outcome is best for both players combined?",
        options: [
          "Both testify (5 years each)",
          "Both stay silent (1 year each)",
          "You testify, they stay silent",
          "They testify, you stay silent",
        ],
        correctIndex: 1,
        hint: "Both silent produces the lowest total punishment (2 years combined vs 10 combined if both testify). The problem isn't that players don't see this — it's that each has an individual incentive to deviate from it, even though doing so makes the collective outcome worse.",
      },
    },
    {
      heading: "The logic that makes cooperation collapse",
      type: "trap",
      body: [
        "Here's the logic that creates the trap. If your partner stays silent: you can stay silent (1 year) or testify (go free). Testifying is better. If your partner testifies: you can stay silent (10 years) or testify (5 years). Testifying is still better.",
        "Regardless of what your partner does, testifying is always individually better. Economists call this a dominant strategy — it beats every alternative no matter what your opponent does.",
        "This is the tragedy: both players can reason through this perfectly clearly, arrive at the same conclusion, and both end up with 5 years each — when they could have both had 1 year. Individual rationality doesn't just fail to produce collective rationality here. It actively prevents it.",
      ],
      example:
        "The same logic operates in price wars. If your competitor keeps prices high, you gain market share by cutting yours. If they cut prices, you have to cut yours or lose customers. Either way, cutting is rational — even though both companies are worse off when both cut. The airline industry has destroyed billions of dollars of value through this exact mechanism.",
      check: {
        question:
          "Your partner is definitely going to stay silent. What's your best individual move?",
        options: [
          "Stay silent — cooperate with them",
          "Testify — go free",
          "It's a 50/50 choice",
          "It depends on your relationship with them",
        ],
        correctIndex: 1,
        hint: "Pure game theory says testify: you go from 1 year to 0. The uncomfortable truth is that this individual rational choice, multiplied across both players, produces the collectively worse outcome. Real people often cooperate anyway — but the logic of defection is real and powerful.",
      },
    },
    {
      heading: "This pattern is hiding in every industry, every negotiation",
      type: "example",
      body: [
        "The Prisoner's Dilemma isn't just a thought experiment. It describes the structure of many real-world problems where individual rationality produces collective harm.",
        "Arms races, price wars, overfishing, climate agreements, doping in sport — all share the same underlying structure. Each actor would prefer a world where everyone cooperates. But each actor also has an individual incentive to defect, regardless of what others do.",
        "The solution in each case is the same: some mechanism that makes cooperation enforceable or changes the payoffs. Laws, treaties, quotas, contracts — these exist because the dilemma is real, and voluntary cooperation is fragile.",
      ],
      example:
        "Fishing quotas exist because without them, every fishing company has an incentive to catch as much as possible — even if the collective result is depleting the stock and destroying everyone's long-term income. The dilemma is structural, not a failure of intelligence. The fishing companies aren't stupid. They're trapped.",
    },
  ],
};

export const M2_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "Price wars between airlines",
      description:
        "Both cutting prices hurts both, but neither can stop alone — stopping unilaterally means the other gains all the market share.",
    },
    {
      title: "Doping in sports",
      description:
        "Athletes dope because others might, even though a doping-free sport benefits everyone. Individual rationality produces collective harm.",
    },
    {
      title: "Nations building nuclear arsenals",
      description:
        "Mutual disarmament would be safer, but unilateral disarmament is dangerous. The logic traps everyone in an expensive arms race.",
    },
  ],
};

export const M2_QUIZ: QuizQuestion[] = [
  {
    id: "m2q1",
    question: "Your partner is going to testify. What is your best move?",
    options: ["Stay silent", "Testify", "It doesn't matter", "Flip a coin"],
    correctIndex: 1,
    explanation:
      "If your partner testifies and you stay silent, you get 10 years. If you also testify, you get 5 years. Testifying is less bad — this is why defection is individually rational even when it leads to a terrible collective outcome. Silence here is pure loss.",
  },
  {
    id: "m2q2",
    question: "Your partner is going to stay silent. What is your best move?",
    options: ["Stay silent", "Testify", "It doesn't matter", "Flip a coin"],
    correctIndex: 1,
    explanation:
      "If your partner stays silent and you also stay silent, you each get 1 year. But if you testify while they stay silent, you go free. Testifying is better for you regardless of what your partner does — this is what makes defection a dominant strategy.",
  },
  {
    id: "m2q3",
    question: "Both players defecting shows that:",
    options: [
      "They are both irrational",
      "They chose the worst possible outcome deliberately",
      "Individually rational choices can produce collectively bad outcomes",
      "The game is zero-sum",
    ],
    correctIndex: 2,
    explanation:
      "Neither player made an irrational choice — each did the best they could given the other's likely action. The tragedy is that individual rationality can trap everyone in a worse outcome than cooperation would have produced. This is why the dilemma is so powerful.",
  },
  {
    id: "m2q4",
    question: "Which outcome is the Nash Equilibrium?",
    options: [
      "Both stay silent",
      "You testify, partner silent",
      "Both testify",
      "Partner testifies, you silent",
    ],
    correctIndex: 2,
    explanation:
      "Nash Equilibrium means no player can improve by changing their strategy alone. In mutual defection, if you switch to silence while your partner still testifies, you go from 5 years to 10. Neither player has an incentive to change — so the outcome is stable, even though it's terrible.",
  },
];

// ─── Module 3 ────────────────────────────────────────────────────
export const M3_LESSON: Lesson = {
  title: "Nash Equilibrium",
  sections: [
    {
      heading: "The point every rational game drifts toward",
      type: "concept",
      body: [
        "A Nash Equilibrium is a state where no player can improve their outcome by changing their strategy alone, assuming everyone else stays the same. It's the stable resting point — the point a rational game drifts toward.",
        "Named after mathematician John Nash, it's arguably the most important concept in all of game theory. It doesn't describe what people do in practice. It describes where they end up when they're all acting in their own interest simultaneously.",
        "The concept is powerful because it applies to almost any strategic situation: price competition, arms races, coordination problems, evolutionary biology. Wherever there are multiple actors each optimising for themselves, Nash Equilibria are what emerges.",
      ],
      example:
        "In the Prisoner's Dilemma, 'both testify' is a Nash Equilibrium. If you're testifying and your partner switches to silence, they get 10 years instead of 5 — a worse outcome. Neither player gains by deviating. That's what makes it stable.",
      check: {
        question:
          "You and a competitor both charge £50 for your product. If you drop to £45, you gain customers. If they also drop to £45, you're back where you started but with lower margins. Is £50/£50 a Nash Equilibrium?",
        options: [
          "Yes — neither company benefits from changing price alone",
          "No — you could gain by dropping price",
          "Only if the products are identical",
          "It depends on customer loyalty",
        ],
        correctIndex: 1,
        hint: "If your competitor keeps charging £50 while you drop to £45, you do gain — so £50/£50 is NOT a Nash Equilibrium. A Nash Equilibrium requires that neither player benefits from deviating. Here, you benefit by deviating, so it's unstable. The equilibrium in this price competition is likely both charging £45.",
      },
    },
    {
      heading: "A simple test that reveals stability",
      type: "mechanism",
      body: [
        "The method for finding Nash Equilibria is systematic: for each possible outcome, ask 'could either player do better by switching?' If the answer is no for both players, you've found an equilibrium.",
        "Start with any cell in the payoff matrix. Check if Player 1 would gain by moving. Check if Player 2 would gain by moving. If neither would gain, mark it. Repeat for every cell.",
        "This test can be run on any strategic situation — not just formalised games. Anytime you're asking 'is this situation stable?', you're running a Nash test. If either party could do better by changing strategy, the situation isn't stable and will drift.",
      ],
      example:
        "In a two-player game with four outcomes (a 2x2 matrix), you check all four cells. Some games have one equilibrium. Some have multiple. Some have none in pure strategies — which requires mixing strategies to solve. The test is always the same: can either player gain by switching?",
    },
    {
      heading: "When stability isn't enough: the coordination problem",
      type: "warning",
      body: [
        "Some games have more than one Nash Equilibrium — and this creates a new problem: coordination. If both equilibria are stable, rational players still need to agree on which one to play.",
        "Without communication or convention, they might end up playing different equilibria. Player A expects Equilibrium 1 and plays accordingly. Player B expects Equilibrium 2 and plays accordingly. Neither equilibrium is reached, and both lose.",
        "This is the core challenge of coordination games. The problem isn't that players are irrational — it's that rationality alone doesn't tell you which of two equally stable outcomes to expect.",
      ],
      example:
        "Driving is a coordination game. 'Everyone drives on the left' is a Nash Equilibrium. So is 'everyone drives on the right.' Both are stable — but mixing them is catastrophic. Countries solve this with law, not logic. The law converts a coordination problem into a focal point — one equilibrium becomes obvious.",
      check: {
        question:
          "A game has two Nash Equilibria. Without communication, what happens when rational players try to play it?",
        options: [
          "They'll naturally converge on the better equilibrium",
          "They might end up playing different equilibria and both lose",
          "They'll randomise between the two",
          "The game has no solution",
        ],
        correctIndex: 1,
        hint: "Rationality alone doesn't solve the coordination problem. Both equilibria are equally stable from a game-theory perspective. Without a signal, convention, or communication, players have no basis for choosing one over the other — and if they choose differently, neither equilibrium is reached.",
      },
    },
    {
      heading: "Stability and goodness have nothing to do with each other",
      type: "warning",
      body: [
        "The most important thing to remember about Nash Equilibria is that they describe stability, not desirability. An outcome can be stable — no one benefits from changing — and terrible for everyone involved.",
        "The Prisoner's Dilemma equilibrium — mutual defection — is stable and collectively awful. Everyone would prefer cooperation, but the structure of the game makes cooperation unstable. The equilibrium is stable precisely because it punishes anyone who tries to improve it unilaterally.",
        "Understanding this gap between stability and optimality is essential for understanding why social problems persist. The question isn't 'why don't people choose the better outcome?' It's 'what changed the game to make the better outcome stable?'",
      ],
      example:
        "Traffic jams are stable: no individual driver benefits from changing lanes when traffic is gridlocked. But the collective outcome — everyone stuck — is terrible. The equilibrium is stable and bad. Solving it requires changing the game (congestion pricing, traffic management), not just hoping individuals will choose differently.",
    },
  ],
};

export const M3_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "Driving conventions",
      description:
        "Driving on the left (or right) is stable once established — nobody benefits from switching alone, even if the other side is arbitrary.",
    },
    {
      title: "QWERTY keyboard layout",
      description:
        "Nobody benefits from switching alone even if alternatives might be better. The equilibrium persists through network effects, not merit.",
    },
    {
      title: "Currency",
      description:
        "Everyone accepts it because everyone else accepts it. The value is self-reinforcing — a pure coordination equilibrium.",
    },
  ],
};

export const M3_QUIZ: QuizQuestion[] = [
  {
    id: "m3q1",
    question: "A player deviates from a Nash Equilibrium. What happens?",
    options: [
      "The game resets",
      "They improve their outcome",
      "They make themselves worse off",
      "The other player also deviates",
    ],
    correctIndex: 2,
    explanation:
      "That's the definition of Nash Equilibrium — no player can do better by changing strategy alone. If you deviate, you move to a worse outcome for yourself. That's precisely what makes it stable: the incentives point inward.",
  },
  {
    id: "m3q2",
    question:
      "Two equilibria exist in the driving game. What's the coordination challenge?",
    options: [
      "One equilibrium is better than the other",
      "Players must coordinate which equilibrium to play",
      "The game has no stable solution",
      "Rational players always pick the same one",
    ],
    correctIndex: 1,
    explanation:
      "When multiple equilibria exist, the problem is selecting one. Both 'drive left' and 'drive right' are stable — but only if both drivers expect the same convention. Without a shared expectation, you get crashes. Rationality alone doesn't solve the selection problem.",
  },
  {
    id: "m3q3",
    question: "In game theory, 'stable' means:",
    options: [
      "The outcome is fair",
      "The outcome is efficient",
      "No player benefits from changing strategy alone",
      "The game is over",
    ],
    correctIndex: 2,
    explanation:
      "Stability in game theory is purely about incentives, not fairness or welfare. A stable outcome can be terrible for everyone — it just means that, given everyone else's choices, no individual has a reason to switch. Stability and goodness are completely independent.",
  },
];

// ─── Module 4 ────────────────────────────────────────────────────
export const M4_LESSON: Lesson = {
  title: "Repeated Games",
  sections: [
    {
      heading: "What you do today is an investment in tomorrow's game",
      type: "concept",
      body: [
        "In a one-shot game, the present is all that exists. In a repeated game, every choice casts a shadow forward. What you do today shapes what your opponent expects from you tomorrow — and what they'll do in response.",
        "This changes the calculus entirely. Cooperation that would be irrational in a single interaction can become the optimal strategy when you'll meet again. The future is a resource — and protecting it changes how you should act now.",
        "This is why long-term relationships operate so differently from one-off encounters. It's not just sentiment or trust — it's a rational response to the changed payoff structure. When tomorrow matters, today's defection is expensive.",
      ],
      example:
        "A contractor who builds one house and disappears has no incentive to do quality work. A contractor who builds houses in the same town for thirty years has a powerful incentive — every job is an advertisement for every future job. The repeated nature of the game transforms the incentive entirely.",
      check: {
        question:
          "You're negotiating a one-time deal with a stranger you'll never see again. How does this differ from negotiating with a long-term business partner?",
        options: [
          "It doesn't — rational behaviour is the same",
          "The shadow of the future changes what's rational",
          "You should always cooperate regardless",
          "One-time deals are always zero-sum",
        ],
        correctIndex: 1,
        hint: "With a stranger you'll never see again, short-term self-interest is rational. With a long-term partner, harming them today risks losing the entire future relationship. The repeated nature of the interaction doesn't just add more rounds — it fundamentally changes what's strategically optimal.",
      },
    },
    {
      heading: "Your most valuable strategic asset takes years to build",
      type: "concept",
      body: [
        "In repeated games, your reputation precedes you into every interaction. A reputation for reliability means partners offer you better deals. A reputation for defection means others won't cooperate with you at all.",
        "Reputation is a strategic asset — and it's built entirely from the accumulation of past choices. Every interaction either deposits into or withdraws from your reputation account.",
        "This is why trustworthy behaviour in early interactions can be a rational investment, not just a moral choice. You're not just doing the right thing in a particular deal — you're building an asset that pays returns across every future interaction.",
      ],
      example:
        "Warren Buffett famously said Berkshire Hathaway's advantage is its reputation for closing deals quickly and without renegotiating. This reputation means he gets shown deals others don't. The strategic value of a reputation for reliability compounds over time — it's a moat built from consistent choices.",
    },
    {
      heading: "The simplest strategy beat every complex one",
      type: "example",
      body: [
        "In 1980, political scientist Robert Axelrod ran a computer tournament where strategies competed in repeated Prisoner's Dilemmas. The winner was the simplest entry: Tit-for-Tat.",
        "The rule is: start by cooperating, then do whatever your opponent did last round. If they cooperated, you cooperate. If they defected, you defect once, then return to cooperation.",
        "Tit-for-Tat beat hundreds of more complex strategies — including some specifically designed to exploit it. Its simplicity was its strength: every strategy it faced could understand it and predict it, which made cooperation possible. Complexity designed to exploit became irrelevant against a strategy that simply mirrored.",
      ],
      example:
        "The tournament ran multiple rounds. Strategies that were initially successful through exploitation fared poorly over time — they killed their hosts and ran out of cooperative partners. Tit-for-Tat's cooperative opening meant it always found cooperative partners willing to play with it.",
      check: {
        question: "Your opponent defects in round 3. Tit-for-Tat says:",
        options: [
          "Defect permanently from now on",
          "Defect in round 4, then cooperate again if they do",
          "Cooperate — forgiveness is always right",
          "Defect for the next 3 rounds",
        ],
        correctIndex: 1,
        hint: "Tit-for-Tat punishes exactly once, proportionally. This is what makes it both firm (it won't be endlessly exploited) and forgiving (it restores cooperation quickly). Permanent retaliation destroys the future value of the relationship — and that future value is the whole point of repeated games.",
      },
    },
    {
      heading:
        "Nice, firm, forgiving, and transparent — the formula for sustained cooperation",
      type: "mechanism",
      body: [
        "Axelrod identified four properties that explain why Tit-for-Tat won. Nice: it never defects first, so it doesn't provoke unnecessary conflict. Retaliatory: it punishes defection immediately, so it can't be exploited indefinitely.",
        "Forgiving: it returns to cooperation after one punishment, preserving future value. Clear: it's completely predictable, so other strategies know exactly how to cooperate with it successfully.",
        "These properties aren't just game theory abstractions. The most successful long-running institutions share them: they don't start conflicts, they respond firmly to violations, they provide paths back to good standing, and their rules are transparent.",
      ],
      example:
        "Democratic institutions, trade organisations, and long-running alliances all embody these four properties when functioning well. The moment they become unpredictable or fail to respond proportionally to violations, cooperation breaks down — exactly as the theory predicts.",
      check: {
        question:
          "Why is 'forgiving' one of Tit-for-Tat's strengths rather than a weakness?",
        options: [
          "It prevents grudges building up",
          "It shows you're not a threat",
          "It restores cooperation after a defection, preserving future value",
          "Forgiveness is always morally correct",
        ],
        correctIndex: 2,
        hint: "In a repeated game, the future is worth protecting. Permanent retaliation after one defection destroys all future cooperation — and all its value. Forgiving quickly restores the relationship to its cooperative state, which is the most valuable long-run outcome for both players.",
      },
    },
    {
      heading: "The one thing that defeats even the best strategy",
      type: "warning",
      body: [
        "Tit-for-Tat has one weakness: noise. If a cooperation is misread as a defection — due to misunderstanding, error, or bad communication — it triggers a chain of retaliation and counter-retaliation.",
        "Generous Tit-for-Tat, which occasionally cooperates even after a defection, outperforms plain Tit-for-Tat in noisy environments. The lesson: the right strategy depends on how reliable information is.",
        "In high-noise environments, forgiveness needs to be more generous. In clear environments, strict reciprocity works best. The optimal strategy isn't fixed — it depends on the environment you're in.",
      ],
      example:
        "International relations researchers use this to explain arms escalation cycles. A military exercise is perceived as a threat, triggering a counter-buildup, which triggers another, until both sides are pouring resources into an arms race neither wanted. The game was cooperative; a misread signal started the spiral.",
    },
  ],
};

export const M4_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "International trade agreements",
      description:
        "Countries cooperate because retaliation in future rounds is credible. The shadow of the future makes cooperation rational.",
    },
    {
      title: "Business partnerships",
      description:
        "Reputation for reliability is worth more than any single deal. Long-term relationships change the calculus completely.",
    },
    {
      title: "Neighbourhood favours",
      description:
        "People help neighbours because they expect to live there for years. The repeated nature of the interaction makes generosity rational.",
    },
  ],
};

export const M4_QUIZ: QuizQuestion[] = [
  {
    id: "m4q1",
    question: "How does a repeated game differ from a one-shot game?",
    options: [
      "Players have more choices",
      "The future creates incentives to cooperate now",
      "Defection is no longer possible",
      "Scores accumulate across rounds",
    ],
    correctIndex: 1,
    explanation:
      "The key difference is that future interactions are at stake. In a one-shot game, there's no tomorrow to protect. In repeated games, cooperating today can be worth more than the short-term gain from defecting, because it shapes what you receive in future rounds.",
  },
  {
    id: "m4q2",
    question: "After your opponent defects, Tit-for-Tat:",
    options: [
      "Always cooperates",
      "Defects once, then cooperates again",
      "Defects permanently",
      "Randomly cooperates or defects",
    ],
    correctIndex: 1,
    explanation:
      "Tit-for-Tat retaliates exactly once in response to each defection, then immediately forgives if cooperation resumes. This makes it punishing enough to deter exploitation but forgiving enough to restore cooperation — which is why it outperforms permanently retaliating strategies.",
  },
  {
    id: "m4q3",
    question: "Against The Shark, the best response is:",
    options: [
      "Always cooperate to set a good example",
      "Defect from round 1",
      "Alternate cooperating and defecting",
      "Cooperate for 3 rounds then defect",
    ],
    correctIndex: 1,
    explanation:
      "The Shark will defect every round regardless of what you do. Cooperating against them only lowers your score. When you know your opponent will always defect, defecting yourself is damage limitation — there is no relationship to protect, no future to invest in.",
  },
  {
    id: "m4q4",
    question: "Why did Tit-for-Tat win Axelrod's tournament?",
    options: [
      "It maximised individual gain in every round",
      "It exploited weaker strategies",
      "It was nice, retaliatory, forgiving, and clear",
      "It was programmed to detect and copy the best strategy",
    ],
    correctIndex: 2,
    explanation:
      "Tit-for-Tat didn't win by exploiting others — it won by making cooperation viable. Its four properties together meant it never got taken advantage of for long, always punished defection, always forgave after punishment, and was predictable enough that other strategies could cooperate with it successfully.",
  },
];
