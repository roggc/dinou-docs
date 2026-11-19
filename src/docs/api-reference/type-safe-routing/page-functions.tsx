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
        Canonical TypeScript generics for typing server lifecycle files (<code>page_functions.ts</code> and <code>layout_functions.ts</code>). Exported from <code>dinou</code>, re-exported from <code>dinou/server</code>, and pre-bound automatically when imported from route-contextual <code>&quot;./dinou&quot;</code>. <code>PageFunctions</code> accepts a <code>DinouRoutePattern</code> (or params dictionary), while <code>LayoutFunctions</code> accepts a <code>DinouLayoutPattern</code> (including intermediate layouts without a sibling <code>page.tsx</code>), providing full compile-time typing for <code>getProps</code>, <code>getStaticPaths</code>, <code>validateParams</code>, <code>getCacheTags</code>, <code>revalidate</code>, <code>ppr</code>, and <code>allowISG</code>.
      </p>

      <CodeBlock
        language="typescript"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { PageFunctions, LayoutFunctions } from "dinou";

// 1. Direct route string pattern (infers params & getStaticPaths shapes automatically)
export const getProps: PageFunctions<
  "/blog/[slug]",
  { postTitle: string }
>["getProps"] = async (params) => {
  return { postTitle: \`Article: \${params?.slug}\` };
};

// 2. Strict index-access typing for layout_functions.ts (including intermediate layouts)
export const ppr: LayoutFunctions<"/workspace/[org]">["ppr"] = true;
export const revalidate: LayoutFunctions["revalidate"] = 3600;

// 3. Zero-boilerplate alternative inside src/blog/[slug]/page_functions.ts
// import type { PageFunctions } from "./dinou";
// export const getStaticPaths: PageFunctions["getStaticPaths"] = ["hello-world"];`}
      </CodeBlock>
    </section>
  );
}
