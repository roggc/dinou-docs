import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Scale,
  GitBranch,
  User,
  Heart,
  Github,
  Package,
  Calendar,
  ExternalLink,
  FileText,
  Star,
  Sparkles,
  Cpu,
  Boxes,
  Globe,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const tocItems = [
  { id: "license", title: "📄 License", level: 2 },
  { id: "v7-milestones", title: "🚀 Dinou v7 Evolution", level: 2 },
  { id: "changelog", title: "📦 Changelog & Releases", level: 2 },
  { id: "credits", title: "👨‍💻 Credits & Team", level: 2 },
  { id: "support", title: "⭐ Star on GitHub", level: 2 },
];

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900">
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
              License information, Dinou v7 architectural milestones, version history, and project credits.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Section 1: License */}
            <section id="license" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                📄 License
              </h2>
              <p>
                Dinou is open source software released under the <strong>MIT License</strong>. This is a permissive license that allows anyone to use, modify, redistribute, and integrate Dinou into both personal and commercial projects with minimal restrictions.
              </p>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-card not-prose my-6">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>MIT License Summary</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 list-none pl-0">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Free for personal and commercial applications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Free to modify, customize, and redistribute the source code</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Free to sublicense or bundle inside proprietary distributions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Only requires preserving original copyright and license notice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Provided &quot;as is&quot; with zero warranty or liability</span>
                  </li>
                </ul>
              </div>

              <div className="not-prose mt-4">
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
                        <span>Read Full License (LICENSE.md)</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Inspect the full legal MIT License text in the official GitHub repository.
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </section>

            {/* Section 2: Dinou v7 Evolution */}
            <section id="v7-milestones" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                🚀 Dinou v7 Evolution
              </h2>
              <p>
                Dinou v7 marks a major generational leap forward, completely redesigning the framework core around React 19 primitives and a multi-runtime compilation model:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 mb-1.5">
                    <Cpu className="h-4 w-4" />
                    <span>React 19 &amp; RSC Native</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Native support for React Server Components, Server Functions (<code>&quot;use server&quot;</code>), Form Actions RPC, and Suspense streaming without proprietary wrappers.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-cyan-600 dark:text-cyan-400 mb-1.5">
                    <Boxes className="h-4 w-4" />
                    <span>Triple-Bundler Parity</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Full feature parity across <strong>esbuild</strong>, <strong>Rollup</strong>, and <strong>Webpack</strong>. Switch bundlers seamlessly across dev and production.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5">
                    <Globe className="h-4 w-4" />
                    <span>Multi-Runtime &amp; Binaries</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Deploy to Node.js, Cloudflare Workers, Deno, or Bun. Compile self-contained standalone executable binaries for Linux, ARM, macOS, and Windows.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400 mb-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    <span>100% Ejectable Engine</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Run <code>dinou eject</code> to copy the complete framework engine, dual-bundle compilers, and server adapters directly into your project with zero vendor lock-in.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Changelog */}
            <section id="changelog" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                📦 Changelog &amp; Releases
              </h2>
              <p>
                For a comprehensive log of all version releases, breaking changes, bug fixes, and feature additions, consult the official <code>CHANGELOG.md</code> in the repository.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/40 dark:bg-blue-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Package className="h-5 w-5" />
                      <span>Semantic Versioning</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Dinou strictly adheres to Semantic Versioning (SemVer: <code>MAJOR.MINOR.PATCH</code>). Breaking changes only occur across major version increments.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Calendar className="h-5 w-5" />
                      <span>Release Transparency</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Each release includes detailed release notes, upgrade instructions, and commit references to keep your production upgrades predictable.
                  </CardContent>
                </Card>
              </div>

              <div className="not-prose mt-4">
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
                        <span>View Full Changelog (CHANGELOG.md)</span>
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
            </section>

            {/* Section 4: Credits */}
            <section id="credits" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                👨‍💻 Credits &amp; Team
              </h2>
              <p>
                Dinou was created and is actively maintained by <strong>@roggc</strong> (GitHub). The framework is born out of hands-on experience building production React applications and a vision for developer freedom without vendor lock-in.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-purple-500/20 bg-purple-50/40 dark:bg-purple-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <User className="h-5 w-5" />
                      <span>Creator &amp; Maintainer</span>
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
                      Passionate about modern React architecture, transparent build tooling, high-performance streaming, and developer ergonomics.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold">
                      <Heart className="h-5 w-5" />
                      <span>Acknowledgments</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <ul className="space-y-1.5 list-none pl-0 text-xs">
                      <li className="flex items-center gap-1.5">
                        <span className="text-rose-500">•</span>
                        <span>The React team for React 19, Server Components &amp; Actions</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-rose-500">•</span>
                        <span>The esbuild, Rollup, and Webpack compiler ecosystems</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-rose-500">•</span>
                        <span>The Deno, Bun, and Cloudflare Workers runtime teams</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-rose-500">•</span>
                        <span>Contributors, testers, and the open-source community</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert className="not-prose my-6 border-slate-200 dark:border-slate-800">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-slate-900 dark:text-slate-100 font-semibold">Open Source Craftsmanship</AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground mt-1">
                  Dinou stands on the shoulders of modern web standards and open-source giants. It is designed to be a transparent, joyful, and permanent asset in your engineering toolkit.
                </AlertDescription>
              </Alert>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-card not-prose my-6">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  <Github className="h-5 w-5 text-slate-800 dark:text-slate-200" />
                  <span>Community &amp; Project Links</span>
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
                      https://github.com/roggc/dinou
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
            </section>

            {/* Section 5: Support */}
            <section id="support" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                ⭐ Star on GitHub
              </h2>
              <p>
                If you find Dinou useful or believe in vendor-agnostic, open React frameworks, please consider starring the project on GitHub! It helps increase visibility, attracts contributors, and accelerates ecosystem development.
              </p>

              <div className="not-prose mt-6">
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
                        <span>Star roggc/dinou on GitHub</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Support open source development with a star. Every single star counts!
                      </p>
                    </CardContent>
                  </Card>
                </a>
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
