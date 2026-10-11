"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function ErrorPropsSection() {
  return (
    <section id="errorprops" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>ErrorProps&lt;T&gt;</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          TypeScript Generic
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          error.tsx
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Official TypeScript interface for typing React Error Page components (<code>error.tsx</code>). In addition to inferred <code>params</code>, it strictly types the caught <code>error: Error</code>.
      </p>

      <CodeBlock
        language="tsx"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { ErrorProps } from "dinou";

export default function DashboardError({ error, params }: ErrorProps<"/dashboard/[teamId]">) {
  return (
    <div>
      <h2>Failed to load team {params.teamId}</h2>
      <p>{error.message}</p>
    </div>
  );
}`}
      </CodeBlock>
    </section>
  );
}
