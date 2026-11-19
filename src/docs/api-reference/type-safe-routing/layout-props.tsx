"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function LayoutPropsSection() {
  return (
    <section id="layoutprops" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>LayoutProps&lt;T, TProps&gt;</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          TypeScript Generic
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          layout.tsx
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Official TypeScript generic for typing React Layout components (<code>layout.tsx</code>), constrained by <code>DinouLayoutPattern</code> (including intermediate horizontal layouts without a sibling <code>page.tsx</code>). Automatically types <code>children: ReactNode</code>, cumulative segment <code>params: LayoutParams&lt;T&gt;</code>, auto-inferred sibling parallel <code>@slot</code> props (via <code>LayoutSlots&lt;T&gt;</code>), and optional custom props <code>TProps</code> from <code>layout_functions.ts</code> (<code>getProps</code>).
      </p>

      <CodeBlock
        language="tsx"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { LayoutProps } from "dinou";

// Includes children, params.org, auto-inferred @sidebar slot, and custom layout_functions props
export default function WorkspaceLayout({
  children,
  params,
  sidebar,
  orgName,
}: LayoutProps<"/workspace/[org]", { orgName: string }>) {
  return (
    <section>
      <header>{orgName} ({params.org})</header>
      <div className="flex">
        <aside>{sidebar}</aside>
        <main>{children}</main>
      </div>
    </section>
  );
}`}
      </CodeBlock>
    </section>
  );
}
