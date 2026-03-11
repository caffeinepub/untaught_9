import type {
  Lesson,
  LessonSectionType,
  Module,
  QuizQuestion,
} from "./game-theory";

// Re-export for convenience
export type { LessonSectionType };

export const BE_MODULES: Module[] = [
  {
    id: 1,
    title: "Loss Aversion",
    lessonId: "be-m1-lesson",
    simulationId: "be-m1-sim",
    quizId: "be-m1-quiz",
  },
  {
    id: 2,
    title: "Anchoring",
    lessonId: "be-m2-lesson",
    simulationId: "be-m2-sim",
    quizId: "be-m2-quiz",
  },
  {
    id: 3,
    title: "Sunk Cost Fallacy",
    lessonId: "be-m3-lesson",
    simulationId: "be-m3-sim",
    quizId: "be-m3-quiz",
  },
  {
    id: 4,
    title: "Confirmation Bias",
    lessonId: "be-m4-lesson",
    simulationId: "be-m4-sim",
    quizId: "be-m4-quiz",
  },
  {
    id: 5,
    title: "Planning Fallacy",
    lessonId: "be-m5-lesson",
    simulationId: "be-m5-sim",
    quizId: "be-m5-quiz",
  },
];

// ─── Module 1 ─────────────────────────────────────────────────────
export const M1_LESSON: Lesson = {
  title: "Loss Aversion",
  sections: [
    {
      heading: "Losing £100 hurts twice as much as winning £100 feels good",
      type: "concept",
      body: [
        "Research by Kahneman and Tversky showed that losses feel roughly twice as powerful as equivalent gains. Losing £100 produces more pain than gaining £100 produces pleasure. The asymmetry is real, measurable, and remarkably consistent across people and cultures.",
        "This isn't irrational in an evolutionary sense — it may have made sense in environments where losses were catastrophic and gains were incremental. But it creates systematic distortions in modern decision-making that cost us in predictable ways.",
        "The key word is systematic. Loss aversion doesn't just make you cautious sometimes. It bends every decision involving potential losses in the same direction — away from risk, toward preservation of what you already have.",
      ],
      example:
        "In experiments, people offered a 50/50 gamble to win £100 or lose £100 almost always decline — even though the expected value is zero. To make people take the bet, you typically need to offer them a potential gain of around £200 to offset the potential loss of £100. The 2:1 ratio appears consistently.",
      check: {
        question:
          "You buy a ticket to a concert for £50. The day before, you discover you have a free ticket from a friend. What's the rational thing to do with the paid ticket?",
        options: [
          "Go to both — you paid for one",
          "Sell the paid ticket or give it away — attend the free one",
          "Attend the paid concert to get your money's worth",
          "It doesn't matter which you attend",
        ],
        correctIndex: 1,
        hint: "The £50 is already spent regardless of what you do — it's a sunk cost. But loss aversion makes you feel like you 'must' use the paid ticket to avoid 'losing' the money. A rational decision ignores sunk costs and looks only at which concert you'd actually prefer to attend tonight.",
      },
    },
    {
      heading:
        "The same outcome, framed differently, produces opposite decisions",
      type: "trap",
      body: [
        "When choices are framed as potential losses, people become more risk-seeking — willing to gamble to avoid a certain loss. When choices are framed as potential gains, people become risk-averse — preferring a certain smaller gain to a risky larger one.",
        "This means framing alone can reverse your preference, even when the objective outcomes are identical. You're not choosing between different options. You're choosing between different emotional responses to the same option.",
        "This is exploited constantly in persuasion, marketing, and policy. The same intervention can be accepted or rejected depending entirely on whether it's framed as preventing a loss or achieving a gain.",
      ],
      example:
        "Kahneman and Tversky's famous experiment: 'Program A will save 200 lives. Program B has a one-third chance of saving 600 lives.' Most people choose A (the certain gain). Reframed: 'Program A means 400 people will die. Program B has a two-thirds chance that 600 people will die.' Most people choose B (gamble to avoid the certain loss). Same numbers. Different frames. Different choices.",
      check: {
        question:
          "A doctor tells you: 'This surgery has a 90% survival rate.' Another doctor says: 'This surgery has a 10% mortality rate.' Which sounds more reassuring?",
        options: [
          "90% survival rate",
          "10% mortality rate",
          "They're identical — framing doesn't matter",
          "It depends on the surgery",
        ],
        correctIndex: 0,
        hint: "Most people find '90% survival' more reassuring even though it's mathematically identical to '10% mortality.' This is loss aversion in action — the mortality frame makes the loss (death) salient, activating the asymmetric pain of loss. Knowing about the bias doesn't make you immune to it.",
      },
    },
    {
      heading: "Once you see it, you can't unsee it",
      type: "example",
      body: [
        "You see loss aversion everywhere once you know to look. Investors hold losing stocks too long — selling feels like realising a loss. Employees resist pay cuts more than they appreciate equivalent raises.",
        "Homeowners overprice their houses because selling below purchase price is psychologically unacceptable. Companies keep failed projects alive to avoid 'writing them off.' In each case, the pain of loss outweighs the equivalent gain.",
        "The 'endowment effect' is loss aversion applied to possessions. Experiments show that once people own something — even assigned randomly — they value it more than someone who doesn't own it. People demand more to give something up than they'd pay to acquire it.",
      ],
      example:
        "In a classic experiment, half the participants were given a coffee mug and asked the minimum they'd sell it for. The other half were asked the maximum they'd pay to buy the same mug. Sellers consistently demanded more than buyers would pay — even though they were assigned ownership randomly minutes earlier. The endowment effect appeared immediately.",
    },
    {
      heading: "Use the bias as a tool, not just a trap",
      type: "fix",
      body: [
        "Knowing about loss aversion gives you tools. You can design choices to frame things as preventing losses rather than achieving gains — this is more motivating for you and for others.",
        "You can notice when you're avoiding a decision to avoid 'crystallising' a loss. You can deliberately reframe: 'What would I gain by changing course?' The bias doesn't disappear with awareness, but awareness creates the possibility of overriding it.",
        "In persuasion and communication, the loss frame almost always outperforms the gain frame for the same objective. Use it when you need to motivate action. Recognise it when others are using it on you.",
      ],
      example:
        "Health campaigns that say 'You'll lose years off your life by not exercising' consistently outperform campaigns that say 'Exercise adds years to your life' — even with the same audience. The loss frame is more motivating, all else being equal. The same principle applies to financial advice, product launches, and policy communication.",
    },
  ],
};

export const M1_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "Holding losing stocks",
      description:
        "Investors hold onto falling stocks long past the rational sell point — selling would make the loss real. This is loss aversion: the pain of realising the loss outweighs the rational calculation.",
    },
    {
      title: "Subscription inertia",
      description:
        "People keep paying for subscriptions they don't use because cancelling feels like losing something, even when continuing costs real money. The threat of loss outweighs the clear gain.",
    },
    {
      title: "Free trial to paid conversion",
      description:
        "Companies end free trials with 'Don't lose your progress' rather than 'Upgrade to get more features.' Framing an action as preventing a loss is more persuasive than framing it as achieving a gain.",
    },
  ],
};

export const M1_QUIZ: QuizQuestion[] = [
  {
    id: "be-m1q1",
    question:
      "You win £100. How much would you need to lose to feel the same emotional intensity, just negative?",
    options: ["£50", "£100", "£200", "£500"],
    correctIndex: 2,
    explanation:
      "Kahneman and Tversky found the loss-gain ratio is approximately 2:1 — losses hurt about twice as much as equivalent gains feel good. This isn't pessimism; it's an asymmetry in how the brain processes value. The key insight is that emotional intensity isn't symmetrical around zero.",
  },
  {
    id: "be-m1q2",
    question:
      "Loss aversion explains why investors often hold losing stocks too long. What is the underlying reason?",
    options: [
      "They expect the stock to recover",
      "Selling makes the loss feel real and permanent",
      "They lack financial knowledge",
      "Tax reasons prevent selling",
    ],
    correctIndex: 1,
    explanation:
      "The stock's fall is already real whether or not you sell. But selling forces you to acknowledge the loss — to make it definite and final. Holding keeps the possibility of recovery alive, even when that hope is irrational. This is the loss aversion mechanism: the pain of a certain loss outweighs the rational value calculation.",
  },
  {
    id: "be-m1q3",
    question:
      "A gym offers a new member '30 days free, then cancel anytime' vs 'Join now and save £30 on your first month.' Which framing is more likely to convert?",
    options: [
      "The discount offer",
      "The free trial offer",
      "Both are equally effective",
      "Neither — price is all that matters",
    ],
    correctIndex: 1,
    explanation:
      "Loss aversion means threatening to take something away is more powerful than offering a gain. '30 days free, then cancel anytime' works because after 30 days, cancelling feels like losing something you already have — your membership, your progress, your access. The gain framing of a £30 discount doesn't trigger the same emotional intensity.",
  },
];

// ─── Module 2 ─────────────────────────────────────────────────────
export const M2_LESSON: Lesson = {
  title: "Anchoring",
  sections: [
    {
      heading:
        "The first number you hear is the most powerful number in the room",
      type: "concept",
      body: [
        "Anchoring is the tendency for the first number we encounter to disproportionately influence our subsequent estimates and decisions. Even when we know the anchor is arbitrary or irrelevant, it still pulls our judgment.",
        "The anchor doesn't dictate our conclusion — it shifts the range we consider plausible. Our estimate starts somewhere near the anchor and adjusts from there. The problem is that we never adjust enough.",
        "This is one of the most robust findings in behavioural science. It works on experts as well as novices. It works even when people are explicitly told the anchor was randomly generated. The bias operates below the level of conscious intention.",
      ],
      example:
        "Kahneman's famous experiment: participants spun a wheel (rigged to land on 10 or 65) and were then asked what percentage of African countries are in the UN. Those who got 10 guessed 25% on average. Those who got 65 guessed 45% on average. The wheel was completely irrelevant — but it anchored their estimates across a 20-point range.",
      check: {
        question:
          "A used car dealer quotes you £15,000 for a car worth £9,000. What has just happened?",
        options: [
          "You've been deceived about the car's value",
          "An anchor has been set — your counter-offer will be pulled upward",
          "The dealer is testing your knowledge",
          "Nothing — you'll just say no and walk away",
        ],
        correctIndex: 1,
        hint: "Even if you know the car isn't worth £15,000, your counter-offer will be influenced by that anchor. Research shows that when sellers name a high price first, buyers end up paying more than when buyers make the opening offer. The anchor doesn't control you — but it moves you, even when you know it's inflated.",
      },
    },
    {
      heading: "Whoever speaks first sets the gravity of the conversation",
      type: "mechanism",
      body: [
        "In any negotiation, whoever names a number first sets the anchor — and this has been shown repeatedly to shift final outcomes. A high first offer in a salary negotiation leads to a higher final salary. A low first offer in a price negotiation leads to a lower final price.",
        "The effect persists even when both parties are experienced professionals who know about anchoring. Awareness helps, but it doesn't neutralise the effect — it merely reduces it slightly.",
        "This creates a strategic dilemma: anchoring first gives you influence, but anchoring too aggressively can derail negotiations or damage relationships. The optimal anchor is ambitious but defensible.",
      ],
      example:
        "Studies of legal settlements show that when prosecutors recommend high sentences, judges sentence higher on average — even when they report being uninfluenced. The anchor works below the level of conscious awareness. Experienced judges, trained lawyers, clear data — none of it eliminates the effect.",
      check: {
        question:
          "You're negotiating your salary. The employer asks: 'What are you currently earning?' What's the strategic issue?",
        options: [
          "It's illegal for employers to ask that in some places",
          "Your current salary becomes the anchor — potentially too low",
          "It shows you're experienced",
          "There's no strategic issue — just answer honestly",
        ],
        correctIndex: 1,
        hint: "Your current salary anchors the conversation. If you're underpaid, revealing it makes the anchor work against you — the offer will be pulled toward your current number. This is why many negotiation experts recommend anchoring with your target salary first, before the employer sets an anchor.",
      },
    },
    {
      heading: "Every sale tag, menu, and subscription tier is an anchor",
      type: "example",
      body: [
        "Retailers exploit anchoring systematically. The 'original price' crossed out next to the 'sale price' is an anchor. The most expensive item on a menu makes everything else look reasonable. Subscription tiers are priced to make the middle option look like the best value.",
        "In each case, a reference number is introduced to shift your perception of what's normal or fair. You're not evaluating the price on its own merits — you're comparing it to the anchor that was placed there for you.",
        "This is entirely intentional design. Menu engineers, pricing consultants, and retail designers know exactly what they're doing. Once you see the mechanism, it doesn't fully disappear — but you can at least ask the right question: 'Is this genuinely good value, or just better than the anchor?'",
      ],
      example:
        "Restaurants often include a very expensive item on a menu not because they expect to sell it, but because it makes the second-most-expensive item seem like a sensible choice. The anchor shifts the whole range of 'reasonable.' Remove the expensive item and the second one suddenly seems overpriced.",
    },
    {
      heading: "You can't escape the anchor, but you can weaken its grip",
      type: "fix",
      body: [
        "You can't eliminate anchoring — the bias operates below conscious awareness. But you can reduce its impact. Before entering a negotiation, establish your own anchor based on research: what's the market rate? What's your BATNA? What number would you name first?",
        "When you receive an anchor, explicitly question it: 'What is this number based on?' Making the anchor explicit weakens its grip. Introduce a competing reference point — a different market comparison, a different framing.",
        "Professional negotiators are trained to 'reject and reframe' extreme anchors: acknowledge the number, explicitly state you're setting it aside, and introduce a different reference point. This doesn't eliminate the anchor effect, but it reduces it significantly.",
      ],
      example:
        "In salary negotiations, candidates who research market rates before the conversation and open with their target number consistently achieve better outcomes than those who wait for the employer's offer. They anchor first with a defensible number and let the employer adjust toward it — rather than adjusting upward from a low anchor.",
    },
  ],
};

export const M2_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "Salary negotiation",
      description:
        "The first number stated anchors the range. Research shows that whoever names a number first — employer or candidate — shifts the final outcome toward their number, even with confident counterparts.",
    },
    {
      title: "Retail price anchoring",
      description:
        "'Was £200, now £140' works even when the item was never actually sold at £200. The anchor creates a reference point that makes the second number feel like a bargain.",
    },
    {
      title: "Legal settlements",
      description:
        "Studies show that higher initial damage claims produce higher settlements, even in cases where both parties know the opening claim is inflated. Anchoring overrides rational adjustment.",
    },
  ],
};

export const M2_QUIZ: QuizQuestion[] = [
  {
    id: "be-m2q1",
    question:
      "In a salary negotiation, you receive an opening offer well below your expectation. You should:",
    options: [
      "Accept immediately before they reconsider",
      "Counter-anchor with a number well above your target",
      "Decline to engage until they improve",
      "Split the difference immediately",
    ],
    correctIndex: 1,
    explanation:
      "The opening offer creates an anchor. Simply responding sets your counter as the new anchor. To counteract an unfavourable anchor, you need to introduce a new reference point — ideally one well above your actual target, so the negotiated midpoint lands near where you want. Splitting the difference rewards the person who anchored most aggressively.",
  },
  {
    id: "be-m2q2",
    question:
      "An arbitrary number (like the last two digits of your phone number) can influence your estimate of an unrelated quantity. This finding shows:",
    options: [
      "People are generally irrational",
      "Context-setting numbers affect subsequent judgments even when irrelevant",
      "Only experts are immune to anchoring",
      "Anchoring only works in financial contexts",
    ],
    correctIndex: 1,
    explanation:
      "Kahneman and Tversky showed that even numbers people know are arbitrary — spun on a wheel in their experiments — shifted estimates of factual questions like 'what percentage of UN countries are in Africa?' The brain uses available numbers as reference points even when told explicitly they are random. This is what makes anchoring so powerful and so hard to defend against.",
  },
  {
    id: "be-m2q3",
    question:
      "You are buying a car. The dealer's first offer is £22,000. You think it's worth £18,000. What does anchoring research suggest?",
    options: [
      "Your estimate of £18,000 is unaffected by the dealer's number",
      "The dealer's number will pull your final offer upward from your true value",
      "You should immediately state £14,000 to create a new anchor",
      "The best strategy is to leave and come back later",
    ],
    correctIndex: 1,
    explanation:
      "The dealer's anchor of £22,000 will exert gravitational pull on your counter. People who adjust from anchors typically adjust insufficiently — you're likely to counter at £19,000–20,000 rather than your actual value of £18,000. Awareness of anchoring helps but doesn't fully neutralise it. The best countermeasure is to deliberately calculate your offer before hearing theirs.",
  },
];

// ─── Module 3 ─────────────────────────────────────────────────────
export const M3_LESSON: Lesson = {
  title: "Sunk Cost Fallacy",
  sections: [
    {
      heading:
        "The cost you can't recover is controlling decisions you haven't made yet",
      type: "concept",
      body: [
        "A sunk cost is a cost already incurred that cannot be recovered. The sunk cost fallacy is continuing to invest in something — time, money, effort — because of what you've already spent, rather than because of what you expect to gain going forward.",
        "Rational decision-making should only consider future costs and benefits. Sunk costs are irrelevant to what you do next. They're gone regardless of your decision. The only question is: what's the best move from here?",
        "This sounds obvious in the abstract. In practice, it's one of the hardest biases to overcome, because abandoning something you've invested in feels like admitting a mistake — like the past investment was wasted. But it was wasted the moment you made it, not when you stopped throwing more after it.",
      ],
      example:
        "You've spent £200 on a non-refundable concert ticket. On the night, you feel ill. A rational analysis says: the £200 is gone either way — so the only question is whether attending a concert while ill is worth it tonight. But loss aversion makes you feel you must go to 'get your money's worth.'",
      check: {
        question:
          "You've been watching a film for an hour and realise you hate it. You paid £12 to see it. What should you do?",
        options: [
          "Stay — you've already paid",
          "Leave — the £12 is gone either way; only the next hour matters",
          "Wait for the good bits",
          "Ask for a refund",
        ],
        correctIndex: 1,
        hint: "The £12 is a sunk cost — it's spent whether you stay or go. The only relevant question is: is another hour of this film worth an hour of your time? If the answer is no, leaving is rational. Staying 'to get your money's worth' is the fallacy — the money is already gone.",
      },
    },
    {
      heading: "Two biases working together to trap you",
      type: "trap",
      body: [
        "Two cognitive biases drive the sunk cost fallacy working in combination. Loss aversion makes us feel that abandoning a project 'realises' the loss — as if continuing somehow recovers it (it doesn't). Stopping feels like losing what we've already put in.",
        "Commitment and consistency bias makes us want our past and future selves to be coherent. If I invested this much, I must have been right to, so I must continue. Reversing course feels like admitting we were wrong from the start.",
        "Together, these forces make walking away feel like failure even when it's clearly the correct decision. The emotional experience of stopping doesn't match the rational analysis. This gap is where the fallacy lives.",
      ],
      example:
        "The psychology of gambling exploits this perfectly. Players who are losing tend to bet more, not less — trying to 'chase their losses.' The sunk cost (what they've already lost) drives increasingly irrational decisions. Each bad bet is followed by a worse one, rationalised as recovery.",
    },
    {
      heading: "The larger the institution, the worse the fallacy gets",
      type: "warning",
      body: [
        "The sunk cost fallacy is especially dangerous in organisations. Projects are kept alive because of the investment already made, not their future prospects. Careers are continued in the wrong direction because of years already spent.",
        "Products are maintained because of the development cost, not because customers want them. The emotional and political costs of abandoning a project make the fallacy worse at scale. No one wants to be the person who cancelled the thing the company spent £50 million on.",
        "The result is that organisations systematically over-invest in failing projects relative to promising new ones. The sunk costs of the old project act as an invisible tax on new opportunities.",
      ],
      example:
        "Concorde is the classic case. Britain and France continued funding it long after projections showed it would never be commercially viable — partly because abandoning it would mean acknowledging the billions already spent were wasted. The rational analysis was clear. The political and psychological cost of stopping was too high. The sunk cost drove the decision more than the economics.",
      check: {
        question:
          "Your company has spent £2 million on a software project. New analysis shows it will cost another £5 million and the product won't be competitive. What should you do?",
        options: [
          "Continue — we've already invested £2 million",
          "Cancel — the £2 million is gone; only the future costs and prospects matter",
          "Reduce scope to save money",
          "Get a second opinion before deciding",
        ],
        correctIndex: 1,
        hint: "The £2 million is a sunk cost — it's gone regardless. The only relevant question is whether spending another £5 million makes sense given the expected return. If the answer is no, every additional pound spent makes the total loss bigger, not smaller. The sunk cost is not a reason to continue.",
      },
    },
    {
      heading: "The one question that cuts through sunk cost thinking",
      type: "fix",
      body: [
        "The practical technique for avoiding sunk cost reasoning is to ask: 'If I hadn't already invested in this, would I start now?' If the answer is no, continuing is irrational. The sunk cost is not a justification — it's noise.",
        "You can also try the 'outside view': imagine advising a friend in this situation. You'd likely tell them to stop — the sunk cost wouldn't seem relevant when it's not your money. Reframing yourself as an outside observer weakens the bias significantly.",
        "Good managers learn to explicitly separate sunk cost analysis from go-forward decisions. 'Here's what we've spent. Now, setting that aside entirely: given where we are today, what does the evidence say about continuing?' The explicit separation is the key — making it a two-step process rather than an intuitive judgment.",
      ],
      example:
        "The question 'Would I start this today if I were starting fresh?' has saved countless organisations from the Concorde fallacy. When the answer is clearly no, it creates a permission structure for stopping that 'we've spent too much to stop' doesn't. Framing the decision as a new choice, not a continuation, changes the emotional calculus.",
    },
  ],
};

export const M3_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "Staying in a bad relationship",
      description:
        "The years already invested feel like a reason to stay, even when the future prospects are clear. The past investment is gone regardless of the decision made today.",
    },
    {
      title: "Continuing a failing project",
      description:
        "Organisations keep funding projects that are clearly failing because they've already spent too much to stop — called the 'Concorde fallacy' after the supersonic plane that made no economic sense but was too politically expensive to cancel.",
    },
    {
      title: "Eating food you don't enjoy",
      description:
        "Finishing a meal because you paid for it adds no value — you already paid. The money is gone whether you eat it or not. The only question is whether eating it produces positive future value.",
    },
  ],
};

export const M3_QUIZ: QuizQuestion[] = [
  {
    id: "be-m3q1",
    question:
      "You've spent 8 months on a project that is clearly going to fail. The rational decision is to:",
    options: [
      "Continue — you've invested too much to stop",
      "Stop — the 8 months are gone regardless of what you do next",
      "Get a second opinion before deciding",
      "Continue for another month to be sure",
    ],
    correctIndex: 1,
    explanation:
      "The 8 months are a sunk cost. They're gone whether you continue or stop. The only relevant question is: what does the future look like from here? If the project is going to fail, stopping now saves all future time and resources. Continuing is only justified if the future costs and benefits make it worthwhile — the past is irrelevant.",
  },
  {
    id: "be-m3q2",
    question: "Sunk cost thinking is most dangerous because:",
    options: [
      "It wastes money",
      "It attaches future decisions to past investments that can't be changed",
      "It makes people pessimistic",
      "It leads to impulsive decisions",
    ],
    correctIndex: 1,
    explanation:
      "The danger isn't the sunk cost itself — that's gone. The danger is that sunk costs distort the evaluation of future choices. You don't ask 'is this worth continuing?' You ask 'can I justify having spent all that already?' These are different questions that often produce different and worse answers.",
  },
  {
    id: "be-m3q3",
    question: "The 'Concorde fallacy' refers to:",
    options: [
      "Overconfidence in engineering projects",
      "Continuing to invest in something because of what's already been spent, even when the future case is weak",
      "The tendency to underestimate project costs",
      "National pride distorting economic decisions",
    ],
    correctIndex: 1,
    explanation:
      "Both the UK and French governments continued funding Concorde long after it was clear the project would never be commercially viable — because stopping would mean 'wasting' everything already spent. The correct analysis is that the spent money was gone either way. Only future costs and benefits were relevant. Continuing was justified only if the future value exceeded future costs — which it didn't.",
  },
];

// ─── Module 4 ─────────────────────────────────────────────────────
export const M4_LESSON: Lesson = {
  title: "Confirmation Bias",
  sections: [
    {
      heading: "Your brain is a belief-confirming machine",
      type: "concept",
      body: [
        "Confirmation bias is the tendency to search for, interpret, and remember information in a way that confirms our pre-existing beliefs. We don't notice it happening. It feels like careful attention to evidence.",
        "But the asymmetry is real: we scrutinise evidence against our beliefs more harshly than evidence for them. We remember confirming evidence longer. We share it more readily. We find disconfirming evidence less credible.",
        "This isn't laziness or stupidity — it's the default operation of human cognition. The brain is an efficient belief-maintenance system, not an objective truth-finding one. Understanding this is the first step toward working against it.",
      ],
      example:
        "In 1960, Peter Wason's card experiment gave participants four cards (E, K, 4, 7) and the rule 'if a card has a vowel on one side, it has an even number on the other.' Most people wanted to flip E and 4 — the confirming cases. Almost no one flipped 7 — which could falsify the rule. Confirmation, not falsification, is the cognitive default.",
      check: {
        question:
          "You believe a new diet is effective. You read two studies: one confirming it works, one showing mixed results. What does confirmation bias predict you'll do?",
        options: [
          "Treat both studies equally",
          "Remember and cite the confirming study more readily",
          "Dismiss both because they're contradictory",
          "Update your belief proportionally",
        ],
        correctIndex: 1,
        hint: "Confirmation bias doesn't mean ignoring all counter-evidence — it means processing it differently. The confirming study feels more reliable, more methodologically sound, more worth citing. The mixed study seems flawed or context-specific. Both judgments happen below conscious awareness.",
      },
    },
    {
      heading:
        "The smarter you are, the better you are at being wrong confidently",
      type: "warning",
      body: [
        "One of the most disturbing findings in this area is that smarter people are better at rationalising their existing beliefs, not better at abandoning them when the evidence changes.",
        "Higher intelligence gives you more tools for constructing arguments — and those tools are available to defend beliefs as readily as to challenge them. A smarter person can build a more sophisticated case for a wrong belief than a less intelligent person can.",
        "This is called 'motivated reasoning.' The goal isn't truth — it's defending the belief. Intelligence, in the absence of epistemic humility, is a tool for rationalisation. The most dangerous form of being wrong is being wrong with a high-quality argument for it.",
      ],
      example:
        "Political partisans with higher numerical ability show larger political bias when interpreting data — they use their numeracy skills to reinterpret inconvenient data as supportive of their prior beliefs. Intelligence, in the absence of epistemic humility, is a tool for rationalisation, not just for truth-seeking.",
      check: {
        question:
          "Someone highly educated and articulate holds a conspiracy theory and can argue for it eloquently. What does this tell us?",
        options: [
          "Their intelligence suggests the theory might be correct",
          "Intelligence and accuracy of belief are not the same thing",
          "They're being deliberately dishonest",
          "You should take their arguments seriously as evidence",
        ],
        correctIndex: 1,
        hint: "Intelligence amplifies your ability to construct arguments — for and against. A highly intelligent person can build a more sophisticated case for a wrong belief than a less intelligent person can. The quality of the argument is not reliable evidence of the quality of the belief.",
      },
    },
    {
      heading: "The early hypothesis that poisons everything that follows",
      type: "trap",
      body: [
        "When we form an early hypothesis, we unconsciously start filtering all subsequent information through it. Evidence that fits is noticed and retained. Evidence that doesn't is dismissed, reinterpreted, or forgotten.",
        "This is particularly dangerous in medicine, law, and investigation — where an early wrong diagnosis or suspicion can lead to systematically distorted evidence-gathering. The initial frame determines what gets seen.",
        "The problem compounds: the more confirming evidence accumulates (because we're selecting for it), the more confident we become, the less open we are to revision. A wrong hypothesis held confidently is harder to dislodge than a tentative one.",
      ],
      example:
        "Studies of medical diagnosis show that doctors who form an early hypothesis order tests that confirm it, interpret ambiguous results as confirmatory, and underweight evidence pointing to alternative diagnoses. The initial hypothesis anchors the entire investigation — sometimes fatally.",
    },
    {
      heading: "The uncomfortable technique that actually works",
      type: "fix",
      body: [
        "The most effective technique against confirmation bias is actively seeking disconfirming evidence. Ask not 'what supports my view?' but 'what would change my mind, and is that evidence available?'",
        "Consider the 'steel man' — the strongest possible version of the opposing argument, not the weakest. Make your predictions explicit before gathering evidence: this creates accountability and prevents post-hoc rationalisation.",
        "None of these techniques eliminate the bias, but they counteract it. The key is making the process adversarial to your own beliefs — deliberately creating the conditions under which you could be proven wrong.",
      ],
      example:
        "Intelligence agencies use 'red team' exercises — teams explicitly tasked with finding the case against the prevailing analysis. The adversarial structure creates a forcing function: someone's job is to find what the main team is missing. The exercise is uncomfortable precisely because it works.",
    },
  ],
};

export const M4_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "News consumption",
      description:
        "People gravitate to news sources that confirm existing views. The effect is self-reinforcing — the algorithm learns what you engage with and shows you more of it, narrowing the information diet over time.",
    },
    {
      title: "Medical diagnosis",
      description:
        "Studies show that doctors who form an early diagnosis pay more attention to confirming evidence and systematically underweight disconfirming symptoms — producing missed diagnoses.",
    },
    {
      title: "Investment thesis",
      description:
        "Investors who form a view on a company tend to read analyst reports that confirm it and skip those that challenge it. The belief becomes more entrenched even as the evidence base stays the same.",
    },
  ],
};

export const M4_QUIZ: QuizQuestion[] = [
  {
    id: "be-m4q1",
    question:
      "You believe a medication works. A study confirms it. Another study finds it has no effect. You are more likely to:",
    options: [
      "Weight the studies equally",
      "Scrutinise the negative study more carefully than the positive one",
      "Immediately update toward 50/50",
      "Share the positive study more widely",
    ],
    correctIndex: 1,
    explanation:
      "Confirmation bias doesn't mean ignoring disconfirming evidence — it means applying different standards to it. We accept confirming evidence at face value and scrutinise disconfirming evidence for methodological flaws. The result is that our beliefs update slowly when challenged and quickly when confirmed. Both studies should receive equal scrutiny.",
  },
  {
    id: "be-m4q2",
    question: "Why does higher intelligence often amplify confirmation bias?",
    options: [
      "Intelligent people are more arrogant",
      "They are better at constructing arguments to defend pre-existing beliefs",
      "Intelligence reduces emotional control",
      "They have access to more information",
    ],
    correctIndex: 1,
    explanation:
      "Intelligence gives you more tools to rationalise. A smarter person who holds a belief can generate more sophisticated arguments in its defence, find more obscure supporting evidence, and identify more subtle flaws in challenging evidence. This is called 'motivated reasoning' — the goal isn't truth, it's defending the belief, and intelligence makes you better at achieving that goal.",
  },
  {
    id: "be-m4q3",
    question:
      "The most effective way to counteract confirmation bias in your own thinking is:",
    options: [
      "Read widely across sources",
      "Deliberately seek out the strongest case against your current belief",
      "Avoid forming views until you have all the facts",
      "Discuss the issue with people who agree with you",
    ],
    correctIndex: 1,
    explanation:
      "Wide reading helps, but confirmation bias filters it — you'll engage more with sources that align with your existing view. The only reliable countermeasure is active, deliberate search for disconfirming evidence: specifically asking 'what's the best argument against this?' and taking it seriously. This is called 'steel-manning' the opposition, and it's uncomfortable precisely because it works.",
  },
];

// ─── Module 5 ─────────────────────────────────────────────────────
export const M5_LESSON: Lesson = {
  title: "Planning Fallacy",
  sections: [
    {
      heading:
        "You will be wrong about how long this takes. Not randomly — systematically.",
      type: "concept",
      body: [
        "The planning fallacy is the tendency to underestimate the time, costs, and risks of future actions while overestimating the benefits. It's not random optimism — it's systematic. Projects almost always take longer and cost more than planned.",
        "And here's what makes it a fallacy rather than just bad luck: we keep making the same mistake on the next project, even when we know exactly what happened to the last one. The bias isn't corrected by experience.",
        "This is a finding that should give anyone pause. Experienced professionals, with years of relevant history, still systematically underestimate. The bias is structural — built into how we think about future tasks, not something that gets corrected with practice.",
      ],
      example:
        "The Sydney Opera House was budgeted to cost $7 million and take four years. It cost $102 million and took fourteen years. The Channel Tunnel was budgeted at £2.6 billion and finished at £4.65 billion. Both projects were planned by experienced professionals with sophisticated methods. The planning fallacy is not a novice mistake.",
      check: {
        question:
          "You estimate a project will take 2 weeks. Based on what you know about the planning fallacy, what's more likely?",
        options: [
          "It will take exactly 2 weeks",
          "It will take less than 2 weeks",
          "It will take longer than 2 weeks",
          "It depends on the project",
        ],
        correctIndex: 2,
        hint: "The planning fallacy predicts systematic underestimation. The question is how much — typically 30-50% longer for individual tasks, more for large complex projects. Knowing this doesn't make you estimate correctly, but it should make you build in a buffer.",
      },
    },
    {
      heading: "Focusing on your plan is the problem, not the solution",
      type: "trap",
      body: [
        "Kahneman identified two ways of estimating: the 'inside view' (focusing on the specific project, its unique features, your plan) and the 'outside view' (looking at base rates — how long did similar projects actually take?).",
        "We default to the inside view. We focus on our plan, our team, our special circumstances. We describe all the steps and estimate how long each will take. This feels thorough. It isn't.",
        "The inside view systematically excludes what isn't planned for: interruptions, dependencies, errors, scope creep, unexpected complications. Every project that's ever been done had these. Your plan doesn't include them. The base rate does.",
      ],
      example:
        "When asked how long a home renovation will take, most people describe their specific plan and estimate from there. Almost no one asks: 'What percentage of home renovations in this neighbourhood finished on time, and by how much did they overrun?' The outside view feels less intuitive but is more accurate because it incorporates all the things that actually happened.",
      check: {
        question: "To counter the planning fallacy, you should mainly:",
        options: [
          "Make a more detailed plan",
          "Look at base rates for similar projects",
          "Ask for more time upfront",
          "Work harder",
        ],
        correctIndex: 1,
        hint: "More detail in planning doesn't help — it deepens the inside view. The fix is the outside view: find reference class data for similar projects and use those base rates as your starting point, then adjust for your specific circumstances. This is called 'reference class forecasting.'",
      },
    },
    {
      heading: "Stop reasoning from scratch. Use what already happened.",
      type: "fix",
      body: [
        "The empirically validated solution to the planning fallacy is reference class forecasting: find a group of projects similar to yours, look at how long they actually took and what they cost, and use those base rates as your starting estimate.",
        "Then — and only then — adjust for your specific circumstances. This approach consistently outperforms inside-view estimation, even when done by experienced professionals who know about the bias.",
        "The key discipline is to find the reference class before doing the inside-view analysis. If you do the inside view first, the reference class becomes just another data point to explain away. The sequence matters.",
      ],
      example:
        "The UK government now mandates reference class forecasting for major infrastructure projects. Before estimating independently, project managers must find comparable past projects and use their outcomes as the starting point. This alone has reduced cost overruns significantly. The technique works not because it's sophisticated, but because it forces contact with reality.",
    },
    {
      heading: "This bias follows you into every decision, not just work",
      type: "example",
      body: [
        "The planning fallacy extends beyond project management into personal life. We underestimate how long errands take, how much we'll eat at the buffet, how long the commute will be on a difficult day.",
        "We budget more optimistically for the future than we do for the present. We plan ambitious schedules that assume everything goes well. They rarely do, and we're surprised every time.",
        "Understanding the bias allows you to build systematic buffers and to be appropriately sceptical of plans — your own and others'. When someone presents you with a confident timeline, the right question isn't 'does this plan make sense?' It's 'what do comparable projects actually look like?'",
      ],
      example:
        "Studies show that when students estimate how long essays will take, the actual time is typically 1.5–2x the estimate. When asked to estimate a 'worst case' scenario, they still underestimate. The inside view is so compelling that even explicit worst-case thinking doesn't fully correct for it. You need the outside view.",
    },
  ],
};

export const M5_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "Construction projects",
      description:
        "The Sydney Opera House was budgeted at £7m and took 10 years. Final cost: £102m over 14 years. This is not an outlier — surveys of major construction projects show average cost overruns of 45%.",
    },
    {
      title: "Software development",
      description:
        "Software projects are reliably late and over budget. Research by Kahneman and Lovallo found that planners underestimate duration and cost consistently, even after correcting for past errors.",
    },
    {
      title: "Personal task estimates",
      description:
        "Ask someone how long a household project will take. Then observe. The gap between estimated and actual time is consistent — not because people are being optimistic intentionally, but because the inside view systematically excludes interruptions, complications, and errors.",
    },
  ],
};

export const M5_QUIZ: QuizQuestion[] = [
  {
    id: "be-m5q1",
    question:
      "You've been asked to estimate how long a report will take. You've written similar reports before and they always took longer than expected. The most accurate forecast comes from:",
    options: [
      "Carefully analysing this report's specific requirements",
      "Looking at how long similar reports actually took",
      "Adding a 20% buffer to your instinctive estimate",
      "Getting a colleague's second opinion",
    ],
    correctIndex: 1,
    explanation:
      "This is the core insight of the planning fallacy — the 'inside view' (reasoning from the specifics of this task) produces optimistic estimates because it underweights interruptions, errors, and unexpected complications. The 'outside view' (looking at base rates for comparable tasks) is systematically more accurate because it incorporates all the things that actually happened in similar situations.",
  },
  {
    id: "be-m5q2",
    question:
      "The planning fallacy persists even when you know about it because:",
    options: [
      "People are wilfully optimistic",
      "The inside view feels more relevant than base rates, even when you know base rates are more accurate",
      "It only affects amateurs",
      "Awareness eliminates the bias",
    ],
    correctIndex: 1,
    explanation:
      "Kahneman demonstrated this in studies where participants were explicitly told about the planning fallacy, shown base-rate statistics for similar tasks, and then asked to estimate. They still anchored on inside-view estimates and made insufficient adjustments. Knowing about a bias and correcting for it are different cognitive operations.",
  },
  {
    id: "be-m5q3",
    question:
      "A product manager is forecasting a feature release. The best forecast uses:",
    options: [
      "Bottom-up estimation of each subtask",
      "Historical data on similar features from similar teams",
      "Team consensus estimate",
      "External consultant's projection",
    ],
    correctIndex: 1,
    explanation:
      "Bottom-up estimation (the inside view) is the method that produces planning fallacy errors — it looks thorough but systematically misses what isn't planned for. Historical data from similar projects is the outside view: it incorporates all the things that went wrong in reality, not just what was anticipated. The reference class forecast is the methodological fix Kahneman prescribed.",
  },
];
