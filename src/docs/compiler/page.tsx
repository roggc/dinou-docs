import { Link } from "dinou";
import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Zap,
  Code,
  Cpu,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Boxes,
  FileWarning,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";

const tocItems = [
  {
    id: "overview",
    title: "Overview: Automatic Memoization",
    level: 2,
  },
  {
    id: "dual-engine-scope",
    title: "Dual-Engine Compilation Scope",
    level: 3,
  },
  {
    id: "code-comparison",
    title: "1. Code Comparison: Plain React vs Hooks",
    level: 2,
  },
  {
    id: "bundler-integration",
    title: "2. Bundler Integration Matrix",
    level: 2,
  },
  {
    id: "dev-vs-prod-strategy",
    title: "2.1. Why Dev vs Prod Behavior Differs",
    level: 3,
  },
  {
    id: "react-strict-mode",
    title: "3. StrictMode & Compiler Configuration",
    level: 2,
  },
  {
    id: "strict-mode-react-compiler",
    title: "3.1. Why StrictMode is Vital for React Compiler",
    level: 3,
  },
  {
    id: "configuring-strict-mode",
    title: "3.2. Configuring dinou.config.ts",
    level: 3,
  },
  {
    id: "rules-of-react",
    title: "4. Guidelines for Compiler Purity",
    level: 2,
  },
  {
    id: "use-no-memo",
    title: '4.1. Local Opt-Out with "use no memo"',
    level: 3,
  },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>React Compiler &amp; StrictMode | Dinou Docs</title>
      <meta
        name="description"
        content="Forget about manual useMemo and useCallback. Dinou integrates the React Compiler across Esbuild, Rollup, and Webpack to automatically optimize client renders at build time."
      />
      <link rel="canonical" href="https://dinou.dev/docs/compiler" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Zero-Config Optimization
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                React 19 Compiler
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                React Compiler &amp; StrictMode
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Forget about manual <code>useMemo</code>, <code>useCallback</code>,
              and <code>React.memo</code>. Dinou pre-bundles and activates{" "}
              <code>babel-plugin-react-compiler</code> out of the box for
              production builds, paired with <code>reactStrictMode</code> in
              development to guarantee deterministic parity.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Overview: Automatic Memoization</h2>
              <p>
                Dinou ships with the official <strong>React Compiler</strong>{" "}
                pre-compiled inside its internal vendor toolchain—meaning you do
                not need to install <code>babel-plugin-react-compiler</code> or{" "}
                <code>@babel/*</code> packages in your project, even under strict{" "}
                <code>pnpm</code> workspaces. At production build time, the
                compiler analyzes data flow and mutability to automatically
                memoize derived values, JSX subtrees, and callback references.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                      <Code className="h-5 w-5" />
                      <span>Cleaner Codebase</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Write idiomatic, plain React. Eliminates manual dependency
                    arrays, stale closure bugs, and premature memoization
                    boilerplate.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Zap className="h-5 w-5" />
                      <span>Fine-Grained Runtime Memoization</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Synthesizes low-level memoization slots (
                    <code>react/compiler-runtime</code>) at the statement and
                    conditional branch level—something impossible with manual{" "}
                    <code>useMemo</code> calls.
                  </CardContent>
                </Card>
              </div>

              <section id="dual-engine-scope" className="mt-6 scroll-mt-20">
                <h3>Dual-Engine Compilation Scope</h3>
                <p>
                  In Dinou&apos;s{" "}
                  <Link href="/docs/server-client-components">
                    Server &amp; Client Component architecture
                  </Link>
                  , the React Compiler targets the exact modules where reactive
                  re-renders occur:
                </p>
                <ul>
                  <li>
                    <strong>Client Component Subgraphs:</strong> Compiles root{" "}
                    <code>&quot;use client&quot;</code> entry files, all
                    imported child React components (even when child files do
                    not repeat <code>&quot;use client&quot;</code>), and custom
                    client hooks (<code>use*</code>).
                  </li>
                  <li>
                    <strong>Server Functions Isolation:</strong> Modules marked
                    with{" "}
                    <Link href="/docs/server-functions">
                      <code>&quot;use server&quot;</code>
                    </Link>{" "}
                    (module-level or inline) are converted into lightweight RPC
                    proxies <em>before</em> the React Compiler runs, ensuring
                    server code is never analyzed as client UI or leaked into
                    browser chunks.
                  </li>
                  <li>
                    <strong>Server Components &amp; Pre-Compiled Packages:</strong>{" "}
                    Server Components execute once per request or static cache
                    pass on the server and never re-render on client state
                    updates, so they skip Babel compilation for maximum build
                    speed. At the same time, Dinou&apos;s RSC server dispatcher
                    implements React 19&apos;s <code>useMemoCache</code> hook so
                    third-party libraries pre-compiled with the React Compiler
                    execute seamlessly during server rendering.
                  </li>
                </ul>
              </section>
            </section>

            {/* 1. Code Comparison */}
            <section
              id="code-comparison"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h2>1. Code Comparison: Plain React vs Hooks</h2>
              <p>
                With the React Compiler active, write components and custom
                hooks naturally. Whether <code>OrderSummary</code> has its own{" "}
                <code>&quot;use client&quot;</code> directive or is imported as a
                child module inside a client boundary, Dinou compiles it
                automatically:
              </p>

              <CodeBlock
                language="tsx"
                containerClassName="w-full overflow-hidden rounded-lg my-4"
              >
{`// ❌ Legacy React: Manual Memoization Boilerplate
function OrderSummary({ items, filter }: { items: Item[]; filter: string }) {
  // Manual memoization required to avoid recalculations on every render
  const filtered = useMemo(() => {
    return items.filter((item) => item.category === filter);
  }, [items, filter]);

  // Manual callback to prevent breaking child component memoization
  const handleSelect = useCallback((id: string) => {
    trackSelection(id);
  }, []);

  return <OrderList items={filtered} onSelect={handleSelect} />;
}

// ✅ Dinou: Plain Idiomatic React (React Compiler Active)
function OrderSummary({ items, filter }: { items: Item[]; filter: string }) {
  // ✨ Automatically memoized by the React Compiler
  const filtered = items.filter((item) => item.category === filter);

  // ✨ Function reference automatically stabilized
  const handleSelect = (id: string) => {
    trackSelection(id);
  };

  return <OrderList items={filtered} onSelect={handleSelect} />;
}`}
              </CodeBlock>
            </section>

            {/* 2. Bundler Integration */}
            <section
              id="bundler-integration"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h2>2. Bundler Integration Matrix</h2>
              <p>
                Across all three supported{" "}
                <Link href="/docs/bundlers">Dinou bundlers</Link>, Dinou uses a
                unified two-tier compilation strategy that balances{" "}
                <strong>instantaneous development HMR</strong> with{" "}
                <strong>maximum production runtime performance</strong>.
              </p>

              <div className="not-prose my-6">
                <div className="border rounded-lg p-5 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-base mb-4">
                    <Boxes className="h-5 w-5 text-primary" />
                    <span>Compiler Activation by Bundler</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Esbuild */}
                    <div className="p-4 bg-muted/50 rounded-lg border border-primary/30">
                      <div className="font-bold text-sm mb-2 flex items-center justify-between">
                        <span>Esbuild (Default)</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          Prod Only
                        </span>
                      </div>
                      <div className="text-xs space-y-1.5 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span>
                            Development: <strong>Disabled</strong> (SWC + Esbuild)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>
                            Production: <strong>Enabled</strong>
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 border-t pt-2">
                        Pre-compiles JSX/TS and Fast Refresh via a Rust SWC disk
                        cache (<code>.dinou/swc</code>) and bundles natively
                        with Esbuild in dev for sub-millisecond HMR; runs Babel
                        + React Compiler across the full client graph in
                        production.
                      </p>
                    </div>

                    {/* Rollup */}
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="font-bold text-sm mb-2 flex items-center justify-between">
                        <span>Rollup</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          Prod Only
                        </span>
                      </div>
                      <div className="text-xs space-y-1.5 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span>
                            Development: <strong>Disabled</strong> (SWC)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>
                            Production: <strong>Enabled</strong>
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 border-t pt-2">
                        Transpiles via Rust-based SWC in dev for fast rebuilds;
                        switches to Babel + React Compiler for production
                        bundles.
                      </p>
                    </div>

                    {/* Webpack */}
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="font-bold text-sm mb-2 flex items-center justify-between">
                        <span>Webpack</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          Prod Only
                        </span>
                      </div>
                      <div className="text-xs space-y-1.5 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span>
                            Development: <strong>Disabled</strong> (SWC)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>
                            Production: <strong>Enabled</strong>
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 border-t pt-2">
                        Uses Dinou&apos;s custom <code>swc-loader</code> in dev
                        to eliminate multi-second rebuilds; activates{" "}
                        <code>babel-loader</code> + React Compiler in production.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2.1 Why Dev vs Prod */}
              <section id="dev-vs-prod-strategy" className="mt-8 scroll-mt-20">
                <h3>2.1. Why Dev vs Prod Behavior Differs</h3>
                <p>
                  The React Compiler performs whole-function control-flow graph
                  (CFG) analysis and Abstract Syntax Tree (AST) lowering through
                  Babel.
                </p>
                <div className="border rounded-lg p-4 bg-card not-prose my-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Cpu className="h-5 w-5 text-amber-500" />
                    <span>Developer Experience (DX) Rationale</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                    <li>
                      <strong>In Development (Esbuild, Rollup &amp; Webpack):</strong>{" "}
                      Running full Babel AST compilation on every keystroke slows
                      down Hot Module Replacement (HMR). Dinou uses Rust SWC
                      transforms (paired with Esbuild, Rollup, or Webpack
                      bundling) during <code>dinou dev</code> so edits reflect in
                      the browser instantaneously.
                    </li>
                    <li>
                      <strong>In Production (<code>dinou build</code>):</strong>{" "}
                      All three bundlers run <code>babel-plugin-react-compiler</code>{" "}
                      across your client module graph, emitting finely memoized
                      production chunks with zero manual hook overhead.
                    </li>
                  </ul>
                </div>
              </section>
            </section>

            {/* 3. React StrictMode & Config */}
            <section
              id="react-strict-mode"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h2 className="m-0">
                  3. StrictMode &amp; Compiler Configuration
                </h2>
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Defaults: true
                </span>
              </div>
              <p className="mt-4">
                Dinou enables both <code>reactStrictMode: true</code> (in
                development only—automatically omitted in production builds with
                zero runtime overhead) and <code>reactCompiler: true</code> (in
                production) by default.
              </p>

              {/* 3.1 Why StrictMode is Vital */}
              <section
                id="strict-mode-react-compiler"
                className="mt-6 scroll-mt-20"
              >
                <h3>3.1. Why StrictMode is Vital for the React Compiler</h3>
                <p>
                  Because all three bundlers bypass Babel in development for
                  instant HMR, Dinou relies on <code>reactStrictMode</code> to
                  ensure that{" "}
                  <strong>
                    what works in development behaves identically when compiled
                    in production
                  </strong>
                  .
                </p>

                <div className="border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 rounded-lg p-4 not-prose my-6">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>How StrictMode Bridges Dev and Prod</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                    <p>
                      The React Compiler assumes your components follow the{" "}
                      <strong>Rules of React</strong>—specifically, that
                      rendering is pure and free of side effects.
                    </p>
                    <p>
                      When <code>reactStrictMode</code> is enabled in
                      development, React{" "}
                      <strong>intentionally double-invokes</strong> component
                      renders, initializer functions, updater callbacks, and
                      effect setup/cleanup cycles:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Exposes Impure Renders Immediately:</strong> If
                        a component mutates external variables or props during
                        render, double invocation surfaces the bug right away in{" "}
                        <code>dinou dev</code>.
                      </li>
                      <li>
                        <strong>Guarantees Production Safety:</strong> Code that
                        passes StrictMode in development is safe to memoize.
                        When <code>dinou build</code> enables the React Compiler
                        across Esbuild, Rollup, or Webpack, memoized renders
                        produce the exact same UI output.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3.2 Configuring StrictMode & Compiler */}
              <section
                id="configuring-strict-mode"
                className="mt-8 scroll-mt-20"
              >
                <h3>
                  3.2. Configuring <code>dinou.config.ts</code>
                </h3>
                <p>
                  Both <code>reactCompiler</code> and{" "}
                  <code>reactStrictMode</code> can be configured globally in{" "}
                  <code>dinou.config.ts</code> (or <code>.mjs</code> /{" "}
                  <code>.js</code> / <code>.cjs</code>)
                  using <code>defineConfig</code> from{" "}
                  <code>&quot;dinou/config&quot;</code> (also re-exported from{" "}
                  <code>&quot;dinou&quot;</code>):
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    tabs={[
                      {
                        id: "ts",
                        label: "dinou.config.ts",
                        language: "typescript",
                        code: `import { defineConfig } from "dinou/config";

export default defineConfig({
  /**
   * Enable or disable babel-plugin-react-compiler during production builds
   * across Esbuild, Rollup, and Webpack.
   * @default true
   */
  reactCompiler: true,

  /**
   * Enable or disable React <StrictMode> in development mode.
   * Double-invokes render and effect lifecycles in dev to surface side effects.
   * @default true
   */
  reactStrictMode: true,
});`,
                      },
                      {
                        id: "js",
                        label: "dinou.config.js",
                        language: "javascript",
                        code: `import { defineConfig } from "dinou/config";

export default defineConfig({
  reactCompiler: true,
  reactStrictMode: true,
});`,
                      },
                    ]}
                  />
                </div>
              </section>
            </section>

            {/* 4. Guidelines for Purity */}
            <section
              id="rules-of-react"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h2>4. Guidelines for Compiler Purity</h2>
              <p>
                To get the maximum benefit from the React Compiler and
                StrictMode in Dinou, follow these core principles:
              </p>

              <div className="space-y-4 my-6 not-prose">
                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>1. Keep Component Render Functions Pure</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Given the same inputs (props, state, context), a component
                    must always return equivalent JSX. Never mutate module-scope
                    variables, refs (<code>ref.current</code>), or input
                    arguments during render.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>2. Treat Props and State as Immutable</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Never mutate <code>props.user.name = &quot;new&quot;</code>{" "}
                    or sort prop arrays in place (<code>items.sort()</code>).
                    Create fresh copies instead (e.g.{" "}
                    <code>{`{ ...user, name: "new" }`}</code> or{" "}
                    <code>[...items].sort()</code>). Locally created objects and
                    arrays inside render <em>can</em> be mutated freely before
                    being returned.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      3. Isolate Side Effects to Event Handlers,{" "}
                      <code>useEffect</code>, or Server Functions
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Timers, DOM subscriptions, and data mutations belong inside
                    event handlers, <code>useEffect</code>, or{" "}
                    <Link
                      href="/docs/server-functions"
                      className="text-primary underline underline-offset-4"
                    >
                      Server Functions
                    </Link>
                    —never directly in the render body.
                  </p>
                </div>
              </div>

              <section id="use-no-memo" className="mt-8 scroll-mt-20">
                <h3>
                  4.1. Local Opt-Out with <code>&quot;use no memo&quot;</code>
                </h3>
                <p>
                  If a specific legacy component or custom hook relies on a
                  third-party library that mutates values incompatibly with
                  memoization, you do not need to set{" "}
                  <code>reactCompiler: false</code> globally. Place the{" "}
                  <code>&quot;use no memo&quot;</code> directive at the top of
                  that function body to skip compilation locally while keeping
                  the rest of your app optimized:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-4"
                >
{`"use client";

export function LegacyChartAdapter({ mutableConfig }: { mutableConfig: Record<string, unknown> }) {
  "use no memo"; // 👈 Skips React Compiler for this component only

  return <div data-mode={String(mutableConfig.mode ?? "default")} />;
}`}
                </CodeBlock>

                <Alert className="my-6">
                  <FileWarning className="h-4 w-4" />
                  <AlertTitle>Incremental Adoption Tip</AlertTitle>
                  <AlertDescription>
                    Prefer <code>&quot;use no memo&quot;</code> on individual
                    components while refactoring legacy code. Reserve{" "}
                    <code>reactCompiler: false</code> in{" "}
                    <code>dinou.config.ts</code> only when diagnosing
                    application-wide migration issues.
                  </AlertDescription>
                </Alert>
              </section>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
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
