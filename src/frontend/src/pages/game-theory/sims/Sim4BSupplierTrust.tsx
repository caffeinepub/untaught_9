import { Button } from "@/components/ui/button";
import { useState } from "react";

const TOTAL_ROUNDS = 5;

type BuyerMove = "honor" | "squeeze";
type SupplierMove = "quality" | "cut";
type RoundResult = {
  round: number;
  buyerMove: BuyerMove;
  supplierMove: SupplierMove;
  yourValue: number;
  aiValue: number;
};

function getPayoffs(
  buyer: BuyerMove,
  supplier: SupplierMove,
): [number, number] {
  if (buyer === "honor" && supplier === "quality") return [4, 4];
  if (buyer === "squeeze" && supplier === "quality") return [6, 1];
  if (buyer === "honor" && supplier === "cut") return [1, 6];
  return [2, 2]; // squeeze + cut
}

function getSupplierMove(rounds: RoundResult[]): SupplierMove {
  if (rounds.length === 0) return "quality";
  // Supplier tracks last 2 moves — if squeezed, shifts to cutting corners
  const lastTwo = rounds.slice(-2);
  const squeezed = lastTwo.filter((r) => r.buyerMove === "squeeze").length;
  if (squeezed >= 1) return Math.random() < 0.8 ? "cut" : "quality";
  return "quality";
}

export function Sim4BSupplierTrust() {
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const yourTotal = rounds.reduce((s, r) => s + r.yourValue, 0);
  const aiTotal = rounds.reduce((s, r) => s + r.aiValue, 0);

  function choose(move: BuyerMove) {
    if (gameOver || rounds.length >= TOTAL_ROUNDS) return;
    const supplierMove = getSupplierMove(rounds);
    const [yourValue, aiValue] = getPayoffs(move, supplierMove);
    const result: RoundResult = {
      round: rounds.length + 1,
      buyerMove: move,
      supplierMove,
      yourValue,
      aiValue,
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
        <h2 className="font-semibold text-foreground mb-1">
          Supplier Contract
        </h2>
        <p className="text-sm text-muted-foreground">
          You are a Buyer. Each round, choose to Honor the contract or Squeeze
          for a discount. The supplier remembers — and reacts. Build or destroy
          the relationship over 5 rounds.
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
          <div className="text-xs text-muted-foreground mt-0.5">Your Value</div>
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
            Supplier Value
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
            <strong>Contract Complete.</strong> Your total value:{" "}
            <span style={{ color: "oklch(0.72 0.2 265)" }}>{yourTotal}</span> ·
            Supplier:{" "}
            <span style={{ color: "oklch(0.72 0.12 25)" }}>{aiTotal}</span>.
            Maximum: 20 (all Honor + Quality).
          </div>

          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
              borderLeft: "3px solid oklch(0.72 0.2 265 / 0.4)",
              color: "oklch(0.8 0.01 265)",
            }}
          >
            <strong>Insight:</strong> Long-term supplier relationships succeed
            when both sides resist short-term exploitation. The supplier's
            reaction to being squeezed illustrates how reputation and history
            shape strategy — a key feature of repeated games that disappears in
            one-shot interactions.
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
                    r.buyerMove === "honor" && r.supplierMove === "quality"
                      ? "oklch(0.65 0.18 145 / 0.08)"
                      : r.buyerMove === "squeeze" && r.supplierMove === "cut"
                        ? "oklch(0.62 0.22 25 / 0.08)"
                        : "oklch(0.72 0.2 265 / 0.06)",
                }}
              >
                <span className="text-muted-foreground">Round {r.round}</span>
                <span className="text-foreground">
                  You: {r.buyerMove === "honor" ? "🤝 Honor" : "💼 Squeeze"} ·
                  Supplier:{" "}
                  {r.supplierMove === "quality" ? "✅ Quality" : "✂️ Cut"}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.72 0.2 265)" }}
                >
                  +{r.yourValue}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Round {rounds.length + 1} of {TOTAL_ROUNDS}
            </span>
          </div>

          {lastResult && (
            <div
              className="rounded-lg px-4 py-2 text-sm"
              style={{
                backgroundColor:
                  lastResult.supplierMove === "cut"
                    ? "oklch(0.62 0.22 25 / 0.1)"
                    : "oklch(0.72 0.2 265 / 0.06)",
                color: "oklch(0.8 0.01 265)",
              }}
            >
              Last round: Supplier delivered{" "}
              <strong>
                {lastResult.supplierMove === "quality"
                  ? "full quality ✅"
                  : "cut corners ✂️"}
              </strong>
              . You got <strong>+{lastResult.yourValue}</strong>.
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              data-ocid="gt_sim2.honor_button"
              onClick={() => choose("honor")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">🤝</div>
              <div>Honor</div>
              <div className="text-xs text-muted-foreground mt-1">
                Pay agreed price
              </div>
            </button>
            <button
              type="button"
              data-ocid="gt_sim2.squeeze_button"
              onClick={() => choose("squeeze")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">💼</div>
              <div>Squeeze</div>
              <div className="text-xs text-muted-foreground mt-1">
                Demand discount
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
        <strong>Payoffs:</strong> Honor + Quality → +4/+4 · Squeeze + Quality →
        +6/+1 · Honor + Cut → +1/+6 · Squeeze + Cut → +2/+2
      </div>
    </div>
  );
}
