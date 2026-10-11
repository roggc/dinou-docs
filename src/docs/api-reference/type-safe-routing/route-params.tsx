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
        A standalone utility type representing the inferred parameters dictionary of a given route pattern. While <code>PageProps</code> and <code>PageFunctions</code> resolve route strings directly, <code>RouteParams</code> is ideal for typing Server Actions, services, or custom helper functions that do not inherit framework props automatically.
      </p>

      {/* Parameter Mapping Table */}
      <div className="my-4 not-prose overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-xs text-left">
          <thead className="bg-muted text-muted-foreground font-semibold">
            <tr>
              <th className="p-2.5">Pattern Segment</th>
              <th className="p-2.5">Route Example</th>
              <th className="p-2.5">Inferred <code>RouteParams&lt;T&gt;</code></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            <tr>
              <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">[id]</td>
              <td className="p-2.5 font-mono text-muted-foreground">/products/[id]</td>
              <td className="p-2.5 font-mono">&#123; id: string &#125;</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-purple-600 dark:text-purple-400">[...slug]</td>
              <td className="p-2.5 font-mono text-muted-foreground">/docs/[...slug]</td>
              <td className="p-2.5 font-mono">&#123; slug: string[] &#125;</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-amber-600 dark:text-amber-400">[[...slug]]</td>
              <td className="p-2.5 font-mono text-muted-foreground">/shop/[[...slug]]</td>
              <td className="p-2.5 font-mono">&#123; slug?: string[] &#125;</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400">[[tab]]</td>
              <td className="p-2.5 font-mono text-muted-foreground">/settings/[[tab]]</td>
              <td className="p-2.5 font-mono">&#123; tab?: string &#125;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CodeBlock
        language="typescript"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { RouteParams } from "dinou";

// 1. Single dynamic parameter
export async function getAuthorBio(params: RouteParams<"/blog/[slug]">) {
  return fetchBioBySlug(params.slug); // params.slug is string
}

// 2. Catch-all dynamic parameter
export async function getDocsContent(params: RouteParams<"/docs/[...slug]">) {
  return fetchDocsByPath(params.slug.join("/")); // params.slug is string[]
}

// 3. In custom helper types (note: for error.tsx, prefer native ErrorProps<T>)
interface CustomErrorWrapper {
  error: Error;
  params: RouteParams<"/blog/[slug]">;
}`}
      </CodeBlock>
    </section>
  );
}
