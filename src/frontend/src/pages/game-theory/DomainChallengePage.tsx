import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMarkDomainComplete } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Trophy } from "lucide-react";
import { useState } from "react";

export function DomainChallengePage() {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState("");
  const [completed, setCompleted] = useState(false);
  const { mutate: markComplete, isPending } = useMarkDomainComplete();

  const handleComplete = () => {
    markComplete("game-theory", {
      onSuccess: () => {
        setCompleted(true);
        setTimeout(() => {
          void navigate({ to: "/" });
        }, 2000);
      },
      onError: () => {
        setCompleted(true);
        setTimeout(() => {
          void navigate({ to: "/" });
        }, 2000);
      },
    });
  };

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 accent-indigo">
      <div className="mb-10">
        <BackButton to="/domain/game-theory/module/4/wild" label="Back" />
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-domain-accent">
          Game Theory · Domain Challenge
        </span>
        <div className="flex items-center gap-3 mt-3 mb-2">
          <Trophy
            className="h-6 w-6 shrink-0"
            style={{ color: "oklch(0.72 0.2 265)" }}
          />
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Apply it to your life
          </h1>
        </div>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          This is where game theory stops being abstract and becomes useful.
        </p>
      </div>

      {/* Prompt */}
      <div
        className="mb-8 rounded-lg p-5 sm:p-6"
        style={{
          backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
          border: "1px solid oklch(0.72 0.2 265 / 0.2)",
        }}
      >
        <p className="font-display text-lg sm:text-xl text-foreground leading-relaxed">
          Identify a Prisoner's Dilemma in your life right now — a situation
          where you and someone else could both benefit from cooperating, but
          both end up worse off because neither trusts the other enough to go
          first.
        </p>
        <p className="text-muted-foreground mt-3">
          Describe what cooperation would look like. What would you need to
          commit to? What would make it credible?
        </p>
      </div>

      {/* Text area */}
      <div className="mb-8">
        <Textarea
          placeholder="Write your reflection here..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          data-ocid="domain_challenge.textarea"
          rows={8}
          className="bg-card border-border/60 focus-visible:ring-ring/50 resize-none text-foreground placeholder:text-muted-foreground"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Your reflection stays on this device — it's not saved anywhere.
        </p>
      </div>

      {/* Key terms reminder */}
      <div className="mb-8 rounded-lg border border-border/40 bg-card/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Key terms from this domain
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Prisoner's Dilemma",
            "Nash Equilibrium",
            "Defection",
            "Cooperation",
            "Tit-for-Tat",
            "Shadow of the Future",
          ].map((term) => (
            <span
              key={term}
              className="text-xs px-2 py-1 rounded"
              style={{
                backgroundColor: "oklch(0.72 0.2 265 / 0.1)",
                color: "oklch(0.7 0.1 265)",
              }}
            >
              {term}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          All terms are defined in the{" "}
          <a
            href="/glossary"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Glossary
          </a>
          .
        </p>
      </div>

      {/* Success state */}
      {completed && (
        <div
          className="mb-6 rounded-lg p-4"
          data-ocid="domain_challenge.success_state"
          style={{
            backgroundColor: "oklch(0.65 0.18 145 / 0.1)",
            border: "1px solid oklch(0.65 0.18 145 / 0.3)",
            color: "oklch(0.8 0.1 145)",
          }}
        >
          Game Theory complete. Returning home...
        </div>
      )}

      {/* CTA */}
      <Button
        size="lg"
        onClick={handleComplete}
        disabled={isPending || completed}
        data-ocid="domain_challenge.complete.button"
        className="gap-2 w-full sm:w-auto"
        style={{
          backgroundColor: "oklch(0.72 0.2 265)",
          color: "oklch(0.98 0.005 265)",
        }}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trophy className="h-4 w-4" />
        )}
        Complete Domain
      </Button>
    </main>
  );
}
