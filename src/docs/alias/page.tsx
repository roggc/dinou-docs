import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
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
import { Badge } from "@/docs/components/ui/badge";
import {
  FolderTree,
  Zap,
  CheckCircle2,
  Code2,
  Layers,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "Import Aliases in Dinou", level: 2 },
  { id: "tsconfig-setup", title: "Configuring tsconfig.json & jsconfig.json", level: 2 },
  { id: "multiple-aliases", title: "Granular Aliases & Specificity", level: 3 },
  { id: "extends-and-fallbacks", title: "Config Inheritance (extends) & Fallbacks", level: 3 },
  { id: "universal-support", title: "Where Aliases Work (Code, CSS, & Assets)", level: 2 },
  { id: "code-imports", title: "TypeScript, JavaScript, & JSON Modules", level: 3 },
  { id: "css-imports", title: "Stylesheets, CSS Modules, @import, & url()", level: 3 },
  { id: "asset-imports", title: "Static Media & Custom Assets", level: 3 },
  { id: "index-and-extensions", title: "Extension, Index, & ESM Resolution", level: 2 },
  { id: "contextual-dinou", title: "Contextual ./dinou vs. Path Aliases", level: 2 },
  { id: "ide-setup", title: "IDE Autocomplete & Live Dev Reload", level: 2 },
  { id: "troubleshooting", title: "Best Practices & Common Gotchas", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Path Aliases | Dinou Docs</title>
      <meta
        name="description"
        content="Configure TypeScript and JavaScript path aliases in tsconfig.json or jsconfig.json with full parity across Esbuild, Rollup, Webpack, Node.js, Bun, Deno, Cloudflare Workers, and Netlify."
      />
      <link rel="canonical" href="https://dinou.dev/docs/alias" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                tsconfig &amp; jsconfig
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Multi-Bundler Parity
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Import Aliases &amp; Path Resolution
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Configure clean, refactor-proof import paths across your codebase using standard{" "}
              <code>tsconfig.json</code> or <code>jsconfig.json</code> path mappings &mdash; resolved
              identically across code, stylesheets, and assets on every bundler and runtime.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Import Aliases in Dinou</h2>
              <p>
                In growing codebases, deeply nested relative paths like{" "}
                <code>../../../../components/ui/button</code> are noisy to read and break whenever a route
                file is moved to another folder.
              </p>
              <p>
                Dinou includes a unified, TypeScript-spec-compliant path resolver built directly into its
                core pipeline. Out of the box, <code>@/*</code> and <code>~/*</code> resolve to{" "}
                <code>src/*</code> with zero configuration, and any custom <code>paths</code> or{" "}
                <code>extends</code> rules declared in your <code>tsconfig.json</code> (or{" "}
                <code>jsconfig.json</code>) work identically across{" "}
                <Link href="/docs/bundlers">Esbuild, Rollup, and Webpack</Link> as well as{" "}
                <Link href="/docs/deployment">Node.js, Bun, Deno, Cloudflare Workers, Netlify, and Static Export</Link>.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-rose-500/20 bg-rose-50/30 dark:bg-rose-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm">
                      <FolderTree className="h-4 w-4" />
                      <span>Fragile Relative Imports (Before)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs font-mono space-y-1.5 text-muted-foreground">
                    <div>import &#123; Button &#125; from &quot;../../../components/button&quot;;</div>
                    <div>import &#123; db &#125; from &quot;../../../../lib/db&quot;;</div>
                    <div>import logo from &quot;../../assets/logo.svg&quot;;</div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <Zap className="h-4 w-4" />
                      <span>Clean Aliased Imports (With Dinou)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs font-mono space-y-1.5 text-foreground font-semibold">
                    <div>import &#123; Button &#125; from &quot;@/components/button&quot;;</div>
                    <div>import &#123; db &#125; from &quot;@/lib/db&quot;;</div>
                    <div>import logo from &quot;@/assets/logo.svg&quot;;</div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* tsconfig Setup */}
            <section id="tsconfig-setup" className="mt-12 scroll-mt-20">
              <h2>Configuring tsconfig.json &amp; jsconfig.json</h2>
              <p>
                Declare your <code>compilerOptions.paths</code> mappings in your project root{" "}
                <code>tsconfig.json</code> so TypeScript, your IDE, and Dinou share the exact same module
                graph:
              </p>

              <CodeBlock
                language="json"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`{
  "compilerOptions": {
    "rootDirs": ["src", ".dinou/routes"],
    "paths": {
      "@/*": ["./src/*"]
    },
    "allowJs": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "include": [
    "src",
    "dinou-env.d.ts",
    "dinou.config.ts",
    ".dinou/types/**/*.d.ts"
  ]
}`}
              </CodeBlock>

              <Alert className="not-prose mt-4">
                <Code2 className="h-4 w-4" />
                <AlertTitle>JavaScript Projects (jsconfig.json or allowJs)</AlertTitle>
                <AlertDescription className="text-xs leading-relaxed mt-1">
                  Plain JavaScript (<code>.js</code> / <code>.jsx</code> / <code>.mjs</code>) projects can
                  either configure aliases in <code>jsconfig.json</code> or keep a{" "}
                  <code>tsconfig.json</code> with <code>&quot;allowJs&quot;: true</code>. Dinou reads{" "}
                  <code>tsconfig.json</code> first and automatically falls back to{" "}
                  <code>jsconfig.json</code> across all three bundlers, including JSON with comments (JSONC)
                  and trailing commas.
                </AlertDescription>
              </Alert>

              <div id="multiple-aliases" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">Granular Aliases &amp; Specificity</h3>
                <p>
                  Beyond <code>@/*</code>, you can define domain-specific aliases, exact single-file aliases
                  (without <code>*</code>), or overlapping prefixes:
                </p>
                <CodeBlock
                  language="json"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@ui/*": ["./src/components/ui/*"],
      "@ui/icons/*": ["./src/icons/*"],
      "@components/*": ["./src/components/*"],
      "@server/*": ["./src/server-functions/*"],
      "@lib/*": ["./src/lib/*"],
      "@styles/*": ["./src/styles/*"],
      "@assets/*": ["./src/assets/*"],
      "@site-config": ["./src/config/site.ts"]
    }
  }
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  Following the TypeScript specification, Dinou automatically prioritizes{" "}
                  <strong>exact matches</strong> first, followed by{" "}
                  <strong>longest-prefix wildcards</strong> regardless of key order in JSON &mdash; so{" "}
                  <code>@ui/icons/check</code> always resolves to <code>src/icons/check.tsx</code> even when{" "}
                  <code>@ui/*</code> is listed above <code>@ui/icons/*</code>.
                </p>
              </div>

              <div id="extends-and-fallbacks" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">Config Inheritance (extends) &amp; Multi-Target Fallbacks</h3>
                <p>
                  Monorepos and multi-package workspaces can inherit <code>baseUrl</code> and{" "}
                  <code>paths</code> via <code>&quot;extends&quot;</code> (including single paths, TypeScript
                  5.0+ arrays, <code>node_modules</code> presets, and TypeScript 5.5+{" "}
                  <code>&#36;&#123;configDir&#125;</code> placeholders) as well as ordered fallback target
                  arrays:
                </p>
                <CodeBlock
                  language="json"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`{
  "extends": ["../../tsconfig.base.json", "@tsconfig/strictest/tsconfig.json"],
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": [
        "./src/overrides/*",
        "../../packages/shared/src/*"
      ]
    }
  }
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  When importing <code>@shared/format</code>, Dinou checks{" "}
                  <code>./src/overrides/format</code> first and cleanly falls back to{" "}
                  <code>../../packages/shared/src/format</code> if no local override exists.
                </p>
              </div>
            </section>

            {/* Universal Support */}
            <section id="universal-support" className="mt-12 scroll-mt-20">
              <h2>Where Aliases Work (Code, CSS, &amp; Assets)</h2>
              <p>
                Dinou propagates the exact same alias rules across every compilation pass &mdash; RSC, SSR,
                Client bundles, PostCSS, asset hashing, and even <code>dinou.config.ts</code>:
              </p>

              {/* Sub-section: Code Imports */}
              <div id="code-imports" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">1. TypeScript, JavaScript, &amp; JSON Modules</h3>
                <p>
                  Use aliases across <Link href="/docs/server-client-components">Server Components</Link>,{" "}
                  Client Components (<code>&quot;use client&quot;</code>),{" "}
                  <Link href="/docs/server-functions">Server Functions</Link> (
                  <code>&quot;use server&quot;</code>),{" "}
                  <Link href="/docs/page-functions">Page &amp; Layout Functions</Link>, JSON files, and{" "}
                  <code>dinou.config.ts</code>:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/dashboard/page.tsx
import type { PageProps } from "./dinou";
import { UserCard } from "@components/user-card";
import { fetchUserMetrics } from "@server/metrics";
import { formatDate } from "@lib/utils";
import releaseMeta from "@lib/release-meta.json";

export default async function DashboardPage(_props: PageProps) {
  const metrics = await fetchUserMetrics();
  return (
    <UserCard
      data={metrics}
      version={releaseMeta.version}
      formattedTime={formatDate(Date.now())}
    />
  );
}`}
                </CodeBlock>
              </div>

              {/* Sub-section: CSS Imports */}
              <div id="css-imports" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">
                  2. Stylesheets, CSS Modules, @import, &amp; url()
                </h3>
                <p>
                  Path aliases work both when importing{" "}
                  <Link href="/docs/styles">Global CSS and CSS Modules</Link> from TypeScript/JavaScript and
                  inside CSS <code>@import</code> rules and <code>url(...)</code> asset declarations:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// Importing Global CSS and CSS Modules from TS/TSX via custom aliases
import "@styles/theme.css";
import styles from "@styles/card.module.css";

export function HighlightCard({ children }: { children: React.ReactNode }) {
  return <article className={styles.surface}>{children}</article>;
}`}
                </CodeBlock>
                <CodeBlock
                  language="css"
                  containerClassName="w-full overflow-hidden rounded-lg mt-3"
                >
{`/* src/styles/theme.css */
@import "@styles/tokens.css";
@import "@styles/typography.css";

.hero-surface {
  color: var(--brand-foreground);
  background-image: url("@assets/images/noise-grid.png");
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  PostCSS resolves <code>@styles/tokens.css</code> at build time and rewrites{" "}
                  <code>url(&quot;@assets/images/noise-grid.png&quot;)</code> to its content-hashed{" "}
                  <code>/assets/noise-grid-[hash].png</code> URL automatically.
                </p>
              </div>

              {/* Sub-section: Asset Imports */}
              <div id="asset-imports" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">3. Static Media &amp; Custom Assets</h3>
                <p>
                  All 26 built-in <Link href="/docs/assets">media, vector, audio/video, and font formats</Link>{" "}
                  (plus any custom <code>assetExtensions</code> configured in <code>dinou.config.ts</code>)
                  resolve cleanly through path aliases:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/hero.tsx
import heroImage from "@assets/images/hero-banner.webp";
import logoSvg from "@assets/brand/logo.svg";

export function Hero() {
  return (
    <div className="hero">
      <img src={logoSvg} alt="Brand Logo" className="h-10" />
      <img src={heroImage} alt="Hero Banner" className="rounded-xl shadow-lg" />
    </div>
  );
}`}
                </CodeBlock>
              </div>
            </section>

            {/* Extension and Index Resolution */}
            <section id="index-and-extensions" className="mt-12 scroll-mt-20">
              <h2>Extension, Index, &amp; ESM Resolution</h2>
              <p>
                Dinou resolves extensionless imports, directory <code>index</code> files, and TypeScript
                ESM-style <code>.js</code> specifiers consistently across all bundlers:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-3.5">Import Statement</th>
                      <th className="p-3.5">Resolved Disk Path</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card text-xs font-mono">
                    <tr>
                      <td className="p-3.5 text-foreground font-semibold">
                        import &#123; Card &#125; from &quot;@/components/card&quot;;
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        src/components/card.tsx (.ts, .jsx, .js, .mjs, .cjs, .json)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-foreground font-semibold">
                        import &#123; Modal &#125; from &quot;@/components/modal&quot;;
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        src/components/modal/index.tsx (directory index)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-foreground font-semibold">
                        import &#123; math &#125; from &quot;@/lib/math.js&quot;;
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        src/lib/math.ts (TypeScript ESM .js &rarr; .ts/.tsx mapping)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-foreground font-semibold">
                        @import &quot;@styles/tokens&quot;;
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        src/styles/tokens.css (prefers stylesheet extensions in CSS)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Contextual ./dinou vs Aliases */}
            <section id="contextual-dinou" className="mt-12 scroll-mt-20">
              <h2>Contextual ./dinou vs. Path Aliases</h2>
              <p>
                Dinou combines your <code>tsconfig.json</code> aliases with its auto-generated{" "}
                <Link href="/docs/type-safe-routing">route-contextual <code>&quot;./dinou&quot;</code> module</Link>.
                Each serves a distinct purpose:
              </p>

              <div className="grid gap-4 md:grid-cols-2 not-prose my-6">
                <Card className="bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" />
                      <span>Use &quot;./dinou&quot; for Route Context</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      Inside <code>page.tsx</code>, <code>layout.tsx</code>, or{" "}
                      <code>page_functions.ts</code>, import <code>PageProps</code>,{" "}
                      <code>LayoutProps</code>, <code>PageFunctions</code>, <code>Link</code>, and{" "}
                      <code>useRouter</code> from <code>&quot;./dinou&quot;</code> so TypeScript
                      narrows dynamic route <code>params</code>, sibling <code>@slot</code> props,
                      and relative navigation targets for that exact directory.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <Zap className="h-4 w-4 text-emerald-500" />
                      <span>Use @/* for Application Modules</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      Use <code>@/*</code> (or granular aliases like <code>@components/*</code>,{" "}
                      <code>@server/*</code>, and <code>@lib/*</code>) for shared UI components, Server
                      Functions, utilities, styles, and media assets &mdash; and import{" "}
                      <code>Link</code> or <code>useRouter</code> from <code>&quot;dinou&quot;</code> in
                      shared non-route components.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* IDE Setup & Hot Reload */}
            <section id="ide-setup" className="mt-12 scroll-mt-20">
              <h2>IDE Autocomplete &amp; Live Dev Reload</h2>
              <p>
                Because Dinou reads standard <code>tsconfig.json</code> and <code>jsconfig.json</code> files
                directly, editors (VS Code, Cursor, WebStorm, Zed, Neovim) and <code>dinou dev</code> stay
                synchronized with zero extra plugins:
              </p>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Auto-Import &amp; Navigation</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    IntelliSense auto-completes aliased paths and <code>Cmd/Ctrl+Click</code> jumps straight
                    to source definitions.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                    <RefreshCw className="h-4 w-4 text-blue-500" />
                    <span>Live Hot-Reload in Dev</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Editing <code>tsconfig.json</code>, <code>jsconfig.json</code>, or local{" "}
                    <code>extends</code> configs during <code>dinou dev</code> reloads RSC, SSR, and client
                    aliases automatically without restarting the server.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>Refactor-Safe Moves</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Moving a route file from <code>src/blog/page.tsx</code> to{" "}
                    <code>src/news/archive/page.tsx</code> keeps all <code>@/*</code> imports valid.
                  </p>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className="mt-12 scroll-mt-20">
              <h2>Best Practices &amp; Common Gotchas</h2>

              <div className="space-y-4 mt-4">
                <div className="p-4 rounded-lg border bg-card not-prose space-y-1.5">
                  <div className="font-semibold text-sm text-foreground">
                    Prefer &quot;moduleResolution&quot;: &quot;bundler&quot; without baseUrl
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Modern TypeScript (5.0+) resolves <code>paths</code> directly relative to the config
                    file containing <code>paths</code> without needing <code>baseUrl</code>. If your project
                    or monorepo base config explicitly sets <code>baseUrl</code>, Dinou honors{" "}
                    <code>baseUrl</code> with identical TypeScript semantics.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card not-prose space-y-1.5">
                  <div className="font-semibold text-sm text-foreground">
                    Keep &quot;use client&quot; &amp; &quot;use server&quot; Entrypoints Inside src/
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Pure TypeScript/JavaScript helpers, types, JSON data, stylesheets, and static assets can
                    be aliased from external workspace folders (such as <code>../shared/*</code>). Modules
                    carrying React Flight boundary directives (<code>&quot;use client&quot;</code> or{" "}
                    <code>&quot;use server&quot;</code>) should live under <code>src/</code> (or in{" "}
                    <code>package.json</code> dependencies) so Dinou&apos;s manifest scanner discovers them.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card not-prose space-y-1.5">
                  <div className="font-semibold text-sm text-foreground">
                    Underscore-Prefixed (_folder) Escape Directories Remain Protected
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    As documented in <Link href="/docs/routing">Routing</Link>, directories prefixed with{" "}
                    <code>_</code> inside <code>src/</code> (such as <code>src/docs/_drafts</code>) are
                    excluded from routing and bundling. Importing into an escaped <code>_folder</code> from
                    an active route is blocked at build time even when accessed through a custom path alias.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card not-prose space-y-1.5">
                  <div className="font-semibold text-sm text-foreground">
                    Avoid Circular Dependency Loops
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    While aliases make cross-layer imports effortless, keep dependency direction clean (e.g.{" "}
                    <code>@components/*</code> imports from <code>@lib/*</code>, never the reverse) to avoid
                    circular initialization issues.
                  </p>
                </div>
              </div>
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
