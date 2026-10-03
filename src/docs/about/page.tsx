import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Scale,
  GitBranch,
  User,
  Github,
  Package,
  Calendar,
  ExternalLink,
  FileText,
  Star,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Brain,
  MessageSquare,
  Bot,
  Heart,
} from "lucide-react";

// Pure React Server Component (no 'use client')
const tocItems = [
  { id: "open-source-license", title: "1. Open Source License", level: 2 },
  { id: "mit-summary", title: "1.1. MIT License Permissions", level: 3 },
  { id: "commercial-freedom", title: "1.2. Commercial & Private Freedom", level: 3 },
  { id: "changelog-releases", title: "2. Changelog & Versioning", level: 2 },
  { id: "semver-policy", title: "2.1. Semantic Versioning Policy", level: 3 },
  { id: "release-notes", title: "2.2. View Full Changelog", level: 3 },
  { id: "credits-team", title: "3. Author & AI Co-Creation", level: 2 },
  { id: "creator-maintainer", title: "3.1. Creator & Core Philosophy", level: 3 },
  { id: "human-agent-interaction", title: "3.2. Human-Agent Co-Creation", level: 3 },
  { id: "support-community", title: "4. Community & Support", level: 2 },
  { id: "contributing-discussions", title: "4.1. Discussions & Issues", level: 3 },
  { id: "github-star", title: "4.2. Star on GitHub", level: 3 },
  { id: "acknowledgments", title: "5. Acknowledgments", level: 2 },
];

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Community &amp; Open Source
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou v7
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              License, Changelog &amp; Credits
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              License terms, release management, human-agent engineering, and creator acknowledgments.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            {/* Section 1: License */}
            <section id="open-source-license" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Open Source License
              </h2>
              <p>
                Dinou is 100% open-source software released under the <strong>MIT License</strong>. This is a permissive license that grants developers, startups, and enterprises complete freedom to use, modify, redistribute, and integrate Dinou into both personal and commercial software projects without fees or vendor lock-in.
              </p>

              <div className="space-y-6 not-prose mt-6">
                <div id="mit-summary" className="scroll-mt-20 border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-base font-bold">1.1. MIT License Permissions</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2.5 list-none pl-0">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span><strong>Commercial Use:</strong> Free for commercial products, SaaS platforms, and internal tools.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span><strong>Modification:</strong> Free to modify the engine, compiler plugins, and server adapters.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span><strong>Distribution:</strong> Free to distribute copies, bundles, and standalone compiled executables.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span><strong>Sublicensing:</strong> Free to embed inside closed-source proprietary software packages.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span><strong>Simple Condition:</strong> Only requires preserving the original copyright notice in distributions.</span>
                    </li>
                  </ul>
                </div>

                <div id="commercial-freedom" className="scroll-mt-20 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    1.2. Commercial &amp; Private Freedom
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Unlike modern web frameworks that adopt restrictive licensing (BSL, SSPL) or design their architectures to funnel workloads toward proprietary cloud platforms, Dinou will forever remain under the permissive MIT License. Your code, your build pipeline, and your deployment infrastructure remain entirely under your control.
                  </p>

                  <div className="not-prose pt-2">
                    <a
                      href="https://github.com/roggc/dinou/blob/master/LICENSE.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <Card className="hover:border-blue-500/50 transition-colors cursor-pointer border-l-4 border-l-blue-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <span>Read Full License Text (LICENSE.md)</span>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Inspect the complete legal MIT License text in the official GitHub repository.
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Changelog & Versioning */}
            <section id="changelog-releases" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Changelog &amp; Versioning
              </h2>
              <p>
                Dinou follows transparent release practices to keep production applications stable and predictable:
              </p>

              <div className="space-y-6 not-prose mt-6">
                <div id="semver-policy" className="scroll-mt-20 grid gap-4 md:grid-cols-2">
                  <Card className="border-blue-500/20 bg-blue-50/40 dark:bg-blue-900/10">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                        <Package className="h-5 w-5" />
                        <h3 className="text-base font-bold">2.1. Semantic Versioning</h3>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground leading-relaxed">
                      Dinou strictly follows SemVer (<code>MAJOR.MINOR.PATCH</code>). Breaking changes only occur across major version boundaries. Minor releases introduce backward-compatible features and performance optimizations.
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <Calendar className="h-5 w-5" />
                        <h4 className="text-base font-bold">Release Transparency</h4>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground leading-relaxed">
                      Each release includes detailed release notes, upgrade instructions, and commit diffs to ensure your production deployments remain completely reliable.
                    </CardContent>
                  </Card>
                </div>

                <div id="release-notes" className="scroll-mt-20 not-prose">
                  <a
                    href="https://github.com/roggc/dinou/blob/master/CHANGELOG.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Card className="hover:border-purple-500/50 transition-colors cursor-pointer border-l-4 border-l-purple-500">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                          <GitBranch className="h-5 w-5 text-purple-500" />
                          <h3 className="text-base font-bold">2.2. View Full Changelog (CHANGELOG.md)</h3>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Explore the complete timeline of enhancements, migrations, and bug fixes on GitHub.
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                </div>
              </div>
            </section>

            {/* Section 3: Author & AI Co-Creation */}
            <section id="credits-team" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Author &amp; AI Co-Creation
              </h2>
              <p>
                Dinou is an independent open-source initiative built on the belief that developers deserve complete sovereignty over their web architecture.
              </p>

              <div className="space-y-6 not-prose mt-6">
                {/* 3.1 Creator */}
                <div id="creator-maintainer" className="scroll-mt-20">
                  <Card className="border-purple-500/20 bg-purple-50/40 dark:bg-purple-900/10">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                        <User className="h-5 w-5" />
                        <h3 className="text-base font-bold">3.1. Creator &amp; Core Philosophy</h3>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Github className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                        <a
                          href="https://github.com/roggc"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          @roggc
                        </a>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Created and maintained by @roggc. Driven by real-world production requirements: eliminating opaque framework magic, removing vendor lock-in, unifying multi-runtime compilation, and building developer tools that respect developer autonomy.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* 3.2 Human-Agent Co-Creation */}
                <div id="human-agent-interaction" className="scroll-mt-20">
                  <Card className="border-blue-500/30 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/40 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/20 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                          <Brain className="h-5 w-5 text-indigo-500" />
                          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                            3.2. Human-Agent Co-Creation
                          </h3>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-[11px] font-mono border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5"
                        >
                          <Sparkles className="w-3 h-3 mr-1 text-indigo-500" />
                          Antigravity-Gemini 3.8 Flash high
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm space-y-3">
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Dinou v7 has been crafted through intensive <strong>human-agent interaction</strong> between <strong>@roggc</strong> and <strong>Antigravity-Gemini 3.8 Flash high</strong> (by Google / Google DeepMind).
                      </p>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        This pairing exemplifies the modern paradigm of agentic software engineering: human architectural intuition, design criteria, and production-tested standards directing an advanced autonomous agent capable of deep codebase analysis, high-speed refactoring, cross-bundler alignment, and zero-compromise precision.
                      </p>
                      <div className="p-3 rounded-lg bg-background/80 border border-indigo-500/20 text-xs text-slate-700 dark:text-slate-300 font-mono flex items-center gap-2">
                        <Bot className="h-4 w-4 text-indigo-500 shrink-0" />
                        <span>Pair-programming synergy: Human direction + Antigravity-Gemini 3.8 Flash high execution</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Section 4: Community & Support */}
            <section id="support-community" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Community &amp; Support
              </h2>
              <p>
                Get involved with Dinou development, report issues, ask questions, or contribute improvements:
              </p>

              <div className="space-y-6 not-prose mt-6">
                <div id="contributing-discussions" className="scroll-mt-20 border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <h3 className="text-base font-bold">4.1. Discussions &amp; Issues</h3>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-slate-100 dark:border-slate-800/60">
                      <span className="font-medium text-slate-900 dark:text-slate-200">GitHub Repository</span>
                      <a
                        href="https://github.com/roggc/dinou"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        github.com/roggc/dinou
                      </a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1">
                      <span className="font-medium text-slate-900 dark:text-slate-200">Issues &amp; Discussions</span>
                      <a
                        href="https://github.com/roggc/dinou/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        github.com/roggc/dinou/issues
                      </a>
                    </div>
                  </div>
                </div>

                <div id="github-star" className="scroll-mt-20 not-prose">
                  <a
                    href="https://github.com/roggc/dinou"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Card className="hover:border-amber-500/50 transition-colors cursor-pointer border-l-4 border-l-amber-500 bg-amber-50/20 dark:bg-amber-950/10">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                          <h3 className="text-base font-bold">4.2. Star roggc/dinou on GitHub</h3>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Support vendor-agnostic open-source React tooling with a GitHub star. Every star helps increase visibility and ecosystem growth!
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                </div>
              </div>
            </section>

            {/* Section 5: Acknowledgments */}
            <section id="acknowledgments" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Acknowledgments
              </h2>
              <p>
                Dinou is built on top of the open web and the generous open-source ecosystem:
              </p>

              <div className="mt-6 not-prose">
                <Card className="border-slate-200 dark:border-slate-800 bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold">
                      <Heart className="h-5 w-5" />
                      <h3 className="text-base font-bold">Open-Source Ecosystem &amp; Web Standards</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="space-y-3 list-none pl-0 text-xs sm:text-sm text-muted-foreground">
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                        <span>
                          <strong className="text-slate-900 dark:text-slate-100 font-semibold">React &amp; The React Team:</strong> For React 19, the React Server Components specification, Server Actions, and standard Suspense streaming primitives.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                        <span>
                          <strong className="text-slate-900 dark:text-slate-100 font-semibold">The Bundling Ecosystem:</strong> For the pioneering work behind <strong className="text-slate-800 dark:text-slate-200">esbuild</strong>, <strong className="text-slate-800 dark:text-slate-200">Rollup</strong>, and <strong className="text-slate-800 dark:text-slate-200">Webpack</strong>, which makes Dinou&apos;s vendor-neutral bundler parity possible.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                        <span>
                          <strong className="text-slate-900 dark:text-slate-100 font-semibold">Modern JavaScript Runtimes:</strong> For advancing standard Web APIs (Fetch API, W3C Streams, WinterCG) across <strong className="text-slate-800 dark:text-slate-200">Node.js</strong>, <strong className="text-slate-800 dark:text-slate-200">Bun</strong>, <strong className="text-slate-800 dark:text-slate-200">Deno</strong>, and <strong className="text-slate-800 dark:text-slate-200">Cloudflare Workers</strong>.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                        <span>
                          <strong className="text-slate-900 dark:text-slate-100 font-semibold">Google &amp; Google DeepMind:</strong> For pioneering next-generation agentic programming with <strong className="text-slate-800 dark:text-slate-200">Antigravity</strong> and <strong className="text-slate-800 dark:text-slate-200">Gemini</strong>, empowering the rapid, high-precision human-agent co-creation of Dinou v7.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                        <span>
                          <strong className="text-slate-900 dark:text-slate-100 font-semibold">The Open Source Community:</strong> For the countless tools, libraries, and specifications shared under permissive licenses that advance modern web engineering.
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
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
