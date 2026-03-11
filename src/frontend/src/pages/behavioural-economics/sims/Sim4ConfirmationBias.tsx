import { useState } from "react";

const AMBER = "0.72 0.18 75";

interface EvidenceItem {
  id: number;
  text: string;
  type: "confirming" | "disconfirming";
}

const EVIDENCE: EvidenceItem[] = [
  {
    id: 1,
    text: "Marcus was seen near the warehouse at 10pm — the time of the incident.",
    type: "confirming",
  },
  {
    id: 2,
    text: "CCTV shows a different person entering the warehouse at the same time.",
    type: "disconfirming",
  },
  {
    id: 3,
    text: "Marcus's fingerprints were found on the storage room door handle.",
    type: "confirming",
  },
  {
    id: 4,
    text: "Three colleagues confirm Marcus was at a work dinner until 11pm.",
    type: "disconfirming",
  },
  {
    id: 5,
    text: "A witness says they saw someone matching Marcus's description running from the building.",
    type: "confirming",
  },
  {
    id: 6,
    text: "Phone records show Marcus made three calls between 9:45pm and 10:30pm — from a location 5 miles away.",
    type: "disconfirming",
  },
];

export function Sim4ConfirmationBias() {
  const [revealed, setRevealed] = useState(0);
  const [confidences, setConfidences] = useState<number[]>([]);
  const [currentSlider, setCurrentSlider] = useState(50);
  const isComplete = revealed === EVIDENCE.length;

  const handleReveal = () => {
    if (revealed >= EVIDENCE.length) return;
    setConfidences((prev) => [...prev, currentSlider]);
    setRevealed((r) => r + 1);
    // Reset slider to midpoint for next piece
    setCurrentSlider(50);
  };

  const currentEvidence =
    revealed < EVIDENCE.length ? EVIDENCE[revealed] : null;

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-border/50 bg-card p-4">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: `oklch(${AMBER})` }}
        >
          The Scenario
        </p>
        <p className="text-sm text-foreground leading-relaxed">
          <strong>Marcus Chen</strong> is a suspect in a warehouse incident.
          Initial intelligence suggests he is the most likely culprit. You'll
          see 6 pieces of evidence one at a time. After each one, rate your
          confidence in Marcus's guilt.
        </p>
      </div>

      {/* Evidence revealed so far */}
      {revealed > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Evidence seen
          </p>
          {EVIDENCE.slice(0, revealed).map((item, i) => (
            <div
              key={item.id}
              className="flex gap-3 items-start rounded-md border px-3 py-2.5 text-sm"
              style={{
                borderColor:
                  item.type === "confirming"
                    ? `oklch(${AMBER} / 0.35)`
                    : "oklch(0.62 0.16 240 / 0.35)",
                backgroundColor:
                  item.type === "confirming"
                    ? `oklch(${AMBER} / 0.05)`
                    : "oklch(0.62 0.16 240 / 0.05)",
              }}
            >
              <span
                className="shrink-0 text-xs font-bold mt-0.5"
                style={{
                  color:
                    item.type === "confirming"
                      ? `oklch(${AMBER})`
                      : "oklch(0.72 0.18 245)",
                }}
              >
                {i + 1}
              </span>
              <p className="text-foreground leading-relaxed">{item.text}</p>
              <span
                className="shrink-0 text-xs font-medium ml-auto pl-2 whitespace-nowrap"
                style={{ color: "oklch(0.6 0.01 275)" }}
              >
                {confidences[i]}%
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Current evidence + slider */}
      {currentEvidence && (
        <div
          className="rounded-lg p-4 sm:p-5"
          style={{
            backgroundColor: "oklch(0.14 0.005 275)",
            border: "1px solid oklch(0.25 0.01 275 / 0.6)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: `oklch(${AMBER})` }}
          >
            Evidence {revealed + 1} of {EVIDENCE.length}
          </p>
          <p className="text-foreground text-sm leading-relaxed mb-5">
            {currentEvidence.text}
          </p>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Not guilty (0%)</span>
              <span
                className="font-medium"
                style={{ color: `oklch(${AMBER})` }}
              >
                Confidence: {currentSlider}%
              </span>
              <span>Definitely guilty (100%)</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={currentSlider}
              onChange={(e) => setCurrentSlider(Number(e.target.value))}
              data-ocid="be_sim4.confidence.input"
              className="w-full accent-amber h-2 cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={handleReveal}
            data-ocid="be_sim4.next.button"
            className="w-full rounded-md px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: `oklch(${AMBER})`,
              color: "oklch(0.15 0.02 75)",
            }}
          >
            {revealed < EVIDENCE.length - 1
              ? "Record & see next"
              : "Record final judgment"}
          </button>
        </div>
      )}

      {/* Chart */}
      {confidences.length > 0 && (
        <div className="rounded-lg border border-border/50 bg-card p-4">
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: `oklch(${AMBER})` }}
          >
            Your confidence over time
          </p>
          <div className="flex items-end gap-2 h-24">
            {confidences.map((c, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static ordered chart
                key={i}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span className="text-xs text-muted-foreground">{c}%</span>
                <div
                  className="w-full rounded-t-sm transition-all"
                  style={{
                    height: `${(c / 100) * 64}px`,
                    backgroundColor:
                      EVIDENCE[i].type === "confirming"
                        ? `oklch(${AMBER})`
                        : "oklch(0.72 0.18 245)",
                    minHeight: "4px",
                  }}
                />
                <span className="text-xs text-muted-foreground">{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-3">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: `oklch(${AMBER})` }}
              />
              Confirming evidence
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: "oklch(0.72 0.18 245)" }}
              />
              Disconfirming evidence
            </span>
          </div>
        </div>
      )}

      {/* Pattern reveal */}
      {isComplete && (
        <div
          className="rounded-lg p-4 sm:p-5"
          style={{
            backgroundColor: `oklch(${AMBER} / 0.08)`,
            border: `1px solid oklch(${AMBER} / 0.25)`,
          }}
        >
          <p className="font-semibold text-foreground mb-2">
            Look at how your confidence moved.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            The initial framing ("most likely culprit") set the starting point.
            Most people find that confirming evidence pushes their confidence up
            more than disconfirming evidence pulls it down — each negative piece
            gets scrutinised, while each positive one gets accepted. Both should
            receive equal weight.
          </p>
          <div
            className="rounded-md px-3 py-2 text-sm font-medium"
            style={{
              backgroundColor: `oklch(${AMBER} / 0.12)`,
              color: `oklch(${AMBER})`,
            }}
          >
            Key pattern: Early hypotheses shape which evidence feels important.
          </div>
        </div>
      )}
    </div>
  );
}
