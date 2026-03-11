import { useState } from "react";

const AMBER = "0.72 0.18 75";

interface Scenario {
  id: number;
  title: string;
  context: string;
  sunkCost: string;
  optionA: string;
  optionB: string;
  rationalChoice: "A" | "B";
  pull: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "The film",
    context:
      "You're 90 minutes into a film you paid £12 to see at the cinema. It's deeply boring and you're not enjoying it at all.",
    sunkCost: "£12 ticket + 90 minutes of your evening",
    optionA: "Stay and finish the film",
    optionB: "Leave and do something you'd actually enjoy",
    rationalChoice: "B",
    pull: "The £12 is gone whether you stay or leave. The only question is whether the next 60 minutes of your evening are pleasant or unpleasant.",
  },
  {
    id: 2,
    title: "The failing venture",
    context:
      "You've invested £40,000 and 18 months into a business that has no path to profit. Every month costs more money with no sign of turning around.",
    sunkCost: "£40,000 and 18 months",
    optionA: "Keep going — you've invested too much to stop",
    optionB: "Shut it down and cut losses now",
    rationalChoice: "B",
    pull: "The £40,000 and 18 months are gone regardless. The relevant question is: will future investment produce positive returns? If not, every month you continue makes the loss larger, not smaller.",
  },
  {
    id: 3,
    title: "The dinner",
    context:
      "You've spent 3 hours cooking a dinner that isn't working out. Guests arrive in 30 minutes. The food isn't good and pushing through won't fix it.",
    sunkCost: "3 hours of cooking",
    optionA:
      "Push through — the effort already invested must count for something",
    optionB: "Order takeaway and serve something guests will actually enjoy",
    rationalChoice: "B",
    pull: "The 3 hours are gone. The question is whether your guests eat a bad meal or a good one. The 3 hours already spent don't change that calculation.",
  },
];

export function Sim3SunkCost() {
  const [answers, setAnswers] = useState<Record<number, "A" | "B">>({});
  const allAnswered = Object.keys(answers).length === SCENARIOS.length;

  const handleAnswer = (scenarioId: number, choice: "A" | "B") => {
    if (answers[scenarioId]) return;
    setAnswers((prev) => ({ ...prev, [scenarioId]: choice }));
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Three situations. In each, notice what pulls you toward one choice.
      </p>

      {SCENARIOS.map((scenario) => {
        const answer = answers[scenario.id];
        const isAnswered = !!answer;

        return (
          <div
            key={scenario.id}
            className="rounded-lg border border-border/50 bg-card p-4 sm:p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold shrink-0"
                style={{
                  backgroundColor: `oklch(${AMBER} / 0.15)`,
                  color: `oklch(${AMBER})`,
                }}
              >
                {scenario.id}
              </span>
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: `oklch(${AMBER})` }}
              >
                {scenario.title}
              </p>
            </div>

            <p className="text-foreground text-sm leading-relaxed mb-3">
              {scenario.context}
            </p>

            <p className="text-xs text-muted-foreground mb-3">
              <span className="font-medium text-foreground/70">
                Already spent:{" "}
              </span>
              {scenario.sunkCost}
            </p>

            {/* Choices */}
            <div className="space-y-2">
              {(["A", "B"] as const).map((choice) => {
                const label =
                  choice === "A" ? scenario.optionA : scenario.optionB;
                const isSelected = answer === choice;
                const isRational = choice === scenario.rationalChoice;
                const showResult = isAnswered;

                return (
                  <button
                    key={choice}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleAnswer(scenario.id, choice)}
                    data-ocid={`be_sim3.scenario${scenario.id}.${choice === "A" ? "primary_button" : "secondary_button"}`}
                    className="w-full text-left px-3 py-2.5 rounded-md border text-sm transition-all duration-150"
                    style={{
                      borderColor: showResult
                        ? isRational
                          ? "oklch(0.65 0.18 145 / 0.5)"
                          : isSelected && !isRational
                            ? "oklch(0.62 0.22 25 / 0.4)"
                            : "oklch(0.28 0.01 275 / 0.3)"
                        : isSelected
                          ? `oklch(${AMBER} / 0.5)`
                          : "oklch(0.28 0.01 275 / 0.5)",
                      backgroundColor: showResult
                        ? isRational
                          ? "oklch(0.65 0.18 145 / 0.08)"
                          : isSelected && !isRational
                            ? "oklch(0.62 0.22 25 / 0.08)"
                            : "transparent"
                        : isSelected
                          ? `oklch(${AMBER} / 0.08)`
                          : "transparent",
                      color: showResult
                        ? isRational
                          ? "oklch(0.82 0.1 145)"
                          : isSelected && !isRational
                            ? "oklch(0.82 0.1 25)"
                            : "oklch(0.7 0.01 275)"
                        : "oklch(0.88 0.01 80)",
                      cursor: isAnswered ? "default" : "pointer",
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="shrink-0 w-5 text-center text-xs font-mono opacity-60">
                        {choice}
                      </span>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Rational explanation */}
            {isAnswered && (
              <div
                className="mt-3 rounded-md px-3 py-2.5 text-sm"
                style={{
                  backgroundColor: "oklch(0.65 0.18 145 / 0.06)",
                  borderLeft: "3px solid oklch(0.65 0.18 145 / 0.4)",
                  color: "oklch(0.82 0.01 80)",
                }}
              >
                {scenario.pull}
              </div>
            )}
          </div>
        );
      })}

      {/* Pattern reveal */}
      {allAnswered && (
        <div
          className="rounded-lg p-4 sm:p-5"
          style={{
            backgroundColor: `oklch(${AMBER} / 0.08)`,
            border: `1px solid oklch(${AMBER} / 0.25)`,
          }}
        >
          <p className="font-semibold text-foreground mb-2">
            Notice what pulled you toward continuing.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            In each scenario, the sunk cost creates a feeling of obligation —
            that walking away means the past investment was "wasted." But the
            past investment is already gone. It's gone whether you continue or
            stop. The only real question in each case is: what produces the best
            outcome from this moment forward?
          </p>
          <div
            className="rounded-md px-3 py-2 text-sm font-medium"
            style={{
              backgroundColor: `oklch(${AMBER} / 0.12)`,
              color: `oklch(${AMBER})`,
            }}
          >
            Key pattern: Sunk costs feel like obligations. They aren't.
          </div>
        </div>
      )}
    </div>
  );
}
