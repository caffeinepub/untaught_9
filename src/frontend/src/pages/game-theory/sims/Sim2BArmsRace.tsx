import { Button } from "@/components/ui/button";
import { useState } from "react";

const TOTAL_ROUNDS = 5;

type Decision = "development" | "defense";
type RoundResult = {
  round: number;
  yourDecision: Decision;
  aiDecision: Decision;
  yourPoints: number;
  aiPoints: number;
};

function getPayoffs(yours: Decision, theirs: Decision): [number, number] {
  if (yours === "development" && theirs === "development") return [4, 4];
  if (yours === "defense" && theirs === "development") return [6, 1];
  if (yours === "development" && theirs === "defense") return [1, 6];
  return [2, 2]; // both defense
}

function getAIDecision(): Decision {
  return Math.random() < 0.65 ? "defense" : "development";
}

export function Sim2BArmsRace() {
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const yourTotal = rounds.reduce((s, r) => s + r.yourPoints, 0);
  const aiTotal = rounds.reduce((s, r) => s + r.aiPoints, 0);

  function decide(decision: Decision) {
    if (gameOver || rounds.length >= TOTAL_ROUNDS) return;
    const aiDecision = getAIDecision();
    const [yourPoints, aiPoints] = getPayoffs(decision, aiDecision);
    const result: RoundResult = {
      round: rounds.length + 1,
      yourDecision: decision,
      aiDecision,
      yourPoints,
      aiPoints,
    };
    const newRounds = [...rounds, result];
    setLastResult(result);
    setRounds(newRounds);
    if (newRounds.length >= TOTAL_ROUNDS) setGameOver(true);
  }

  function restart() {
    setRounds([]);
    setGameOver(false);
    setLastResult(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-foreground mb-1">Arms Race</h2>
        <p className="text-sm text-muted-foreground">
          You are Nation A. Each year, choose: invest in Defence or Development.
          Your rival tends to favour defence. Maximise your prosperity over 5
          rounds.
        </p>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-lg px-4 py-3 text-center"
          style={{ backgroundColor: "oklch(0.72 0.2 265 / 0.1)" }}
        >
          <div
            className="text-2xl font-bold"
            style={{ color: "oklch(0.72 0.2 265)" }}
          >
            {yourTotal}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Your Prosperity
          </div>
        </div>
        <div
          className="rounded-lg px-4 py-3 text-center"
          style={{ backgroundColor: "oklch(0.62 0.22 25 / 0.08)" }}
        >
          <div
            className="text-2xl font-bold"
            style={{ color: "oklch(0.72 0.12 25)" }}
          >
            {aiTotal}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Rival Prosperity
          </div>
        </div>
      </div>

      {gameOver ? (
        <div className="space-y-4">
          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
              color: "oklch(0.85 0.01 265)",
            }}
          >
            <strong>5 Years Complete.</strong> Your prosperity:{" "}
            <span style={{ color: "oklch(0.72 0.2 265)" }}>{yourTotal}</span> ·
            Rival:{" "}
            <span style={{ color: "oklch(0.72 0.12 25)" }}>{aiTotal}</span>. Max
            possible: 20 (all Development).
          </div>

          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
              borderLeft: "3px solid oklch(0.72 0.2 265 / 0.4)",
              color: "oklch(0.8 0.01 265)",
            }}
          >
            <strong>Insight:</strong> The arms race is the Prisoner's Dilemma at
            a national scale. Both nations would be richer if they both invested
            in development — but neither can risk the other defecting. The fear
            of mutual vulnerability produces mutual poverty.
          </div>

          <Button
            data-ocid="gt_sim2.restart_button"
            onClick={restart}
            className="w-full"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.15)",
              color: "oklch(0.72 0.2 265)",
              border: "1px solid oklch(0.72 0.2 265 / 0.3)",
            }}
            variant="outline"
          >
            Play Again
          </Button>

          <div className="space-y-1">
            {rounds.map((r) => (
              <div
                key={r.round}
                className="flex items-center justify-between text-xs px-3 py-1.5 rounded"
                style={{
                  backgroundColor:
                    r.yourDecision === "development" &&
                    r.aiDecision === "development"
                      ? "oklch(0.65 0.18 145 / 0.08)"
                      : "oklch(0.62 0.22 25 / 0.06)",
                }}
              >
                <span className="text-muted-foreground">Year {r.round}</span>
                <span className="text-foreground">
                  You: {r.yourDecision === "development" ? "🏗 Dev" : "🛡 Def"} ·
                  Rival: {r.aiDecision === "development" ? "🏗 Dev" : "🛡 Def"}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.72 0.2 265)" }}
                >
                  +{r.yourPoints}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Year {rounds.length + 1} of {TOTAL_ROUNDS}
            </span>
          </div>

          {lastResult && (
            <div
              className="rounded-lg px-4 py-2 text-sm"
              style={{
                backgroundColor: "oklch(0.72 0.2 265 / 0.06)",
                color: "oklch(0.8 0.01 265)",
              }}
            >
              Last year: You got <strong>+{lastResult.yourPoints}</strong>,
              rival got <strong>+{lastResult.aiPoints}</strong>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              data-ocid="gt_sim2.defense_button"
              onClick={() => decide("defense")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">🛡</div>
              <div>Defence</div>
              <div className="text-xs text-muted-foreground mt-1">
                Stay safe
              </div>
            </button>
            <button
              type="button"
              data-ocid="gt_sim2.development_button"
              onClick={() => decide("development")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">🏗</div>
              <div>Development</div>
              <div className="text-xs text-muted-foreground mt-1">
                Invest in growth
              </div>
            </button>
          </div>
        </div>
      )}

      <div
        className="rounded-lg px-4 py-3 text-sm"
        style={{
          backgroundColor: "oklch(0.72 0.2 265 / 0.06)",
          borderLeft: "3px solid oklch(0.72 0.2 265 / 0.3)",
          color: "oklch(0.75 0.01 265)",
        }}
      >
        <strong>Payoffs:</strong> Both Dev → +4/+4 · You Def, They Dev → +6/+1 ·
        You Dev, They Def → +1/+6 · Both Def → +2/+2
      </div>
    </div>
  );
}
