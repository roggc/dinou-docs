"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function PagePropsSection() {
  return (
    <section id="pageprops" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>PageProps&lt;T, TProps&gt;</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          TypeScript Generic
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          page.tsx
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Official TypeScript generic for typing React Page components (<code>page.tsx</code>). Accepts a route pattern string (constrained by <code>DinouRoutePattern | DinouRegisteredSlotPattern</code>) and an optional second type argument <code>TProps</code> for custom props returned by <code>page_functions.ts</code> (<code>getProps</code>), automatically inferring the strongly typed <code>params</code> object. Inside a route folder, importing <code>PageProps</code> from route-contextual <code>&quot;./dinou&quot;</code> pre-binds <code>T</code> automatically so only optional <code>TProps</code> is needed.
      </p>

      <CodeBlock
        language="tsx"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { PageProps } from "dinou";

// 1. Single dynamic route + custom props from page_functions.ts (getProps)
export default function BlogPost({
  params,
  title,
}: PageProps<"/blog/[slug]", { title: string }>) {
  // ✅ params.slug is strongly typed as string
  return <h1>{title} ({params.slug})</h1>;
}

// 2. Catch-all dynamic route
export function DocsPage({ params }: PageProps<"/docs/[...slug]">) {
  // ✅ params.slug is strongly typed as string[]
  return <h1>Document: {params.slug.join("/")}</h1>;
}

// 3. Zero-boilerplate alternative inside src/blog/[slug]/page.tsx
// import type { PageProps } from "./dinou";
// export default function Page({ params }: PageProps) { ... }`}
      </CodeBlock>
    </section>
  );
}
