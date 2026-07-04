"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import {
  Cpu,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Code2,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "architecture-refactor", title: "1. React Flight Architecture", level: 2 },
  { id: "server-components", title: "2. Synchronous Server Components", level: 2 },
  { id: "new-apis", title: "3. New page_functions APIs", level: 2 },
  { id: "anti-bot-shield", title: "4. Anti-Bot Shield Middleware", level: 2 },
  { id: "imports-adjustments", title: "5. Import Extension Fixes", level: 2 },
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
                Migration & Changes from v4
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou v5 introduces a major internal rendering architecture redesign and loosens Server Component constraints to align more closely with native React behavior.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* 1. React Flight Architecture */}
            <section id="architecture-refactor">
              <h2>1. Architectural Refactor: Transition to React Flight</h2>
              <p>
                Dinou v5 completely overhauls the internal communication layer used during initial Server-Side Rendering (SSR).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <Card className="border-slate-200 dark:border-slate-800 min-w-0 w-full">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      In Dinou v4
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed">
                    During SSR, the parent process executed the Server Components and serialized the resulting <strong>resolved JSX tree</strong> into a custom JSON format to pass it to the child process. The child process then deserialized this JSON back into JSX before generating the HTML.
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10 min-w-0 w-full">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-blue-500" />
                      In Dinou v5
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed">
                    The custom JSON bridge between processes is completely removed. During SSR, the parent process streams the standard <strong>React Flight</strong> payload directly to the child process, which consumes it using <code>createFromNodeStream</code> to render the HTML.
                  </CardContent>
                </Card>
              </div>

              <div className="border border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/10 rounded-lg p-4 bg-card not-prose">
                <div className="flex items-center gap-2 font-semibold mb-2 text-blue-600 dark:text-blue-400">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <span>Why this Refactor?</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  <li><strong>Unified Protocol:</strong> Consolidates both initial SSR and client-side page transitions under a single, native React Flight streaming protocol, removing the need for a separate JSON-based bridge.</li>
                  <li><strong>True Stream Processing:</strong> The child process can now parse and render HTML chunks incrementally as they arrive, rather than waiting for a full JSON payload to be fully generated and deserialized.</li>
                  <li><strong>Improved Robustness:</strong> Eliminates the custom JSX-to-JSON serialization code, delegating all prop serialization (including complex nested structures or React references) directly to React's native, battle-tested engine.</li>
                </ul>
              </div>

              <Alert className="not-prose mt-6 border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertTitle className="text-amber-600 dark:text-amber-400">⚠️ Breaking Change: useSearchParams() & usePathname() are Client-Only</AlertTitle>
                <AlertDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Because v5 strictly enforces React Flight module boundaries (under the <code>react-server</code> condition), modules marked with <code>"use client"</code> cannot be executed on the server by Server Components.
                  Calling <code>useSearchParams()</code> or <code>usePathname()</code> inside a Server Component will now throw a runtime crash.
                  <div className="mt-2 font-semibold">Migration Path:</div>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
                    <li><strong>In Client Components:</strong> These hooks continue to work normally (ensure <code>"use client";</code> is declared at the top of the file).</li>
                    <li><strong>In Server Components:</strong> Access the pathname via <code>getContext().req.path</code> and query parameters via <code>getContext().req.query</code> instead of calling the hooks.</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </section>





            {/* 2. Synchronous Server Components */}
            <section id="server-components" className="mt-12 pt-8 border-t">
              <h2>2. Synchronous Server Components</h2>
              <p>
                In previous versions of Dinou, all Server Components had to follow strict rules. In v5, constraints are lifted to provide more flexibility.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <Card className="border-slate-200 dark:border-slate-800 min-w-0 w-full">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      In Dinou v4
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>
                      Every Server Component was strictly required to be declared as an <code>async function</code>, even if it did not perform asynchronous operations.
                    </p>
                    <CodeBlock language="jsx" hideHeader>
                      {`// v4: Force async even for static components
export default async function Page() {
  return <h1>Hello World</h1>;
}`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10 min-w-0 w-full">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
                      <Code2 className="h-4 w-4" />
                      In Dinou v5
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>
                      This restriction has been removed. A Server Component only needs to be <code>async</code> if it uses <code>await</code> in its body. Synchronous components work natively.
                    </p>
                    <CodeBlock language="jsx" hideHeader>
                      {`// v5: Pure synchronous components are supported
export default function Page() {
  return <h1>Hello World</h1>;
}`}
                    </CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 3. New Control APIs */}
            <section id="new-apis" className="mt-12 pt-8 border-t">
              <h2>3. New Control APIs in <code>page_functions</code></h2>
              <p>
                Dinou v5 introduces two new optional exports inside the <code>page_functions.ts</code> (or <code>.js</code>) files to give you finer control over dynamic routes before they enter the render cycle:
              </p>

              <div className="space-y-6 not-prose mt-6">
                <Card className="min-w-0 w-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                      <span>validateParams(params)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Allows dynamic route parameters validation (e.g., checking UUID formats or numeric IDs) before serving the page. Returning <code>false</code> will instantly abort the request and respond with a 404, bypassing render engines and data fetching.
                    </p>
                    <CodeBlock language="typescript" hideHeader>
                      {`// Validate id parameters are strictly numeric
export function validateParams(params) {
  return typeof params.id === "string" && /^\\d+$/.test(params.id);
}`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                <Card className="min-w-0 w-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                      <Cpu className="h-5 w-5 text-blue-500" />
                      <span>allowISG()</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Allows opting out of Incremental Static Generation (ISG). If it returns <code>false</code>, any dynamic path that was not generated at server startup (via <code>getStaticPaths</code>) will return a 404 response on the spot instead of generating on-demand.
                    </p>
                    <CodeBlock language="typescript" hideHeader>
                      {`// Disable on-demand generation; serve getStaticPaths ONLY
export function allowISG() {
  return false;
}`}
                    </CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 4. Anti-Bot Shield Middleware */}
            <section id="anti-bot-shield" className="mt-12 pt-8 border-t">
              <h2>4. Built-in Anti-Bot Shield (Express Middleware)</h2>
              <p>
                Dinou v5 introduces an integrated <strong>Anti-Bot Shield</strong> middleware inside <code>server.js</code> to protect applications using dynamic Incremental Static Generation (ISG).
              </p>
              <Alert className="not-prose mt-4 border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-600 dark:text-blue-400">Security & Performance Protection</AlertTitle>
                <AlertDescription className="text-xs leading-relaxed mt-1 text-muted-foreground space-y-2">
                  <p>
                    Vulnerability scanning bots routinely crawl web servers searching for typical targets (like <code>.php</code> scripts, <code>.env</code> files, backup files, or paths like <code>/wp-admin</code>).
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">The Risks in ISG:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>CPU &amp; Memory Exhaustion (Short Term):</strong> Since ISG attempts to compile unknown paths on-demand by spawning background child processes, a concurrent bot scan of thousands of fake routes would fork too many processes at once, spiking CPU usage to 100% and causing a Denial of Service (DoS).
                    </li>
                    <li>
                      <strong>Disk Space Inflation (Long Term):</strong> Successful ISG builds are written to the server's filesystem (saving both <code>index.html</code> and <code>rsc.rsc</code> files). Letting bots generate static files for thousands of arbitrary garbage paths would eventually fill up the server's disk space.
                    </li>
                  </ul>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">The Shield Solution:</p>
                  <p>
                    The middleware intercepts requests matching common bot scanning patterns and returns an instant <strong>404 Not Found</strong>, completely bypassing the ISG compilation process and safeguarding system stability.
                  </p>
                </AlertDescription>
              </Alert>
              <p className="mt-4">
                If you are developing a route that matches these patterns (for instance, if you require a page ending in <code>.php</code> or using paths like <code>wp-admin</code>), the server will block it and return a 404 by default. You can adjust the <code>botGarbagePatterns</code> list in <code>dinou/core/server.js</code> if you need to bypass this protection for specific routes.
              </p>
            </section>

            {/* 5. Import Extension Fixes */}
            <section id="imports-adjustments" className="mt-12 pt-8 border-t">
              <h2>5. Minor Adjustments for Legacy Imports (Isolated Cases)</h2>
              <p>
                Dinou v5 enforces modern ES Modules (ESM) resolution standards.
              </p>
              <Alert className="not-prose mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>ES Modules Resolution Notice</AlertTitle>
                <AlertDescription>
                  When migrating older applications, you might encounter resolution warnings or errors with older third-party libraries that do not fully adhere to strict ESM specs.
                  In those rare scenarios, you might need to add the explicit file extension (e.g., adding <code>.js</code> at the end of the import statement) to satisfy the resolver.
                </AlertDescription>
              </Alert>
              <p className="mt-4">
                This is only necessary for non-compliant third-party code and does not affect the standard source code of your application.
              </p>
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
