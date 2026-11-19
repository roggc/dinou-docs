"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function DinouRoutePatternSection() {
  return (
    <section id="dinouroutepattern" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>DinouRoutePattern</code> &amp; Segment Pattern Unions
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          Union Types
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Inward Definition
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        <code>DinouRoutePattern</code> represents all registered page route patterns across your application (e.g. <code>&quot;/blog/[slug]&quot;</code>, <code>&quot;/docs/[...slug]&quot;</code>) and constrains <code>PageProps&lt;T&gt;</code> and <code>PageFunctions&lt;T&gt;</code>. Companion segment unions enable dedicated <code>Ctrl + Space</code> autocomplete across every boundary type while complying with TypeScript declaration emit rules (TS4058):
      </p>
      <ul className="mt-2 text-sm text-muted-foreground space-y-1">
        <li><code>DinouLayoutPattern</code> — constrains <code>LayoutProps&lt;T&gt;</code>, <code>LayoutParams&lt;T&gt;</code>, and <code>LayoutFunctions&lt;T&gt;</code> (includes intermediate layouts with no sibling <code>page.tsx</code>).</li>
        <li><code>DinouSlotPattern</code> — constrains <code>SlotProps&lt;T&gt;</code> and <code>SlotParams&lt;T&gt;</code> (parallel <code>@slot</code> folders, e.g. <code>&quot;/dashboard/[org]/@analytics&quot;</code>).</li>
        <li><code>DinouErrorPattern</code> — constrains <code>ErrorProps&lt;T&gt;</code> and <code>ErrorParams&lt;T&gt;</code> (pages, intermediate folders, and <code>@slot/error.tsx</code>).</li>
        <li><code>DinouNotFoundPattern</code> — constrains <code>NotFoundProps&lt;T&gt;</code> (root, leaf, and intermediate <code>not_found.tsx</code> boundaries, excluding <code>@slot</code> folders).</li>
        <li><code>DinouSegmentPattern</code> — combined union of all page, layout, slot, and error patterns accepted by <code>RouteParams&lt;T&gt;</code>.</li>
      </ul>

      <CodeBlock
        language="tsx"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { DinouRoutePattern, PageProps } from "dinou";

// 1. Creating strongly typed page helper wrappers or metadata generators
export function definePageMeta<T extends DinouRoutePattern>(
  route: T,
  generator: (props: PageProps<T>) => { title: string; description?: string }
) {
  return generator;
}

// ✅ Valid: autocompletes route patterns and infers correct params
export const postMeta = definePageMeta("/blog/[slug]", ({ params }) => {
  return { title: \`Reading: \${params.slug}\` };
});

// ❌ TypeScript error if using an unregistered route pattern
// definePageMeta("/invalid/route/[id]", ...);`}
      </CodeBlock>
    </section>
  );
}
