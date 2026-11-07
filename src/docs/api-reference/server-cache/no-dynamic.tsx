"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Shield, Zap, Clock } from "lucide-react";

export function NoDynamicSection() {
  return (
    <section id="nodynamic" className="scroll-mt-20 mt-12 pt-8 border-t">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>noDynamic()</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          PPR Control Primitive
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Returns: void
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Opts an enclosing <code>&lt;Suspense&gt;</code> boundary out of becoming a Dynamic PPR Hole when wrapping an asynchronous Server Component on a <code>ppr = true</code> route. Calling <code>noDynamic()</code> synchronously at the top of an async component (before its first <code>await</code>) instructs Dinou to resolve the promise at build/revalidation time and bake the rendered output directly into the Static Shell (<code>shell.html</code>).
      </p>

      <div id="nodynamic-behavior" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>0ms Runtime Hole Skip</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              On <code>ppr = true</code> routes, Dinou normally treats every <code>&lt;Suspense&gt;</code> boundary wrapping an async component as a dynamic hole to be streamed per request.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When <code>noDynamic()</code> is called synchronously before the first <code>await</code>, Dinou records the boundary in the Static Shell metadata and skips it in <strong>0ms</strong> during runtime PPR hole traversal.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-500" />
              <span>Static Shell + Micro-ISR Synergy</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Ideal when a shared component is wrapped in <code>&lt;Suspense&gt;</code> for non-PPR routes or third-party library compatibility, or when combining <code>&lt;Suspense&gt;</code> with <code>&lt;DinouCacheSlot&gt;</code> to keep a slot inside the 0ms Static Shell while still allowing independent Micro-ISR refreshes.
            </p>
          </div>
        </div>

        <Alert className="not-prose mt-4">
          <Shield className="h-4 w-4 text-blue-500" />
          <AlertTitle>Call Synchronously Before the First await</AlertTitle>
          <AlertDescription>
            <code>noDynamic()</code> must be invoked <strong>synchronously</strong> at the very start of your async Server Component (or inside a <code>&lt;DinouCacheSlot&gt;</code> render callback) before any <code>await</code> expression yields control to the event loop.
          </AlertDescription>
        </Alert>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="static-suspense"
            tabs={[
              {
                id: "static-suspense",
                label: "src/docs/page.tsx (Static Suspense in PPR)",
                language: "tsx",
                code: `// src/docs/page.tsx (ppr = true route)
import { Suspense } from "react";
import { noDynamic } from "dinou/server";
import { fetchChangelog } from "@/lib/cms";

export default function DocsOverviewPage() {
  return (
    <main className="space-y-6">
      <h1>Documentation</h1>

      {/* Even though wrapped in <Suspense> on a ppr = true route,
          noDynamic() bakes <ReleaseNotes /> directly into shell.html */}
      <Suspense fallback={<div>Loading notes...</div>}>
        <ReleaseNotes />
      </Suspense>
    </main>
  );
}

async function ReleaseNotes() {
  // Must be called synchronously BEFORE the first await!
  noDynamic();

  const notes = await fetchChangelog();
  return <article>{notes.summary}</article>;
}`,
              },
              {
                id: "shell-slot",
                label: "src/blog/page.tsx (Suspense + DinouCacheSlot in Shell)",
                language: "tsx",
                code: `// src/blog/page.tsx (ppr = true route)
import { Suspense } from "react";
import { DinouCacheSlot, noDynamic } from "dinou/server";
import { fetchTopAuthors } from "@/lib/db";

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading authors...</div>}>
      <DinouCacheSlot id="top-authors" revalidate={300} tag="authors">
        <TopAuthorsWidget />
      </DinouCacheSlot>
    </Suspense>
  );
}

async function TopAuthorsWidget() {
  // Opts the outer <Suspense> + <DinouCacheSlot> into the Static Shell (shell.html)
  // while preserving independent 300s Micro-ISR and revalidateTag("authors") splicing!
  noDynamic();

  const authors = await fetchTopAuthors();
  return (
    <ul>
      {authors.map((a) => (
        <li key={a.id}>{a.name}</li>
      ))}
    </ul>
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

