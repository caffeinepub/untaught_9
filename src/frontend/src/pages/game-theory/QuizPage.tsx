import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  GAME_THEORY_MODULES,
  M1_QUIZ,
  M2_QUIZ,
  M3_QUIZ,
  M4_QUIZ,
} from "@/data/game-theory";
import type { QuizQuestion } from "@/data/game-theory";
import { useMarkModuleComplete, useSubmitQuiz } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, Loader2, XCircle } from "lucide-react";
import { useState } from "react";

const QUIZZES = [M1_QUIZ, M2_QUIZ, M3_QUIZ, M4_QUIZ];

const PASS_THRESHOLDS = [2, 3, 2, 3]; // min correct out of total to pass

interface QuizPageProps {
  moduleId: number;
}

interface QuizResults {
  answers: number[];
  score: number;
  passed: boolean;
}

export function QuizPage({ moduleId }: QuizPageProps) {
  const navigate = useNavigate();
  const idx = moduleId - 1;
  const module = GAME_THEORY_MODULES[idx];
  const questions: QuizQuestion[] = QUIZZES[idx];
  const passThreshold = PASS_THRESHOLDS[idx];

  const [selected, setSelected] = useState<(number | null)[]>(
    new Array(questions.length).fill(null),
  );
  const [results, setResults] = useState<QuizResults | null>(null);

  const { mutate: submitQuiz, isPending: submitting } = useSubmitQuiz();
  const { mutate: markModuleComplete } = useMarkModuleComplete();

  const allAnswered = selected.every((s) => s !== null);

  const handleSubmit = () => {
    if (!allAnswered || results) return;

    const score = selected.reduce<number>((acc, answer, i) => {
      return acc + (answer === questions[i].correctIndex ? 1 : 0);
    }, 0);

    const passed = score >= passThreshold;

    setResults({ answers: selected as number[], score, passed });

    submitQuiz(
      { quizId: module.quizId, score, passed },
      {
        onSuccess: () => {
          if (passed) {
            markModuleComplete(`game-theory-module-${moduleId}`);
          }
        },
      },
    );
  };

  const handleNext = () => {
    if (moduleId === 4) {
      void navigate({ to: `/domain/game-theory/module/${moduleId}/wild` });
    } else {
      void navigate({ to: `/domain/game-theory/module/${moduleId}/wild` });
    }
  };

  if (!module || !questions) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 accent-indigo">
      <div className="mb-10">
        <BackButton
          to={`/domain/game-theory/module/${moduleId}/simulation`}
          label="Back to simulation"
        />
      </div>

      {/* Header */}
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-domain-accent">
          Game Theory · Module {moduleId}
        </span>
        <div className="mt-2 mb-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Quiz
          </p>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {module.title}
        </h1>
      </div>

      {/* Step indicators */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {["Lesson", "Simulation", "Quiz"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span
              className="text-xs font-medium px-2 py-1 rounded"
              style={
                i === 2
                  ? {
                      backgroundColor: "oklch(0.72 0.2 265 / 0.15)",
                      color: "oklch(0.72 0.2 265)",
                    }
                  : {
                      backgroundColor: "oklch(0.18 0.008 275)",
                      color: "oklch(0.68 0.01 275)",
                    }
              }
            >
              {step}
            </span>
            {i < 2 && (
              <span className="text-muted-foreground text-xs opacity-40">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-6 mb-8">
        {questions.map((q, qi) => {
          const answered = results !== null;
          const userAnswer = selected[qi];
          const isCorrect = answered && userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              data-ocid={`quiz.question.item.${qi + 1}`}
              className="rounded-lg border border-border/50 bg-card p-4 sm:p-5"
            >
              {/* Question */}
              <p className="font-medium text-foreground mb-4">
                <span className="text-muted-foreground mr-2">{qi + 1}.</span>
                {q.question}
              </p>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected[qi] === oi;
                  const showCorrect = answered && oi === q.correctIndex;
                  const showWrong = answered && isSelected && !isCorrect;

                  return (
                    <button
                      type="button"
                      key={`${q.id}-opt-${oi}`}
                      disabled={answered}
                      onClick={() => {
                        if (answered) return;
                        setSelected((prev) => {
                          const next = [...prev];
                          next[qi] = oi;
                          return next;
                        });
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-md border transition-all duration-150 text-sm min-h-[44px]"
                      style={{
                        borderColor: showCorrect
                          ? "oklch(0.65 0.18 145 / 0.6)"
                          : showWrong
                            ? "oklch(0.62 0.22 25 / 0.6)"
                            : isSelected
                              ? "oklch(0.72 0.2 265 / 0.5)"
                              : "oklch(0.28 0.01 275 / 0.5)",
                        backgroundColor: showCorrect
                          ? "oklch(0.65 0.18 145 / 0.1)"
                          : showWrong
                            ? "oklch(0.62 0.22 25 / 0.1)"
                            : isSelected
                              ? "oklch(0.72 0.2 265 / 0.1)"
                              : "transparent",
                        color: showCorrect
                          ? "oklch(0.8 0.1 145)"
                          : showWrong
                            ? "oklch(0.8 0.1 25)"
                            : "oklch(0.9 0.01 80)",
                        cursor: answered ? "default" : "pointer",
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="shrink-0 w-5 text-center text-xs font-mono text-muted-foreground">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        {opt}
                        {showCorrect && (
                          <CheckCircle2
                            className="ml-auto h-4 w-4 shrink-0"
                            style={{ color: "oklch(0.65 0.18 145)" }}
                          />
                        )}
                        {showWrong && (
                          <XCircle
                            className="ml-auto h-4 w-4 shrink-0"
                            style={{ color: "oklch(0.62 0.22 25)" }}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {answered && (
                <div
                  className="mt-4 rounded-md px-3 py-2.5 text-sm"
                  style={
                    isCorrect
                      ? {
                          backgroundColor: "oklch(0.65 0.18 145 / 0.08)",
                          borderLeft: "3px solid oklch(0.65 0.18 145 / 0.5)",
                          color: "oklch(0.82 0.01 80)",
                        }
                      : {
                          backgroundColor: "oklch(0.62 0.22 25 / 0.08)",
                          borderLeft: "3px solid oklch(0.62 0.22 25 / 0.5)",
                          color: "oklch(0.82 0.01 80)",
                        }
                  }
                >
                  <span className="font-medium mr-1">
                    {isCorrect ? "Correct." : "Not quite."}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Results banner */}
      {results && (
        <div
          className="mb-6 rounded-lg p-4 sm:p-5"
          style={{
            backgroundColor: results.passed
              ? "oklch(0.65 0.18 145 / 0.1)"
              : "oklch(0.62 0.22 25 / 0.1)",
            border: `1px solid ${results.passed ? "oklch(0.65 0.18 145 / 0.3)" : "oklch(0.62 0.22 25 / 0.3)"}`,
          }}
        >
          <p
            className="font-semibold"
            style={{
              color: results.passed
                ? "oklch(0.75 0.15 145)"
                : "oklch(0.75 0.15 25)",
            }}
          >
            {results.passed ? "Passed" : "Keep going"} — {results.score} of{" "}
            {questions.length} correct
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {results.passed
              ? "Great work. Continue to see this concept in the real world."
              : "Review the explanations above, then continue when you're ready."}
          </p>
        </div>
      )}

      {/* Actions */}
      {!results ? (
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          data-ocid="quiz.submit.button"
          className="gap-2 w-full sm:w-auto"
          style={{
            backgroundColor: "oklch(0.72 0.2 265)",
            color: "oklch(0.98 0.005 265)",
          }}
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {!allAnswered ? "Answer all questions to continue" : "Submit Quiz"}
        </Button>
      ) : (
        <Button
          size="lg"
          onClick={handleNext}
          className="gap-2 w-full sm:w-auto"
          style={{
            backgroundColor: "oklch(0.72 0.2 265)",
            color: "oklch(0.98 0.005 265)",
          }}
        >
          <ChevronRight className="h-4 w-4" />
          Continue
        </Button>
      )}
    </main>
  );
}
