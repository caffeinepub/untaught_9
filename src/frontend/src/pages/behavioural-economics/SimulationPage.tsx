import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { BE_MODULES } from "@/data/behavioural-economics";
import { useMarkSimulationDone } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Loader2 } from "lucide-react";
import { Sim1LossAversion } from "./sims/Sim1LossAversion";
import { Sim2Anchoring } from "./sims/Sim2Anchoring";
import { Sim3SunkCost } from "./sims/Sim3SunkCost";
import { Sim4ConfirmationBias } from "./sims/Sim4ConfirmationBias";
import { Sim5PlanningFallacy } from "./sims/Sim5PlanningFallacy";

const AMBER = "0.72 0.18 75";

const SIMS = [
  Sim1LossAversion,
  Sim2Anchoring,
  Sim3SunkCost,
  Sim4ConfirmationBias,
  Sim5PlanningFallacy,
];

interface SimulationPageProps {
  moduleId: number;
}

export function SimulationPage({ moduleId }: SimulationPageProps) {
  const navigate = useNavigate();
  const idx = moduleId - 1;
  const module = BE_MODULES[idx];
  const SimComponent = SIMS[idx];
  const { mutate: markDone, isPending } = useMarkSimulationDone();

  const handleComplete = () => {
    markDone(module.simulationId, {
      onSuccess: () => {
        void navigate({
          to: `/domain/behavioural-economics/module/${moduleId}/quiz`,
        });
      },
      onError: () => {
        void navigate({
          to: `/domain/behavioural-economics/module/${moduleId}/quiz`,
        });
      },
    });
  };

  if (!module || !SimComponent) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 accent-amber">
      <div className="mb-10">
        <BackButton
          to={`/domain/behavioural-economics/module/${moduleId}/lesson`}
          label="Back to lesson"
        />
      </div>

      {/* Header */}
      <div className="mb-6">
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: `oklch(${AMBER})` }}
        >
          Behavioural Economics · Module {moduleId}
        </span>
        <div className="flex items-center gap-2 mb-3 mt-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Simulation
          </p>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {module.title}
        </h1>
      </div>

      {/* Step indicators */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {["Lesson", "Simulation", "Quiz"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span
              className="text-xs font-medium px-2 py-1 rounded"
              style={
                i === 1
                  ? {
                      backgroundColor: `oklch(${AMBER} / 0.15)`,
                      color: `oklch(${AMBER})`,
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
            {i < 2 && (
              <span className="text-muted-foreground text-xs opacity-40">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      {/* No right or wrong notice */}
      <div
        className="mb-6 rounded-lg px-4 py-3 text-sm"
        style={{
          backgroundColor: `oklch(${AMBER} / 0.08)`,
          borderLeft: `3px solid oklch(${AMBER} / 0.5)`,
          color: "oklch(0.8 0.01 80)",
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
          backgroundColor: `oklch(${AMBER})`,
          color: "oklch(0.15 0.02 75)",
        }}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        Complete Simulation
      </Button>
    </main>
  );
}
