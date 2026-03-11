import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  GAME_THEORY_MODULES,
  M1_WILD,
  M2_WILD,
  M3_WILD,
  M4_WILD,
} from "@/data/game-theory";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Eye } from "lucide-react";

const WILDS = [M1_WILD, M2_WILD, M3_WILD, M4_WILD];

interface WildPageProps {
  moduleId: number;
}

export function WildPage({ moduleId }: WildPageProps) {
  const navigate = useNavigate();
  const idx = moduleId - 1;
  const module = GAME_THEORY_MODULES[idx];
  const wild = WILDS[idx];

  const isLastModule = moduleId === 4;

  const handleContinue = () => {
    if (isLastModule) {
      void navigate({ to: "/domain/game-theory/challenge" });
    } else {
      void navigate({
        to: `/domain/game-theory/module/${moduleId + 1}/lesson`,
      });
    }
  };

  if (!module || !wild) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 accent-indigo">
      <div className="mb-10">
        <BackButton
          to={`/domain/game-theory/module/${moduleId}/quiz`}
          label="Back to quiz"
        />
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-domain-accent">
          Game Theory · Module {moduleId}
        </span>
        <div className="flex items-center gap-2 mt-2 mb-3">
          <Eye
            className="h-5 w-5 shrink-0"
            style={{ color: "oklch(0.72 0.2 265)" }}
          />
          <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            {wild.title}
          </h1>
        </div>
        <p className="text-muted-foreground">
          {module.title} — now that you know it, you'll see it everywhere.
        </p>
      </div>

      {/* Examples */}
      <div className="space-y-4 mb-10">
        {wild.examples.map((example, i) => (
          <div
            key={example.title}
            className="rounded-lg border border-border/50 bg-card p-4 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "oklch(0.72 0.2 265 / 0.12)",
                  color: "oklch(0.72 0.2 265)",
                }}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {example.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {example.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Module nav hint */}
      {!isLastModule && (
        <div className="mb-8 rounded-lg border border-border/40 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Up next: </strong>
            Module {moduleId + 1} — {GAME_THEORY_MODULES[moduleId]?.title}
          </p>
        </div>
      )}

      {isLastModule && (
        <div className="mb-8 rounded-lg border border-border/40 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Final step: </strong>
            The Domain Challenge — apply what you've learned to your own life.
          </p>
        </div>
      )}

      {/* CTA */}
      <Button
        size="lg"
        onClick={handleContinue}
        className="gap-2 w-full sm:w-auto"
        style={{
          backgroundColor: "oklch(0.72 0.2 265)",
          color: "oklch(0.98 0.005 265)",
        }}
      >
        <ChevronRight className="h-4 w-4" />
        {isLastModule ? "Domain Challenge" : `Start Module ${moduleId + 1}`}
      </Button>
    </main>
  );
}
