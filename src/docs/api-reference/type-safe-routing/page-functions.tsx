"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function PageFunctionsSection() {
  return (
    <section id="pagefunctions" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>PageFunctions&lt;TParams, TProps&gt;</code> &amp; <code>LayoutFunctions&lt;TParams, TProps&gt;</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          TypeScript Generics
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Server Lifecycle Contracts
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Canonical TypeScript interfaces for typing server lifecycle files (<code>page_functions.ts</code> and <code>layout_functions.ts</code>). Both interfaces accept either a route pattern string directly (e.g. <code>&quot;/blog/[slug]&quot;</code>) or a direct parameters dictionary, providing complete compile-time type safety, IDE autocompletion, and index-access typing (e.g. <code>PageFunctions[&quot;revalidate&quot;]</code>) without boilerplate.
      </p>

      <CodeBlock
        language="typescript"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { PageFunctions, LayoutFunctions } from "dinou";

// 1. Direct route string pattern (automatically infers route parameters)
export const getProps: PageFunctions<
  "/blog/[slug]",
  { postTitle: string }
>["getProps"] = async (params) => {
  return { postTitle: \`Article: \${params.slug}\` };
};

// 2. Strict index-access typing for layout_functions.ts
export const ppr: LayoutFunctions["ppr"] = true;
export const revalidate: LayoutFunctions["revalidate"] = 3600;`}
      </CodeBlock>
    </section>
  );
}
