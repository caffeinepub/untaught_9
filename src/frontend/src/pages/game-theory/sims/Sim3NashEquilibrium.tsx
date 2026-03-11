import { Button } from "@/components/ui/button";
import { useState } from "react";

const TOTAL_ROUNDS = 5;

type Side = "left" | "right";
type RoundResult = {
  round: number;
  playerChoice: Side;
  driver2Choice: Side;
  isSafe: boolean;
};

export function Sim3NashEquilibrium() {
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const safePasses = rounds.filter((r) => r.isSafe).length;
  const crashes = rounds.filter((r) => !r.isSafe).length;
  const currentRound = rounds.length + 1;

  function getDriver2Choice(prevRounds: RoundResult[]): Side {
    if (prevRounds.length === 0) {
      // First round: random
      return Math.random() < 0.5 ? "left" : "right";
    }
    const lastRound = prevRounds[prevRounds.length - 1];
    if (!lastRound.isSafe) {
      // After a crash: 80% chance to match player's previous choice
      return Math.random() < 0.8
        ? lastRound.playerChoice
        : lastRound.playerChoice === "left"
          ? "right"
          : "left";
    }
    // After safe: 70% chance to repeat what worked
    return Math.random() < 0.7
      ? lastRound.driver2Choice
      : lastRound.driver2Choice === "left"
        ? "right"
        : "left";
  }

  function drive(choice: Side) {
    if (gameOver || rounds.length >= TOTAL_ROUNDS) return;
    const driver2Choice = getDriver2Choice(rounds);
    const isSafe = choice === driver2Choice;
    const result: RoundResult = {
      round: rounds.length + 1,
      playerChoice: choice,
      driver2Choice,
      isSafe,
    };
    const newRounds = [...rounds, result];
    setLastResult(result);
    setRounds(newRounds);
    if (newRounds.length >= TOTAL_ROUNDS) {
      setGameOver(true);
    }
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
          Two Drivers, No Traffic Laws
        </h2>
        <p className="text-sm text-muted-foreground">
          You are Driver 1. Pick a side each round — you're safe if both drivers
          match. Driver 2 learns from crashes over time.
        </p>
      </div>

      {/* Scoreboard */}
      <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-5 py-4">
        <div className="text-center">
          <p
            className="text-2xl font-bold"
            style={{ color: "oklch(0.65 0.18 145)" }}
          >
            {safePasses}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
            Safe
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "oklch(0.72 0.18 55)" }}
          >
            Round {Math.min(currentRound, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-2xl font-bold"
            style={{ color: "oklch(0.62 0.22 25)" }}
          >
            {crashes}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
            Crashes
          </p>
        </div>
      </div>

      {/* Round result */}
      {lastResult && !gameOver && (
        <div
          className="rounded-lg border px-5 py-4 text-center"
          style={{
            borderColor: lastResult.isSafe
              ? "oklch(0.65 0.18 145 / 0.5)"
              : "oklch(0.62 0.22 25 / 0.5)",
            backgroundColor: lastResult.isSafe
              ? "oklch(0.65 0.18 145 / 0.08)"
              : "oklch(0.62 0.22 25 / 0.08)",
          }}
        >
          <p
            className="text-3xl font-bold mb-1"
            style={{
              color: lastResult.isSafe
                ? "oklch(0.65 0.18 145)"
                : "oklch(0.62 0.22 25)",
            }}
          >
            {lastResult.isSafe ? "SAFE" : "CRASH!"}
          </p>
          <p className="text-sm text-muted-foreground">
            You drove{" "}
            <strong className="text-foreground">
              {lastResult.playerChoice}
            </strong>{" "}
            — Driver 2 drove{" "}
            <strong className="text-foreground">
              {lastResult.driver2Choice}
            </strong>
            .{lastResult.isSafe ? " Both matched!" : " Mismatched — collision!"}
          </p>
        </div>
      )}

      {/* Game over */}
      {gameOver ? (
        <div className="rounded-lg border border-border/60 bg-card p-5 space-y-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground mb-1">
              Journey Complete
            </p>
            <div className="flex justify-center gap-8 mt-2">
              <div>
                <p
                  className="text-4xl font-bold"
                  style={{ color: "oklch(0.65 0.18 145)" }}
                >
                  {safePasses}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Safe passes
                </p>
              </div>
              <div>
                <p
                  className="text-4xl font-bold"
                  style={{ color: "oklch(0.62 0.22 25)" }}
                >
                  {crashes}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Crashes</p>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.18 55 / 0.08)",
              borderLeft: "3px solid oklch(0.72 0.18 55 / 0.4)",
              color: "oklch(0.85 0.01 55)",
            }}
          >
            <strong>Insight:</strong> Notice how, after a few rounds, Driver 2
            started matching you? That's how equilibria emerge — not by design,
            but by repeated interaction. No one decided to drive on the right;
            it just became what everyone expects.
          </div>

          <Button
            data-ocid="gt_sim.restart_button"
            onClick={restart}
            className="w-full"
            variant="outline"
            style={{
              backgroundColor: "oklch(0.72 0.18 55 / 0.1)",
              color: "oklch(0.72 0.18 55)",
              border: "1px solid oklch(0.72 0.18 55 / 0.3)",
            }}
          >
            Drive Again
          </Button>

          <div className="space-y-1">
            {rounds.map((r) => (
              <div
                key={r.round}
                className="flex items-center justify-between text-xs px-3 py-1.5 rounded"
                style={{
                  backgroundColor: r.isSafe
                    ? "oklch(0.65 0.18 145 / 0.08)"
                    : "oklch(0.62 0.22 25 / 0.08)",
                }}
              >
                <span className="text-muted-foreground">Round {r.round}</span>
                <span className="text-foreground">
                  You {r.playerChoice} · Driver 2 {r.driver2Choice}
                </span>
                <span
                  className="font-semibold"
                  style={{
                    color: r.isSafe
                      ? "oklch(0.65 0.18 145)"
                      : "oklch(0.62 0.22 25)",
                  }}
                >
                  {r.isSafe ? "Safe" : "Crash"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            data-ocid="gt_sim.left_button"
            onClick={() => drive("left")}
            className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ fontSize: "1.1rem" }}
          >
            ← Drive Left
          </button>
          <button
            type="button"
            data-ocid="gt_sim.right_button"
            onClick={() => drive("right")}
            className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ fontSize: "1.1rem" }}
          >
            Drive Right →
          </button>
        </div>
      )}

      {/* Key pattern */}
      <div
        className="rounded-lg px-4 py-3 text-sm"
        style={{
          backgroundColor: "oklch(0.72 0.18 55 / 0.06)",
          borderLeft: "3px solid oklch(0.72 0.18 55 / 0.3)",
          color: "oklch(0.8 0.01 55)",
        }}
      >
        <strong>Nash Equilibria:</strong> Both drive left, or both drive right.
        Two stable outcomes — but only one can prevail once expectations align.
      </div>
    </div>
  );
}
