import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { BE_MODULES } from "@/data/behavioural-economics";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

const AMBER = "0.72 0.18 75";

const REAL_WORLD_EXAMPLES = [
  {
    title: "Choice architecture in cafeterias",
    description:
      "Healthy food placed at eye level gets chosen more often — not because people are making better decisions, but because the default position exploits the status quo bias. The architecture of choice changes behaviour without changing preferences.",
  },
  {
    title: "Car dealer's extended warranty",
    description:
      "Extended warranties are framed as protecting against loss — 'what if something goes wrong?' — not as a gain. Loss aversion makes the prospect of a repair bill feel far worse than the warranty costs, even when the maths clearly doesn't work in the buyer's favour.",
  },
  {
    title: "'9 out of 10 dentists' statistics",
    description:
      "The first statistic you encounter about a product anchors your perception of its effectiveness. Even an arbitrary-sounding number shifts the reference point against which you evaluate every subsequent claim.",
  },
];

export function DomainIntroPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 accent-amber">
      <div className="mb-10">
        <BackButton to="/" label="All domains" />
      </div>

      {/* Domain label */}
      <p
        className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: `oklch(${AMBER})` }}
      >
        Behavioural Economics
      </p>

      {/* Hook */}
      <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight mb-6">
        You think you make rational decisions. You don't.
        <span className="text-muted-foreground font-normal">
          {" "}
          Neither does anyone else. The interesting part is that the ways we're
          irrational are completely predictable.
        </span>
      </h1>

      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        Behavioural economics studies the gap between how people are supposed to
        make decisions (rationally, in their self-interest) and how they
        actually do. The gap is enormous, systematic, and exploitable — by
        others and by yourself.
      </p>

      {/* Separator */}
      <div className="h-px bg-border/60 mb-10" />

      {/* Why it matters */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">
          Why predictable irrationality matters
        </h2>
        <div className="space-y-4">
          {[
            {
              n: 1,
              text: "Standard economics assumes people maximise their utility rationally. Behavioural economics documents how and why they don't — and the patterns are consistent across cultures and contexts.",
            },
            {
              n: 2,
              text: "The same choice, framed differently, produces different decisions. This means the way a question is asked matters as much as the answer — a fact that advertisers, policymakers, and negotiators use constantly.",
            },
            {
              n: 3,
              text: "Once you know the patterns, you can audit your own decisions — and understand why otherwise smart people systematically make poor ones.",
            },
          ].map(({ n, text }) => (
            <div key={n} className="flex gap-4">
              <span
                className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: `oklch(${AMBER} / 0.15)`,
                  color: `oklch(${AMBER})`,
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
          Behavioural economics in the real world
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
          {BE_MODULES.map((module) => (
            <div
              key={module.id}
              className="flex items-center gap-4 rounded-md border border-border/40 bg-card/50 px-4 py-3"
            >
              <span
                className="font-display text-2xl font-semibold opacity-60 w-6 text-center shrink-0"
                style={{ color: `oklch(${AMBER})` }}
              >
                {module.id}
              </span>
              <p className="font-medium text-foreground text-sm">
                {module.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Link
        to="/domain/behavioural-economics/module/$moduleId/lesson"
        params={{ moduleId: "1" }}
      >
        <Button
          size="lg"
          data-ocid="be_intro.start.button"
          className="gap-2 w-full sm:w-auto"
          style={{
            backgroundColor: `oklch(${AMBER})`,
            color: "oklch(0.15 0.02 75)",
          }}
        >
          Start Module 1
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </main>
  );
}
