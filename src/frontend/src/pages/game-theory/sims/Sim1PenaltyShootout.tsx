import { Button } from "@/components/ui/button";
import { useState } from "react";

const TOTAL_ROUNDS = 5;

type Choice = "left" | "right";
type RoundResult = {
  round: number;
  playerChoice: Choice;
  goalkeeperChoice: Choice;
  isGoal: boolean;
};

function getGoalkeeperChoice(): Choice {
  return Math.random() < 0.5 ? "left" : "right";
}

export function Sim1PenaltyShootout() {
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const currentRound = rounds.length + 1;
  const goals = rounds.filter((r) => r.isGoal).length;
  const saves = rounds.filter((r) => !r.isGoal).length;

  function kick(choice: Choice) {
    if (gameOver || rounds.length >= TOTAL_ROUNDS) return;
    const goalkeeperChoice = getGoalkeeperChoice();
    const isGoal = choice !== goalkeeperChoice;
    const result: RoundResult = {
      round: rounds.length + 1,
      playerChoice: choice,
      goalkeeperChoice,
      isGoal,
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
        <h2 className="font-semibold text-foreground mb-1">Penalty Shootout</h2>
        <p className="text-sm text-muted-foreground">
          You are the Kicker. Pick a side each round — the goalkeeper picks
          randomly. Score as many goals as you can in 5 rounds.
        </p>
      </div>

      {/* Scoreboard */}
      <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-5 py-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{goals}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
            Your Goals
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "oklch(0.72 0.2 265)" }}
          >
            Round {Math.min(currentRound, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{saves}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
            Keeper Saves
          </p>
        </div>
      </div>

      {/* Round result */}
      {lastResult && !gameOver && (
        <div
          className="rounded-lg border px-5 py-4 text-center"
          style={{
            borderColor: lastResult.isGoal
              ? "oklch(0.65 0.18 145 / 0.5)"
              : "oklch(0.62 0.22 25 / 0.5)",
            backgroundColor: lastResult.isGoal
              ? "oklch(0.65 0.18 145 / 0.08)"
              : "oklch(0.62 0.22 25 / 0.08)",
          }}
        >
          <p
            className="text-3xl font-bold mb-1"
            style={{
              color: lastResult.isGoal
                ? "oklch(0.65 0.18 145)"
                : "oklch(0.62 0.22 25)",
            }}
          >
            {lastResult.isGoal ? "GOAL!" : "SAVED!"}
          </p>
          <p className="text-sm text-muted-foreground">
            You kicked{" "}
            <strong className="text-foreground">
              {lastResult.playerChoice}
            </strong>{" "}
            — Goalkeeper dived{" "}
            <strong className="text-foreground">
              {lastResult.goalkeeperChoice}
            </strong>
            .
            {lastResult.isGoal
              ? " Different sides — you score!"
              : " Same side — blocked!"}
          </p>
        </div>
      )}

      {/* Game over summary */}
      {gameOver ? (
        <div className="rounded-lg border border-border/60 bg-card p-5 space-y-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground mb-1">
              Final Score
            </p>
            <p
              className="text-4xl font-bold mb-1"
              style={{ color: "oklch(0.72 0.2 265)" }}
            >
              {goals} / {TOTAL_ROUNDS}
            </p>
            <p className="text-sm text-muted-foreground">
              {goals >= 4
                ? "Excellent! You made smart, unpredictable choices."
                : goals >= 3
                  ? "Solid performance — some of your choices were predictable."
                  : "The keeper got lucky — or did you have a pattern?"}
            </p>
          </div>

          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
              borderLeft: "3px solid oklch(0.72 0.2 265 / 0.4)",
              color: "oklch(0.8 0.01 265)",
            }}
          >
            <strong>Insight:</strong> The goalkeeper can't predict you, so
            mixing strategies randomly is optimal. In a zero-sum game with no
            pattern, 50/50 is mathematically unbeatable.
          </div>

          <Button
            data-ocid="gt_sim.restart_button"
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

          {/* Round history */}
          <div className="space-y-1">
            {rounds.map((r) => (
              <div
                key={r.round}
                className="flex items-center justify-between text-xs px-3 py-1.5 rounded"
                style={{
                  backgroundColor: r.isGoal
                    ? "oklch(0.65 0.18 145 / 0.08)"
                    : "oklch(0.62 0.22 25 / 0.08)",
                }}
              >
                <span className="text-muted-foreground">Round {r.round}</span>
                <span className="text-foreground">
                  Kicked {r.playerChoice} · Keeper dived {r.goalkeeperChoice}
                </span>
                <span
                  className="font-semibold"
                  style={{
                    color: r.isGoal
                      ? "oklch(0.65 0.18 145)"
                      : "oklch(0.62 0.22 25)",
                  }}
                >
                  {r.isGoal ? "Goal" : "Saved"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Choice buttons */
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            data-ocid="gt_sim.left_button"
            onClick={() => kick("left")}
            className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ fontSize: "1.1rem" }}
          >
            ← Kick Left
          </button>
          <button
            type="button"
            data-ocid="gt_sim.right_button"
            onClick={() => kick("right")}
            className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ fontSize: "1.1rem" }}
          >
            Kick Right →
          </button>
        </div>
      )}

      {/* Payoff reference */}
      <div
        className="rounded-lg px-4 py-3 text-sm"
        style={{
          backgroundColor: "oklch(0.72 0.2 265 / 0.06)",
          borderLeft: "3px solid oklch(0.72 0.2 265 / 0.3)",
          color: "oklch(0.75 0.01 265)",
        }}
      >
        <strong>Payoff matrix:</strong> Goal = (1, 0) · Save = (0, 1). Every
        outcome totals 1 — one player's gain is always the other's loss.
      </div>
    </div>
  );
}
