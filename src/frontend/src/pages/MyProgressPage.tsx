import { BackButton } from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import { DOMAINS } from "@/data/domains";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useCompletionStats,
  useMyProgress,
  useStreakStats,
  useTimeBreakdown,
  useUpdateStreak,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { BarChart2, CheckCircle2, Flame, LogIn } from "lucide-react";
import { useEffect } from "react";

const DOMAIN_ACCENT_MAP: Record<string, string> = {
  "game-theory": "0.72 0.2 265",
  "behavioural-economics": "0.72 0.18 75",
  ethics: "0.62 0.22 25",
  negotiation: "0.65 0.16 185",
  "systems-thinking": "0.65 0.18 145",
  statistics: "0.72 0.18 245",
  epistemology: "0.72 0.2 295",
  "philosophy-of-mind": "0.72 0.06 240",
};

const DOMAIN_PREFIX_MAP: Record<string, string> = {
  "gt-": "game-theory",
  "be-": "behavioural-economics",
};

function getDomainFromQuizId(quizId: string): string {
  for (const [prefix, domain] of Object.entries(DOMAIN_PREFIX_MAP)) {
    if (quizId.startsWith(prefix)) return domain;
  }
  return "unknown";
}

function getDomainLabel(domainId: string): string {
  return DOMAINS.find((d) => d.id === domainId)?.name ?? domainId;
}

export function MyProgressPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const { data: progress, isLoading: progressLoading } = useMyProgress();
  const { data: stats, isLoading: statsLoading } = useCompletionStats();
  const { data: timeData } = useTimeBreakdown();
  const { data: streakData } = useStreakStats();
  const { mutate: updateStreak } = useUpdateStreak();

  // Update streak on mount when logged in
  useEffect(() => {
    if (isLoggedIn) {
      updateStreak();
    }
  }, [isLoggedIn, updateStreak]);

  const completedDomains = progress?.completedDomains ?? [];
  const completedModules = progress?.completedModules ?? [];
  const quizResults = progress?.quizResults ?? [];

  const domainsCompleted = stats ? Number(stats.domainsCompleted) : 0;
  const modulesCompleted = stats ? Number(stats.modulesCompleted) : 0;
  const currentStreak = streakData ? Number(streakData.currentStreak) : 0;

  // Group quiz results by domain
  const quizByDomain: Record<string, typeof quizResults> = {};
  for (const qr of quizResults) {
    const domain = getDomainFromQuizId(qr.quizId);
    if (!quizByDomain[domain]) quizByDomain[domain] = [];
    quizByDomain[domain].push(qr);
  }

  // Time data
  const perDomain = timeData?.perDomain ?? [];
  const totalMinutes = timeData
    ? Math.round(Number(timeData.totalTime) / 60)
    : 0;
  const hasTimeData = totalMinutes > 0;

  if (!isLoggedIn) {
    return (
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <BackButton to="/" label="Home" />
        </div>

        <div className="text-center py-16">
          <BarChart2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h1 className="font-display text-2xl font-semibold text-foreground mb-3">
            Sign in to track your progress
          </h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Your completed modules, quiz scores, and streaks are saved to your
            account.
          </p>
          <button
            type="button"
            onClick={() => login()}
            disabled={isLoggingIn}
            data-ocid="progress.login.button"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "oklch(0.72 0.2 265)",
              color: "oklch(0.98 0.005 265)",
            }}
          >
            <LogIn className="h-4 w-4" />
            {isLoggingIn ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <BackButton to="/" label="Home" />
      </div>

      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-2">
        My Progress
      </h1>
      <p className="text-muted-foreground mb-10">
        Your learning journey across all domains.
      </p>

      {/* Stats row */}
      {progressLoading || statsLoading ? (
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div
            data-ocid="progress.domains.card"
            className="rounded-lg border border-border/60 bg-card p-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground">
              {domainsCompleted}
              <span className="text-muted-foreground text-base font-normal">
                /8
              </span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">Domains</p>
          </div>
          <div
            data-ocid="progress.modules.card"
            className="rounded-lg border border-border/60 bg-card p-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground">
              {modulesCompleted}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Modules</p>
          </div>
          <div
            data-ocid="progress.streak.card"
            className="rounded-lg border border-border/60 bg-card p-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
              <Flame
                className="h-5 w-5"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              {currentStreak}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Day streak</p>
          </div>
        </div>
      )}

      {/* Domains overview */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">
          Domains
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DOMAINS.map((domain) => {
            const accentLCH = DOMAIN_ACCENT_MAP[domain.id] ?? "0.55 0.01 275";
            const isCompleted = completedDomains.includes(domain.id);
            const isAvailable = domain.available;

            return (
              <div
                key={domain.id}
                data-ocid="progress.domain.card"
                className="rounded-lg border p-3 flex flex-col gap-2"
                style={{
                  borderColor: isCompleted
                    ? `oklch(${accentLCH} / 0.4)`
                    : "oklch(0.22 0.01 275 / 0.6)",
                  backgroundColor: isCompleted
                    ? `oklch(${accentLCH} / 0.06)`
                    : "oklch(0.13 0.005 275)",
                  opacity: isAvailable ? 1 : 0.5,
                }}
              >
                <div className="flex items-start justify-between gap-1">
                  <p
                    className="text-xs font-medium leading-tight"
                    style={{
                      color: isCompleted
                        ? `oklch(${accentLCH})`
                        : "oklch(0.65 0.01 275)",
                    }}
                  >
                    {domain.name}
                  </p>
                  {isCompleted && (
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: `oklch(${accentLCH})` }}
                    />
                  )}
                </div>
                {!isAvailable && (
                  <p className="text-xs text-muted-foreground opacity-60">
                    Coming soon
                  </p>
                )}
                {isAvailable && !isCompleted && (
                  <p className="text-xs text-muted-foreground">
                    {
                      completedModules.filter((m) =>
                        m.startsWith(`${domain.id}-module-`),
                      ).length
                    }
                    /{domain.moduleCount} modules
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Quiz scores */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">
          Quiz Scores
        </h2>
        {Object.keys(quizByDomain).length === 0 ? (
          <div
            data-ocid="progress.quiz.empty_state"
            className="rounded-lg border border-border/40 bg-card/50 p-6 text-center"
          >
            <p className="text-sm text-muted-foreground">
              No quizzes taken yet. Complete a lesson to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(quizByDomain).map(([domainId, results]) => {
              const accentLCH = DOMAIN_ACCENT_MAP[domainId] ?? "0.55 0.01 275";
              return (
                <div
                  key={domainId}
                  className="rounded-lg border border-border/50 bg-card p-4"
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: `oklch(${accentLCH})` }}
                  >
                    {getDomainLabel(domainId)}
                  </p>
                  <div className="space-y-2">
                    {results.map((qr, i) => (
                      <div
                        key={qr.quizId}
                        data-ocid={`progress.quiz.item.${i + 1}`}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {qr.quizId}
                        </span>
                        <span
                          className="font-medium px-2 py-0.5 rounded text-xs"
                          style={{
                            backgroundColor: qr.passed
                              ? "oklch(0.65 0.18 145 / 0.12)"
                              : "oklch(0.62 0.22 25 / 0.12)",
                            color: qr.passed
                              ? "oklch(0.75 0.15 145)"
                              : "oklch(0.75 0.15 25)",
                          }}
                        >
                          {Number(qr.score)} pts ·{" "}
                          {qr.passed ? "Passed" : "Not passed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Time spent */}
      {hasTimeData && (
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">
            Time Spent
          </h2>
          <div className="rounded-lg border border-border/50 bg-card p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Total:{" "}
              <span className="font-medium text-foreground">
                {totalMinutes} minutes
              </span>
            </p>
            <div className="space-y-3">
              {perDomain
                .filter((d) => Number(d.seconds) > 0)
                .map((d, i) => {
                  const minutes = Math.round(Number(d.seconds) / 60);
                  const accentLCH =
                    DOMAIN_ACCENT_MAP[d.domain] ?? "0.55 0.01 275";
                  const pct =
                    totalMinutes > 0 ? (minutes / totalMinutes) * 100 : 0;

                  return (
                    <div
                      key={d.domain}
                      data-ocid={`progress.time.item.${i + 1}`}
                    >
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">
                          {getDomainLabel(d.domain)}
                        </span>
                        <span className="text-foreground font-medium">
                          {minutes}m
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-border/30 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: `oklch(${accentLCH})`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* Back to home */}
      <div className="pt-4 border-t border-border/40">
        <Link
          to="/"
          data-ocid="progress.home.link"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to all domains
        </Link>
      </div>
    </main>
  );
}
