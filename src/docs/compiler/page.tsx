"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import {
  Zap,
  Code,
  Settings,
  Cpu,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Boxes,
  Sliders,
  Check,
  Layers,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  {
    id: "overview",
    title: "Overview: Automatic Memoization",
    level: 2,
  },
  {
    id: "code-comparison",
    title: "1. Code Comparison: Plain React vs Hooks",
    level: 2,
  },
  {
    id: "bundler-integration",
    title: "2. Bundler Integration Matrix (v7 Strategy)",
    level: 2,
  },
  {
    id: "dev-vs-prod-strategy",
    title: "2.1. Why Dev vs Prod Bundler Behavior Differs",
    level: 3,
  },
  {
    id: "react-strict-mode",
    title: "3. React StrictMode (Default: true in v7)",
    level: 2,
  },
  {
    id: "strict-mode-react-compiler",
    title: "3.1. Why StrictMode is Vital for React Compiler",
    level: 3,
  },
  {
    id: "configuring-strict-mode",
    title: "3.2. Configuring reactStrictMode in dinou.config.mjs",
    level: 3,
  },
  {
    id: "rules-of-react",
    title: "4. Guidelines for Compiler Purity",
    level: 2,
  },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                React Compiler &amp; StrictMode
              </h1>
              <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                Dinou v7
              </span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Forget about manual <code>useMemo</code> and <code>useCallback</code>.
              Dinou integrates the React Compiler to automatically optimize
              component renders at build time, backed by <code>reactStrictMode</code>{" "}
              by default to ensure seamless parity between development and production.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Overview: Automatic Memoization</h2>
              <p>
                Dinou comes with the <strong>React Compiler</strong> enabled out of
                the box. The compiler understands JavaScript semantics and the Rules
                of React. It automatically memoizes values, JSX subtrees, and
                function references, preventing unnecessary re-renders across your
                application.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Code className="h-5 w-5" />
                      <span>Cleaner Codebase</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Write idiomatic, plain React. Eliminates manual dependency
                    arrays, hook boilerplate, and premature memoization mistakes.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Zap className="h-5 w-5" />
                      <span>Surgical Runtime Performance</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Applies fine-grained memoization at the statement level,
                    frequently outperforming manual optimizations by deeply
                    tracking internal data flow.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 1. Code Comparison */}
            <section
              id="code-comparison"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                1. Code Comparison: Plain React vs Hooks
              </h3>
              <p>
                With the React Compiler, write code as if performance is free.
                The compiler automatically synthesizes memoization caches:
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

// ✅ Dinou v7: Plain Idiomatic React (React Compiler Active)
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
              <h3>
                2. Bundler Integration Matrix (v7 Strategy)
              </h3>
              <p>
                Dinou v7 adopts a targeted compilation model across supported
                bundlers to optimize the balance between <strong>instant developer
                iteration (HMR)</strong> and <strong>maximum production performance</strong>.
              </p>

              <div className="not-prose my-6">
                <div className="border rounded-lg p-5 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-base mb-4">
                    <Boxes className="h-5 w-5 text-primary" />
                    <span>Compiler Activation by Bundler</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Webpack */}
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="font-bold text-sm mb-2 flex items-center justify-between">
                        <span>Webpack</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          Dev &amp; Prod
                        </span>
                      </div>
                      <div className="text-xs space-y-1.5 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>Development: <strong>Enabled</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>Production: <strong>Enabled</strong></span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 border-t pt-2">
                        Executes React Compiler in both Dev and Prod for identical AST transformation.
                      </p>
                    </div>

                    {/* Rollup */}
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="font-bold text-sm mb-2 flex items-center justify-between">
                        <span>Rollup</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                          Prod Only
                        </span>
                      </div>
                      <div className="text-xs space-y-1.5 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span>Development: <strong>Disabled</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>Production: <strong>Enabled</strong></span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 border-t pt-2">
                        Bypasses compiler overhead in dev for fast iteration; fully optimizes production builds.
                      </p>
                    </div>

                    {/* Esbuild */}
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="font-bold text-sm mb-2 flex items-center justify-between">
                        <span>Esbuild</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          Prod Only
                        </span>
                      </div>
                      <div className="text-xs space-y-1.5 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span>Development: <strong>Disabled</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>Production: <strong>Enabled</strong></span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 border-t pt-2">
                        Maintains native sub-millisecond HMR in dev; compiles with React Compiler in production.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2.1 Why Dev vs Prod */}
              <section id="dev-vs-prod-strategy" className="mt-8 scroll-mt-20">
                <h4>2.1. Why Dev vs Prod Bundler Behavior Differs</h4>
                <p>
                  The React Compiler performs intensive Static Analysis and Abstract
                  Syntax Tree (AST) parsing via Babel.
                </p>
                <div className="border rounded-lg p-4 bg-card not-prose my-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Cpu className="h-5 w-5 text-amber-500" />
                    <span>Developer Experience (DX) Rationale</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                    <li>
                      <strong>For Esbuild &amp; Rollup in Dev:</strong> Injecting Babel
                      AST transformation into Esbuild or Rollup during development
                      would negate their primary advantage: sub-millisecond Hot Module
                      Replacement (HMR). Dinou disables the compiler in dev mode for
                      these tools to preserve instantaneous live reloading.
                    </li>
                    <li>
                      <strong>For Webpack:</strong> Webpack already operates a pipeline
                      amenable to AST plugins, allowing the React Compiler to run
                      consistently in development and production.
                    </li>
                    <li>
                      <strong>For Production:</strong> All bundlers (Webpack, Rollup,
                      and Esbuild) run with the React Compiler enabled to guarantee
                      maximum production runtime efficiency.
                    </li>
                  </ul>
                </div>
              </section>
            </section>

            {/* 3. React StrictMode */}
            <section
              id="react-strict-mode"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  3. React StrictMode (Default: <code>true</code> in v7)
                </h3>
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Safety Guarantee
                </span>
              </div>
              <p className="mt-4">
                Dinou v7 introduces <code>reactStrictMode: true</code> by default
                in development mode.
              </p>

              {/* 3.1 Why StrictMode is Vital */}
              <section
                id="strict-mode-react-compiler"
                className="mt-6 scroll-mt-20"
              >
                <h4>3.1. Why StrictMode is Vital for the React Compiler</h4>
                <p>
                  A critical challenge with disabling the React Compiler during
                  development (as with Esbuild and Rollup) is ensuring that{" "}
                  <strong>what works in development behaves identically in production</strong>.
                </p>

                <div className="border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20 rounded-lg p-4 not-prose my-6">
                  <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 mb-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>How StrictMode Bridges Dev and Prod</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                    <p>
                      The React Compiler assumes that your components follow the{" "}
                      <strong>Rules of React</strong>—specifically, that component
                      rendering is pure and free of side effects.
                    </p>
                    <p>
                      When <code>reactStrictMode</code> is enabled in development, React{" "}
                      <strong>intentionally double-invokes</strong> component renders,
                      initializer functions, and updater callbacks:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Exposes Impure Renders:</strong> If a component mutates
                        external variables or performs side effects during render, the
                        double invocation immediately breaks the UI in dev mode, alerting you.
                      </li>
                      <li>
                        <strong>Guarantees Production Safety:</strong> Because impurities
                        are caught early in development, your code is proven to be pure.
                        When Esbuild or Rollup enables the React Compiler in production,
                        the compiled memoization output is guaranteed to behave 100%
                        identically to development!
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3.2 Configuring StrictMode */}
              <section id="configuring-strict-mode" className="mt-8 scroll-mt-20">
                <h4>3.2. Configuring <code>reactStrictMode</code> in <code>dinou.config.mjs</code></h4>
                <p>
                  <code>reactStrictMode</code> is enabled by default in Dinou v7.
                  You can configure it explicitly in your configuration file:
                </p>

                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg my-4"
                >
{`// dinou.config.mjs
import { defineConfig } from "dinou";

export default defineConfig({
  /**
   * React StrictMode configuration for development mode.
   * Double-invokes render and effect functions in development to catch side-effects.
   * @default true
   */
  reactStrictMode: true,
});`}
                </CodeBlock>
              </section>
            </section>

            {/* 4. Guidelines for Purity */}
            <section
              id="rules-of-react"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                4. Guidelines for Compiler Purity
              </h3>
              <p>
                To get the maximum benefit from the React Compiler and StrictMode in
                Dinou v7, follow these core principles:
              </p>

              <div className="space-y-4 my-6 not-prose">
                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>1. Keep Component Render Functions Pure</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Given the same inputs (props, state, context), a component should
                    always return the same JSX. Never mutate global variables or
                    arguments passed to the component during render.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>2. Treat Props and State as Immutable</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Never mutate <code>props.user.name = &quot;new&quot;</code> directly. Always
                    create new object references when updating state (e.g.{" "}
                    <code>{`{ ...user, name: "new" }`}</code>).
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>3. Isolate Side Effects to useEffect or Server Actions</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Timers, DOM subscriptions, and network mutations belong inside event
                    handlers or <code>useEffect</code>, never in the component body.
                  </p>
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
