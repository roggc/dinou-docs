"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function PagePropsSection() {
  return (
    <section id="pageprops" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>PageProps&lt;T&gt;</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          TypeScript Generic
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          page.tsx
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Official TypeScript interface for typing React Page components (<code>page.tsx</code>). Takes the route pattern string (constrained by <code>DinouRoutePattern</code>) as a generic parameter and automatically infers the strongly typed <code>params</code> object.
      </p>

      <CodeBlock
        language="tsx"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { PageProps } from "dinou";

// 1. Single dynamic route: trigger Ctrl + Space inside "" to pick from registered routes
export default function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  // ✅ params.slug is strongly typed as string
  return <h1>Post: {params.slug}</h1>;
}

// 2. Catch-all dynamic route
export function DocsPage({ params }: PageProps<"/docs/[...slug]">) {
  // ✅ params.slug is strongly typed as string[]
  return <h1>Document: {params.slug.join("/")}</h1>;
}`}
      </CodeBlock>
    </section>
  );
}
