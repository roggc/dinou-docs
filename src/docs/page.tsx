import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Button } from "@/docs/components/ui/button";
import { Badge } from "@/docs/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Cpu,
  Zap,
  Route,
  Database,
  FolderTree,
  ArrowRight,
  RefreshCw,
  Boxes,
  ShieldCheck,
  Terminal,
  Layers,
  Globe,
  FolderLock,
  Sparkles,
} from "lucide-react";
import { Link } from "dinou";

// Pure React Server Component (no 'use client')
const tocItems = [
  { id: "what-is-dinou", title: "What is Dinou v7?", level: 2 },
  { id: "core-pillars", title: "Core Pillars", level: 2 },
  { id: "quick-start", title: "Quick Start", level: 2 },
  { id: "project-structure", title: "Project Structure", level: 2 },
  { id: "next-steps", title: "Next Steps", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-8 lg:py-10 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Hero Header */}
          <div className="mb-10 space-y-4">
            <div className="inline-flex items-center gap-2">
              <Badge
                variant="outline"
                className="px-2.5 py-0.5 text-xs font-mono font-medium border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 rounded-full"
              >
                <Sparkles className="w-3 h-3 mr-1 text-blue-500" />
                Dinou v7.0
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">
                React 19 Server Components
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Introduction to Dinou v7
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              A modern, lightweight, and ejectable Full-Stack React 19 Framework.
              Built on standard Web APIs, uncompromising developer freedom, and a
              multi-runtime architecture that runs anywhere.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            {/* Section 1: What is Dinou v7 */}
            <section id="what-is-dinou" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                What is Dinou v7?
              </h2>
              <p>
                <strong>Dinou v7</strong> is engineered from first principles to
                deliver the full power of <strong>React 19</strong> without the
                complexity, vendor lock-in, or hidden abstractions of traditional
                meta-frameworks.
              </p>
              <p>
                Every feature—from <strong>React Server Components (RSC)</strong> and{" "}
                <strong>Server Functions (<code>&apos;use server&apos;</code>)</strong> to
                Suspense streaming and Incremental Static Regeneration (ISR)—is implemented
                using transparent, standard Node.js and Web APIs.
              </p>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="text-blue-600 dark:text-blue-400 font-mono font-bold text-lg mb-1">
                    React 19 Native
                  </div>
                  <p className="text-xs text-muted-foreground">
                    First-class RSC, Actions, Suspense streaming, and direct server data access.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="text-purple-600 dark:text-purple-400 font-mono font-bold text-lg mb-1">
                    Multi-Runtime
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deploy identical code to Node.js, Cloudflare Workers, Deno, or Bun.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-lg mb-1">
                    100% Ejectable
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Run <code>npm run eject</code> to inspect, customize, or evolve the framework core.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Core Pillars */}
            <section id="core-pillars" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-6">
                Core Architectural Pillars
              </h2>
              <div className="grid gap-5 md:grid-cols-2 not-prose">
                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-blue-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/60 mb-2">
                      <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg">React 19 & RSC Core</CardTitle>
                    <CardDescription>
                      Server-first rendering with zero bundle overhead.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Components render on the server by default. Client JavaScript is only sent
                      for interactive components marked with <code>&apos;use client&apos;</code>.
                      Execute server-side logic seamlessly with React 19 Server Functions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-purple-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/60 mb-2">
                      <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-lg">Static-First Intelligence</CardTitle>
                    <CardDescription>
                      Automatic Static Generation with dynamic bailout.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Routes compile to static HTML and RSC payloads by default for edge speeds.
                      When dynamic context like cookies or request headers are inspected, the
                      engine automatically transitions to on-demand SSR.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/60 mb-2">
                      <FolderLock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <CardTitle className="text-lg">Private Folders (_prefix)</CardTitle>
                    <CardDescription>
                      Collocate code without polluting route URLs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Organize collocated components, hooks, tests, and utilities inside folders
                      starting with an underscore (e.g. <code>_components</code>, <code>_lib</code>).
                      Dinou&apos;s router automatically ignores them during route discovery.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-amber-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/60 mb-2">
                      <Globe className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <CardTitle className="text-lg">Deploy Everywhere</CardTitle>
                    <CardDescription>
                      Single codebase across all major JavaScript runtimes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Compile your application for traditional Node.js servers, ultra-fast Bun
                      instances, Deno microservices, or Cloudflare Workers at the edge without
                      changing a single line of application code.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-950/60 mb-2">
                      <Boxes className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <CardTitle className="text-lg">Triple Bundler Agility</CardTitle>
                    <CardDescription>
                      esbuild, Rollup, or Webpack on your terms.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Choose <strong>esbuild</strong> for blazing fast development bundling, or switch
                      to <strong>Rollup</strong> or <strong>Webpack</strong> for specialized enterprise plugins
                      using familiar npm script targets.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-rose-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-950/60 mb-2">
                      <RefreshCw className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <CardTitle className="text-lg">Atomic ISR &amp; ISG</CardTitle>
                    <CardDescription>
                      Background regeneration and on-demand paths.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Revalidate stale pages in the background with zero downtime using atomic disk
                      swaps. Generate new dynamic routes on demand with Incremental Static Generation
                      and purge caches with <code>revalidatePath()</code>.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 3: Quick Start */}
            <section id="quick-start" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                Quick Start in 60 Seconds
              </h2>
              <p>
                Get a fully configured Dinou v7 application with React 19, Tailwind CSS, and
                file-system routing running in seconds:
              </p>

              <div className="not-prose space-y-4 my-6">
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-1">
                    1. Initialize project with create-dinou-app:
                  </div>
                  <CodeBlock language="bash">
                    {`npx create-dinou-app@latest my-app`}
                  </CodeBlock>
                </div>

                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-1">
                    2. Enter directory and launch development server:
                  </div>
                  <CodeBlock language="bash">
                    {`cd my-app
npm run dev`}
                  </CodeBlock>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                The development server will boot on <code>http://localhost:3000</code> with instant
                React Fast Refresh and live CSS injection.
              </p>
            </section>

            {/* Section 4: Project Structure */}
            <section id="project-structure" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                Project Structure
              </h2>
              <p>
                Dinou v7 uses intuitive file-system conventions. All routes, layouts, and private
                implementation folders reside cleanly inside <code>src/</code>:
              </p>

              <div className="not-prose my-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                <pre>{`my-app/
├── src/
│   ├── page.tsx               # Root page (/)
│   ├── layout.tsx             # Root layout & ThemeProvider
│   ├── globals.css            # Tailwind / global styles
│   ├── _components/           # 🔒 Private folder (ignored by router)
│   │   ├── hero.tsx
│   │   └── navbar.tsx
│   └── docs/
│       ├── page.tsx           # /docs documentation root
│       ├── layout.tsx         # /docs dedicated layout & sidebar
│       └── [slug]/
│           └── page.tsx       # Dynamic route segment (/docs/:slug)
├── dinou.config.ts            # Optional framework configuration
├── package.json
└── tsconfig.json`}</pre>
              </div>

              <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 p-4 not-prose">
                <div className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300 text-sm mb-1">
                  <Sparkles className="w-4 h-4" />
                  Key Rule in v7: Private Folders
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Any directory prefixed with <code>_</code> (like <code>_components</code> or{" "}
                  <code>_lib</code>) is automatically ignored by Dinou&apos;s route scanner. You can
                  safely collocate your components, styles, or utilities right next to the pages that
                  use them.
                </p>
              </div>
            </section>

            {/* Section 5: Next Steps */}
            <section id="next-steps" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                Next Steps
              </h2>
              <p>
                Explore the documentation to dive deeper into the architecture, routing, and deployment guides:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <Button
                  variant="outline"
                  className="h-auto p-4 justify-between border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                  asChild
                >
                  <Link href="/docs/getting-started" className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Getting Started Guide
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Step-by-step installation, dependencies, and configuration.
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ml-2" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 justify-between border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                  asChild
                >
                  <Link href="/docs/routing" className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Routing &amp; Layouts
                      </div>
                      <div className="text-xs text-muted-foreground">
                        File-system routing, groups, parameters, and layout resets.
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ml-2" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 justify-between border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                  asChild
                >
                  <Link href="/docs/server-client-components" className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Server vs Client Components
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Master the RSC mental model and client boundaries.
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ml-2" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 justify-between border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                  asChild
                >
                  <Link href="/docs/internals" className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Architecture &amp; Internals
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Under the hood: IPC, HTML streaming, and the dual-engine.
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ml-2" />
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Visible on Desktop */}
      <aside className="hidden xl:block w-64 pl-8 py-8 lg:py-10 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
