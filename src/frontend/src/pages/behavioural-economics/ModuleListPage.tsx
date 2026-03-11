import { BackButton } from "@/components/BackButton";
import { BE_MODULES } from "@/data/behavioural-economics";
import { useMyProgress } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight } from "lucide-react";

const AMBER = "0.72 0.18 75";

export function ModuleListPage() {
  const { data: progress } = useMyProgress();
  const completedModules = progress?.completedModules ?? [];

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 accent-amber">
      <div className="mb-10">
        <BackButton to="/domain/behavioural-economics" label="Domain intro" />
      </div>

      <p
        className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: `oklch(${AMBER})` }}
      >
        Behavioural Economics
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-2">
        Modules
      </h1>
      <p className="text-muted-foreground mb-10">
        Work through each module at your own pace.
      </p>

      <div className="space-y-3">
        {BE_MODULES.map((module, i) => {
          const moduleKey = `behavioural-economics-module-${module.id}`;
          const isCompleted = completedModules.includes(moduleKey);

          return (
            <Link
              key={module.id}
              to="/domain/behavioural-economics/module/$moduleId/lesson"
              params={{ moduleId: String(module.id) }}
              data-ocid={`be_modules.item.${i + 1}`}
              className="group flex items-center gap-4 rounded-lg border border-border/60 bg-card p-4 sm:p-5 hover:border-opacity-100 transition-all duration-200"
            >
              {/* Module number */}
              <span
                className="font-display text-3xl font-semibold opacity-50 w-8 text-center shrink-0"
                style={{ color: `oklch(${AMBER})` }}
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
                    style={{ color: `oklch(${AMBER})` }}
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
