import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link } from "@tanstack/react-router";
import { BarChart2, BookOpen, Loader2, LogIn, LogOut } from "lucide-react";

export function AppHeader() {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
            Untaught
          </span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/glossary"
            data-ocid="home.glossary.link"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 -m-2 rounded-md"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Glossary</span>
          </Link>

          {isLoggedIn && (
            <Link
              to="/progress"
              data-ocid="nav.progress.link"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 -m-2 rounded-md"
            >
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </Link>
          )}

          {isInitializing ? (
            <div className="h-9 w-20 rounded-md bg-secondary/50 animate-pulse" />
          ) : isLoggedIn ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => clear()}
              data-ocid="nav.login.button"
              className="gap-1.5 border-border/60 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => login()}
              disabled={isLoggingIn}
              data-ocid="nav.login.button"
              className="gap-1.5 border-border/60"
            >
              {isLoggingIn ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <LogIn className="h-3.5 w-3.5" />
              )}
              <span className="hidden sm:inline">
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
