import { Button } from "@/components/ui/button";
import { useState } from "react";

const TOTAL_ROUNDS = 5;
const BETRAY_PROBABILITY = 0.6;

type Choice = "silent" | "testify";
type RoundResult = {
  round: number;
  playerChoice: Choice;
  partnerChoice: Choice;
  playerYears: number;
  partnerYears: number;
};

function getPayoff(player: Choice, partner: Choice): [number, number] {
  if (player === "silent" && partner === "silent") return [1, 1];
  if (player === "silent" && partner === "testify") return [10, 0];
  if (player === "testify" && partner === "silent") return [0, 10];
  return [5, 5]; // both testify
}

export function Sim2PrisonersDilemma() {
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const playerTotal = rounds.reduce((sum, r) => sum + r.playerYears, 0);
  const partnerTotal = rounds.reduce((sum, r) => sum + r.partnerYears, 0);
  const currentRound = rounds.length + 1;

  function choose(choice: Choice) {
    if (gameOver || rounds.length >= TOTAL_ROUNDS) return;
    const partnerChoice: Choice =
      Math.random() < BETRAY_PROBABILITY ? "testify" : "silent";
    const [playerYears, partnerYears] = getPayoff(choice, partnerChoice);
    const result: RoundResult = {
      round: rounds.length + 1,
      playerChoice: choice,
      partnerChoice,
      playerYears,
      partnerYears,
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

  function describeResult(r: RoundResult): string {
    if (r.playerChoice === "silent" && r.partnerChoice === "silent")
      return "Mutual silence — both serve 1 year each. Best collective outcome.";
    if (r.playerChoice === "silent" && r.partnerChoice === "testify")
      return "Your partner betrayed you while you stayed loyal. You serve 10 years.";
    if (r.playerChoice === "testify" && r.partnerChoice === "silent")
      return "You testified, partner stayed silent. You go free.";
    return "You both testified. Both serve 5 years — the Nash Equilibrium trap.";
  }

  const isGoodForPlayer = (r: RoundResult) => r.playerYears <= r.partnerYears;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-foreground mb-1">
          Interrogation Room
        </h2>
        <p className="text-sm text-muted-foreground">
          You and your partner are in separate rooms. Each round: stay silent or
          testify. Lower total years is better. Your partner betrays ~60% of the
          time.
        </p>
      </div>

      {/* Scoreboard */}
      <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-5 py-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{playerTotal}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
            Your Years
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "oklch(0.72 0.18 55)" }}
          >
            Round {Math.min(currentRound, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Lower = better</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{partnerTotal}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
            Partner Years
          </p>
        </div>
      </div>

      {/* Round result */}
      {lastResult && !gameOver && (
        <div
          className="rounded-lg border px-5 py-4"
          style={{
            borderColor: isGoodForPlayer(lastResult)
              ? "oklch(0.65 0.18 145 / 0.5)"
              : "oklch(0.62 0.22 25 / 0.5)",
            backgroundColor: isGoodForPlayer(lastResult)
              ? "oklch(0.65 0.18 145 / 0.08)"
              : "oklch(0.62 0.22 25 / 0.08)",
          }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="text-center">
              <p
                className="text-lg font-bold"
                style={{ color: "oklch(0.72 0.2 265)" }}
              >
                +{lastResult.playerYears}yr
              </p>
              <p className="text-xs text-muted-foreground">You</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Round {lastResult.round}
              </p>
              <p className="text-xs font-medium text-foreground mt-0.5">
                You{" "}
                {lastResult.playerChoice === "silent"
                  ? "stayed silent"
                  : "testified"}{" "}
                · Partner{" "}
                {lastResult.partnerChoice === "silent" ? "silent" : "testified"}
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-lg font-bold"
                style={{ color: "oklch(0.72 0.18 55)" }}
              >
                +{lastResult.partnerYears}yr
              </p>
              <p className="text-xs text-muted-foreground">Partner</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {describeResult(lastResult)}
          </p>
        </div>
      )}

      {/* Game over */}
      {gameOver ? (
        <div className="rounded-lg border border-border/60 bg-card p-5 space-y-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground mb-1">
              Sentence Served
            </p>
            <div className="flex justify-center gap-8 mt-2">
              <div>
                <p
                  className="text-4xl font-bold"
                  style={{ color: "oklch(0.72 0.2 265)" }}
                >
                  {playerTotal}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your years
                </p>
              </div>
              <div>
                <p
                  className="text-4xl font-bold"
                  style={{ color: "oklch(0.72 0.18 55)" }}
                >
                  {partnerTotal}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Partner's years
                </p>
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
            <strong>The Dilemma:</strong> Staying silent is collectively optimal
            — but individually risky. Since your partner testifies 60% of the
            time, testifying protects you. That's why the "bad" outcome (both
            testify, both suffer) is the stable equilibrium.
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
            Try Again
          </Button>

          <div className="space-y-1">
            {rounds.map((r) => (
              <div
                key={r.round}
                className="flex items-center justify-between text-xs px-3 py-1.5 rounded"
                style={{
                  backgroundColor:
                    r.playerYears <= r.partnerYears
                      ? "oklch(0.65 0.18 145 / 0.08)"
                      : "oklch(0.62 0.22 25 / 0.08)",
                }}
              >
                <span className="text-muted-foreground">Round {r.round}</span>
                <span className="text-foreground">
                  You {r.playerChoice} · Partner {r.partnerChoice}
                </span>
                <span className="text-foreground">
                  {r.playerYears}yr / {r.partnerYears}yr
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            data-ocid="gt_sim.cooperate_button"
            onClick={() => choose("silent")}
            className="rounded-lg border py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              backgroundColor: "oklch(0.65 0.18 145 / 0.08)",
              borderColor: "oklch(0.65 0.18 145 / 0.4)",
              color: "oklch(0.75 0.15 145)",
              fontSize: "1.05rem",
            }}
          >
            🤐 Stay Silent
          </button>
          <button
            type="button"
            data-ocid="gt_sim.defect_button"
            onClick={() => choose("testify")}
            className="rounded-lg border py-6 text-center font-semibold transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              backgroundColor: "oklch(0.62 0.22 25 / 0.08)",
              borderColor: "oklch(0.62 0.22 25 / 0.4)",
              color: "oklch(0.72 0.2 25)",
              fontSize: "1.05rem",
            }}
          >
            🗣 Testify
          </button>
        </div>
      )}

      {/* Payoff reference */}
      <div
        className="rounded-lg px-4 py-3 text-sm"
        style={{
          backgroundColor: "oklch(0.72 0.18 55 / 0.06)",
          borderLeft: "3px solid oklch(0.72 0.18 55 / 0.3)",
          color: "oklch(0.8 0.01 55)",
        }}
      >
        <strong>Payoff matrix:</strong> Both silent = 1yr each · Both testify =
        5yr each · You silent, they testify = you 10yr, them 0 · You testify,
        them silent = you 0, them 10yr
      </div>
    </div>
  );
}
