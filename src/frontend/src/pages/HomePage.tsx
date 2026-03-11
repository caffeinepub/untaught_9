import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { DOMAINS } from "@/data/domains";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useCompletionStats, useMyProgress } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { BarChart2, ChevronRight, Lock } from "lucide-react";

const DOMAIN_ACCENT_MAP: Record<string, string> = {
  indigo: "0.72 0.2 265",
  amber: "0.72 0.18 55",
  red: "0.62 0.22 25",
  teal: "0.65 0.16 185",
  green: "0.65 0.18 145",
  blue: "0.72 0.18 245",
  violet: "0.72 0.2 295",
  slate: "0.72 0.06 240",
};

function getAccentFromClass(accentClass: string): string {
  const key = accentClass.replace(
    "accent-",
    "",
  ) as keyof typeof DOMAIN_ACCENT_MAP;
  return DOMAIN_ACCENT_MAP[key] ?? "0.72 0.2 265";
}

export function HomePage() {
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const { data: progress, isLoading: progressLoading } = useMyProgress();
  const { data: stats } = useCompletionStats();

  const completedDomains = progress?.completedDomains ?? [];
  const completedModules: string[] = progress?.completedModules ?? [];
  const domainsCompleted = stats ? Number(stats.domainsCompleted) : 0;
  const totalDomains = 8;
  const progressPercent = (domainsCompleted / totalDomains) * 100;

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero */}
      <section className="mb-12 sm:mb-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          A self-directed curriculum
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-foreground leading-none mb-4">
          Untaught
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-md leading-relaxed">
          What school forgot to teach you.
        </p>
      </section>

      {/* Progress — only if logged in */}
      {isLoggedIn && (
        <section className="mb-10 sm:mb-14">
          <div className="rounded-lg border border-border/60 bg-card p-4 sm:p-6">
            {progressLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-2 w-full" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Overall progress
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {domainsCompleted} of {totalDomains} domains
                    </span>
                    <Link
                      to="/progress"
                      data-ocid="home.progress.link"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <BarChart2 className="h-3 w-3" />
                      <span className="hidden sm:inline">View all</span>
                    </Link>
                  </div>
                </div>
                <Progress value={progressPercent} className="h-1.5" />
              </>
            )}
          </div>
        </section>
      )}

      {/* Domain grid */}
      <section>
        <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Domains
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {DOMAINS.map((domain, i) => {
            const accentLCH = getAccentFromClass(domain.accentClass);
            const isCompleted = completedDomains.includes(domain.id);
            const domainModulesCompleted = isLoggedIn
              ? completedModules.filter((m) =>
                  m.startsWith(`${domain.id}-module-`),
                ).length
              : 0;

            if (domain.available) {
              return (
                <Link
                  key={domain.id}
                  to={domain.path}
                  data-ocid={`home.domain_card.${i + 1}`}
                  className="group relative flex flex-col rounded-lg border border-border/60 bg-card p-4 sm:p-5 hover:border-opacity-100 transition-all duration-300 cursor-pointer overflow-hidden"
                  style={
                    {
                      "--card-accent": `oklch(${accentLCH})`,
                    } as React.CSSProperties
                  }
                >
                  {/* Accent glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top left, oklch(${accentLCH} / 0.08) 0%, transparent 60%)`,
                    }}
                  />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: `oklch(${accentLCH})`,
                      opacity: 0.6,
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: `oklch(${accentLCH})` }}
                      >
                        {domain.moduleCount} modules
                      </span>
                      {isCompleted && (
                        <span
                          className="text-xs font-medium px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `oklch(${accentLCH} / 0.15)`,
                            color: `oklch(${accentLCH})`,
                          }}
                        >
                          ✓ Done
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-tight">
                      {domain.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {domain.description}
                    </p>

                    {/* Module progress count — only when logged in and there's progress */}
                    {isLoggedIn && domainModulesCompleted > 0 && (
                      <p
                        className="text-xs mb-3"
                        style={{ color: `oklch(${accentLCH} / 0.8)` }}
                      >
                        {domainModulesCompleted}/{domain.moduleCount} modules
                        done
                      </p>
                    )}

                    {!isLoggedIn || domainModulesCompleted === 0 ? (
                      <div className="mb-3" />
                    ) : null}

                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium transition-colors"
                      style={{ color: `oklch(${accentLCH})` }}
                    >
                      Start learning
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={domain.id}
                data-ocid={`home.domain_card.${i + 1}`}
                className="relative flex flex-col rounded-lg border border-border/40 bg-card/50 p-4 sm:p-5 cursor-not-allowed overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-30"
                  style={{ background: `oklch(${accentLCH})` }}
                />

                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: `oklch(${accentLCH} / 0.6)` }}
                  >
                    {domain.moduleCount} modules
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs border-border/40 text-muted-foreground gap-1"
                  >
                    <Lock className="h-2.5 w-2.5" />
                    Coming soon
                  </Badge>
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground/80 mb-2 leading-tight">
                  {domain.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {domain.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
