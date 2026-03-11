import { BackButton } from "@/components/BackButton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GLOSSARY_TERMS } from "@/data/glossary";
import type { GlossaryTerm } from "@/data/glossary";
import { Link } from "@tanstack/react-router";
import { BookOpen, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

const DOMAIN_ACCENT_MAP: Record<string, string> = {
  "game-theory": "0.72 0.2 265",
  "behavioural-economics": "0.72 0.18 75",
};

// ─── Flashcard overlay ────────────────────────────────────────────
interface FlashcardOverlayProps {
  terms: GlossaryTerm[];
  onClose: () => void;
}

function FlashcardOverlay({ terms, onClose }: FlashcardOverlayProps) {
  const [deck, setDeck] = useState<GlossaryTerm[]>([...terms]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [done, setDone] = useState(false);

  const current = deck[currentIndex];
  const total = terms.length;
  const remaining = deck.length;
  const progress = reviewedCount > 0 ? (reviewedCount / total) * 100 : 0;

  const handleFlip = () => setFlipped((f) => !f);

  const handleGotIt = () => {
    setReviewedCount((c) => c + 1);
    const nextDeck = deck.filter((_, i) => i !== currentIndex);
    if (nextDeck.length === 0) {
      setDone(true);
      return;
    }
    setDeck(nextDeck);
    setCurrentIndex((i) => Math.min(i, nextDeck.length - 1));
    setFlipped(false);
  };

  const handleReviewAgain = () => {
    // Move current card to end
    const removed = deck[currentIndex];
    const nextDeck = [...deck.filter((_, i) => i !== currentIndex), removed];
    setDeck(nextDeck);
    setCurrentIndex((i) => Math.min(i, nextDeck.length - 1));
    setFlipped(false);
  };

  const handleGoAgain = () => {
    setDeck([...terms]);
    setCurrentIndex(0);
    setFlipped(false);
    setReviewedCount(0);
    setDone(false);
  };

  const accentLCH =
    current && DOMAIN_ACCENT_MAP[current.domainId]
      ? DOMAIN_ACCENT_MAP[current.domainId]
      : "0.55 0.01 275";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: "oklch(0.08 0.005 275)" }}
      data-ocid="glossary.flashcard.modal"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-xs text-muted-foreground font-medium">
            {done ? "Complete" : `${remaining} left · ${reviewedCount} done`}
          </span>
          <div className="flex-1 max-w-xs h-1 rounded-full bg-border/30 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: "oklch(0.65 0.18 145)",
              }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          data-ocid="glossary.flashcard.close_button"
          className="flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-border/20 transition-colors ml-4"
          aria-label="Exit flashcards"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        {done ? (
          <div className="text-center max-w-sm">
            <div
              className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-6"
              style={{ backgroundColor: "oklch(0.65 0.18 145 / 0.15)" }}
            >
              <BookOpen
                className="h-8 w-8"
                style={{ color: "oklch(0.72 0.15 145)" }}
              />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              All done
            </h2>
            <p className="text-muted-foreground mb-8">
              You've reviewed all {total} term{total !== 1 ? "s" : ""}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleGoAgain}
                data-ocid="glossary.flashcard.go_again.button"
                className="rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "oklch(0.72 0.2 265)",
                  color: "oklch(0.98 0.005 265)",
                }}
              >
                Go again
              </button>
              <button
                type="button"
                onClick={onClose}
                data-ocid="glossary.flashcard.exit.button"
                className="rounded-lg border border-border/60 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        ) : (
          current && (
            <div className="w-full max-w-lg">
              {/* Card */}
              <button
                type="button"
                className="relative w-full cursor-pointer select-none text-left"
                onClick={handleFlip}
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative rounded-xl border p-6 sm:p-8 min-h-[240px] flex flex-col transition-all duration-500"
                  style={{
                    borderColor: `oklch(${accentLCH} / 0.25)`,
                    backgroundColor: "oklch(0.12 0.005 275)",
                  }}
                >
                  {/* Domain badge */}
                  <div className="mb-4">
                    <Badge
                      className="text-xs font-medium"
                      style={{
                        backgroundColor: `oklch(${accentLCH} / 0.15)`,
                        color: `oklch(${accentLCH})`,
                        border: `1px solid oklch(${accentLCH} / 0.3)`,
                      }}
                    >
                      {current.domain}
                    </Badge>
                  </div>

                  {!flipped ? (
                    <>
                      <div className="flex-1 flex items-center">
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                          {current.term}
                        </h2>
                      </div>
                      <p className="text-xs text-muted-foreground mt-6 text-center">
                        Tap to reveal definition
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">
                          {current.term}
                        </p>
                        <p className="text-foreground leading-relaxed">
                          {current.definition}
                        </p>
                        <Link
                          to={current.lessonPath}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 mt-4 text-xs hover:opacity-80 transition-opacity"
                          style={{ color: `oklch(${accentLCH})` }}
                        >
                          View in lesson
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </button>

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {!flipped ? (
                  <button
                    type="button"
                    onClick={handleFlip}
                    data-ocid="glossary.flashcard.flip.button"
                    className="flex-1 rounded-lg border border-border/60 px-4 py-3 text-sm font-medium text-foreground hover:bg-border/10 transition-colors"
                  >
                    Flip card
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleGotIt}
                      data-ocid="glossary.flashcard.got_it.button"
                      className="flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                      style={{
                        backgroundColor: "oklch(0.65 0.18 145 / 0.15)",
                        color: "oklch(0.75 0.15 145)",
                        border: "1px solid oklch(0.65 0.18 145 / 0.3)",
                      }}
                    >
                      Got it ✓
                    </button>
                    <button
                      type="button"
                      onClick={handleReviewAgain}
                      data-ocid="glossary.flashcard.review_again.button"
                      className="flex-1 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/40 hover:bg-border/10 transition-colors"
                    >
                      Review again
                    </button>
                  </>
                )}
              </div>

              {/* Navigation hint */}
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Card {Math.min(currentIndex + 1, remaining)} of {remaining}
                </span>
                <span>{Math.round(progress)}% complete</span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

// ─── Main GlossaryPage ────────────────────────────────────────────
type ViewMode = "az" | "domain";

export function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("az");
  const [flashcardTerms, setFlashcardTerms] = useState<GlossaryTerm[] | null>(
    null,
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return GLOSSARY_TERMS;
    return GLOSSARY_TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.domain.toLowerCase().includes(q),
    );
  }, [query]);

  // A–Z grouping
  const grouped = useMemo(() => {
    const map = new Map<string, typeof GLOSSARY_TERMS>();
    for (const term of filtered) {
      const letter = term.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(term);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  // Domain grouping
  const groupedByDomain = useMemo(() => {
    const map = new Map<string, typeof GLOSSARY_TERMS>();
    for (const term of filtered) {
      if (!map.has(term.domainId)) map.set(term.domainId, []);
      map.get(term.domainId)!.push(term);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const launchFlashcards = (terms: GlossaryTerm[]) => {
    if (terms.length === 0) return;
    setFlashcardTerms([...terms].sort(() => Math.random() - 0.5));
  };

  const TermCard = ({ term }: { term: GlossaryTerm }) => {
    const accentLCH = DOMAIN_ACCENT_MAP[term.domainId] ?? "0.55 0.01 275";
    return (
      <div className="rounded-lg border border-border/50 bg-card p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-foreground">{term.term}</h3>
          <Link to={term.lessonPath} className="shrink-0">
            <Badge
              className="text-xs font-medium hover:opacity-80 transition-opacity cursor-pointer"
              style={{
                backgroundColor: `oklch(${accentLCH} / 0.15)`,
                color: `oklch(${accentLCH})`,
                border: `1px solid oklch(${accentLCH} / 0.3)`,
              }}
            >
              {term.domain}
            </Badge>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {term.definition}
        </p>
      </div>
    );
  };

  return (
    <>
      {/* Flashcard overlay */}
      {flashcardTerms && (
        <FlashcardOverlay
          terms={flashcardTerms}
          onClose={() => setFlashcardTerms(null)}
        />
      )}

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <BackButton to="/" label="Home" />
          <div className="flex items-start justify-between gap-4 mt-6">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-2 tracking-tight">
                Glossary
              </h1>
              <p className="text-muted-foreground">
                Key terms from across all domains. Plain English definitions.
              </p>
            </div>
            {filtered.length > 0 && (
              <button
                type="button"
                onClick={() => launchFlashcards(filtered)}
                data-ocid="glossary.test_all.button"
                className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{
                  backgroundColor: "oklch(0.72 0.2 265)",
                  color: "oklch(0.98 0.005 265)",
                }}
              >
                Test All ({filtered.length})
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search terms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-ocid="glossary.search.input"
            className="pl-9 bg-card border-border/60 focus-visible:ring-ring/50"
          />
        </div>

        {/* View toggle */}
        <div className="flex gap-2 mb-4">
          {(["az", "domain"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              data-ocid={`glossary.view.${mode === "az" ? "primary_button" : "secondary_button"}`}
              className="rounded-md px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                backgroundColor:
                  viewMode === mode ? "oklch(0.22 0.01 275)" : "transparent",
                color:
                  viewMode === mode
                    ? "oklch(0.88 0.01 80)"
                    : "oklch(0.55 0.01 275)",
                border:
                  viewMode === mode
                    ? "1px solid oklch(0.3 0.01 275 / 0.6)"
                    : "1px solid oklch(0.22 0.01 275 / 0.4)",
              }}
            >
              {mode === "az" ? "A–Z" : "By Domain"}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-6 uppercase tracking-wider">
          {filtered.length} {filtered.length === 1 ? "term" : "terms"}
        </p>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div data-ocid="glossary.empty_state" className="py-16 text-center">
            <p className="text-muted-foreground">No terms match "{query}"</p>
          </div>
        ) : viewMode === "az" ? (
          // A–Z view
          <div className="space-y-8">
            {grouped.map(([letter, terms]) => (
              <section key={letter}>
                <h2 className="font-display text-2xl font-semibold text-muted-foreground/60 mb-4 select-none">
                  {letter}
                </h2>
                <div className="space-y-4">
                  {terms.map((term) => (
                    <TermCard key={term.term} term={term} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          // By Domain view
          <div className="space-y-10">
            {groupedByDomain.map(([domainId, terms]) => {
              const accentLCH = DOMAIN_ACCENT_MAP[domainId] ?? "0.55 0.01 275";
              const domainName = terms[0]?.domain ?? domainId;
              return (
                <section key={domainId}>
                  <div className="flex items-center justify-between mb-4">
                    <h2
                      className="font-display text-xl font-semibold"
                      style={{ color: `oklch(${accentLCH})` }}
                    >
                      {domainName}
                    </h2>
                    <button
                      type="button"
                      onClick={() => launchFlashcards(terms)}
                      data-ocid="glossary.domain.test_button"
                      className="rounded-md px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90"
                      style={{
                        backgroundColor: `oklch(${accentLCH} / 0.15)`,
                        color: `oklch(${accentLCH})`,
                        border: `1px solid oklch(${accentLCH} / 0.3)`,
                      }}
                    >
                      Test Yourself ({terms.length})
                    </button>
                  </div>
                  <div className="space-y-4">
                    {terms.map((term) => (
                      <TermCard key={term.term} term={term} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
