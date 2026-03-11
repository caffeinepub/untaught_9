import { useState } from "react";

const AMBER = "0.72 0.18 75";

interface Task {
  id: number;
  label: string;
  actualAvg: number; // minutes
  unit: string;
}

const TASKS: Task[] = [
  {
    id: 1,
    label: "Writing a short professional email",
    actualAvg: 18,
    unit: "min",
  },
  { id: 2, label: "Reorganising a single closet", actualAvg: 95, unit: "min" },
  {
    id: 3,
    label: "Cooking a new recipe for the first time",
    actualAvg: 75,
    unit: "min",
  },
  { id: 4, label: "Writing a one-page report", actualAvg: 90, unit: "min" },
  {
    id: 5,
    label: "Completing an online form (tax, insurance, etc.)",
    actualAvg: 40,
    unit: "min",
  },
];

export function Sim5PlanningFallacy() {
  const [estimates, setEstimates] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allEstimated = TASKS.every(
    (t) => estimates[t.id] && Number(estimates[t.id]) > 0,
  );

  const handleSubmit = () => {
    if (!allEstimated) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-foreground leading-relaxed">
        Estimate how long each everyday task takes in minutes. Be honest — go
        with your first instinct.
      </p>

      {/* Task inputs */}
      <div className="space-y-3">
        {TASKS.map((task, i) => {
          const estimate = Number(estimates[task.id] ?? 0);
          const gap = submitted ? task.actualAvg - estimate : 0;
          const gapPercent =
            submitted && estimate > 0
              ? Math.round(((task.actualAvg - estimate) / estimate) * 100)
              : 0;

          return (
            <div
              key={task.id}
              className="rounded-lg border border-border/50 bg-card p-4"
            >
              <div className="flex items-start gap-3 mb-3">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold shrink-0 mt-0.5"
                  style={{
                    backgroundColor: `oklch(${AMBER} / 0.15)`,
                    color: `oklch(${AMBER})`,
                  }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-foreground leading-relaxed">
                  {task.label}
                </p>
              </div>

              {!submitted ? (
                <div className="flex items-center gap-2 pl-8">
                  <input
                    type="number"
                    min={1}
                    max={600}
                    placeholder="Minutes"
                    value={estimates[task.id] ?? ""}
                    onChange={(e) =>
                      setEstimates((prev) => ({
                        ...prev,
                        [task.id]: e.target.value,
                      }))
                    }
                    data-ocid={`be_sim5.task${task.id}.input`}
                    className="w-28 rounded-md border border-border/60 bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1"
                    style={{ WebkitAppearance: "none" } as React.CSSProperties}
                  />
                  <span className="text-sm text-muted-foreground">minutes</span>
                </div>
              ) : (
                <div className="pl-8 space-y-2">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground w-28">
                      Your estimate:
                    </span>
                    <span className="font-medium text-foreground">
                      {estimate} min
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground w-28">
                      Actual average:
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: `oklch(${AMBER})` }}
                    >
                      {task.actualAvg} min
                    </span>
                  </div>

                  {/* Gap bar */}
                  <div className="mt-2">
                    <div className="h-2 rounded-full overflow-hidden bg-border/30">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (estimate / task.actualAvg) * 100)}%`,
                          backgroundColor:
                            gap <= 0
                              ? "oklch(0.65 0.18 145)"
                              : `oklch(${AMBER})`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {gap > 0
                        ? `You underestimated by ${gap} min (${gapPercent > 0 ? "+" : ""}${gapPercent}%)`
                        : gap < 0
                          ? `You overestimated by ${Math.abs(gap)} min`
                          : "Exact estimate"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allEstimated}
          data-ocid="be_sim5.submit.button"
          className="w-full rounded-md px-4 py-2.5 text-sm font-semibold transition-opacity"
          style={{
            backgroundColor: allEstimated
              ? `oklch(${AMBER})`
              : "oklch(0.25 0.01 275)",
            color: allEstimated ? "oklch(0.15 0.02 75)" : "oklch(0.5 0.01 275)",
            cursor: allEstimated ? "pointer" : "not-allowed",
          }}
        >
          {allEstimated
            ? "See actual averages"
            : "Fill in all tasks to continue"}
        </button>
      )}

      {/* Pattern reveal */}
      {submitted && (
        <div
          className="rounded-lg p-4 sm:p-5"
          style={{
            backgroundColor: `oklch(${AMBER} / 0.08)`,
            border: `1px solid oklch(${AMBER} / 0.25)`,
          }}
        >
          <p className="font-semibold text-foreground mb-2">
            Notice the pattern across all five tasks.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Most people underestimate most tasks — not by random amounts, but
            systematically. This isn't carelessness. It's because the inside
            view (imagining yourself doing the task smoothly) doesn't account
            for interruptions, mistakes, or the gap between "starting" and
            "done." The actual averages come from how long these tasks really
            take when everything is included.
          </p>
          <div
            className="rounded-md px-3 py-2 text-sm font-medium"
            style={{
              backgroundColor: `oklch(${AMBER} / 0.12)`,
              color: `oklch(${AMBER})`,
            }}
          >
            Key pattern: The gap between planned and actual is consistent — not
            a one-off.
          </div>
        </div>
      )}
    </div>
  );
}
