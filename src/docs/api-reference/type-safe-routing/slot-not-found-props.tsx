"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function SlotAndNotFoundPropsSection() {
  return (
    <section id="slot-notfound-props" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>SlotProps&lt;T&gt;</code> &amp; <code>NotFoundProps&lt;T, TProps&gt;</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          TypeScript Generics
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          @slot/page.tsx &amp; not_found.tsx
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Dedicated generics for parallel route slots (<code>SlotProps&lt;T&gt;</code>, constrained by <code>DinouSlotPattern</code>) and 404 boundaries (<code>NotFoundProps&lt;T, TProps&gt;</code>, constrained by <code>DinouNotFoundPattern</code>, supporting root, leaf, and intermediate <code>not_found.tsx</code> files plus optional custom <code>TProps</code> from a sibling <code>page_functions.ts</code>).
      </p>

      <CodeBlock
        language="tsx"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { SlotProps, NotFoundProps } from "dinou";

// 1. Parallel @slot page (src/workspace/[org]/@analytics/page.tsx)
export function AnalyticsSlot({ params }: SlotProps<"/workspace/[org]/@analytics">) {
  return <aside>Analytics for {params.org}</aside>;
}

// 2. Scoped 404 boundary (src/workspace/[org]/not_found.tsx)
export default function WorkspaceNotFound({
  params,
}: NotFoundProps<"/workspace/[org]">) {
  return <h1>Resource not found inside {params.org}</h1>;
}`}
      </CodeBlock>
    </section>
  );
}
