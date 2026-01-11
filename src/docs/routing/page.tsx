"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Badge } from "@/docs/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Split,
  Layers,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FolderTree,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "route-types", title: "Route Types", level: 2 },
  { id: "optional-segments", title: "Optional Segments Rules", level: 2 },
  { id: "advanced-routing", title: "Advanced Routing", level: 2 },
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
                Routing
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou uses a file-system based router. Your file structure defines
              your URL paths.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Any file named <code>page.jsx</code>, <code>page.tsx</code>,{" "}
                <code>page.js</code>, or <code>page.ts</code> inside the{" "}
                <code>src</code> directory automatically becomes a public route.
              </p>
              <div className="not-prose bg-muted/50 rounded-lg p-4 border border-border flex items-center gap-4">
                <FolderTree className="h-10 w-10 text-muted-foreground" />
                <div className="text-sm font-mono">
                  <div>
                    src/page.tsx &rarr;{" "}
                    <span className="text-blue-600 dark:text-blue-400">/</span>
                  </div>
                  <div>
                    src/blog/page.tsx &rarr;{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      /blog
                    </span>
                  </div>
                  <div>
                    src/blog/[slug]/page.tsx &rarr;{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      /blog/hello-world
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section id="route-types">
              <h2>Basic & Dynamic Routes</h2>
              <p>
                Dinou supports various pattern matching strategies for dynamic
                routing:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4">Pattern</th>
                      <th className="p-4">File Path</th>
                      <th className="p-4">URL Example</th>
                      <th className="p-4">
                        Params (<code>params</code>)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-semibold">Static</td>
                      <td className="p-4 font-mono text-xs">src/page.jsx</td>
                      <td className="p-4 font-mono text-xs">/</td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        {"{}"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Dynamic</td>
                      <td className="p-4 font-mono text-xs">
                        src/blog/[slug]/page.jsx
                      </td>
                      <td className="p-4 font-mono text-xs">/blog/hello</td>
                      <td className="p-4 font-mono text-xs text-blue-600">
                        {"{ slug: 'hello' }"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Optional</td>
                      <td className="p-4 font-mono text-xs">
                        src/blog/[[slug]]/page.jsx
                      </td>
                      <td className="p-4 font-mono text-xs">/blog</td>
                      <td className="p-4 font-mono text-xs text-blue-600">
                        {"{ slug: undefined }"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Catch-all</td>
                      <td className="p-4 font-mono text-xs">
                        src/blog/[...slug]/page.jsx
                      </td>
                      <td className="p-4 font-mono text-xs">/blog/a/b/c</td>
                      <td className="p-4 font-mono text-xs text-purple-600">
                        {"{ slug: ['a','b','c'] }"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Optional Catch-all</td>
                      <td className="p-4 font-mono text-xs">
                        src/blog/[[...slug]]/page.jsx
                      </td>
                      <td className="p-4 font-mono text-xs">/blog</td>
                      <td className="p-4 font-mono text-xs text-purple-600">
                        {"{ slug: [] }"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Alert className="not-prose mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  Route parameters are passed as the <code>params</code> prop to{" "}
                  <code>page</code>, <code>layout</code>, <code>error</code>,
                  and <code>not_found</code> pages. Query parameters (e.g.,{" "}
                  <code>?q=hello</code>) are <strong>NOT</strong> passed as
                  props; use the <code>useSearchParams()</code> hook instead.
                </AlertDescription>
              </Alert>
            </section>

            <section id="optional-segments">
              <h2>Optional Segments Rules</h2>
              <p>
                Dinou enforces a strict <strong>No-Gap Rule</strong> when using
                deep nested optional segments like{" "}
                <code>[[warehouse]]/[[aisle]]</code>.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Allowed: Trailing Omission</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2">
                      You can omit optional segments only if they are at the{" "}
                      <strong>end</strong> of the URL.
                    </p>
                    <div className="font-mono bg-background/50 p-2 rounded text-xs">
                      /inventory/main/a1 ✅<br />
                      /inventory/main ✅<br />
                      /inventory ✅
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-red-500/20 bg-red-50/50 dark:bg-red-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
                      <XCircle className="h-5 w-5" />
                      <span>Forbidden: Intercalated Gaps</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2">
                      You cannot skip an earlier segment and define a later one.
                    </p>
                    <div className="font-mono bg-background/50 p-2 rounded text-xs">
                      (Goal: Skip warehouse, set aisle)
                      <br />❌ Impossible to represent in URL
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h3>Catch-all Constraints</h3>
              <p>
                Because Catch-all segments (<code>[...slug]</code>) consume the
                rest of the URL, they must always be the{" "}
                <strong>terminal (last) segment</strong> of a route definition.
                You cannot place other static or dynamic folders inside a
                Catch-all folder.
              </p>
            </section>

            <section id="advanced-routing">
              <h2>Advanced Routing</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Route Groups
                  </h3>
                  <p>
                    Wrap a folder name in parentheses <code>(folder)</code> to
                    omit it from the URL. This allows you to organize your code
                    without affecting the public path.
                  </p>
                  <ul className="list-none pl-0 space-y-2 font-mono text-sm bg-muted p-4 rounded-lg">
                    <li>
                      src/(auth)/login/page.jsx &rarr;{" "}
                      <span className="font-bold">/login</span>
                    </li>
                    <li>
                      src/(marketing)/about/page.jsx &rarr;{" "}
                      <span className="font-bold">/about</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2">
                    <Split className="h-5 w-5" />
                    Parallel Routes
                  </h3>
                  <p>
                    Use slots starting with <code>@</code> (e.g.,{" "}
                    <code>@sidebar</code>) to render multiple pages in the same
                    layout simultaneously. This enables independent UI sections
                    and <strong>Error Containment</strong>.
                  </p>
                  <CodeBlock
                    language="jsx"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
                    {`// src/dashboard/layout.jsx
export default function Layout({ children, sidebar }) {
  // 'sidebar' comes from src/dashboard/@sidebar/page.jsx
  return (
    <div className="grid">
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}`}
                  </CodeBlock>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Hidden on Mobile */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
