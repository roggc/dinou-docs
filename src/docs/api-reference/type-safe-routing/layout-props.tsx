"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function LayoutPropsSection() {
  return (
    <section id="layoutprops" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>LayoutProps&lt;T&gt;</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          TypeScript Generic
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          layout.tsx
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Official TypeScript interface for typing React Layout components (<code>layout.tsx</code>). In addition to inferred <code>params</code>, it strictly types <code>children: React.ReactNode</code>.
      </p>

      <CodeBlock
        language="tsx"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { LayoutProps } from "dinou";

export default function BlogLayout({ children, params }: LayoutProps<"/blog/[slug]">) {
  return (
    <section>
      <header>Category: {params.slug}</header>
      <main>{children}</main>
    </section>
  );
}`}
      </CodeBlock>
    </section>
  );
}
