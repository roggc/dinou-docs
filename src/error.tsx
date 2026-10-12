import { Link, type ErrorProps } from "dinou";
import {
  AlertTriangle,
  RotateCcw,
  Home,
  BookOpen,
  Github,
  ChevronDown,
  Terminal,
} from "lucide-react";

export default function ErrorPage({ error, params }: ErrorProps) {
  const errorMessage = error?.message || "An unexpected runtime error occurred.";
  const errorName = error?.name || "ApplicationError";
  const errorStack = error?.stack;

  return (
    <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-12 min-h-[75vh]">
      <div className="max-w-xl w-full text-center space-y-6 bg-card border border-border/80 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden backdrop-blur-sm">
        {/* Ambient Glows */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-rose-500/15 dark:bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-inner">
          <AlertTriangle className="w-8 h-8 stroke-[2.2]" />
        </div>

        {/* Text Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>500 • Application Error</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
            An unexpected runtime error occurred while rendering this route.
            You can try reloading the page or return to the home page.
          </p>
        </div>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href=""
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </a>

          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground font-medium rounded-xl border border-border/80 hover:bg-muted/80 active:scale-[0.98] transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
        </div>

        {/* Collapsible Error Diagnostics (Only available if framework passes errorStack in development) */}
        {errorStack && (
          <details className="group pt-2 text-left">
            <summary className="w-full inline-flex items-center justify-between px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/40 hover:bg-muted/70 border border-border/60 rounded-xl transition-colors cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-2 truncate pr-2">
                <Terminal className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="font-semibold text-foreground/80">
                  Diagnostics:
                </span>
                <span className="truncate text-muted-foreground font-mono text-[11px]">
                  {errorMessage}
                </span>
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>

            <div className="mt-3 text-left space-y-3 p-4 bg-zinc-950 text-zinc-100 rounded-xl border border-zinc-800 text-xs font-mono shadow-inner overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80 gap-2">
                <span className="text-[11px] font-semibold text-rose-400 break-all">
                  {errorName}: {errorMessage}
                </span>
              </div>

              <pre className="overflow-x-auto max-h-56 p-1 text-[11px] leading-relaxed text-zinc-300 font-mono scrollbar-thin whitespace-pre">
                {errorStack}
              </pre>
            </div>
          </details>
        )}

        {/* Footer Support Links */}
        <div className="pt-2 border-t border-border/50 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentation</span>
          </Link>
          <span className="opacity-40">•</span>
          <a
            href="https://github.com/roggc/dinou-docs/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Report on GitHub</span>
          </a>
        </div>
      </div>
    </main>
  );
}
