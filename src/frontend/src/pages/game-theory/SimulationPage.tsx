import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { GAME_THEORY_MODULES } from "@/data/game-theory";
import { useMarkSimulationDone } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Loader2 } from "lucide-react";
import { Sim1PenaltyShootout } from "./sims/Sim1PenaltyShootout";
import { Sim2PrisonersDilemma } from "./sims/Sim2PrisonersDilemma";
import { Sim3NashEquilibrium } from "./sims/Sim3NashEquilibrium";
import { Sim4RepeatedGame } from "./sims/Sim4RepeatedGame";

const SIMS = [
  Sim1PenaltyShootout,
  Sim2PrisonersDilemma,
  Sim3NashEquilibrium,
  Sim4RepeatedGame,
];

interface SimulationPageProps {
  moduleId: number;
}

export function SimulationPage({ moduleId }: SimulationPageProps) {
  const navigate = useNavigate();
  const idx = moduleId - 1;
  const module = GAME_THEORY_MODULES[idx];
  const SimComponent = SIMS[idx];
  const { mutate: markDone, isPending } = useMarkSimulationDone();

  const handleComplete = () => {
    markDone(module.simulationId, {
      onSuccess: () => {
        void navigate({
          to: `/domain/game-theory/module/${moduleId}/simulation/2`,
        });
      },
      onError: () => {
        void navigate({
          to: `/domain/game-theory/module/${moduleId}/simulation/2`,
        });
      },
    });
  };

  if (!module || !SimComponent) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 accent-indigo">
      <div className="mb-10">
        <BackButton
          to={`/domain/game-theory/module/${moduleId}/lesson`}
          label="Back to lesson"
        />
      </div>

      {/* Header */}
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-domain-accent">
          Game Theory · Module {moduleId}
        </span>
        <div className="flex items-center gap-2 mb-3 mt-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Simulation 1 of 2
          </p>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {module.title}
        </h1>
      </div>

      {/* Step indicators */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {["Lesson", "Sim 1", "Sim 2", "Quiz"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span
              className="text-xs font-medium px-2 py-1 rounded"
              style={
                i === 1
                  ? {
                      backgroundColor: "oklch(0.72 0.2 265 / 0.15)",
                      color: "oklch(0.72 0.2 265)",
                    }
                  : i === 0
                    ? {
                        backgroundColor: "oklch(0.18 0.008 275)",
                        color: "oklch(0.72 0.01 275)",
                      }
                    : {
                        backgroundColor: "oklch(0.18 0.008 275)",
                        color: "oklch(0.68 0.01 275)",
                      }
              }
            >
              {step}
            </span>
            {i < 3 && (
              <span className="text-muted-foreground text-xs opacity-40">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Notice */}
      <div
        className="mb-6 rounded-lg px-4 py-3 text-sm"
        style={{
          backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
          borderLeft: "3px solid oklch(0.72 0.2 265 / 0.5)",
          color: "oklch(0.8 0.01 265)",
        }}
      >
        There are no right or wrong answers here — explore freely.
      </div>

      {/* Simulation */}
      <div className="mb-10">
        <SimComponent />
      </div>

      {/* Complete button */}
      <Button
        size="lg"
        onClick={handleComplete}
        disabled={isPending}
        data-ocid="simulation.complete.button"
        className="gap-2 w-full sm:w-auto"
        style={{
          backgroundColor: "oklch(0.72 0.2 265)",
          color: "oklch(0.98 0.005 265)",
        }}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        Continue to Simulation 2
      </Button>
    </main>
  );
}
