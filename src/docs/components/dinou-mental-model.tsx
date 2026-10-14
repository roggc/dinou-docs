"use client";

import { InteractiveCodeTabs } from "@/docs/components/interactive-code-tabs";
import { Route, Database, Cpu, CheckCircle2 } from "lucide-react";

/**
 * DinouMentalModel:
 * Standalone, parkable component extracted from introduction page.
 * Ready to be reincorporated or placed anywhere in the documentation.
 */
export function DinouMentalModel() {
  return (
    <section id="mental-model" className="scroll-mt-20">
      <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
        The Dinou Mental Model
      </h2>
      <p>
        Dinou keeps things clean and predictable. You do not need to memorize complex configuration files or synthetic APIs. Everything revolves around three direct concepts:
      </p>

      <div className="grid gap-3 sm:grid-cols-3 not-prose my-6">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
          <div className="flex items-center gap-2 font-semibold text-sm text-blue-600 dark:text-blue-400 mb-1">
            <Route className="w-4 h-4" />
            Folders are Routes
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Files inside <code>src/</code> map directly to URLs. <code>src/page.tsx</code> is <code>/</code>, and <code>src/blog/[slug]/page.tsx</code> is <code>/blog/:slug</code>.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
          <div className="flex items-center gap-2 font-semibold text-sm text-purple-600 dark:text-purple-400 mb-1">
            <Database className="w-4 h-4" />
            Clean Data Contracts
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Server data logic lives in <code>page_functions.ts</code>. <code>getProps</code> returns props directly to your component without wrapper objects.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
          <div className="flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1">
            <Cpu className="w-4 h-4" />
            Server First
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Components render on the server by default (zero client JS). Add <code>&apos;use client&apos;</code> strictly when you need interactive state or events.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 mt-6 mb-2">
        See it in action: A complete page in 4 files
      </h3>
      <p className="text-sm text-muted-foreground">
        Explore the tabs below to see how pages, data fetching, client interactivity, and layouts connect naturally:
      </p>

      {/* Interactive Code Window */}
      <InteractiveCodeTabs />

      <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-xs text-muted-foreground not-prose flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <span>
          <strong>Predictable by design:</strong> In Dinou, <code>revalidate</code> is always declared in <strong>seconds</strong> (<code>0</code> = SSR on every request, <code>&gt;= 1</code> = ISR, <code>false</code> = Static SSG). There are no ambiguous caching flags or mysterious revalidation gotchas.
        </span>
      </div>
    </section>
  );
}
