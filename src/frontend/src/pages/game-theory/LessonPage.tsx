import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  GAME_THEORY_MODULES,
  type Lesson,
  type LessonSection,
  M1_LESSON,
  M2_LESSON,
  M3_LESSON,
  M4_LESSON,
} from "@/data/game-theory";
import { useMarkLessonRead, useMyProgress } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Eye,
  Lightbulb,
  Loader2,
  Settings,
  Trophy,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INDIGO = "0.72 0.2 265";
const GREEN = "0.72 0.2 142";
const RED = "0.72 0.2 29";
const LESSONS: Lesson[] = [M1_LESSON, M2_LESSON, M3_LESSON, M4_LESSON];

// Section type pill config
const SECTION_TYPE_CONFIG = {
  concept: {
    icon: BookOpen,
    label: "Key Concept",
  },
  mechanism: {
    icon: Settings,
    label: "How It Works",
  },
  warning: {
    icon: AlertTriangle,
    label: "Watch Out",
  },
  example: {
    icon: Eye,
    label: "Real Example",
  },
  trap: {
    icon: Zap,
    label: "The Trap",
  },
  fix: {
    icon: CheckCircle,
    label: "The Fix",
  },
} as const;

interface LessonPageProps {
  moduleId: number;
}

interface SectionCardProps {
  section: LessonSection;
  index: number;
  total: number;
  isActive: boolean;
  isRevealed: boolean;
  onNext: () => void;
  isLastSection: boolean;
  isContinuePending: boolean;
  lessonTitle: string;
}

function SectionCard({
  section,
  index,
  total,
  isActive,
  isRevealed,
  onNext,
  isLastSection,
  isContinuePending,
  lessonTitle,
}: SectionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);
  };

  const isCorrect =
    selectedOption !== null &&
    section.check !== undefined &&
    selectedOption === section.check.correctIndex;

  const canProceed = !section.check || selectedOption !== null;

  const handleNext = () => {
    if (isLastSection && !showSummary) {
      setShowSummary(true);
    } else {
      onNext();
    }
  };

  if (!isRevealed) return null;

  // Render body — supports string or string[]
  const bodyParagraphs = Array.isArray(section.body)
    ? section.body
    : [section.body];

  // Section type pill
  const typeConfig = section.type ? SECTION_TYPE_CONFIG[section.type] : null;
  const TypeIcon = typeConfig?.icon;

  return (
    <motion.div
      ref={cardRef}
      data-ocid={`lesson.section.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={[
        "rounded-xl border transition-all duration-300",
        isActive
          ? "border-border/60 bg-card/90 shadow-lg"
          : "border-border/25 bg-card/30 opacity-55",
      ].join(" ")}
    >
      {/* Section header */}
      <div className="px-5 pt-5 pb-4 border-b border-border/25">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: `oklch(${INDIGO} / 0.8)` }}
          >
            Section {index + 1} of {total}
          </span>
          {!isActive && (
            <span className="text-[11px] text-muted-foreground/50 font-medium">
              ✓ Completed
            </span>
          )}
        </div>

        {/* Section type pill */}
        {typeConfig && TypeIcon && (
          <div className="mb-2.5">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]"
              style={{
                backgroundColor: `oklch(${INDIGO} / 0.1)`,
                color: `oklch(${INDIGO})`,
              }}
            >
              <TypeIcon className="h-3 w-3" />
              {typeConfig.label}
            </span>
          </div>
        )}

        <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground leading-snug">
          {section.heading}
        </h2>
      </div>

      {/* Body */}
      <div className="px-5 py-5 space-y-4">
        <div className="space-y-3">
          {bodyParagraphs.map((para) => (
            <p
              key={para.slice(0, 40)}
              className="text-foreground/90 leading-relaxed text-[15px] sm:text-base"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Real World callout */}
        {section.example && (
          <div
            className="rounded-lg p-4 border-l-2"
            style={{
              borderLeftColor: `oklch(${INDIGO})`,
              backgroundColor: `oklch(${INDIGO} / 0.07)`,
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: `oklch(${INDIGO})` }}
            >
              Real World
            </p>
            <p className="text-foreground/80 text-sm leading-relaxed">
              {section.example}
            </p>
          </div>
        )}

        {/* Comprehension check */}
        {section.check && isActive && (
          <div className="mt-5 rounded-lg border border-border/40 bg-background/40 p-4 sm:p-5">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-1.5"
              style={{ color: `oklch(${INDIGO})` }}
            >
              <Lightbulb className="h-3 w-3" />
              Comprehension Check
            </p>
            <p className="text-foreground font-medium text-sm sm:text-[15px] leading-snug mb-4">
              {section.check.question}
            </p>
            <div className="space-y-2">
              {section.check.options.map((option, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isAnswered = selectedOption !== null;
                const isCorrectOption =
                  section.check !== undefined &&
                  optIdx === section.check.correctIndex;
                const isWrongSelected = isSelected && !isCorrect;
                // Show correct answer in green when user got it wrong
                const shouldHighlightCorrect =
                  isAnswered && isCorrectOption && !isCorrect;

                let optionStyle: React.CSSProperties | undefined;
                let optionClass = "";

                if (isAnswered) {
                  if (isWrongSelected) {
                    // Red for wrong selection
                    optionStyle = {
                      borderColor: `oklch(${RED})`,
                      backgroundColor: `oklch(${RED} / 0.12)`,
                      color: `oklch(${RED})`,
                    };
                    optionClass = "border-current font-medium cursor-default";
                  } else if (
                    shouldHighlightCorrect ||
                    (isSelected && isCorrect)
                  ) {
                    // Green for correct answer
                    optionStyle = {
                      borderColor: `oklch(${GREEN})`,
                      backgroundColor: `oklch(${GREEN} / 0.12)`,
                      color: `oklch(${GREEN})`,
                    };
                    optionClass = "border-current font-medium cursor-default";
                  } else {
                    optionClass =
                      "border-border/25 bg-card/30 text-muted-foreground/60 cursor-default";
                  }
                } else {
                  optionClass =
                    "border-border/40 bg-card/50 text-foreground hover:border-border/70 hover:bg-card/80 cursor-pointer";
                }

                return (
                  <button
                    // biome-ignore lint/suspicious/noArrayIndexKey: static ordered options
                    key={optIdx}
                    type="button"
                    data-ocid={`lesson.check.option.${optIdx + 1}`}
                    onClick={() => handleOptionClick(optIdx)}
                    disabled={isAnswered}
                    className={[
                      "w-full text-left text-sm px-4 py-3 rounded-lg border transition-all duration-200 min-h-[44px]",
                      "focus-visible:outline-none focus-visible:ring-2",
                      optionClass,
                    ].join(" ")}
                    style={optionStyle}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className={[
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold border",
                          isWrongSelected ||
                          shouldHighlightCorrect ||
                          (isSelected && isCorrect)
                            ? "border-current bg-current"
                            : "border-border/50 text-muted-foreground",
                        ].join(" ")}
                        style={
                          isWrongSelected
                            ? {
                                borderColor: `oklch(${RED})`,
                                backgroundColor: `oklch(${RED})`,
                                color: "white",
                              }
                            : shouldHighlightCorrect ||
                                (isSelected && isCorrect)
                              ? {
                                  borderColor: `oklch(${GREEN})`,
                                  backgroundColor: `oklch(${GREEN})`,
                                  color: "white",
                                }
                              : undefined
                        }
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Insight after answering — with correct/incorrect header */}
            <AnimatePresence mode="wait">
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 rounded-lg p-4 overflow-hidden"
                  style={{
                    backgroundColor: isCorrect
                      ? `oklch(${GREEN} / 0.08)`
                      : `oklch(${RED} / 0.08)`,
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
                    style={{
                      color: `oklch(${isCorrect ? GREEN : RED})`,
                    }}
                  >
                    {isCorrect ? "✓ Correct!" : "✗ Think Again"}
                  </p>
                  <p className="text-foreground/85 text-sm leading-relaxed">
                    {section.check.hint}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Lesson Complete summary card (last section only) */}
        <AnimatePresence mode="wait">
          {isLastSection && showSummary && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-4 rounded-xl border p-5 text-center"
              style={{
                borderColor: `oklch(${INDIGO} / 0.3)`,
                backgroundColor: `oklch(${INDIGO} / 0.06)`,
              }}
            >
              <div
                className="inline-flex items-center justify-center h-10 w-10 rounded-full mb-3"
                style={{ backgroundColor: `oklch(${INDIGO} / 0.15)` }}
              >
                <Trophy
                  className="h-5 w-5"
                  style={{ color: `oklch(${INDIGO})` }}
                />
              </div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
                style={{ color: `oklch(${INDIGO})` }}
              >
                Lesson complete
              </p>
              <p className="font-display text-base font-semibold text-foreground mb-4">
                {lessonTitle}
              </p>
              <Button
                size="sm"
                onClick={onNext}
                disabled={isContinuePending}
                data-ocid="lesson.continue.button"
                className="gap-2"
                style={{
                  backgroundColor: `oklch(${INDIGO})`,
                  color: "oklch(0.98 0.005 265)",
                }}
              >
                {isContinuePending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                Continue to Simulation
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next / Continue button */}
        {isActive && canProceed && !showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: section.check ? 0.1 : 0, duration: 0.3 }}
            className="pt-2 flex justify-end"
          >
            {isLastSection ? (
              <Button
                size="sm"
                onClick={handleNext}
                data-ocid="lesson.finish.button"
                className="gap-2"
                style={{
                  backgroundColor: `oklch(${INDIGO})`,
                  color: "oklch(0.98 0.005 265)",
                }}
              >
                <CheckCircle className="h-4 w-4" />
                Finish Lesson
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={handleNext}
                data-ocid="lesson.next_section.button"
                className="gap-2 border-border/50 hover:border-border"
              >
                Next Section
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function LessonPage({ moduleId }: LessonPageProps) {
  const navigate = useNavigate();
  const idx = moduleId - 1;
  const module = GAME_THEORY_MODULES[idx];
  const lesson = LESSONS[idx];
  const { data: progress } = useMyProgress();
  const { mutate: markRead, isPending } = useMarkLessonRead();

  const isRead = progress?.readLessons.includes(module.lessonId) ?? false;
  const [revealedCount, setRevealedCount] = useState(1);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleNext = (sectionIdx: number) => {
    const isLast = sectionIdx === lesson.sections.length - 1;
    if (isLast) {
      if (!isRead) {
        markRead(module.lessonId, {
          onSuccess: () => {
            void navigate({
              to: `/domain/game-theory/module/${moduleId}/simulation`,
            });
          },
          onError: () => {
            void navigate({
              to: `/domain/game-theory/module/${moduleId}/simulation`,
            });
          },
        });
      } else {
        void navigate({
          to: `/domain/game-theory/module/${moduleId}/simulation`,
        });
      }
    } else {
      setRevealedCount((prev) => prev + 1);
    }
  };

  // Scroll to newly revealed section
  useEffect(() => {
    const nextIdx = revealedCount - 1;
    const ref = sectionRefs.current[nextIdx];
    if (ref && revealedCount > 1) {
      setTimeout(() => {
        ref.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [revealedCount]);

  if (!module || !lesson) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 accent-indigo">
      <div className="mb-10">
        <BackButton to="/domain/game-theory/modules" label="All modules" />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: `oklch(${INDIGO})` }}
          >
            Game Theory · Module {moduleId}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <BookOpen
            className="h-5 w-5 mt-1 shrink-0"
            style={{ color: `oklch(${INDIGO})` }}
          />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Lesson
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              {lesson.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {["Lesson", "Simulation", "Quiz"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span
              className="text-xs font-medium px-2 py-1 rounded"
              style={
                i === 0
                  ? {
                      backgroundColor: `oklch(${INDIGO} / 0.15)`,
                      color: `oklch(${INDIGO})`,
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

      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-1.5 rounded-full bg-border/30 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: `oklch(${INDIGO})` }}
            initial={{ width: `${(1 / lesson.sections.length) * 100}%` }}
            animate={{
              width: `${(revealedCount / lesson.sections.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {revealedCount} / {lesson.sections.length}
        </span>
      </div>

      {/* Formative note */}
      <div className="mb-8 rounded-lg border border-border/30 bg-muted/20 px-4 py-3">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground/70">Note:</span> There
          are no right or wrong answers in the comprehension checks — they're
          here to help you think.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {lesson.sections.map((section, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: sections are static ordered content
            key={i}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
          >
            <SectionCard
              section={section}
              index={i}
              total={lesson.sections.length}
              isActive={i === revealedCount - 1}
              isRevealed={i < revealedCount}
              onNext={() => handleNext(i)}
              isLastSection={i === lesson.sections.length - 1}
              isContinuePending={isPending}
              lessonTitle={lesson.title}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
