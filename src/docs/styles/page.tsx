import { Link } from "dinou";
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
} from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Palette,
  FileCode,
  Zap,
  RefreshCw,
  Layers,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";

const tocItems = [
  { id: "overview", title: "Styling in Dinou", level: 2 },
  { id: "linking-stylesheet", title: "Linking /styles.css", level: 2 },
  { id: "precedence-attribute", title: "React 19 precedence Attribute", level: 3 },
  { id: "tailwind-v4", title: "Tailwind CSS (v4 Engine)", level: 2 },
  { id: "tailwind-theme", title: "Custom @theme & Multi-Layout Setup", level: 3 },
  { id: "css-modules", title: "CSS Modules (*.module.css)", level: 2 },
  { id: "scoped-classnames", title: "Server & Client Parity + Scoped Hashes", level: 3 },
  { id: "global-css-imports", title: "Global CSS, Third-Party Styles & Aliases", level: 2 },
  { id: "css-url-assets", title: "CSS url(...) Assets & Fonts", level: 3 },
  { id: "css-hmr", title: "Instant CSS Hot Module Replacement", level: 2 },
  { id: "typescript-types", title: "TypeScript Declarations (dinou/env)", level: 2 },
  { id: "full-example", title: "Complete End-to-End Example", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Styles & CSS Architecture | Dinou Docs</title>
      <meta
        name="description"
        content="Unified, zero-config styling pipeline in Dinou supporting Tailwind CSS v4, CSS Modules across Server and Client Components, CSS url(...) assets, and instant HMR."
      />
      <link rel="canonical" href="https://dinou.dev/docs/styles" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Zero-Config CSS
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Styles &amp; CSS Architecture
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou features a unified, zero-config styling pipeline supporting{" "}
              <strong>Tailwind CSS v4</strong>, <strong>CSS Modules</strong> in both
              Server and Client Components, and <strong>Global CSS</strong> with
              instant HMR and minified single-bundle extraction at{" "}
              <code>/styles.css</code>.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>Styling in Dinou</h2>
              <p>
                Dinou provides built-in, out-of-the-box support for the modern CSS
                ecosystem across all three bundlers (<code>esbuild</code>,{" "}
                <code>rollup</code>, and <code>webpack</code>) and all four
                production runtimes (<code>Node.js</code>, <code>Bun</code>,{" "}
                <code>Deno</code>, and <code>Cloudflare Workers</code>). Under the
                hood, Dinou orchestrates PostCSS, <code>postcss-import</code>,{" "}
                <code>@tailwindcss/postcss</code>, Autoprefixer,{" "}
                <code>postcss-modules</code>, and its internal CSS asset resolver to:
              </p>
              <ul>
                <li>
                  <strong>Extract &amp; minify all imported styles</strong> across
                  Server Components, Client Components, layouts, error boundaries,
                  and <code>not_found</code> routes into a single production bundle
                  emitted at <code>.dinou/dist3/styles.css</code> (served at{" "}
                  <code>/styles.css</code>).
                </li>
                <li>
                  <strong>Guarantee RSC, SSR &amp; Client parity for CSS Modules</strong>{" "}
                  by compiling <code>*.module.css</code> with deterministic
                  cryptographic <code>[hash:base64]</code> class names on both the
                  Dual-Bundle server engine and client bundler—preventing hydration
                  mismatches and Flash of Unstyled Content (FOUC).
                </li>
                <li>
                  <strong>Deliver zero-reload Hot Module Replacement (HMR)</strong>{" "}
                  in development (including Webpack, Rollup, and Esbuild), updating{" "}
                  <code>/styles.css</code> and newly added Tailwind utilities in
                  place without losing React client state.
                </li>
                <li>
                  <strong>Resolve TypeScript path aliases &amp; CSS assets</strong>{" "}
                  (such as <code>@import &quot;@/styles/tokens.css&quot;;</code> and{" "}
                  <code>url(&quot;@/assets/pattern.svg&quot;)</code>) directly inside
                  stylesheets.
                </li>
              </ul>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <Palette className="h-4 w-4" />
                      <span>Tailwind CSS v4</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Modern CSS-first engine. No <code>tailwind.config.js</code>{" "}
                    required; configured natively via <code>@theme</code> and{" "}
                    <code>@utility</code> blocks.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/30 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <FileCode className="h-4 w-4" />
                      <span>Universal CSS Modules</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Works natively in both Server Components and Client Components
                    with identical scoped hashes and ambient TypeScript types.
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      <Zap className="h-4 w-4 text-emerald-500" />
                      <span>Single-File Extraction</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    All imported styles coalesce into a minified{" "}
                    <code>/styles.css</code> bundle, eliminating FOUC across SSG,
                    SSR, and static exports.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Linking Stylesheet */}
            <section id="linking-stylesheet" className="mt-12">
              <h2>Linking /styles.css</h2>
              <p>
                Because Dinou extracts all global styles, Tailwind utilities, and CSS
                Module rules into a unified stylesheet, link{" "}
                <code>/styles.css</code> explicitly in your root layout&apos;s{" "}
                <code>&lt;head&gt;</code>:
              </p>
              <CodeBlock
                language="html"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`<link href="/styles.css" rel="stylesheet" precedence="default" />`}
              </CodeBlock>

              <div id="precedence-attribute" className="mt-6 space-y-3">
                <h3 className="text-lg font-bold">React 19 precedence Attribute</h3>
                <p>
                  In React 19 and React Server Components (RSC),{" "}
                  <code>&lt;link rel=&quot;stylesheet&quot;&gt;</code> tags accept a{" "}
                  <code>precedence</code> attribute (for example,{" "}
                  <code>precedence=&quot;default&quot;</code>). This instructs React
                  to:
                </p>
                <ol className="text-sm space-y-1">
                  <li>
                    <strong>Hoist Resources Automatically:</strong> React hoists the{" "}
                    <code>&lt;link&gt;</code> tag into the document{" "}
                    <code>&lt;head&gt;</code> even if rendered inside a nested
                    component or layout.
                  </li>
                  <li>
                    <strong>Synchronize Streaming &amp; Suspense:</strong> React
                    waits for the critical stylesheet to load before revealing
                    streamed Suspense boundaries, preventing Flash of Unstyled
                    Content (FOUC).
                  </li>
                  <li>
                    <strong>Deduplicate Links:</strong> Multiple components rendering{" "}
                    <code>/styles.css</code> with the same precedence emit only a
                    single <code>&lt;link&gt;</code> element in the DOM.
                  </li>
                </ol>

                <p className="text-xs text-muted-foreground pt-2">
                  <strong>Note on <code>public/styles.css</code>:</strong> If your
                  application does not import any CSS files inside <code>src/</code>,
                  you can place a static <code>public/styles.css</code> file and
                  serve it directly at <code>/styles.css</code>. However, whenever
                  any stylesheet is imported in <code>src/</code>, Dinou&apos;s
                  compiled stylesheet bundle always takes precedence at{" "}
                  <code>/styles.css</code> in both <code>dinou dev</code> and{" "}
                  <code>dinou build</code> (ignoring <code>public/styles.css</code>{" "}
                  with a console warning—rename static stylesheets in{" "}
                  <code>public/</code> to e.g. <code>public/custom.css</code> or
                  import them from <code>src/</code>).
                </p>
              </div>
            </section>

            {/* Tailwind CSS v4 */}
            <section id="tailwind-v4" className="mt-12">
              <h2>Tailwind CSS (v4 Engine)</h2>
              <p>
                Dinou ships with the official <strong>Tailwind CSS v4</strong> engine
                via <code>@tailwindcss/postcss</code>. Tailwind v4 is CSS-first: no{" "}
                <code>tailwind.config.js</code> file is needed.
              </p>
              <p>
                Enable Tailwind CSS across your entire application by importing it at
                the top of your root stylesheet (typically{" "}
                <code>src/globals.css</code>):
              </p>
              <CodeBlock
                language="css"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`/* src/globals.css */
@import "tailwindcss";`}
              </CodeBlock>

              <div id="tailwind-theme" className="mt-6 space-y-3">
                <h3 className="text-lg font-bold">
                  Custom @theme &amp; Multi-Layout Setup
                </h3>
                <p>
                  Define custom design tokens, colors, fonts, radii, and utilities
                  directly in CSS using Tailwind v4&apos;s <code>@theme</code> and{" "}
                  <code>@utility</code> directives:
                </p>
                <CodeBlock
                  language="css"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`/* src/globals.css */
@import "tailwindcss";

@theme {
  --color-brand-primary: #3b82f6;
  --color-brand-dark: #1e293b;
  --font-display: "Inter", system-ui, sans-serif;
  --radius-badge: 0.375rem;
}

/* Custom utility definitions */
@utility text-balance {
  text-wrap: balance;
}

/* Base style overrides */
@layer base {
  body {
    @apply bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased;
  }
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  Utilities such as <code>bg-brand-primary</code>,{" "}
                  <code>font-display</code>, <code>rounded-badge</code>, and{" "}
                  <code>text-balance</code> are generated automatically whenever they
                  appear in your Server or Client Components.
                </p>

                <Alert className="not-prose my-4 border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20">
                  <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle className="text-sm font-semibold">
                    Multi-Layout Tailwind Best Practice
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Because all imported stylesheets coalesce into a single{" "}
                    <code>/styles.css</code> file, place{" "}
                    <code>@import &quot;tailwindcss&quot;;</code> in{" "}
                    <strong>one shared global stylesheet</strong> (such as{" "}
                    <code>src/globals.css</code>) rather than repeating{" "}
                    <code>@import &quot;tailwindcss&quot;;</code> across multiple
                    nested layout CSS files. When using Tailwind&apos;s{" "}
                    <code>@apply</code> or <code>@variant</code> inside secondary{" "}
                    <code>.css</code> or <code>.module.css</code> files, use{" "}
                    <code>@reference &quot;tailwindcss&quot;;</code> (or{" "}
                    <code>@reference &quot;@/globals.css&quot;;</code> to access
                    custom <code>@theme</code> tokens) without duplicating base reset
                    layers.
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* CSS Modules */}
            <section id="css-modules" className="mt-12">
              <h2>CSS Modules (*.module.css)</h2>
              <p>
                For component-scoped styling with zero selector collisions, name any
                stylesheet with the <code>.module.css</code> suffix. Dinou compiles
                CSS Modules seamlessly in <strong>both Server Components and Client Components</strong>{" "}
                across <code>dinou dev</code>, <code>dinou build</code>, and{" "}
                <code>dinou export-static</code>.
              </p>

              <div id="scoped-classnames" className="mt-6 space-y-3">
                <h3 className="text-lg font-bold">
                  Server &amp; Client Parity + Scoped Hashes
                </h3>
                <p>
                  Dinou&apos;s shared <code>createScopedName</code> generator
                  computes a deterministic Base64 cryptographic hash (
                  <code>[hash:base64]</code>) from the local class name and the
                  normalized file path relative to <code>src/</code>. Both the
                  Dual-Bundle RSC/SSR server compiler and the client bundler produce
                  the exact same class map:
                </p>
                <CodeBlock
                  language="css"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`/* src/components/card.module.css */
@reference "tailwindcss";

.card {
  @apply rounded-xl p-6;
  background-color: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: #3b82f6;
}`}
                </CodeBlock>

                <p className="mt-4">
                  Import the default <code>styles</code> object directly in a Server
                  Component (or in a <code>&quot;use client&quot;</code> component)
                  without needing any client wrapper:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/card.tsx (Server Component by default)
import styles from "./card.module.css";

export function FeatureCard({ title, badge }: { title: string; badge: string }) {
  return (
    <article className={styles.card}>
      <span className={styles.badge}>{badge}</span>
      <h3 className="text-lg font-bold mt-2">{title}</h3>
    </article>
  );
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  The rendered HTML outputs compact, collision-free classes such as{" "}
                  <code>class=&quot;B8B1e41-2H0_&quot;</code> identically during
                  SSG/SSR and client hydration.
                </p>
              </div>
            </section>

            {/* Global CSS, Third-Party Styles & Aliases */}
            <section id="global-css-imports" className="mt-12">
              <h2>Global CSS, Third-Party Styles &amp; Aliases</h2>
              <p>
                Dinou automatically discovers stylesheets imported anywhere in your
                route graph (note that unimported <code>.css</code> files in{" "}
                <code>src/</code> are never bundled accidentally):
              </p>
              <ul>
                <li>
                  <strong>Route &amp; Boundary Entrypoints:</strong> Import{" "}
                  <code>./globals.css</code> (or additional stylesheets) in{" "}
                  <code>src/layout.tsx</code>, <code>src/page.tsx</code>,{" "}
                  <code>src/error.tsx</code>, or <code>src/not_found.tsx</code>.
                </li>
                <li>
                  <strong>Third-Party <code>node_modules</code> Stylesheets:</strong>{" "}
                  Import package stylesheets such as{" "}
                  <code>import &quot;katex/dist/katex.min.css&quot;;</code> directly
                  inside either a Server Component or a Client Component (Dinou also
                  honors the <code>&quot;style&quot;</code> export condition in{" "}
                  <code>package.json</code>).
                </li>
                <li>
                  <strong>CSS <code>@import</code> with Path Aliases:</strong> Dinou
                  wires <code>postcss-import</code> to your{" "}
                  <code>tsconfig.json</code> / <code>jsconfig.json</code>{" "}
                  <code>paths</code> (with full support for JSONC comments and
                  trailing commas):
                </li>
              </ul>

              <CodeBlock
                language="css"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`/* src/globals.css — @import rules must precede @theme and other rules */
@import "tailwindcss";
@import "@/styles/tokens.css";
@import "@/styles/typography.css";`}
              </CodeBlock>

              <div id="css-url-assets" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">
                  CSS url(...) Assets &amp; Fonts
                </h3>
                <p>
                  Dinou&apos;s PostCSS pipeline distinguishes between static{" "}
                  <Link href="/docs/public">
                    <code>public/</code>
                  </Link>{" "}
                  URLs and bundled source/package assets across Esbuild, Rollup, and
                  Webpack:
                </p>
                <ul className="text-sm space-y-1">
                  <li>
                    <strong>Root-relative URLs (<code>url(&quot;/hero.webp&quot;)</code>):</strong>{" "}
                    Left untouched and served directly from your{" "}
                    <code>public/</code> directory.
                  </li>
                  <li>
                    <strong>
                      Relative, aliased &amp; package URLs (
                      <code>url(&quot;./pattern.svg#grid&quot;)</code>,{" "}
                      <code>url(&quot;@/assets/inter.woff2&quot;)</code>):
                    </strong>{" "}
                    Resolved from disk (including inside{" "}
                    <code>@import</code>-inlined partials and{" "}
                    <code>node_modules</code> fonts), hashed, and emitted to{" "}
                    <code>/assets/&lt;hash&gt;&lt;ext&gt;</code> with immutable
                    production caching while preserving SVG <code>#fragment</code>{" "}
                    identifiers.
                  </li>
                </ul>
                <CodeBlock
                  language="css"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`@font-face {
  font-family: "BrandSans";
  src: url("@/assets/fonts/brand-sans.woff2") format("woff2");
  font-weight: 400 700;
  font-display: swap;
}

.hero-surface {
  /* /noise.png -> served from public/noise.png */
  /* @/assets/grid.svg#mask -> emitted to /assets/<hash>.svg#mask */
  background-image: url("/noise.png"), url("@/assets/grid.svg#mask");
}`}
                </CodeBlock>
              </div>
            </section>

            {/* CSS HMR */}
            <section id="css-hmr" className="mt-12">
              <h2>Instant CSS Hot Module Replacement</h2>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/10 p-4 not-prose my-4 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm text-emerald-700 dark:text-emerald-400">
                  <RefreshCw className="h-4 w-4 text-emerald-500" />
                  <span>Zero-Reload HMR Across All Bundlers</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  During <code>dinou dev</code>, editing <code>.css</code> rules,{" "}
                  <code>.module.css</code> properties, or adding new Tailwind utility
                  classes in <code>.tsx</code> files incrementally updates{" "}
                  <code>/styles.css</code> in memory and swaps the stylesheet via
                  WebSocket with <strong>zero full-page reloads</strong>—preserving
                  React client state, form inputs, open dialogs, and scroll
                  positions. If you add or rename a class key in a{" "}
                  <code>.module.css</code> file, Dinou also triggers an{" "}
                  <code>rsc-update</code> automatically so Server Component class
                  attributes stay synchronized.
                </p>
              </div>
            </section>

            {/* TypeScript Types */}
            <section id="typescript-types" className="mt-12">
              <h2>TypeScript Declarations (dinou/env)</h2>
              <p>
                Built-in ambient type declarations for <code>*.module.css</code>,
                side-effect <code>*.css</code> imports, images, audio/video, and font
                files (<code>*.woff2</code>, <code>*.woff</code>, <code>*.ttf</code>,{" "}
                <code>*.otf</code>, <code>*.eot</code>) are provided via{" "}
                <code>dinou/env</code>.
              </p>
              <p>
                Ensure a <code>dinou-env.d.ts</code> file exists at the root of your
                project:
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`/// <reference types="dinou/env" />`}
              </CodeBlock>

              <p className="mt-3 text-sm">
                Include <code>dinou-env.d.ts</code> and Dinou&apos;s generated route
                types in your <code>tsconfig.json</code>:
              </p>
              <CodeBlock
                language="json"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`{
  "compilerOptions": {
    "target": "ES2022",
    "rootDirs": [
      "src",
      ".dinou/routes"
    ],
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "allowJs": true,
    "skipLibCheck": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "include": [
    "src",
    "dinou-env.d.ts",
    ".dinou/types/**/*.d.ts"
  ]
}`}
              </CodeBlock>
            </section>

            {/* Complete Example */}
            <section id="full-example" className="mt-12">
              <h2>Complete End-to-End Example</h2>
              <p>
                The following example combines a Server Component root layout,
                Tailwind v4 <code>@theme</code> tokens, a shared CSS Module, a Server
                Component page, and an interactive Client Component:
              </p>

              <TabbedCodeBlock
                containerClassName="w-full overflow-hidden rounded-lg my-6"
                tabs={[
                  {
                    id: "layout",
                    label: "src/layout.tsx",
                    language: "tsx",
                    code: `import type { LayoutProps } from "./dinou";
import "./globals.css"; // Imports Tailwind v4 & global tokens in a Server Component

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Dinou App</title>
        {/* Unified stylesheet hoisted with React 19 precedence */}
        <link href="/styles.css" rel="stylesheet" precedence="default" />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}`,
                  },
                  {
                    id: "globals",
                    label: "src/globals.css",
                    language: "css",
                    code: `@import "tailwindcss";

@theme {
  --color-brand: #10b981;
  --color-brand-hover: #059669;
  --radius-panel: 1rem;
}

:root {
  --card-bg: #ffffff;
  --border-color: #e2e8f0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --card-bg: #0f172a;
    --border-color: #1e293b;
  }
}

.custom-gradient {
  background: linear-gradient(135deg, var(--color-brand) 0%, #f59e0b 100%);
}`,
                  },
                  {
                    id: "module",
                    label: "src/card.module.css",
                    language: "css",
                    code: `@reference "tailwindcss";

.card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-panel);
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.badge {
  @apply inline-block text-xs font-bold uppercase tracking-wider;
  color: var(--color-brand);
}`,
                  },
                  {
                    id: "page",
                    label: "src/page.tsx",
                    language: "tsx",
                    code: `import styles from "./card.module.css";
import { LikeButton } from "./like-button";

// Server Component using scoped CSS Modules + Tailwind utilities directly
export default function HomePage() {
  return (
    <main className="container max-w-2xl mx-auto py-12 px-4 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Styling with Dinou
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Combines Tailwind v4 utilities with universal CSS Modules.
        </p>
      </header>

      <section className={styles.card}>
        <span className={styles.badge}>Server Component Card</span>
        <h2 className="text-xl font-bold mt-2">Zero Style Bleed</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Scoped classes render identically during RSC/SSR and client hydration.
        </p>
        <LikeButton />
      </section>
    </main>
  );
}`,
                  },
                  {
                    id: "client",
                    label: "src/like-button.tsx",
                    language: "tsx",
                    code: `"use client";

import { useState } from "react";
import styles from "./card.module.css";

export function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setLikes((n) => n + 1)}
      className="mt-4 px-4 py-2 custom-gradient text-white rounded-lg font-medium shadow hover:opacity-90 transition"
    >
      Liked {likes} times • <span className={styles.badge}>Client Island</span>
    </button>
  );
}`,
                  },
                ]}
              />
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
