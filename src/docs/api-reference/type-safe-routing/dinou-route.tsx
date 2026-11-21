"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function DinouRouteSection() {
  return (
    <section id="dinouroute" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>DinouRoute</code>, <code>DinouLinkTarget</code> &amp; <code>DinouFromRoute</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Union Types
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Outward Navigation
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        The outward navigation type family generated into <code>.dinou/types/routes.d.ts</code>:
      </p>
      <ul className="mt-2 text-sm text-muted-foreground space-y-1">
        <li>
          <code>DinouRoute</code>: Concrete navigable URLs (static routes, interpolated dynamic routes, query suffixes <code>?key=val</code>, hashes <code>#section</code>, and external schemes <code>http://</code>, <code>https://</code>, <code>mailto:</code>, <code>tel:</code>). Ideal for custom wrapper props such as <code>&lt;NavButton href=&#123;href&#125; /&gt;</code>.
        </li>
        <li>
          <code>DinouLinkTarget</code>: Union of <code>DinouRoute</code> plus dynamic route patterns (<code>&quot;/blog/[slug]&quot;</code>, with optional <code>?</code> / <code>#</code> suffix) so <code>&lt;Link&gt;</code> and <code>router.push()</code> autocomplete dynamic routes and enforce a typed <code>params</code> object whenever a <code>[param]</code> pattern is chosen.
        </li>
        <li>
          <code>DinouFromRoute</code> &amp; <code>DinouRelativeLinkTarget&lt;TFrom&gt;</code>: Strictly validate relative paths (<code>&quot;sub&quot;</code>, <code>&quot;./sub&quot;</code>, <code>&quot;../sibling&quot;</code>) against an explicit <code>from</code> origin (or automatically via <code>DinouScopedLinkTarget&lt;TFrom&gt;</code> when importing <code>Link</code> / <code>useRouter</code> from contextual <code>&quot;./dinou&quot;</code>).
        </li>
      </ul>

      <CodeBlock
        language="tsx"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { DinouRoute, DinouLinkTarget, DinouFromRoute } from "dinou";
import { Link, useRouter } from "dinou";

// 1. Typing custom navigation components accepting concrete URLs
interface NavButtonProps {
  href: DinouRoute;
  label: string;
}

export function NavButton({ href, label }: NavButtonProps) {
  return <Link href={href}>{label}</Link>;
}

// 2. Programmatic navigation (concrete URL, pattern + params, or strict relative with from)
export function ActionPanel() {
  const router = useRouter();

  const goDocs = (destination: DinouRoute) => router.push(destination);
  const goPost = (slug: string) =>
    router.push("/blog/[slug]", { params: { slug } });
  const goSibling = (from: DinouFromRoute = "/dashboard/settings") =>
    router.push("../billing", { from });

  return <button onClick={() => goDocs("/docs/api-reference")}>API</button>;
}`}
      </CodeBlock>
    </section>
  );
}
