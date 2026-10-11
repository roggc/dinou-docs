"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function RouteParamsSection() {
  return (
    <section id="routeparams" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>RouteParams&lt;T&gt;</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          TypeScript Utility
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Params Inference
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        A standalone utility type representing the inferred parameters dictionary of a given route pattern. While <code>PageProps</code> and <code>PageFunctions</code> resolve route strings directly, <code>RouteParams</code> is ideal for typing Server Actions, services, or error boundary components that do not inherit framework props automatically.
      </p>

      <CodeBlock
        language="typescript"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { RouteParams } from "dinou";

// 1. In Server Actions or external services
export async function getAuthorBio(params: RouteParams<"/blog/[slug]">) {
  return fetchBioBySlug(params.slug);
}

// 2. In error.tsx boundaries
interface ErrorProps {
  error: Error;
  params: RouteParams<"/blog/[slug]">;
}`}
      </CodeBlock>
    </section>
  );
}
