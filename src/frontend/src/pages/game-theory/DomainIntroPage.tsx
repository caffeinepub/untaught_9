import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

const REAL_WORLD_EXAMPLES = [
  {
    title: "Nuclear arms race",
    description:
      "Each nation builds more weapons not because it wants war, but because it fears what happens if the other side arms and it doesn't. The game drives both toward massive arsenals neither wants.",
  },
  {
    title: "Auction bidding",
    description:
      "Your bid isn't just about what the item is worth to you — it's about predicting what others will bid. Bid too low and lose. Bid too high and win at a price nobody else would pay.",
  },
  {
    title: "Salary negotiation",
    description:
      "Both employer and candidate are trying to infer the other's reservation price. The information gap and each party's strategy directly determine the outcome — not just the 'fair' wage.",
  },
];

export function DomainIntroPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 accent-indigo">
      <div className="mb-10">
        <BackButton to="/" label="All domains" />
      </div>

      {/* Domain label */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-domain-accent">
        Game Theory
      </p>

      {/* Hook */}
      <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight mb-6">
        Every decision you've ever made involving another person was a game.
        <span className="text-muted-foreground font-normal">
          {" "}
          You've been playing without knowing the rules.
        </span>
      </h1>

      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        Game theory is the study of strategic interaction — situations where
        your outcome depends not just on your choices but on the choices of
        others. Unlike ordinary decision-making, which asks "what's best for
        me?", game theory asks "what's best for me, given what I expect you to
        do, given what you expect me to do?"
      </p>

      {/* Separator */}
      <div className="h-px bg-border/60 mb-10" />

      {/* Why it's different */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">
          Why it differs from ordinary decision-making
        </h2>
        <div className="space-y-4">
          {[
            {
              n: 1,
              text: "In everyday decisions, you optimise for your own preferences. In strategic situations, the best choice depends on what others do.",
            },
            {
              n: 2,
              text: "This creates loops: I'll do X if you do Y, but you'll do Y only if I do X. Game theory gives us tools to reason through these circular dependencies.",
            },
            {
              n: 3,
              text: "The key insight is that rational people can produce collectively irrational outcomes — and understanding why is the first step to changing it.",
            },
          ].map(({ n, text }) => (
            <div key={n} className="flex gap-4">
              <span
                className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "oklch(0.72 0.2 265 / 0.15)",
                  color: "oklch(0.72 0.2 265)",
                }}
              >
                {n}
              </span>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Real world examples */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">
          Game theory in the real world
        </h2>
        <div className="space-y-3">
          {REAL_WORLD_EXAMPLES.map((example) => (
            <div
              key={example.title}
              className="rounded-lg border border-border/50 bg-card p-4 sm:p-5"
            >
              <h3 className="font-semibold text-foreground mb-1">
                {example.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {example.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Module preview */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">
          What you'll learn
        </h2>
        <div className="space-y-2">
          {[
            {
              n: 1,
              title: "Zero-Sum Games",
              desc: "When one player's gain is another's loss",
            },
            {
              n: 2,
              title: "The Prisoner's Dilemma",
              desc: "Why rational players trap themselves in bad outcomes",
            },
            {
              n: 3,
              title: "Nash Equilibrium",
              desc: "How games settle into stable states",
            },
            {
              n: 4,
              title: "Repeated Games",
              desc: "How reputation and the future change everything",
            },
          ].map((module) => (
            <div
              key={module.n}
              className="flex items-center gap-4 rounded-md border border-border/40 bg-card/50 px-4 py-3"
            >
              <span
                className="font-display text-2xl font-semibold opacity-60 w-6 text-center shrink-0"
                style={{ color: "oklch(0.72 0.2 265)" }}
              >
                {module.n}
              </span>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {module.title}
                </p>
                <p className="text-xs text-muted-foreground">{module.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Link
        to="/domain/game-theory/module/$moduleId/lesson"
        params={{ moduleId: "1" }}
      >
        <Button
          size="lg"
          className="gap-2 w-full sm:w-auto"
          style={{
            backgroundColor: "oklch(0.72 0.2 265)",
            color: "oklch(0.98 0.005 265)",
          }}
        >
          Start Module 1
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </main>
  );
}
