"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function ContextualDinouSection() {
  return (
    <section id="contextual-dinou" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          Contextual <code>&quot;./dinou&quot;</code> Module
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Zero Boilerplate
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          .dinou/routes/**/dinou.&#123;js,d.ts&#125;
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Every active route directory under <code>src/</code> receives an auto-generated virtual module at <code>.dinou/routes/&lt;dir&gt;/dinou.&#123;js,d.ts&#125;</code> (kept up to date by <code>dinou dev</code>, <code>dinou build</code>, and <code>dinou typegen</code>, wired via TypeScript <code>rootDirs: [&quot;src&quot;, &quot;.dinou/routes&quot;]</code>). Importing from <code>&quot;./dinou&quot;</code> pre-binds <code>ROUTE</code>, <code>PageProps</code>, <code>LayoutProps</code>, <code>SlotProps</code>, <code>ErrorProps</code>, <code>NotFoundProps</code>, <code>PageFunctions</code>, <code>LayoutFunctions</code>, <code>RouteParams</code>, <code>Link</code>, and memoized <code>useRouter</code> to that folder—while re-exporting all root <code>dinou</code> runtime APIs and types (including <code>DinouEnv</code>).
      </p>

      <CodeBlock
        language="tsx"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`// src/workspace/[org]/settings/page.tsx
import { Link, ROUTE, type PageProps } from "./dinou";

export default function SettingsPage({ params }: PageProps) {
  // ✅ params.org is inferred automatically without writing PageProps<"/workspace/[org]/settings">
  // ✅ ROUTE === "/workspace/[org]/settings"
  return (
    <main>
      <h1>Settings for {params.org}</h1>
      {/* Relative targets autocomplete & validate without passing from="..." */}
      <Link href="security">Security</Link>
      <Link href="../members">Team Members</Link>
    </main>
  );
}`}
      </CodeBlock>
    </section>
  );
}
