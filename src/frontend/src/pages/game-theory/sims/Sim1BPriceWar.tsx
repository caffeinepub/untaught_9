import { Button } from "@/components/ui/button";
import { useState } from "react";

const TOTAL_ROUNDS = 5;

type Price = "high" | "low";
type RoundResult = {
  round: number;
  yourPrice: Price;
  aiPrice: Price;
  yourRevenue: number;
  aiRevenue: number;
};

function getPayoffs(yours: Price, theirs: Price): [number, number] {
  if (yours === "high" && theirs === "high") return [8, 8];
  if (yours === "low" && theirs === "high") return [12, 3];
  if (yours === "high" && theirs === "low") return [3, 12];
  return [5, 5]; // both low
}

function getAIPrice(rounds: RoundResult[]): Price {
  if (rounds.length === 0) return Math.random() < 0.5 ? "high" : "low";
  const lastRound = rounds[rounds.length - 1];
  // AI occasionally matches player's last strategy
  if (Math.random() < 0.6) return lastRound.yourPrice;
  return Math.random() < 0.5 ? "high" : "low";
}

export function Sim1BPriceWar() {
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const currentRound = rounds.length + 1;
  const yourTotal = rounds.reduce((s, r) => s + r.yourRevenue, 0);
  const aiTotal = rounds.reduce((s, r) => s + r.aiRevenue, 0);

  function choosePrice(price: Price) {
    if (gameOver || rounds.length >= TOTAL_ROUNDS) return;
    const aiPrice = getAIPrice(rounds);
    const [yourRevenue, aiRevenue] = getPayoffs(price, aiPrice);
    const result: RoundResult = {
      round: rounds.length + 1,
      yourPrice: price,
      aiPrice,
      yourRevenue,
      aiRevenue,
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
        <h2 className="font-semibold text-foreground mb-1">Price War</h2>
        <p className="text-sm text-muted-foreground">
          You are Company A. Each round, set your price — High or Low. Revenue
          depends on what both companies choose. Play 5 rounds.
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
            Your Revenue
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
            Competitor Revenue
          </div>
        </div>
      </div>

      {gameOver ? (
        <div className="space-y-4">
          {/* Last result feedback */}
          {lastResult && (
            <div
              className="rounded-lg px-4 py-3 text-sm"
              style={{
                backgroundColor:
                  lastResult.yourRevenue > lastResult.aiRevenue
                    ? "oklch(0.65 0.18 145 / 0.1)"
                    : lastResult.yourRevenue < lastResult.aiRevenue
                      ? "oklch(0.62 0.22 25 / 0.1)"
                      : "oklch(0.72 0.2 265 / 0.08)",
                color: "oklch(0.85 0.01 265)",
              }}
            >
              <strong>Game Over!</strong> You earned{" "}
              <span style={{ color: "oklch(0.72 0.2 265)" }}>{yourTotal}</span>{" "}
              vs competitor's{" "}
              <span style={{ color: "oklch(0.72 0.12 25)" }}>{aiTotal}</span>.
            </div>
          )}

          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
              borderLeft: "3px solid oklch(0.72 0.2 265 / 0.4)",
              color: "oklch(0.8 0.01 265)",
            }}
          >
            <strong>Insight:</strong> The price war trap is zero-sum at its
            worst — when both players race to the bottom, the total value in the
            market shrinks. The stable outcome (both staying High) requires
            trust, and trust is fragile.
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
                    r.yourRevenue > r.aiRevenue
                      ? "oklch(0.65 0.18 145 / 0.08)"
                      : r.yourRevenue < r.aiRevenue
                        ? "oklch(0.62 0.22 25 / 0.08)"
                        : "oklch(0.72 0.2 265 / 0.06)",
                }}
              >
                <span className="text-muted-foreground">Round {r.round}</span>
                <span className="text-foreground">
                  You: {r.yourPrice === "high" ? "£High" : "£Low"} · AI:{" "}
                  {r.aiPrice === "high" ? "£High" : "£Low"}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.72 0.2 265)" }}
                >
                  +{r.yourRevenue}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Round {currentRound} of {TOTAL_ROUNDS}
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
              Last round: You got <strong>+{lastResult.yourRevenue}</strong>,
              competitor got <strong>+{lastResult.aiRevenue}</strong>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              data-ocid="gt_sim2.high_button"
              onClick={() => choosePrice("high")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">📈</div>
              <div>High Price</div>
              <div className="text-xs text-muted-foreground mt-1">
                Co-operate
              </div>
            </button>
            <button
              type="button"
              data-ocid="gt_sim2.low_button"
              onClick={() => choosePrice("low")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">📉</div>
              <div>Low Price</div>
              <div className="text-xs text-muted-foreground mt-1">Undercut</div>
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
        <strong>Payoff matrix:</strong> Both High → +8/+8 · You Low, They High →
        +12/+3 · You High, They Low → +3/+12 · Both Low → +5/+5
      </div>
    </div>
  );
}
