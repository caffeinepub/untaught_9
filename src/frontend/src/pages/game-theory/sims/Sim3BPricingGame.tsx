import { Button } from "@/components/ui/button";
import { useState } from "react";

const TOTAL_ROUNDS = 5;

type Price = "high" | "low";
type RoundResult = {
  round: number;
  yourPrice: Price;
  aiPrice: Price;
  yourProfit: number;
  aiProfit: number;
};

function getPayoffs(yours: Price, theirs: Price): [number, number] {
  if (yours === "high" && theirs === "high") return [90, 90];
  if (yours === "low" && theirs === "high") return [80, 40];
  if (yours === "high" && theirs === "low") return [40, 80];
  return [55, 55]; // both low
}

function getAIPrice(rounds: RoundResult[]): Price {
  if (rounds.length === 0) return Math.random() < 0.5 ? "high" : "low";
  // Adaptive: react to player's pattern
  const recentLow = rounds
    .slice(-2)
    .filter((r) => r.yourPrice === "low").length;
  if (recentLow >= 1) return "low"; // match low pricing
  return "high";
}

export function Sim3BPricingGame() {
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const yourTotal = rounds.reduce((s, r) => s + r.yourProfit, 0);
  const aiTotal = rounds.reduce((s, r) => s + r.aiProfit, 0);

  function choosePrice(price: Price) {
    if (gameOver || rounds.length >= TOTAL_ROUNDS) return;
    const aiPrice = getAIPrice(rounds);
    const [yourProfit, aiProfit] = getPayoffs(price, aiPrice);
    const result: RoundResult = {
      round: rounds.length + 1,
      yourPrice: price,
      aiPrice,
      yourProfit,
      aiProfit,
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
        <h2 className="font-semibold text-foreground mb-1">Two Coffee Shops</h2>
        <p className="text-sm text-muted-foreground">
          You and a rival coffee shop set prices each round. High = £4.50, Low =
          £3.00. Your rival adapts to your pricing strategy. Play 5 rounds.
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
            £{yourTotal}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Your Profit
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
            £{aiTotal}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Rival Profit
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
            <strong>5 Weeks Done.</strong> Your profit:{" "}
            <span style={{ color: "oklch(0.72 0.2 265)" }}>£{yourTotal}</span> ·
            Rival:{" "}
            <span style={{ color: "oklch(0.72 0.12 25)" }}>£{aiTotal}</span>.
            Maximum possible: £450 (all High).
          </div>

          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
              borderLeft: "3px solid oklch(0.72 0.2 265 / 0.4)",
              color: "oklch(0.8 0.01 265)",
            }}
          >
            <strong>Insight:</strong> The Nash Equilibrium here is Both Low —
            neither player can gain by changing alone. But notice: Both High
            produces more profit for everyone. Nash Equilibrium and optimal
            outcome are not the same thing.
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
                    r.yourPrice === "high" && r.aiPrice === "high"
                      ? "oklch(0.65 0.18 145 / 0.08)"
                      : r.yourPrice === "low" && r.aiPrice === "low"
                        ? "oklch(0.62 0.22 25 / 0.08)"
                        : "oklch(0.72 0.2 265 / 0.06)",
                }}
              >
                <span className="text-muted-foreground">Round {r.round}</span>
                <span className="text-foreground">
                  You: {r.yourPrice === "high" ? "£4.50" : "£3.00"} · Rival:{" "}
                  {r.aiPrice === "high" ? "£4.50" : "£3.00"}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.72 0.2 265)" }}
                >
                  £{r.yourProfit}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Week {rounds.length + 1} of {TOTAL_ROUNDS}
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
              Last week: You got <strong>£{lastResult.yourProfit}</strong>,
              rival got <strong>£{lastResult.aiProfit}</strong>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              data-ocid="gt_sim2.high_price_button"
              onClick={() => choosePrice("high")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">☕</div>
              <div>£4.50 High</div>
              <div className="text-xs text-muted-foreground mt-1">
                Keep margins up
              </div>
            </button>
            <button
              type="button"
              data-ocid="gt_sim2.low_price_button"
              onClick={() => choosePrice("low")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">💰</div>
              <div>£3.00 Low</div>
              <div className="text-xs text-muted-foreground mt-1">
                Grab market share
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
        <strong>Payoff matrix:</strong> Both High → £90/£90 · You Low, They High
        → £80/£40 · You High, They Low → £40/£80 · Both Low → £55/£55
      </div>
    </div>
  );
}
