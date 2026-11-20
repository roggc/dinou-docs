import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/docs/components/ui/table";
import { Badge } from "@/docs/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  FolderX,
  Layers,
  Cloud,
  ImageIcon,
  Settings,
  Lock,
  FileCode2,
  Plug,
  Rocket,
  Zap,
} from "lucide-react";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "1. Overview & Quick Upgrade", level: 2 },
  { id: "upgrade-deps", title: "1.1 Upgrading Dependencies & Typegen", level: 3 },
  { id: "breaking-changes", title: "2. Breaking Changes (v9 to v10)", level: 2 },
  { id: "breaking-underscore-folders", title: "2.1 Underscore (_folder) Full Exclusion", level: 3 },
  { id: "breaking-ppr-inheritance", title: "2.2 Per-Segment ppr (No Inheritance)", level: 3 },
  { id: "breaking-deployment-paths", title: "2.3 Deployment & Build Output Paths", level: 3 },
  { id: "breaking-favicons", title: "2.4 Removed favicons/ (Unified public/)", level: 3 },
  { id: "breaking-onrequest-ssg", title: "2.5 plugin.onRequest Skipped in SSG", level: 3 },
  { id: "breaking-env-vars", title: "2.6 Client Env Isolation (DINOU_PUBLIC_*)", level: 3 },
  { id: "breaking-types-deps", title: "2.7 Strict Route Types & Removed Deps", level: 3 },
  { id: "whats-new", title: "3. Major New Features in v10", level: 2 },
  { id: "new-type-safe-routing", title: "3.1 End-to-End Type-Safe Routing & ./dinou", level: 3 },
  { id: "new-env-and-aliases", title: "3.2 .env* Hierarchy & tsconfig Aliases", level: 3 },
  { id: "new-config-plugins", title: "3.3 AOT Config, allowISG & assetExtensions", level: 3 },
  { id: "new-deployment-assets", title: "3.4 Netlify v2 AOT, Static SPA & Range Media", level: 3 },
  { id: "new-runtime-engine", title: "3.5 Inline RSC Streaming & Stability", level: 3 },
  { id: "new-uneject", title: "3.6 Transactional dinou uneject", level: 3 },
  { id: "ejected-apps", title: "4. Upgrading Ejected Applications", level: 2 },
  { id: "migration-checklist", title: "5. Verification Checklist", level: 2 },
];

export default function MigrationV9ToV10Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Migration from v9 to v10 | Dinou Docs</title>
      <meta
        name="description"
        content="Complete migration guide for upgrading from Dinou v9 to v10: breaking changes (_folder exclusion, per-segment PPR, Cloudflare & Netlify output paths, unified public/, DINOU_PUBLIC_*) and major new features."
      />
      <link rel="canonical" href="https://dinou.dev/docs/migration/v9-to-v10" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Major Release
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                v9 &rarr; v10
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Migration from v9 to v10
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou v10 is a landmark major release introducing <strong>End-to-End Type-Safe Routing</strong> with zero-boilerplate <code>&quot;./dinou&quot;</code> contextual modules, full <code>.env*</code> &amp; <code>DINOU_PUBLIC_*</code> isolation, unified <code>tsconfig.json</code> path aliases, AOT <code>dinou.config.ts</code> &amp; Netlify Functions v2 bundles, single-execution inline RSC streaming, and transactional <code>dinou uneject</code> — alongside targeted breaking changes to tighten security, routing determinism, and deployment isolation.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Overview &amp; Quick Upgrade
              </h2>
              <p>
                Most application code (Server Components, Client Components, Server Functions, <code>page_functions.ts</code>, and <code>layout_functions.ts</code>) works out of the box in Dinou v10. However, v10 introduces <strong>7 targeted breaking changes</strong> affecting underscore-prefixed helper folders, PPR inheritance, cloud deployment directories, legacy <code>favicons/</code>, build-time plugin hooks, client environment variables, and strict route typing.
              </p>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden not-prose my-6 shadow-sm">
                <div className="overflow-x-auto">
                  <Table className="min-w-[640px]">
                    <TableHeader className="bg-slate-50 dark:bg-slate-900/60">
                      <TableRow>
                        <TableHead className="w-[24%] font-semibold text-slate-900 dark:text-slate-100 text-xs">
                          Area
                        </TableHead>
                        <TableHead className="w-[36%] font-semibold text-slate-500 text-xs">
                          Dinou v9 (Previous)
                        </TableHead>
                        <TableHead className="w-[40%] font-semibold text-blue-600 dark:text-blue-400 text-xs">
                          Dinou v10 (Current)
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                          <code>_folder</code> Directories
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Skipped URL routing but still scanned by bundlers, manifests, and Server Functions
                        </TableCell>
                        <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                          Completely excluded (&ldquo;parked/archived&rdquo;); active imports fail at compile time (move helpers to clean folders like <code>src/components</code>)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                          <code>ppr</code> Resolution
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Inherited from parent <code>layout_functions.ts</code> down to child layouts and pages
                        </TableCell>
                        <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                          Strictly per-segment (no parent-to-child inheritance), falling back to global <code>dinou.config.ts</code>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                          Cloudflare &amp; Netlify Paths
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Cloudflare used <code>.dinou/dist3</code>; manifests lived in root <code>.dinou/*</code> folders
                        </TableCell>
                        <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                          Cloudflare: <code>.dinou/cloudflare/assets</code>; Netlify: <code>.dinou/netlify/functions</code> (AOT v2); manifests consolidated into <code>.dinou/dist1</code>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                          Static Files (<code>favicons/</code>)
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Supported legacy root <code>favicons/</code> alongside <code>public/</code>; root <code>/manifest.json</code> reserved
                        </TableCell>
                        <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                          Unified <code>public/</code> only (<code>favicons/</code> removed); <code>public/manifest.json</code> freed for PWAs
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                          <code>plugin.onRequest</code> in SSG
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Executed during build-time SSG pre-rendering
                        </TableCell>
                        <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                          Skipped during build-time SSG (<code>isSSG === true</code>); runs on every runtime HTTP request
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                          Client <code>process.env.*</code>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Unprefixed variables could leak during SSR or throw in browser
                        </TableCell>
                        <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                          Unprefixed vars strictly evaluate to <code>undefined</code> in <code>&quot;use client&quot;</code>; explicit <code>DINOU_PUBLIC_*</code> prefix inlined across all 3 bundlers
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                          Routing Types &amp; Legacy Deps
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Untyped string URLs; <code>dotenv</code> &amp; <code>cross-env</code> bundled transitively
                        </TableCell>
                        <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                          Strict typed <code>&lt;Link&gt;</code> &amp; <code>useRouter()</code> via <code>dinou typegen</code>; 7 obsolete deps removed (31 compiled vendors)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* 1.1 Upgrading Dependencies */}
              <div id="upgrade-deps" className="space-y-4 mt-6 scroll-mt-20">
                <h3 className="text-lg font-bold">1.1 Upgrading Dependencies &amp; Running Typegen</h3>
                <p>
                  Upgrade <code>dinou</code> to v10 (requires <code>react</code> and <code>react-dom</code> at <strong>19.3.1</strong> or higher), then generate route types:
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="npm"
                    tabs={[
                      {
                        id: "npm",
                        label: "npm",
                        language: "bash",
                        code: `npm install dinou@latest
npx dinou typegen`,
                      },
                      {
                        id: "pnpm",
                        label: "pnpm",
                        language: "bash",
                        code: `pnpm add dinou@latest
pnpm exec dinou typegen`,
                      },
                      {
                        id: "bun",
                        label: "bun",
                        language: "bash",
                        code: `bun add dinou@latest
bunx dinou typegen`,
                      },
                      {
                        id: "yarn",
                        label: "yarn",
                        language: "bash",
                        code: `yarn add dinou@latest
yarn dinou typegen`,
                      },
                    ]}
                  />
                </div>

                <p>
                  Update <code>tsconfig.json</code> to include generated route declarations and enable zero-boilerplate contextual <code>&quot;./dinou&quot;</code> imports:
                </p>

                <div className="not-prose my-4">
                  <CodeBlock language="json">{`{
  "compilerOptions": {
    "rootDirs": ["src", ".dinou/routes"],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["dinou-env.d.ts", ".dinou/types/**/*.d.ts", "src/**/*"]
}`}</CodeBlock>
                </div>

                <p className="text-sm text-muted-foreground">
                  Make sure <code>dinou-env.d.ts</code> exists at your project root with <code>/// &lt;reference types=&quot;dinou/env&quot; /&gt;</code> so static asset imports (including fonts and custom <code>assetExtensions</code>) are typed automatically.
                </p>
              </div>
            </section>

            {/* Section 2: Breaking Changes */}
            <section id="breaking-changes" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Breaking Changes (v9 to v10)
              </h2>

              <div className="not-prose my-4">
                <Alert className="border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-700 dark:text-amber-300 font-semibold">
                    Action Required Before Deploying v10
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Review each item below before deploying an upgraded v9 project. All compile-time checks (<code>_folder</code> imports, strict route types) surface immediately via <code>npm run dev</code> and <code>npx tsc --noEmit</code>, while runtime/deployment changes (PPR inheritance, <code>wrangler.toml</code>, <code>netlify.toml</code>, <code>favicons/</code>, and SSG <code>onRequest</code>) require manual verification.
                  </AlertDescription>
                </Alert>
              </div>

              {/* 2.1 Underscore Folders */}
              <div id="breaking-underscore-folders" className="space-y-4 mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FolderX className="h-5 w-5 text-red-500 shrink-0" />
                  <span>2.1 Underscore (<code>_folder</code>) Directories Are Now Fully Excluded</span>
                </h3>
                <p>
                  In v9, directories prefixed with an underscore inside <code>src/</code> (such as <code>src/_components/</code> or <code>src/_plugins/</code>) only opted out of URL routing while remaining visible to bundlers, manifests, and Server Functions.
                </p>
                <p>
                  In <strong>Dinou v10</strong>, any <code>_</code>-prefixed directory subtree inside <code>src/</code> is treated as <strong>completely parked / archived</strong>: excluded from routing, bundlers, CSS extraction, VFS snapshots, dev watchers, route types, and Server Functions (returning <code>403 Forbidden access</code> if invoked). Any active file in <code>src/</code> importing from a <code>_</code>-prefixed folder now fails immediately at compile time with an actionable error.
                </p>
                <p className="text-sm text-muted-foreground">
                  In Dinou, <strong>any folder without a <code>page.tsx</code> is already ignored by the router</strong> — you never need a leading underscore for active components, utilities, or plugins. Note that <code>_</code>-prefixed <em>files</em> inside active directories (e.g., <code>src/blog/_helper.ts</code>) remain valid.
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="after"
                    tabs={[
                      {
                        id: "before",
                        label: "Before (v9 — Fails in v10)",
                        language: "typescript",
                        code: `// Folders like src/_components, src/_lib, src/_plugins
import { Header } from "@/_components/header";     // ❌ Compile-time error in v10
import { clerkPlugin } from "@/_plugins/clerk";    // ❌ Compile-time error in v10
import { formatDate } from "./_utils/dates";       // ❌ Compile-time error in v10`,
                      },
                      {
                        id: "after",
                        label: "After (v10 — Recommended)",
                        language: "typescript",
                        code: `// Rename folders by removing the leading underscore:
// src/components/, src/lib/, src/plugins/, src/blog/utils/
import { Header } from "@/components/header";      // ✅ Clean & ignored by router (no page.tsx)
import { clerkPlugin } from "@/plugins/clerk";     // ✅ Works across dev, build & AOT config
import { formatDate } from "./utils/dates";        // ✅ Valid active helper folder

// Reserve _folders strictly for parked/disabled route trees or WIP drafts:
// src/_old-checkout/page.tsx                      // Completely ignored by router & bundlers`,
                      },
                    ]}
                  />
                </div>
              </div>

              {/* 2.2 Per-Segment PPR */}
              <div id="breaking-ppr-inheritance" className="space-y-4 mt-10 scroll-mt-20">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-red-500 shrink-0" />
                  <span>2.2 Per-Segment <code>ppr</code> Resolution (No Parent-to-Child Inheritance)</span>
                </h3>
                <p>
                  In v9, exporting <code>export const ppr = true;</code> in a parent <code>layout_functions.ts</code> cascaded automatically to nested layouts and child pages.
                </p>
                <p>
                  In <strong>Dinou v10</strong>, parent-to-child <code>ppr</code> inheritance has been removed so mixed-PPR hierarchies behave predictably without false-positive holes or hidden bailouts. Every <code>layout_functions.ts</code> and <code>page_functions.ts</code> resolves its own <code>ppr</code> flag independently, falling back directly to the global default in <code>dinou.config.ts</code> (<code>ppr: false</code> by default).
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="global"
                    tabs={[
                      {
                        id: "global",
                        label: "Option A: Enable Globally in dinou.config.ts",
                        language: "typescript",
                        code: `// dinou.config.ts — enables PPR across all layouts & pages by default
import { defineConfig } from "dinou";

export default defineConfig({
  ppr: true,
});

// Opt out individual segments when needed:
// src/marketing/page_functions.ts
export const ppr = false;`,
                      },
                      {
                        id: "per-segment",
                        label: "Option B: Explicit Per-Segment Opt-In",
                        language: "typescript",
                        code: `// src/dashboard/layout_functions.ts
export const ppr = true; // Applies ONLY to src/dashboard/layout.tsx

// src/dashboard/page_functions.ts
export const ppr = true; // Required explicitly if the child page also uses PPR`,
                      },
                    ]}
                  />
                </div>
              </div>

              {/* 2.3 Deployment & Output Paths */}
              <div id="breaking-deployment-paths" className="space-y-4 mt-10 scroll-mt-20">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-red-500 shrink-0" />
                  <span>2.3 Deployment &amp; Build Output Directory Changes</span>
                </h3>
                <p>
                  Dinou v10 enforces strict physical isolation between public static assets, internal server manifests, and platform-specific build outputs:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-sm">
                  <li>
                    <strong>Cloudflare Workers (<code>wrangler.toml</code>):</strong> Static assets and isolated internal cache files (<code>__dinou_dist2</code>, blocked with <code>404</code> externally) now emit to <code>.dinou/cloudflare/assets</code> instead of <code>.dinou/dist3</code>.
                  </li>
                  <li>
                    <strong>Netlify Functions v2 (<code>netlify.toml</code>):</strong> Dedicated single-file AOT bundles now emit to <code>.dinou/netlify/functions/ssr.mjs</code> (<code>build:netlify</code>). Only <code>.dinou/dist2/**</code> needs to be listed in <code>included_files</code> — no more bundling <code>node_modules/**</code> or <code>src/**</code>. (Legacy <code>.dinou/dist1/server</code> entries are also available.)
                  </li>
                  <li>
                    <strong>Internal Manifests &amp; Docker:</strong> <code>.dinou/react_client_manifest</code> and <code>.dinou/server_functions_manifest</code> have been removed, and <code>manifest.json</code> moved out of <code>.dinou/dist3</code> into <code>.dinou/dist1</code>. Ensure non-root Node Dockerfiles copy <code>.dinou/dist2</code> with <code>--chown=node:node</code> so runtime ISR writes succeed.
                  </li>
                </ul>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="cloudflare"
                    tabs={[
                      {
                        id: "cloudflare",
                        label: "wrangler.toml (Cloudflare)",
                        language: "toml",
                        code: `name = "my-dinou-app"
main = ".dinou/cloudflare/worker.js"
compatibility_date = "2026-01-01"
compatibility_flags = ["nodejs_compat"]

[assets]
# Updated in v10 (was ".dinou/dist3" in v9)
directory = ".dinou/cloudflare/assets"
binding = "ASSETS"
run_worker_first = true`,
                      },
                      {
                        id: "netlify",
                        label: "netlify.toml (Netlify v2 AOT)",
                        language: "toml",
                        code: `[build]
command = "npm run build:netlify"
publish = ".dinou/dist3"

[functions]
# Dedicated single-file AOT bundle in v10
directory = ".dinou/netlify/functions"
included_files = [".dinou/dist2/**"]`,
                      },
                      {
                        id: "docker",
                        label: "Dockerfile (Node.js)",
                        language: "dockerfile",
                        code: `# Copy only runtime artifacts (no .dinou/react_client_manifest in v10)
COPY --from=builder /app/.dinou/dist1 ./.dinou/dist1
COPY --from=builder /app/.dinou/dist3 ./.dinou/dist3
COPY --from=builder /app/.dinou/node ./.dinou/node
# Ensure non-root USER node can write ISR/ISG updates into .dinou/dist2
COPY --from=builder --chown=node:node /app/.dinou/dist2 ./.dinou/dist2`,
                      },
                    ]}
                  />
                </div>
              </div>

              {/* 2.4 Removed favicons/ */}
              <div id="breaking-favicons" className="space-y-4 mt-10 scroll-mt-20">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-red-500 shrink-0" />
                  <span>2.4 Removed Legacy <code>favicons/</code> Directory (Unified <code>public/</code>)</span>
                </h3>
                <p>
                  Dinou v10 removes legacy copying and watching of the root <code>favicons/</code> directory, standardizing exclusively on <code>public/</code> for all unhashed static assets (icons, <code>robots.txt</code>, <code>sitemap.xml</code>, <code>manifest.json</code>, and <code>.well-known/*</code>).
                </p>

                <div className="not-prose my-4">
                  <CodeBlock language="bash">{`# Move any remaining files from favicons/ into public/
mkdir -p public
mv favicons/* public/
rmdir favicons`}</CodeBlock>
                </div>

                <p className="text-sm text-muted-foreground">
                  Moving Dinou&apos;s internal bundler chunk manifest to <code>.dinou/dist1/manifest.json</code> also frees <code>/manifest.json</code> at your domain root for standard Progressive Web Apps (<code>public/manifest.json</code>). See <Link href="/docs/public" className="text-blue-500 hover:underline">Public Directory</Link>.
                </p>
              </div>

              {/* 2.5 plugin.onRequest in SSG */}
              <div id="breaking-onrequest-ssg" className="space-y-4 mt-10 scroll-mt-20">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Settings className="h-5 w-5 text-red-500 shrink-0" />
                  <span>2.5 <code>plugin.onRequest</code> No Longer Runs During Build-Time SSG</span>
                </h3>
                <p>
                  In v9, <code>plugin.onRequest</code> and <code>plugin.onRequestContext</code> executed during build-time static site generation (<code>npm run build</code>), which could accidentally trigger authentication redirects, rate limiters, or request logging while pre-rendering static pages.
                </p>
                <p>
                  In <strong>Dinou v10</strong>, <code>onRequest</code> is skipped during SSG (<code>platformContext.isSSG === true</code>) and runs exclusively on live runtime HTTP requests (ahead of both dynamic routes and cached SSG/ISR/PPR responses). If a statically pre-rendered Server Component reads custom data normally injected by a plugin (such as an i18n translator), add a safe fallback derived from <code>getContext().req?.path</code> (which is populated during SSG without triggering dynamic bailout):
                </p>

                <div className="not-prose my-4">
                  <CodeBlock language="typescript">{`// Example: SSG-safe fallback when onRequest is skipped at build time
import { getContext } from "dinou";

export function getServerLocale(): "en" | "es" {
  const ctx = getContext();
  if (ctx.locale) return ctx.locale; // Set by plugin.onRequest at runtime

  // Fallback for build-time SSG using ctx.req.path (does NOT cause dynamic bailout)
  return ctx.req?.path?.startsWith("/es") ? "es" : "en";
}`}</CodeBlock>
                </div>
              </div>

              {/* 2.6 Client Env Isolation */}
              <div id="breaking-env-vars" className="space-y-4 mt-10 scroll-mt-20">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Lock className="h-5 w-5 text-red-500 shrink-0" />
                  <span>2.6 Strict Client Env Isolation (<code>DINOU_PUBLIC_*</code>)</span>
                </h3>
                <p>
                  Inside <code>&quot;use client&quot;</code> components, any unprefixed <code>process.env.*</code> reference now strictly evaluates to <code>undefined</code> during both SSR/SSG and browser execution across Esbuild, Rollup, and Webpack — preventing accidental secret leaks into HTML and browser <code>ReferenceError: process is not defined</code> crashes.
                </p>
                <p>
                  If a Client Component needs a build-time public value (such as an analytics ID or public API origin), prefix it with <code>DINOU_PUBLIC_</code>. For runtime-configured values across Edge/Serverless runtimes, read <code>getContext().env</code> in a Server Component and pass it down as props. See <Link href="/docs/env-vars" className="text-blue-500 hover:underline">Environment Variables</Link>.
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="after"
                    tabs={[
                      {
                        id: "before",
                        label: "Before (v9 — Evaluates to undefined in v10)",
                        language: "tsx",
                        code: `"use client";

export function Analytics() {
  // ❌ Always undefined in Client Components in v10
  const apiUrl = process.env.API_URL;
  return <div data-api={apiUrl} />;
}`,
                      },
                      {
                        id: "after",
                        label: "After (v10 — Explicit DINOU_PUBLIC_*)",
                        language: "tsx",
                        code: `"use client";

export function Analytics() {
  // ✅ Safely inlined at build time across Esbuild, Rollup, and Webpack
  const apiUrl = process.env.DINOU_PUBLIC_API_URL;
  return <div data-api={apiUrl} />;
}`,
                      },
                    ]}
                  />
                </div>
              </div>

              {/* 2.7 Strict Route Types & Removed Dependencies */}
              <div id="breaking-types-deps" className="space-y-4 mt-10 scroll-mt-20">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FileCode2 className="h-5 w-5 text-red-500 shrink-0" />
                  <span>2.7 Strict Route Types &amp; Removed Legacy Dependencies</span>
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>
                    <strong>Compile-time validated <code>&lt;Link&gt;</code> &amp; <code>useRouter()</code>:</strong> Passing an arbitrary <code>string</code> variable to <code>&lt;Link href=&#123;url&#125;&gt;</code>, <code>router.push(url)</code>, or <code>router.replace(url)</code> now produces a TypeScript error unless it matches a route in <code>.dinou/types/routes.d.ts</code>. Prefer typed route patterns with <code>params</code>, or type dynamic external/callback targets as <code>DinouLinkTarget</code>.
                  </li>
                  <li>
                    <strong>Optional catch-all <code>[[...slug]]</code> params:</strong> Received segment <code>params</code> in <code>PageProps</code>, <code>LayoutProps</code>, <code>PageFunctions</code>, etc. are now strictly typed as <code>string[]</code> (matching Dinou&apos;s runtime <code>[]</code> array normalization on the base route), while staying optional in <code>&lt;Link params&gt;</code> and <code>getStaticPaths</code>.
                  </li>
                  <li>
                    <strong>Removed transitive packages:</strong> <code>dotenv</code>, <code>cross-env</code>, <code>@esbuild-plugins/tsconfig-paths</code>, <code>rollup-plugin-tsconfig-paths</code>, <code>tsconfig-paths-webpack-plugin</code>, <code>esbuild-copy-static-files</code>, and <code>rollup-plugin-copy</code> were removed from Dinou&apos;s dependencies. Dinou now loads <code>.env*</code> files and <code>tsconfig.json</code> path aliases natively; if your own custom scripts call <code>cross-env</code> directly, install it in your project&apos;s <code>devDependencies</code>.
                  </li>
                </ul>

                <div className="not-prose my-4">
                  <CodeBlock language="tsx">{`import { useRouter, type DinouLinkTarget } from "dinou";

const router = useRouter();

// ✅ Preferred: compile-time checked pattern + params
router.push("/blog/[slug]", { params: { slug } });

// ✅ When bridging untyped strings from external libraries (e.g., auth SDKs):
router.push(callbackUrl as DinouLinkTarget);`}</CodeBlock>
                </div>
              </div>
            </section>

            {/* Section 3: Major New Features */}
            <section id="whats-new" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Major New Features in v10
              </h2>
              <p>
                Beyond the breaking changes above, Dinou v10 ships a comprehensive suite of developer experience, security, and runtime upgrades across all 3 bundlers and all 5 production runtimes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
                <Card id="new-type-safe-routing" className="border-blue-500/20 bg-blue-50/10 dark:bg-blue-950/10 scroll-mt-20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 text-sm">
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                      <span>3.1 End-to-End Type-Safe Routing &amp; <code>&quot;./dinou&quot;</code></span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                    <p>
                      <code>npx dinou typegen</code> generates <code>.dinou/types/routes.d.ts</code> and route-contextual <code>.dinou/routes/&lt;dir&gt;/dinou.&#123;js,d.ts&#125;</code> modules. Import <code>Link</code>, <code>useRouter</code>, <code>ROUTE</code>, <code>PageProps</code>, <code>LayoutProps</code> (with sibling <code>@slot</code> inference), and <code>PageFunctions</code> directly from <code>&quot;./dinou&quot;</code> with zero manual route strings.
                    </p>
                    <div>
                      <Link href="/docs/type-safe-routing" className="text-blue-500 hover:underline font-medium">
                        Read Type-Safe Routing &rarr;
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card id="new-env-and-aliases" className="border-emerald-500/20 bg-emerald-50/10 dark:bg-emerald-950/10 scroll-mt-20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
                      <Sparkles className="h-4 w-4 shrink-0" />
                      <span>3.2 <code>.env*</code> Hierarchy &amp; <code>tsconfig</code> Aliases</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                    <p>
                      Native <code>.env.&#123;NODE_ENV&#125;.local</code> &rarr; <code>.env.local</code> &rarr; <code>.env.&#123;NODE_ENV&#125;</code> &rarr; <code>.env</code> loading with live hot-reload in <code>dinou dev</code>, unified <code>getContext().env</code> across all runtimes, auto-typed <code>NodeJS.ProcessEnv</code>, and full multi-alias <code>tsconfig.json</code> / <code>jsconfig.json</code> resolution (including <code>extends</code>, <code>$&#123;configDir&#125;</code>, CSS, and <code>dinou.config.ts</code>).
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/docs/env-vars" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                        Env Vars &rarr;
                      </Link>
                      <Link href="/docs/alias" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                        Path Aliases &rarr;
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card id="new-config-plugins" className="border-purple-500/20 bg-purple-50/10 dark:bg-purple-950/10 scroll-mt-20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 text-sm">
                      <Settings className="h-4 w-4 shrink-0" />
                      <span>3.3 AOT Config, <code>allowISG</code> &amp; <code>assetExtensions</code></span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                    <p>
                      <code>dinou.config.ts</code> is now compiled ahead-of-time into every production bundle (zero runtime <code>esbuild</code> dependency) and live-reloads in <code>dinou dev</code>. Adds global <code>allowISG</code>, <code>reactCompiler</code>, <code>assetExtensions</code> (auto-generating ambient <code>*.ext</code> types), and normalized SPA-safe <code>context.req.path</code> (plus <code>rawPath</code> &amp; <code>isRscRequest</code>).
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/docs/plugins" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                        Plugins &amp; Config &rarr;
                      </Link>
                      <Link href="/docs/assets" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                        Assets &rarr;
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card id="new-deployment-assets" className="border-indigo-500/20 bg-indigo-50/10 dark:bg-indigo-950/10 scroll-mt-20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 text-sm">
                      <Rocket className="h-4 w-4 shrink-0" />
                      <span>3.4 Netlify v2 AOT, Static SPA &amp; Range Media</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                    <p>
                      Adds <code>dinou build:netlify[:esbuild|:rollup|:webpack]</code> emitting a self-contained Netlify Functions v2 bundle, standalone static export client-side <code>&lt;Link&gt;</code> SPA navigation (<code>dinou export-static</code>), universal RSC/SSR CSS Modules, CSS <code>url(...)</code> fingerprinting, font asset imports, and RFC 9110 <code>206 Partial Content</code> byte-range media streaming.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/docs/deployment" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                        Deployment &rarr;
                      </Link>
                      <Link href="/docs/styles" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                        Styles &rarr;
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card id="new-runtime-engine" className="border-cyan-500/20 bg-cyan-50/10 dark:bg-cyan-950/10 scroll-mt-20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-cyan-600 dark:text-cyan-400 text-sm">
                      <Zap className="h-4 w-4 shrink-0" />
                      <span>3.5 Inline RSC Streaming &amp; Zero-<code>#418</code> Stability</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                    <p>
                      Eliminates double server execution on initial loads by streaming segmented Flight RSC payloads inline in the HTML response. Unlocks un-awaited <code>Promise</code> props for React 19 <code>use(promise)</code>, progressive production <code>&lt;Suspense&gt;</code> streaming on dynamic SSR routes, PPR holes for <code>useSearchParams()</code>, multi-branch router backtracking, and hardened Redis / Cloudflare KV / Deno KV adapters.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/docs/rendering" className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium">
                        Rendering &rarr;
                      </Link>
                      <Link href="/docs/revalidation" className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium">
                        Revalidation &rarr;
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card id="new-uneject" className="border-amber-500/20 bg-amber-50/10 dark:bg-amber-950/10 scroll-mt-20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400 text-sm">
                      <Plug className="h-4 w-4 shrink-0" />
                      <span>3.6 Transactional <code>dinou uneject</code></span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                    <p>
                      Ejecting is now reversible. <code>npm run uneject</code> (or <code>node dinou/cli.js uneject [version]</code>) restores <code>package.json</code> scripts, reinstalls <code>dinou</code> via your detected package manager with automatic rollback on failure, and removes <code>./dinou</code>. <code>dinou eject</code> also selectively rewrites only existing scripts.
                    </p>
                    <div>
                      <Link href="/docs/eject" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
                        Read Eject &amp; Uneject &rarr;
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 4: Ejected Apps */}
            <section id="ejected-apps" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Upgrading Ejected Applications
              </h2>
              <p>
                If your v9 application was previously ejected (contains a local <code>./dinou</code> directory):
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-sm">
                <li>
                  Back up any custom patches you made inside <code>./dinou</code> (for example with <code>git diff</code> against the original v9 snapshot).
                </li>
                <li>
                  Remove the local <code>./dinou</code> directory, restore <code>&quot;dinou&quot;: &quot;^10.0.0&quot;</code> in <code>package.json</code> (pointing scripts back from <code>node dinou/cli.js ...</code> to <code>dinou ...</code>), and run <code>npm install</code>.
                </li>
                <li>
                  Check whether you still need to eject — many v9 reasons to eject (custom <code>assetExtensions</code>, global <code>reactCompiler</code> / <code>allowISG</code>, Netlify Functions v2, <code>tsconfig.json</code> aliases, and <code>DINOU_PUBLIC_*</code>) are now built in.
                </li>
                <li>
                  If you still need local framework ownership, run <code>npx dinou eject</code> again on v10 and re-apply your patches. Going forward in v10, <code>npm run uneject</code> makes future upgrades transactional, and <code>npm run build:vendors</code> compiles the consolidated 31-package vendor catalog across multi-root package managers (including strict <code>pnpm</code>).
                </li>
              </ol>
            </section>

            {/* Section 5: Verification Checklist */}
            <section id="migration-checklist" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Verification Checklist
              </h2>

              <div className="rounded-xl border border-border p-5 bg-muted/20 text-xs text-muted-foreground space-y-3 not-prose my-6">
                <div className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Dinou v10 Upgrade Checklist</span>
                </div>
                <ul className="space-y-1.5 list-disc pl-5 leading-relaxed">
                  <li>Updated <code>&quot;dinou&quot;: &quot;^10.0.0&quot;</code> (and <code>react</code> / <code>react-dom</code> <code>&gt;=19.3.1</code>) in <code>package.json</code> and reinstalled dependencies.</li>
                  <li>Added <code>&quot;rootDirs&quot;: [&quot;src&quot;, &quot;.dinou/routes&quot;]</code> and <code>&quot;.dinou/types/**/*.d.ts&quot;</code> to <code>tsconfig.json</code>, then ran <code>npx dinou typegen</code>.</li>
                  <li>Renamed any active <code>src/_*</code> helper/component/plugin folders to clean names without a leading underscore (e.g., <code>src/components</code>, <code>src/plugins</code>).</li>
                  <li>Verified <code>ppr</code> routes: either enabled <code>ppr: true</code> in <code>dinou.config.ts</code> or declared <code>export const ppr = true</code> on each child <code>page_functions.ts</code> / <code>layout_functions.ts</code> that previously relied on parent inheritance.</li>
                  <li>Updated deployment manifests if applicable: <code>wrangler.toml</code> (<code>.dinou/cloudflare/assets</code>), <code>netlify.toml</code> (<code>.dinou/netlify/functions</code> + <code>build:netlify</code>), and Dockerfiles (removed legacy manifest dirs; added <code>--chown=node:node</code> on <code>.dinou/dist2</code>).</li>
                  <li>Moved any files from legacy <code>favicons/</code> into <code>public/</code>.</li>
                  <li>Audited <code>plugin.onRequest</code> hooks to ensure static SSG pages do not depend on runtime-only context fields without a fallback.</li>
                  <li>Prefixed intentional browser-visible environment variables with <code>DINOU_PUBLIC_</code> and installed <code>cross-env</code> explicitly if referenced by custom scripts.</li>
                  <li>Confirmed <code>npx tsc --noEmit</code>, <code>npm run dev</code>, and <code>npm run build</code> all succeed cleanly.</li>
                </ul>
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
