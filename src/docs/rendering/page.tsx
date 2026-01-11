"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Zap,
  RefreshCw,
  Info,
  Layers,
  FilePlus2,
  ServerCog,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "static-bailout", title: "Automatic Static Bailout", level: 2 },
  { id: "forced-dynamic", title: "Forced Dynamic Rendering", level: 2 },
  { id: "isr", title: "Incremental Static Regeneration (ISR)", level: 2 },
  { id: "isg", title: "Incremental Static Generation (ISG)", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Rendering Strategies
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou is <strong>Static by Default</strong>. It intelligently
              adapts its rendering strategy based on your code and
              configuration, from pure SSG to full SSR.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="static-bailout">
              <h2>Automatic Static Bailout</h2>
              <p>
                You don't need to manually configure pages as "Static" or
                "Dynamic". Dinou analyzes your code at build time. By default,
                pages are pre-rendered (SSG).
              </p>
              <p>
                However, if your component accesses{" "}
                <strong>request-specific data</strong> (cookies, headers, or
                search params), Dinou automatically "bails out" of static
                generation and switches to{" "}
                <strong>Server-Side Rendering (SSR)</strong> for that specific
                route.
              </p>

              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/profile/page.tsx
import { getContext } from "dinou";

export default async function Profile() {
  const ctx = getContext();
  
  // ⚠️ Accessing cookies triggers the Automatic Static Bailout
  // This page will now be rendered on every request (SSR)
  const token = ctx.req.cookies.session_token;

  const user = await fetchUser(token);
  return <h1>Hello, {user.name}</h1>;
}`}
              </CodeBlock>

              <Alert className="not-prose mt-4">
                <Zap className="h-4 w-4" />
                <AlertTitle>Triggers</AlertTitle>
                <AlertDescription>
                  The bailout occurs when using: <code>getContext()</code>{" "}
                  (cookies/headers) or <code>useSearchParams()</code> in a
                  Server Component.
                </AlertDescription>
              </Alert>
            </section>

            <section id="forced-dynamic">
              <h2>Forced Dynamic Rendering</h2>
              <p>
                Sometimes you want a page to be rendered on every request even
                if you don't use cookies or headers (e.g., displaying random
                data, or always-fresh DB content without caching).
              </p>
              <p>
                You can force SSR by exporting a <code>dynamic</code> function
                from your <code>page_functions.ts</code> file.
              </p>

              <div className="grid gap-4">
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/random/page_functions.ts
export function dynamic() {
  return true; // Forces SSR on every request
}`}
                </CodeBlock>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/random/page.tsx
export default async function Page() {
  return <div suppressHydrationWarning>Random: {Math.random()}</div>;
}`}
                </CodeBlock>
              </div>
            </section>

            <section id="isr">
              <h2>Incremental Static Regeneration (ISR)</h2>
              <p>
                ISR allows you to update static pages after you've built your
                site. You can rebuild specific pages in the background as
                traffic comes in, ensuring users always see relatively fresh
                content without rebuilding the entire project.
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/blog/page_functions.ts
export function revalidate() {
  return 60000; // Time in milliseconds (1 minute)
}`}
              </CodeBlock>

              <div className="not-prose mt-6 grid gap-6 md:grid-cols-2">
                <Card className="bg-muted/50 border-border">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <RefreshCw className="h-5 w-5 text-blue-500" />
                      <span>How it works</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    The first request after the 60s window receives the stale
                    (cached) page. In the background, Dinou rebuilds the page.
                    Subsequent requests will see the new version.
                  </CardContent>
                </Card>
                <Card className="bg-muted/50 border-border">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Info className="h-5 w-5 text-orange-500" />
                      <span>Configuration</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    If <code>revalidate</code> returns <code>0</code> or is
                    undefined, the page remains static indefinitely (standard
                    SSG).
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="isg">
              <h2>Incremental Static Generation (ISG)</h2>
              <p>
                While ISR updates <em>existing</em> pages, <strong>ISG</strong>{" "}
                allows you to generate <em>new</em> pages that weren't present
                at build time.
              </p>
              <p>
                This is particularly useful for large e-commerce sites or blogs
                where building thousands of pages upfront is too slow. You can
                build the most popular pages at build time and let the rest be
                generated on demand.
              </p>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">Implementation</h3>
                <p>
                  Simply omit the paths you want to defer from{" "}
                  <code>getStaticPaths</code>. Dinou will handle the routing
                  automatically.
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/products/[id]/page_functions.ts

export async function getStaticPaths() {
  // Only generate the top 10 products at build time
  const topProducts = await db.getTopProducts(10);
  
  return topProducts.map(p => p.id);
  
  // Any ID not in this list will be generated 
  // on-demand when a user visits /products/999
}`}
                </CodeBlock>

                <div className="not-prose flex items-start gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <FilePlus2 className="h-6 w-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">
                      The First Visit & Revalidation
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      When a user requests a path that wasn't pre-built, Dinou
                      renders it on the server (like SSR), caches the result,
                      and serves it as static HTML for all future visitors.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 border-t border-border pt-2">
                      <strong>Important:</strong> These pages are fully
                      integrated with ISR. If a <code>revalidate</code> function
                      is defined in <code>page_functions.ts</code> (returning{" "}
                      {">"} 0), the generated page will not be static forever—it
                      will regenerate in the background when stale.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Visible on Desktop */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
