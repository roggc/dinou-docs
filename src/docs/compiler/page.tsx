"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { Zap, Code, Settings, Cpu, CheckCircle2 } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "automatic-memoization", title: "Automatic Memoization", level: 2 },
  { id: "bundler-integration", title: "Bundler Integration", level: 2 },
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
                React Compiler
              </h1>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                New
              </span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Forget about <code>useMemo</code> and <code>useCallback</code>.
              Dinou integrates the React Compiler to automatically optimize your
              components at build time, ensuring maximum performance with
              cleaner code.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* SECTION 1: AUTOMATIC MEMOIZATION */}
            <section id="automatic-memoization">
              <h2>Automatic Memoization</h2>
              <p>
                Dinou comes with the <strong>React Compiler</strong> enabled by
                default. This compiler analyzes your code and automatically
                memoizes values and functions, preventing unnecessary re-renders
                without forcing you to manually manage dependencies.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Code className="h-5 w-5" />
                      <span>Cleaner Codebase</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Write plain JavaScript logic. No need to clutter your
                    components with hooks just for performance optimization.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span>Runtime Performance</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    The compiler applies fine-grained memoization, often
                    outperforming manual optimization by understanding the data
                    flow deeply.
                  </CardContent>
                </Card>
              </div>

              <h3>Code Comparison</h3>
              <p>
                You can simply write standard React code, and Dinou handles the
                rest.
              </p>

              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// ❌ The Old Way (Manual Optimization)
function ExpensiveComponent({ data }) {
  // Manual memoization required to prevent recalc
  const processed = useMemo(() => heavyMath(data), [data]);
  
  // Manual callback to keep reference stable
  const handleClick = useCallback(() => {
    console.log(processed);
  }, [processed]);

  return <Child onAction={handleClick} />;
}

// ✅ The Dinou Way (React Compiler)
function ExpensiveComponent({ data }) {
  // ✨ Automatically memoized by the compiler
  const processed = heavyMath(data);
  
  // ✨ Automatically stable reference
  const handleClick = () => {
    console.log(processed);
  };

  return <Child onAction={handleClick} />;
}`}
              </CodeBlock>
            </section>

            {/* SECTION 2: BUNDLER INTEGRATION */}
            <section id="bundler-integration" className="mt-12 pt-8 border-t">
              <h2>Bundler Integration strategy</h2>
              <p>
                Dinou uses a sophisticated hybrid bundling strategy to ensure
                the best
                <strong>Developer Experience (DX)</strong> during development
                while ensuring maximum optimization for{" "}
                <strong>Production</strong>.
              </p>

              <div className="not-prose grid gap-4 my-6">
                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-3 font-semibold text-lg mb-4">
                    <Settings className="h-5 w-5" />
                    <span>Configuration Matrix</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Webpack */}
                    <div className="p-3 bg-muted/50 rounded-md border">
                      <div className="font-bold mb-1 flex items-center gap-2">
                        Webpack
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />{" "}
                          Dev: <span className="font-medium">Enabled</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />{" "}
                          Prod: <span className="font-medium">Enabled</span>
                        </div>
                      </div>
                    </div>

                    {/* Rollup */}
                    <div className="p-3 bg-muted/50 rounded-md border">
                      <div className="font-bold mb-1 flex items-center gap-2">
                        Rollup
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />{" "}
                          Dev: <span className="font-medium">Enabled</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />{" "}
                          Prod: <span className="font-medium">Enabled</span>
                        </div>
                      </div>
                    </div>

                    {/* Esbuild */}
                    <div className="p-3 bg-muted/50 rounded-md border relative overflow-hidden">
                      <div className="absolute top-0 right-0 px-2 py-0.5 bg-primary text-[10px] text-primary-foreground font-bold rounded-bl">
                        HYBRID
                      </div>
                      <div className="font-bold mb-1 flex items-center gap-2">
                        Esbuild
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Cpu className="h-3 w-3" /> Dev:{" "}
                          <span className="italic">Native Speed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />{" "}
                          Prod: <span className="font-medium">Enabled</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Cpu className="h-5 w-5 text-orange-500" />
                  <span>Why isn't it enabled for Esbuild Dev?</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  In development mode with Esbuild, our priority is{" "}
                  <strong>instant HMR</strong> (Hot Module Replacement). Since
                  the React Compiler requires an AST transformation via Babel,
                  adding it would slow down the sub-millisecond updates of
                  Esbuild.
                  <br />
                  <br />
                  We disable it in dev to keep your iteration cycle instant, but
                  we <strong>automatically enable it</strong> during the
                  production build so your users get the fully optimized
                  version.
                </p>
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
