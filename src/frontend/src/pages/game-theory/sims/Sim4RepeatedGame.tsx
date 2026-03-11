import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useCallback, useState } from "react";

type OpponentType = "shark" | "dove" | "mirror";
type Choice = "cooperate" | "defect";

interface RoundResult {
  round: number;
  yourChoice: Choice;
  opponentChoice: Choice;
  yourScore: number;
  opponentScore: number;
}

const OPPONENT_ANALYSIS: Record<OpponentType, string> = {
  shark:
    "You faced The Shark — they always defect. Against this opponent, defecting back limits your losses. Cooperation is wasted on an opponent who will never reciprocate.",
  dove: "You faced The Dove — they always cooperate. Cooperation maximised both scores. Exploiting them works short-term but destroys the relationship entirely.",
  mirror:
    "You faced The Mirror (Tit-for-Tat) — they copied your last move. Sustained cooperation produced the best long-term result. Any defection was punished and immediately forgiven.",
};

const OPPONENT_LABELS: Record<
  OpponentType,
  { name: string; tagline: string; color: string }
> = {
  shark: {
    name: "The Shark",
    tagline: "Always defects",
    color: "oklch(0.62 0.22 25)",
  },
  dove: {
    name: "The Dove",
    tagline: "Always cooperates",
    color: "oklch(0.65 0.18 145)",
  },
  mirror: {
    name: "The Mirror",
    tagline: "Plays Tit-for-Tat",
    color: "oklch(0.72 0.2 265)",
  },
};

function getOpponentChoice(
  type: OpponentType,
  round: number,
  history: RoundResult[],
): Choice {
  switch (type) {
    case "shark":
      return "defect";
    case "dove":
      return "cooperate";
    case "mirror":
      if (round === 1) return "cooperate";
      return history[history.length - 1].yourChoice;
  }
}

function getScores(you: Choice, opp: Choice): [number, number] {
  if (you === "cooperate" && opp === "cooperate") return [3, 3];
  if (you === "defect" && opp === "cooperate") return [5, 0];
  if (you === "cooperate" && opp === "defect") return [0, 5];
  return [1, 1];
}

function randomOpponent(): OpponentType {
  const types: OpponentType[] = ["shark", "dove", "mirror"];
  return types[Math.floor(Math.random() * 3)];
}

export function Sim4RepeatedGame() {
  const [opponentType] = useState<OpponentType>(() => randomOpponent());
  const [history, setHistory] = useState<RoundResult[]>([]);
  const [totalYou, setTotalYou] = useState(0);
  const [totalOpp, setTotalOpp] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [currentOpponent, setCurrentOpponent] =
    useState<OpponentType>(opponentType);

  const currentRound = history.length + 1;
  const isOver = history.length >= 5;

  const handleChoice = useCallback(
    (choice: Choice) => {
      if (isOver) return;
      const oppChoice = getOpponentChoice(
        currentOpponent,
        currentRound,
        history,
      );
      const [ys, os] = getScores(choice, oppChoice);
      const result: RoundResult = {
        round: currentRound,
        yourChoice: choice,
        opponentChoice: oppChoice,
        yourScore: ys,
        opponentScore: os,
      };
      setHistory((h) => [...h, result]);
      setTotalYou((t) => t + ys);
      setTotalOpp((t) => t + os);
    },
    [isOver, currentRound, history, currentOpponent],
  );

  const handleReset = () => {
    const newOpp = randomOpponent();
    setCurrentOpponent(newOpp);
    setHistory([]);
    setTotalYou(0);
    setTotalOpp(0);
    setGameKey((k) => k + 1);
  };

  const oppInfo = OPPONENT_LABELS[currentOpponent];

  return (
    <div key={gameKey} className="space-y-6">
      <div>
        <h2 className="font-semibold text-foreground mb-1">
          5-Round Tournament
        </h2>
        <p className="text-sm text-muted-foreground">
          Play 5 rounds against a mystery opponent. Choose to cooperate or
          defect each round. Your opponent will be revealed at the end.
        </p>
      </div>

      {/* Score display */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border/60 bg-card p-4 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Your score
          </p>
          <p className="font-display text-3xl font-semibold text-foreground">
            {totalYou}
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card p-4 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Opponent score
          </p>
          <p className="font-display text-3xl font-semibold text-foreground">
            {totalOpp}
          </p>
        </div>
      </div>

      {/* Round history */}
      {history.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Round history
          </p>
          {history.map((r) => (
            <div
              key={r.round}
              className="flex items-center justify-between rounded-md border border-border/40 bg-card/60 px-3 py-2"
            >
              <span className="text-xs text-muted-foreground w-16">
                Round {r.round}
              </span>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded"
                style={{
                  backgroundColor:
                    r.yourChoice === "cooperate"
                      ? "oklch(0.65 0.18 145 / 0.15)"
                      : "oklch(0.62 0.22 25 / 0.15)",
                  color:
                    r.yourChoice === "cooperate"
                      ? "oklch(0.65 0.18 145)"
                      : "oklch(0.62 0.22 25)",
                }}
              >
                You: {r.yourChoice}
              </span>
              <span className="text-xs text-muted-foreground">→</span>
              <span className="text-xs font-medium text-foreground">
                +{r.yourScore} / +{r.opponentScore}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Choice buttons — only show if game not over */}
      {!isOver && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Round {currentRound} of 5 — choose your move:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChoice("cooperate")}
              className="rounded-lg border-2 p-4 text-center transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                borderColor: "oklch(0.65 0.18 145 / 0.5)",
                backgroundColor: "oklch(0.65 0.18 145 / 0.08)",
              }}
            >
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.65 0.18 145)" }}
              >
                Cooperate
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Work together
              </p>
            </button>
            <button
              type="button"
              onClick={() => handleChoice("defect")}
              className="rounded-lg border-2 p-4 text-center transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                borderColor: "oklch(0.62 0.22 25 / 0.5)",
                backgroundColor: "oklch(0.62 0.22 25 / 0.08)",
              }}
            >
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.62 0.22 25)" }}
              >
                Defect
              </p>
              <p className="text-xs text-muted-foreground mt-1">Act alone</p>
            </button>
          </div>
        </div>
      )}

      {/* Game over — reveal opponent */}
      {isOver && (
        <div className="rounded-lg border border-border/60 bg-card/80 p-5 space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              Opponent revealed
            </p>
            <p
              className="font-display text-2xl font-semibold"
              style={{ color: oppInfo.color }}
            >
              {oppInfo.name}
            </p>
            <p className="text-sm text-muted-foreground">{oppInfo.tagline}</p>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {OPPONENT_ANALYSIS[currentOpponent]}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-2 border-border/60"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Play Again
          </Button>
        </div>
      )}

      {/* Payoff reference */}
      <div
        className="rounded-lg px-4 py-3 text-xs"
        style={{
          backgroundColor: "oklch(0.18 0.008 275)",
          color: "oklch(0.72 0.01 275)",
        }}
      >
        <strong className="text-foreground">Payoffs:</strong> Both cooperate
        (3,3) · You defect, they cooperate (5,0) · You cooperate, they defect
        (0,5) · Both defect (1,1)
      </div>
    </div>
  );
}
