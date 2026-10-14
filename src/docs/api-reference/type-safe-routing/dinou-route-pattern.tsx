"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function DinouRoutePatternSection() {
  return (
    <section id="dinouroutepattern" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>DinouRoutePattern</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          Union Type
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Inward Definition
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        A union type representing all registered filesystem folder patterns across your application (e.g. <code>&quot;/blog/[slug]&quot;</code>, <code>&quot;/docs/[...slug]&quot;</code>). It is used as the generic constraint for <code>PageProps&lt;T&gt;</code> and <code>LayoutProps&lt;T&gt;</code>, enabling instant IDE autocomplete via <code>Ctrl + Space</code> and guaranteeing compliance with TypeScript declaration emit rules (TS4058).
      </p>

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
