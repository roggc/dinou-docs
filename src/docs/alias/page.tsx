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
  FolderTree,
  Settings,
  Zap,
  CheckCircle2,
  FileCode,
  Palette,
  Image as ImageIcon,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Layers,
  Code2,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "Import Aliases in Dinou", level: 2 },
  { id: "tsconfig-setup", title: "Configuring tsconfig.json", level: 2 },
  { id: "multiple-aliases", title: "Defining Multiple Granular Aliases", level: 3 },
  { id: "how-dinou-resolves", title: "How Dinou Resolves Aliases Internally", level: 2 },
  { id: "universal-support", title: "Where Aliases Work (Code, CSS, & Assets)", level: 2 },
  { id: "code-imports", title: "TypeScript & JavaScript Modules", level: 3 },
  { id: "css-imports", title: "CSS @import Rules", level: 3 },
  { id: "asset-imports", title: "Asset & Media Imports", level: 3 },
  { id: "index-and-extensions", title: "Automatic Extension & Index Resolution", level: 2 },
  { id: "ide-setup", title: "IDE Autocomplete & Refactoring Support", level: 2 },
  { id: "troubleshooting", title: "Best Practices & Common Gotchas", level: 2 },
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
                Import Aliases &amp; Path Resolution
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Configure clean, refactor-proof import paths across your codebase using standard <code>tsconfig.json</code> path mappings &mdash; supported seamlessly across code, stylesheets, and assets.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>Import Aliases in Dinou</h2>
              <p>
                In large projects, deeply nested relative paths like <code>../../../../components/ui/button</code> are fragile, difficult to read, and break whenever a file is moved to another directory.
              </p>
              <p>
                Dinou provides <strong>zero-config path alias support</strong> by reading your standard <code>tsconfig.json</code> directly. Even in plain JavaScript projects, using a <code>tsconfig.json</code> with <code>&quot;allowJs&quot;: true</code> is the recommended standard across modern tooling.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-red-500/20 bg-red-50/40 dark:bg-red-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-sm">
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
            <section id="tsconfig-setup" className="mt-12">
              <h2>Configuring tsconfig.json</h2>
              <p>
                To enable the standard <code>@/*</code> alias pointing to your <code>src/</code> directory, configure <code>baseUrl</code> and <code>paths</code> in your project root <code>tsconfig.json</code>:
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
                <AlertTitle>Using Plain JavaScript?</AlertTitle>
                <AlertDescription className="text-xs leading-relaxed mt-1">
                  Even if your project is written entirely in JavaScript (<code>.js</code> / <code>.jsx</code>), maintain a <code>tsconfig.json</code> with <code>&quot;allowJs&quot;: true</code>. This gives your editor and Dinou&apos;s build tools identical resolution semantics and full autocompletion without any TypeScript syntax required in your code.
                </AlertDescription>
              </Alert>

              <div id="multiple-aliases" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Defining Multiple Granular Aliases</h3>
                <p>
                  You are not limited to just <code>@/*</code>. You can declare multiple granular aliases to organize domain layers cleanly:
                </p>
                <CodeBlock
                  language="json"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@server/*": ["src/server-functions/*"],
      "@lib/*": ["src/lib/*"],
      "@styles/*": ["src/styles/*"],
      "@assets/*": ["src/assets/*"]
    }
  }
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  Dinou parses every alias mapping at startup, resolving wildcards (<code>/*</code>) relative to the defined <code>baseUrl</code>.
                </p>
              </div>
            </section>

            {/* How Dinou Resolves Aliases */}
            <section id="how-dinou-resolves" className="mt-12">
              <h2>How Dinou Resolves Aliases Internally</h2>
              <p>
                Under the hood, Dinou centralizes path alias resolution in its core resolver (<code>getAbsPathWithExt</code>). When any bundler (esbuild, rollup, webpack) or runtime loader encounters an import specifier:
              </p>

              <div className="border rounded-xl p-5 bg-card not-prose my-4 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Layers className="h-4 w-4 text-purple-500" />
                  <span>Resolution Pipeline Steps</span>
                </div>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>
                    <strong>Config Ingestion:</strong> Reads <code>tsconfig.json</code> and normalizes alias wildcards into an in-memory <code>Map&lt;string, AliasTarget&gt;</code>.
                  </li>
                  <li>
                    <strong>Specifier Matching:</strong> If the imported string starts with a recognized alias (e.g. <code>@/components/header</code>), it calculates the absolute path on disk.
                  </li>
                  <li>
                    <strong>File Extension Probing:</strong> If no extension is specified, Dinou tests candidate file extensions (<code>.ts</code>, <code>.tsx</code>, <code>.js</code>, <code>.jsx</code>) sequentially.
                  </li>
                  <li>
                    <strong>Directory Index Probing:</strong> If the target points to a folder, Dinou checks for an <code>index.ts</code>, <code>index.tsx</code>, <code>index.js</code>, or <code>index.jsx</code>.
                  </li>
                  <li>
                    <strong>Dual-Engine Sync:</strong> The exact same resolved path is delivered to both the Server Component compiler and Client Component bundler, preventing split-brain module resolution.
                  </li>
                </ol>
              </div>
            </section>

            {/* Universal Support */}
            <section id="universal-support" className="mt-12">
              <h2>Where Aliases Work (Code, CSS, &amp; Assets)</h2>
              <p>
                Unlike setups where aliases only work inside JavaScript/TypeScript files, Dinou propagates alias resolution across all asset types in your build pipeline:
              </p>

              {/* Sub-section: Code Imports */}
              <div id="code-imports" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">1. TypeScript &amp; JavaScript Modules</h3>
                <p>
                  Use aliases freely in Server Components (RSC), Client Components (<code>&quot;use client&quot;</code>), Server Functions (<code>&quot;use server&quot;</code>), and Page Functions:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/app/dashboard/page.tsx
import { UserCard } from "@/components/user-card";
import { fetchUserMetrics } from "@/server/metrics";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const metrics = await fetchUserMetrics();
  return <UserCard data={metrics} formattedTime={formatDate(Date.now())} />;
}`}
                </CodeBlock>
              </div>

              {/* Sub-section: CSS Imports */}
              <div id="css-imports" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">2. CSS @import Rules</h3>
                <p>
                  Dinou&apos;s PostCSS pipeline integrates <code>postcss-import</code> with the alias resolver. You can reference path aliases directly inside global CSS or CSS modules:
                </p>
                <CodeBlock
                  language="css"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`/* src/styles/theme.css */
@import "@/styles/tokens.css";
@import "@/styles/typography.css";

:root {
  --font-primary: var(--brand-font);
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  The resolver resolves <code>@/styles/tokens.css</code> to <code>src/styles/tokens.css</code> automatically during stylesheet extraction.
                </p>
              </div>

              {/* Sub-section: Asset Imports */}
              <div id="asset-imports" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3. Asset &amp; Media Imports</h3>
                <p>
                  Media files (images, SVGs, audio, video) can also be imported using path aliases:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/hero.tsx
import heroImage from "@/assets/images/hero-banner.webp";
import logoSvg from "@/assets/brand/logo.svg";

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
            <section id="index-and-extensions" className="mt-12">
              <h2>Automatic Extension &amp; Index Resolution</h2>
              <p>
                When importing via aliases, you do not need to specify file extensions or trailing <code>/index</code> files:
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
                      <td className="p-3.5 text-foreground font-semibold">import &#123; Card &#125; from &quot;@/components/card&quot;;</td>
                      <td className="p-3.5 text-muted-foreground">src/components/card.tsx (or .ts, .jsx, .js)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-foreground font-semibold">import &#123; Modal &#125; from &quot;@/components/modal&quot;;</td>
                      <td className="p-3.5 text-muted-foreground">src/components/modal/index.tsx (directory index)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-foreground font-semibold">import &#123; db &#125; from &quot;@/lib/db&quot;;</td>
                      <td className="p-3.5 text-muted-foreground">src/lib/db.ts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* IDE Setup */}
            <section id="ide-setup" className="mt-12">
              <h2>IDE Autocomplete &amp; Refactoring Support</h2>
              <p>
                Because Dinou uses standard TypeScript compiler configurations, modern development environments (VS Code, Cursor, WebStorm, Neovim) provide full first-class support without any plugins:
              </p>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>IntelliSense &amp; Auto-Import</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Typing component names automatically suggests the clean <code>@/</code> alias import.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Jump to Definition</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <code>Cmd+Click</code> or <code>F12</code> navigates directly to the target source file across aliases.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Safe File Renaming</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Renaming or moving files in your IDE updates all aliased import paths across your codebase automatically.
                  </p>
                </div>
              </div>

              <Alert className="not-prose mt-4">
                <Settings className="h-4 w-4" />
                <AlertTitle>VS Code / Cursor Recommendation</AlertTitle>
                <AlertDescription className="text-xs leading-relaxed mt-1">
                  To ensure your editor always prefers alias paths over relative paths when auto-importing, add the following to your <code>.vscode/settings.json</code>:
                  <code className="block mt-2 p-2 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono">
                    &#123; &quot;typescript.preferences.importModuleSpecifier&quot;: &quot;non-relative&quot; &#125;
                  </code>
                </AlertDescription>
              </Alert>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className="mt-12">
              <h2>Best Practices &amp; Common Gotchas</h2>

              <div className="space-y-4 mt-4">
                <div className="p-4 rounded-lg border bg-card not-prose space-y-1.5">
                  <div className="font-semibold text-sm text-foreground">Ensure &quot;moduleResolution&quot;: &quot;bundler&quot; is set</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    In modern TypeScript, <code>&quot;moduleResolution&quot;: &quot;bundler&quot;</code> accurately mirrors how Dinou&apos;s dual-bundler engine resolves files without requiring explicit <code>.js</code> file extensions on TypeScript imports.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card not-prose space-y-1.5">
                  <div className="font-semibold text-sm text-foreground">Check &quot;baseUrl&quot; in tsconfig.json</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Always set <code>&quot;baseUrl&quot;: &quot;.&quot;</code> in <code>tsconfig.json</code>. If <code>baseUrl</code> is omitted, relative path alias targets (like <code>src/*</code>) may not resolve predictably across different operating systems.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card not-prose space-y-1.5">
                  <div className="font-semibold text-sm text-foreground">Avoid Circular Dependency Loops</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    While aliases make it easy to import anything from anywhere, maintain clear architecture layers (e.g. components import from <code>@/lib</code>, but <code>@/lib</code> utilities should not import React UI components) to avoid circular reference warnings.
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
