"use client";

import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Zap, Layers, CheckCircle2, Code2, Sliders } from "lucide-react";

export function UseNavigationLoadingSection() {
  return (
    <section id="usenavigationloading" className="scroll-mt-20 mt-8">
      <div className="flex items-center gap-2">
        <h3 className="m-0">
          <code>useNavigationLoading()</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          "use client"
        </span>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          React 19 Transitions
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        A Client Component hook that returns a boolean indicating whether an asynchronous SPA client-side route navigation or soft refresh is currently in progress. It subscribes to Dinou&apos;s router transition state, allowing you to render sleek progress bars, loading spinners, or disabled button states while the server renders and streams the new route payload.
      </p>

      {/* SSR Safety Callout */}
      <div className="p-3.5 rounded-lg bg-card border border-border not-prose my-4 space-y-1.5 text-xs">
        <div className="font-semibold text-foreground flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>SSR Safety &amp; Zero Hydration Mismatch</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          On the server (during SSR and static build generation), <code>useNavigationLoading()</code> unconditionally returns <code>false</code>. This guarantees that initial server-rendered HTML documents are never emitted with flashing progress bars or active loading spinners, eliminating layout shifts and preventing hydration mismatch errors.
        </p>
      </div>

      {/* ============================================================= */}
      {/* SUBSECTION 1: TRIGGER EVENTS & RUNTIME BEHAVIOR */}
      {/* ============================================================= */}
      <div id="usenavigationloading-behavior" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
          <Code2 className="h-4 w-4 text-emerald-500" />
          <span>Trigger Events &amp; Scope</span>
        </h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Overview of user actions that activate the transition state versus actions that remain localized.
        </p>

        <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
          <table className="w-full text-xs text-left border-collapse min-w-[650px]">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-3">Category</th>
                <th className="p-3">Trigger Mechanism</th>
                <th className="p-3">Activates Loading?</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground align-top">Link Navigation</td>
                <td className="p-3 font-mono text-[11px] align-top">&lt;Link href=&quot;...&quot;&gt;</td>
                <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">Yes</td>
                <td className="p-3 align-top leading-relaxed">
                  Internal page transitions via declarative Link components trigger React transitions immediately on click.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground align-top">Imperative Navigation</td>
                <td className="p-3 font-mono text-[11px] align-top">router.push() / router.replace()</td>
                <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">Yes</td>
                <td className="p-3 align-top leading-relaxed">
                  Programmatic redirects triggered in form submissions, callbacks, or buttons.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground align-top">History Traversal</td>
                <td className="p-3 font-mono text-[11px] align-top">Browser Back / Forward / popstate</td>
                <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">Yes</td>
                <td className="p-3 align-top leading-relaxed">
                  Activating browser history buttons triggers transition state while restoring the destination page.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground align-top">Soft Route Reload</td>
                <td className="p-3 font-mono text-[11px] align-top">router.refresh()</td>
                <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">Yes</td>
                <td className="p-3 align-top leading-relaxed">
                  Refetching the active route&apos;s RSC payload runs within a transition, preserving client state.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground align-top">Targeted Micro-ISR</td>
                <td className="p-3 font-mono text-[11px] align-top">refreshSlot()</td>
                <td className="p-3 align-top font-semibold text-muted-foreground">No</td>
                <td className="p-3 align-top leading-relaxed">
                  Localized slot revalidation uses its own internal <code>&lt;Suspense&gt;</code> boundary; does not toggle global navigation loading.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground align-top">Deferred Data Streaming</td>
                <td className="p-3 font-mono text-[11px] align-top">&lt;Suspense fallback=&#123;...&#125;&gt;</td>
                <td className="p-3 align-top font-semibold text-muted-foreground">No</td>
                <td className="p-3 align-top leading-relaxed">
                  Late-arriving streamed chunks inside an active view render their own fallbacks independently.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================= */}
      {/* SUBSECTION 2: CONCURRENT TRANSITION ARCHITECTURE */}
      {/* ============================================================= */}
      <div id="usenavigationloading-architecture" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
        <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          <span>Non-Blocking Concurrent Transitions</span>
        </h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          How React 19 concurrent transitions keep the user interface responsive during flight fetches.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Responsive, Non-Freezing UI</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              In traditional single-page apps, clicking a link often causes the screen to freeze or clear immediately. In Dinou, navigations execute within React&apos;s <code>startTransition</code>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The current screen remains fully responsive, interactive, and scrollable while the server computes and streams the destination page in the background.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-blue-500" />
              <span>Atomic Screen Replacement</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Dinou preserves the existing view until the server has streamed enough of the new route to render its initial component shell.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The transition completes atomically: <code>useNavigationLoading()</code> flips back to <code>false</code> precisely when the new DOM is painted, eliminating blank screen flashes.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* SUBSECTION 3: PRODUCTION INDICATORS */}
      {/* ============================================================= */}
      <div id="usenavigationloading-examples" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
        <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
          <Sliders className="h-4 w-4 text-emerald-500" />
          <span>Production Implementation Patterns</span>
        </h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Explore real-world patterns for top progress bars, accessible screen readers, and double-click navigation guards.
        </p>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="progress-bar"
            tabs={[
              {
                id: "progress-bar",
                label: "top-progress-bar.tsx (Slim Top Bar)",
                language: "tsx",
                code: `// src/components/top-progress-bar.tsx (Client Component)
"use client";

import { useNavigationLoading } from "dinou";

export function TopProgressBar() {
  const isNavigating = useNavigationLoading();

  if (!isNavigating) return null;

  return (
    <div
      role="progressbar"
      aria-label="Loading page"
      className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-primary overflow-hidden shadow-[0_0_8px_rgba(59,130,246,0.5)]"
    >
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}`,
              },
              {
                id: "spinner",
                label: "global-spinner.tsx (Floating Status)",
                language: "tsx",
                code: `// src/components/global-spinner.tsx (Client Component)
"use client";

import { useNavigationLoading } from "dinou";

export function GlobalNavigationIndicator() {
  const isNavigating = useNavigationLoading();

  if (!isNavigating) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-card border rounded-full shadow-lg text-xs font-medium text-foreground transition-all"
    >
      <div className="h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span>Loading content...</span>
    </div>
  );
}`,
              },
              {
                id: "guard-button",
                label: "nav-button.tsx (Double-Click Guard)",
                language: "tsx",
                code: `// src/components/nav-button.tsx (Client Component)
"use client";

import { useNavigationLoading, useRouter } from "dinou";

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
}

export function NavButton({ href, children }: NavButtonProps) {
  const router = useRouter();
  const isNavigating = useNavigationLoading();

  return (
    <button
      onClick={() => router.push(href)}
      disabled={isNavigating}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
    >
      {isNavigating ? "Navigating..." : children}
    </button>
  );
}`,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
