"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
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
import {
  Palette,
  FileCode,
  Globe,
  Zap,
  CheckCircle2,
  Layers,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Code2,
  ArrowRight,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Styling in Dinou", level: 2 },
  { id: "linking-stylesheet", title: "Linking /styles.css", level: 2 },
  { id: "precedence-attribute", title: "React 19 precedence Attribute", level: 3 },
  { id: "tailwind-v4", title: "Tailwind CSS (v4 Engine)", level: 2 },
  { id: "tailwind-theme", title: "Custom @theme & Directives", level: 3 },
  { id: "css-modules", title: "CSS Modules (*.module.css)", level: 2 },
  { id: "scoped-classnames", title: "Scoped Class Names & Resolution", level: 3 },
  { id: "global-css-imports", title: "Global CSS & Path Aliases", level: 2 },
  { id: "css-hmr", title: "Instant CSS Hot Module Replacement", level: 2 },
  { id: "typescript-types", title: "TypeScript Declarations (dinou/env)", level: 2 },
  { id: "full-example", title: "Complete End-to-End Example", level: 2 },
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
                Styles &amp; CSS Architecture
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou features a unified, zero-config styling pipeline supporting <strong>Tailwind CSS v4</strong>, <strong>CSS Modules</strong>, and <strong>Global CSS</strong> with instant HMR and single-bundle extraction at <code>/styles.css</code>.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>Styling in Dinou</h2>
              <p>
                Dinou provides built-in, out-of-the-box support for the modern CSS ecosystem without requiring complex bundler setup. Under the hood, Dinou orchestrates PostCSS, <code>@tailwindcss/postcss</code>, Autoprefixer, and <code>postcss-modules</code> to:
              </p>
              <ul>
                <li>
                  <strong>Extract all styles</strong> across Server and Client Components into a single, optimized production bundle served at <code>/styles.css</code>.
                </li>
                <li>
                  <strong>Eliminate CSS specificity conflicts</strong> by compiling CSS Modules with cryptographic scoped hashing.
                </li>
                <li>
                  <strong>Provide sub-millisecond Hot Module Replacement (HMR)</strong> in development, updating styles in place without full page reloads or React state loss.
                </li>
                <li>
                  <strong>Resolve TypeScript path aliases</strong> (such as <code>@/styles/tokens.css</code>) directly inside your CSS <code>@import</code> rules.
                </li>
              </ul>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                      <Palette className="h-4 w-4" />
                      <span>Tailwind CSS v4</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Modern CSS-first engine. No <code>tailwind.config.js</code> required; configured with native <code>@theme</code> blocks.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/50 dark:bg-purple-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                      <FileCode className="h-4 w-4" />
                      <span>CSS Modules</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Locally scoped classes for component-level isolation with automatic TypeScript ambient declarations.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <Zap className="h-4 w-4" />
                      <span>Single-File Extraction</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    All styles coalesce into <code>/styles.css</code>, eliminating Flash of Unstyled Content (FOUC).
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Linking Stylesheet */}
            <section id="linking-stylesheet" className="mt-12">
              <h2>Linking /styles.css</h2>
              <p>
                Because Dinou bundles all global styles, Tailwind classes, and CSS module rules into a unified stylesheet, you <strong>must manually link</strong> the stylesheet in your root layout or document <code>&lt;head&gt;</code>:
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
                  In React 19 and React Server Components (RSC), <code>&lt;link rel=&quot;stylesheet&quot;&gt;</code> tags accept a special <code>precedence</code> attribute (e.g. <code>precedence=&quot;default&quot;</code>). This tells the React runtime:
                </p>
                <ol className="text-sm space-y-1">
                  <li>
                    <strong>Resource Hoisting:</strong> React hoists the link tag into the document <code>&lt;head&gt;</code> automatically, even if rendered inside a nested sub-component or layout.
                  </li>
                  <li>
                    <strong>Suspense &amp; Streaming Synchronization:</strong> React pauses rendering of stream-dependent HTML until the critical stylesheet has finished loading in the browser, preventing Flash of Unstyled Content (FOUC).
                  </li>
                  <li>
                    <strong>Deduplication:</strong> If multiple components request <code>/styles.css</code> with the same precedence, React ensures only a single link tag is rendered in the final DOM.
                  </li>
                </ol>
              </div>
            </section>

            {/* Tailwind CSS v4 */}
            <section id="tailwind-v4" className="mt-12">
              <h2>Tailwind CSS (v4 Engine)</h2>
              <p>
                Dinou v7 incorporates the official <strong>Tailwind CSS v4</strong> engine via <code>@tailwindcss/postcss</code>. Tailwind v4 is fundamentally CSS-native: there is no JavaScript config file (<code>tailwind.config.js</code>) required by default.
              </p>
              <p>
                To enable Tailwind CSS across your application, simply import it at the top of your global CSS file (typically <code>src/globals.css</code>):
              </p>
              <CodeBlock
                language="css"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`/* src/globals.css */
@import "tailwindcss";`}
              </CodeBlock>

              <div id="tailwind-theme" className="mt-6 space-y-3">
                <h3 className="text-lg font-bold">Custom @theme &amp; Directives</h3>
                <p>
                  In Tailwind v4, custom colors, fonts, spacing, and breakpoints are defined directly in CSS using the <code>@theme</code> directive:
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
    @apply bg-background text-foreground antialiased;
  }
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  Classes like <code>bg-brand-primary</code>, <code>font-display</code>, and <code>text-balance</code> are generated automatically by Tailwind v4 during compilation.
                </p>
              </div>
            </section>

            {/* CSS Modules */}
            <section id="css-modules" className="mt-12">
              <h2>CSS Modules (*.module.css)</h2>
              <p>
                When you want component-scoped styling without utility classes or global selector collisions, use <strong>CSS Modules</strong>. Any file ending in <code>.module.css</code> is processed automatically by Dinou&apos;s PostCSS module compiler.
              </p>

              <div id="scoped-classnames" className="mt-6 space-y-3">
                <h3 className="text-lg font-bold">Scoped Class Names &amp; Resolution</h3>
                <p>
                  During compilation, Dinou transforms local class names into globally unique identifiers using its internal <code>createScopedName</code> generator:
                </p>
                <CodeBlock
                  language="css"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`/* src/components/card.module.css */
.card {
  padding: 1.5rem;
  border-radius: 0.75rem;
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
                  Import the module object in your component and apply the scoped keys:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/card.tsx
"use client";

import styles from "./card.module.css";

export function FeatureCard({ title, badge }: { title: string; badge: string }) {
  return (
    <div className={styles.card}>
      <span className={styles.badge}>{badge}</span>
      <h3 className="text-lg font-bold mt-2">{title}</h3>
    </div>
  );
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  The compiled DOM will render classes like <code>_card__card___a1b2c</code>, guaranteeing zero styling overlap with any other card component in the application.
                </p>
              </div>
            </section>

            {/* Global CSS & Path Aliases */}
            <section id="global-css-imports" className="mt-12">
              <h2>Global CSS &amp; Path Aliases</h2>
              <p>
                You can import CSS files anywhere in your application tree:
              </p>
              <ul>
                <li>
                  <strong>Root Layout:</strong> Import <code>./globals.css</code> in your root <code>src/layout.tsx</code> to establish base reset rules, design tokens, and Tailwind directives.
                </li>
                <li>
                  <strong>Component Files:</strong> Import local stylesheets or third-party library CSS (e.g. <code>import &quot;katex/dist/katex.min.css&quot;;</code>) directly inside the component that uses them.
                </li>
                <li>
                  <strong>CSS @import with Path Aliases:</strong> Dinou integrates <code>postcss-import</code> with its internal path alias resolver. You can reference paths configured in your <code>tsconfig.json</code> inside CSS files:
                </li>
              </ul>

              <CodeBlock
                language="css"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`/* src/styles/main.css */
@import "@/styles/tokens.css";
@import "@/styles/typography.css";
@import "tailwindcss";`}
              </CodeBlock>
            </section>

            {/* CSS HMR */}
            <section id="css-hmr" className="mt-12">
              <h2>Instant CSS Hot Module Replacement</h2>
              <p>
                In development mode, Dinou provides dedicated, high-speed <strong>CSS Hot Module Replacement</strong>:
              </p>
              <div className="rounded-xl border p-4 bg-card not-prose space-y-3 my-4">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <RefreshCw className="h-4 w-4 text-blue-500" />
                  <span>How Dinou CSS HMR Operates</span>
                </div>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                  <li>
                    When you edit any <code>.css</code> or <code>.module.css</code> file, Dinou&apos;s dev watcher triggers the PostCSS compiler.
                  </li>
                  <li>
                    An incremental dev cache (<code>.dinou/cache/css-dev-cache.json</code>) checks file modification timestamps (<code>mtime</code>), ensuring only modified CSS files are reprocessed.
                  </li>
                  <li>
                    Dinou&apos;s HMR engine broadcasts a <code>style-update</code> event across the active WebSocket connection.
                  </li>
                  <li>
                    The browser client updates the <code>/styles.css</code> stylesheet in place with a cache-busting timestamp query (e.g. <code>/styles.css?t=1698765432</code>).
                  </li>
                  <li>
                    <strong>Zero State Reset:</strong> React component state, active input values, dialog states, and scroll positions remain completely intact.
                  </li>
                </ol>
              </div>
            </section>

            {/* TypeScript Types */}
            <section id="typescript-types" className="mt-12">
              <h2>TypeScript Declarations (dinou/env)</h2>
              <p>
                Starting with <strong>Dinou v6.1.0</strong> and <strong>v7</strong>, built-in ambient type declarations for CSS Modules and static media assets are provided directly via <code>dinou/env</code>.
              </p>
              <p>
                Create or verify a <code>dinou-env.d.ts</code> file at the root of your project:
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`/// <reference types="dinou/env" />`}
              </CodeBlock>

              <p className="mt-3 text-sm">
                Ensure your <code>tsconfig.json</code> includes the declaration file and specifies <code>&quot;moduleResolution&quot;: &quot;bundler&quot;</code>:
              </p>
              <CodeBlock
                language="json"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
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
    "dinou-env.d.ts"
  ]
}`}
              </CodeBlock>

              <Alert className="not-prose mt-4">
                <Code2 className="h-4 w-4" />
                <AlertTitle>Legacy Projects (v6.0.1 or earlier)</AlertTitle>
                <AlertDescription className="text-xs">
                  If working on an older Dinou project prior to <code>dinou/env</code>, you can declare module typings manually by creating <code>src/css.d.ts</code> containing:
                  <code className="block mt-1 p-2 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
                    declare module &quot;*.module.css&quot; &#123; const classes: &#123; [key: string]: string &#125;; export default classes; &#125;
                  </code>
                </AlertDescription>
              </Alert>
            </section>

            {/* Complete Example */}
            <section id="full-example" className="mt-12">
              <h2>Complete End-to-End Example</h2>
              <p>
                The following cohesive example shows how the root layout, Tailwind v4 global CSS, CSS modules, and page components function together harmoniously:
              </p>

              <h4>1. Root Layout (<code>src/layout.tsx</code>)</h4>
              <CodeBlock
                language="tsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`"use client";

import type { ReactNode } from "react";
import "./globals.css"; // Imports Tailwind v4 & global tokens

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Dinou App</title>
        {/* Critical single-bundle stylesheet with React 19 precedence */}
        <link href="/styles.css" rel="stylesheet" precedence="default" />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}`}
              </CodeBlock>

              <h4>2. Global CSS (<code>src/globals.css</code>)</h4>
              <CodeBlock
                language="css"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`@import "tailwindcss";

@theme {
  --color-brand: #6366f1;
  --color-brand-hover: #4f46e5;
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
  background: linear-gradient(135deg, var(--color-brand) 0%, #a855f7 100%);
}`}
              </CodeBlock>

              <h4>3. CSS Module (<code>src/card.module.css</code>)</h4>
              <CodeBlock
                language="css"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`.card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-panel);
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-brand);
}`}
              </CodeBlock>

              <h4>4. Page Component (<code>src/page.tsx</code>)</h4>
              <CodeBlock
                language="tsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`"use client";

import styles from "./card.module.css";

export default function HomePage() {
  return (
    <main className="container max-w-2xl mx-auto py-12 px-4 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Styling with Dinou
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Combines Tailwind utility classes with locally scoped CSS Modules.
        </p>
      </header>

      {/* Using scoped CSS Module styles alongside Tailwind utilities */}
      <div className={styles.card}>
        <span className={styles.badge}>Modular Component</span>
        <h2 className="text-xl font-bold mt-2">Zero Style Bleed</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Scoped classes are automatically hashed and isolated by Dinou PostCSS.
        </p>
        <button className="mt-4 px-4 py-2 custom-gradient text-white rounded-lg font-medium shadow hover:opacity-90 transition">
          Interactive Button
        </button>
      </div>
    </main>
  );
}`}
              </CodeBlock>
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
