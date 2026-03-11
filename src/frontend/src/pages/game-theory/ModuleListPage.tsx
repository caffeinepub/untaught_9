import { BackButton } from "@/components/BackButton";
import { Progress } from "@/components/ui/progress";
import { GAME_THEORY_MODULES } from "@/data/game-theory";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useMyProgress } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight } from "lucide-react";

export function ModuleListPage() {
  const { data: progress } = useMyProgress();
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const completedModules = progress?.completedModules ?? [];

  const totalModules = GAME_THEORY_MODULES.length;
  const completedCount = GAME_THEORY_MODULES.filter((m) =>
    completedModules.includes(`game-theory-module-${m.id}`),
  ).length;
  const progressPercent =
    totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 accent-indigo">
      <div className="mb-10">
        <BackButton to="/domain/game-theory" label="Domain intro" />
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-domain-accent">
        Game Theory
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-2">
        Modules
      </h1>
      <p className="text-muted-foreground mb-8">
        Work through each module at your own pace.
      </p>

      {/* Progress summary — only if logged in */}
      {isLoggedIn && (
        <div
          data-ocid="modules.progress.section"
          className="mb-8 rounded-lg border border-border/60 bg-card px-5 py-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {completedCount} of {totalModules} modules complete
            </span>
            {completedCount === totalModules && totalModules > 0 && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "oklch(0.72 0.2 265 / 0.15)",
                  color: "oklch(0.72 0.2 265)",
                }}
              >
                ✓ Domain Complete
              </span>
            )}
          </div>
          <Progress
            value={progressPercent}
            className="h-1.5"
            style={
              {
                "--progress-foreground": "oklch(0.72 0.2 265)",
              } as React.CSSProperties
            }
          />
        </div>
      )}

      <div className="space-y-3">
        {GAME_THEORY_MODULES.map((module, i) => {
          const moduleKey = `game-theory-module-${module.id}`;
          const isCompleted = completedModules.includes(moduleKey);

          return (
            <Link
              key={module.id}
              to="/domain/game-theory/module/$moduleId/lesson"
              params={{ moduleId: String(module.id) }}
              data-ocid={`modules.item.${i + 1}`}
              className="group flex items-center gap-4 rounded-lg border border-border/60 bg-card p-4 sm:p-5 hover:border-opacity-100 transition-all duration-200"
            >
              {/* Module number */}
              <span
                className="font-display text-3xl font-semibold opacity-50 w-8 text-center shrink-0"
                style={{ color: "oklch(0.72 0.2 265)" }}
              >
                {module.id}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground group-hover:text-foreground/90">
                  {module.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Lesson · Simulation · Quiz
                </p>
              </div>

              {/* Status */}
              <div className="shrink-0 flex items-center gap-2">
                {isCompleted ? (
                  <CheckCircle2
                    className="h-5 w-5"
                    style={{ color: "oklch(0.72 0.2 265)" }}
                  />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
