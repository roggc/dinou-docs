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
  Zap,
  Globe,
  FileText,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Copy,
  ArrowRight,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Share2,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "1. Overview & Architecture", level: 2 },
  { id: "direct-copy", title: "Bypassing Bundlers (.dinou/dist3)", level: 3 },
  { id: "directory-structure", title: "Recommended Directory Structure", level: 3 },
  { id: "url-mapping", title: "2. URL Mapping & Serving", level: 2 },
  { id: "common-use-cases", title: "3. Common Use Cases", level: 2 },
  { id: "favicons-icons", title: "Favicons & App Icons", level: 3 },
  { id: "seo-crawlers", title: "robots.txt & sitemap.xml", level: 3 },
  { id: "domain-verification", title: "Domain Verification & .well-known", level: 3 },
  { id: "og-social", title: "OpenGraph & Social Share Cards", level: 3 },
  { id: "public-vs-assets", title: "4. public/ vs Imported Assets", level: 2 },
  { id: "migration-legacy", title: "5. Migration from Legacy favicons/", level: 2 },
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
                📂 Public Directory (<code>public/</code>)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Static asset delivery in Dinou. Learn how the <code>public/</code> directory serves favicons,
              robots.txt, sitemaps, and domain verification files directly from <code>.dinou/dist3</code> without
              passing through bundlers.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* ================================================================= */}
            {/* SECTION 1: OVERVIEW & ARCHITECTURE */}
            {/* ================================================================= */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="flex items-center gap-3">
                1. Overview &amp; Architecture
                <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  Static Filesystem
                </span>
              </h2>
              <p>
                Dinou provides a dedicated <code>public/</code> folder located at the root of your project
                (parallel to <code>src/</code> and <code>package.json</code>). This directory is the single home
                for all static files that must be accessible at fixed, unhashed URLs on the root path (<code>/</code>).
              </p>

              <section id="direct-copy" className="scroll-mt-20 mt-8">
                <h3>Bypassing Bundlers (Direct Copy to <code>.dinou/dist3</code>)</h3>
                <p>
                  Unlike application code, stylesheets, or imported media which are parsed and bundled by Webpack,
                  Rollup, or Esbuild, files placed in <code>public/</code> <strong>completely bypass the bundler pipeline</strong>:
                </p>

                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                        <Zap className="h-5 w-5 text-blue-500" />
                        <span>Development Mode (`dinou dev`)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p>
                        Dinou&apos;s dev server intercepts static file requests matching paths in <code>public/</code> and
                        streams them instantly from disk with zero build step, hot-reloading, or cache latency.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                        <FolderTree className="h-5 w-5 text-emerald-500" />
                        <span>Production Build (`dinou build`)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p>
                        During the build process, Dinou executes a direct recursive copy from <code>./public</code> into{" "}
                        <code className="font-mono text-xs">.dinou/dist3</code>. The runtime web engine serves these files
                        directly with optimal HTTP headers (ETag, Content-Type, Cache-Control).
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="border border-border rounded-lg p-5 bg-card not-prose my-6">
                  <div className="flex items-center gap-2 font-semibold text-sm mb-3">
                    <Layers className="h-5 w-5 text-primary" />
                    <span>The Dinou Static Asset Pipeline Flow</span>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
                    <div className="p-3 rounded bg-muted border text-center w-full md:w-auto flex-1">
                      <div className="font-bold text-foreground">./public/</div>
                      <div className="text-muted-foreground text-[11px] mt-1">robots.txt, favicon.ico, images/</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden md:block" />
                    <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20 text-center w-full md:w-auto flex-1">
                      <div className="font-bold text-amber-700 dark:text-amber-400">Direct Copy (No Bundler)</div>
                      <div className="text-muted-foreground text-[11px] mt-1">Zero AST parse, no hash renaming</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden md:block" />
                    <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20 text-center w-full md:w-auto flex-1">
                      <div className="font-bold text-emerald-700 dark:text-emerald-400">.dinou/dist3/</div>
                      <div className="text-muted-foreground text-[11px] mt-1">Served at root URL path (/)</div>
                    </div>
                  </div>
                </div>

                <Alert className="not-prose mt-4">
                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                  <AlertTitle>Why Bypassing the Bundler Matters</AlertTitle>
                  <AlertDescription className="text-xs space-y-1 mt-1">
                    <p>
                      Third-party crawlers, browsers, and verification bots require exact, unchanging file paths like{" "}
                      <code>/robots.txt</code>, <code>/favicon.ico</code>, or <code>/google12345.html</code>. If these passed through a bundler,
                      they would be renamed with content hashes (e.g. <code>robots.a7b9c.txt</code>) or inlined as data URIs, breaking external protocol compliance.
                    </p>
                  </AlertDescription>
                </Alert>
              </section>

              <section id="directory-structure" className="scroll-mt-20 mt-8">
                <h3>Recommended Directory Structure</h3>
                <p>
                  Here is the standard layout of a production Dinou project using the <code>public/</code> folder:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`my-dinou-app/
├── public/
│   ├── favicon.ico                 # Legacy & fallback browser favicon
│   ├── favicon-16x16.png           # Small tab icon
│   ├── favicon-32x32.png           # Standard tab icon
│   ├── apple-touch-icon.png        # iOS home screen bookmark icon (180x180)
│   ├── site.webmanifest            # Progressive Web App (PWA) manifest
│   ├── robots.txt                  # Web crawler instructions
│   ├── sitemap.xml                 # Search engine sitemap index
│   ├── googlea1b2c3d4e5f6.html     # Google Search Console domain verification
│   ├── .well-known/                # Mobile app links & security metadata
│   │   ├── assetlinks.json         # Android App Links
│   │   └── apple-app-site-association # iOS Universal Links
│   └── images/
│       ├── og-image.png            # OpenGraph / Twitter social card
│       └── logo-transparent.png    # Unbundled high-res brand marks
├── src/
│   └── app/
│       ├── layout.tsx              # Root HTML shell linking public assets
│       └── page.tsx
├── dinou.config.mjs
└── package.json`}
                </CodeBlock>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 2: URL MAPPING & SERVING */}
            {/* ================================================================= */}
            <section id="url-mapping" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                2. URL Mapping &amp; Serving
                <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                  Routing
                </span>
              </h2>
              <p>
                Every file and nested folder inside <code>public/</code> is served directly from the root URL (<code>/</code>).
                <strong>You must never include <code>/public/</code> in the URL path</strong>.
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4">Filesystem Path</th>
                      <th className="p-4">Public URL Path</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-mono text-xs">public/favicon.ico</td>
                      <td className="p-4 font-mono text-xs text-primary font-semibold">/favicon.ico</td>
                      <td className="p-4 text-xs font-medium text-green-600 dark:text-green-400">✓ Correct</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-xs">public/robots.txt</td>
                      <td className="p-4 font-mono text-xs text-primary font-semibold">/robots.txt</td>
                      <td className="p-4 text-xs font-medium text-green-600 dark:text-green-400">✓ Correct</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-xs">public/images/og-image.png</td>
                      <td className="p-4 font-mono text-xs text-primary font-semibold">/images/og-image.png</td>
                      <td className="p-4 text-xs font-medium text-green-600 dark:text-green-400">✓ Correct</td>
                    </tr>
                    <tr className="bg-red-500/5">
                      <td className="p-4 font-mono text-xs text-muted-foreground">public/favicon.ico</td>
                      <td className="p-4 font-mono text-xs text-red-600 dark:text-red-400 line-through">/public/favicon.ico</td>
                      <td className="p-4 text-xs font-medium text-red-600 dark:text-red-400">✗ 404 Not Found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ================================================================= */}
            {/* SECTION 3: COMMON USE CASES */}
            {/* ================================================================= */}
            <section id="common-use-cases" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                3. Common Use Cases
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Guides
                </span>
              </h2>

              {/* 3.1 Favicons & Icons */}
              <section id="favicons-icons" className="scroll-mt-20">
                <h3>Favicons &amp; App Icons</h3>
                <p>
                  To provide branding across desktop browsers, mobile devices, and PWA home-screen bookmarks:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Generate your icon bundle using a standard tool (like <a href="https://favicon.io" target="_blank" rel="noreferrer" className="underline font-medium">favicon.io</a> or RealFaviconGenerator).
                  </li>
                  <li>
                    Place the generated icon files directly in <code>public/</code>.
                  </li>
                  <li>
                    Reference them in your Root Layout (<code>src/app/layout.tsx</code>) inside the <code>&lt;head&gt;</code> element:
                  </li>
                </ol>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/app/layout.tsx
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My Dinou Application</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon & Multi-Resolution App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Global Styles */}
        <link href="/styles.css" rel="stylesheet" precedence="default" />
      </head>
      <body>{children}</body>
    </html>
  );
}`}
                </CodeBlock>
              </section>

              {/* 3.2 robots.txt & sitemap.xml */}
              <section id="seo-crawlers" className="scroll-mt-20 mt-8">
                <h3><code>robots.txt</code> &amp; <code>sitemap.xml</code> (SEO)</h3>
                <p>
                  Search engine bots like Googlebot expect crawler instructions and sitemaps at standard URLs.
                  Create <code>public/robots.txt</code>:
                </p>
                <CodeBlock
                  language="txt"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`# public/robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/private/

# Sitemap location
Sitemap: https://mydinouapp.com/sitemap.xml`}
                </CodeBlock>
                <p className="mt-3">
                  And create your static sitemap index at <code>public/sitemap.xml</code>:
                </p>
                <CodeBlock
                  language="xml"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mydinouapp.com/</loc>
    <lastmod>2026-10-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mydinouapp.com/docs</loc>
    <lastmod>2026-10-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`}
                </CodeBlock>
              </section>

              {/* 3.3 Domain Verification & .well-known */}
              <section id="domain-verification" className="scroll-mt-20 mt-8">
                <h3>Domain Verification &amp; <code>.well-known</code></h3>
                <p>
                  Domain ownership verification files (Google Search Console, Apple Pay, Pinterest, Bing) can be dropped straight into <code>public/</code>:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`# Google Search Console verification:
# Placed in: public/google1a2b3c4d5e6f.html
# Accessible at: https://mydinouapp.com/google1a2b3c4d5e6f.html`}
                </CodeBlock>

                <p className="mt-4">
                  For mobile deep-linking protocols (Universal Links on iOS and App Links on Android), create a <code>.well-known</code> directory inside <code>public/</code>:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`# Apple Universal Links:
public/.well-known/apple-app-site-association -> https://mydinouapp.com/.well-known/apple-app-site-association

# Android App Links:
public/.well-known/assetlinks.json -> https://mydinouapp.com/.well-known/assetlinks.json`}
                </CodeBlock>
              </section>

              {/* 3.4 OpenGraph & Social Media */}
              <section id="og-social" className="scroll-mt-20 mt-8">
                <h3>OpenGraph &amp; Social Share Cards</h3>
                <p>
                  Social platforms (Twitter/X, LinkedIn, Discord, Facebook) scrape static images when links to your site are shared.
                  Store your social preview cards in <code>public/images/</code> and link them in your HTML <code>&lt;head&gt;</code>:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// Inside your root layout <head>
<meta property="og:title" content="Dinou - High Performance Full-Stack Framework" />
<meta property="og:description" content="Next-generation React framework with 2D micro-segmentation and in-process execution." />
<meta property="og:image" content="https://mydinouapp.com/images/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://mydinouapp.com/images/og-image.png" />`}
                </CodeBlock>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 4: PUBLIC VS IMPORTED ASSETS */}
            {/* ================================================================= */}
            <section id="public-vs-assets" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                4. <code>public/</code> vs. Imported Assets (<code>src/</code>)
                <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                  Architecture Comparison
                </span>
              </h2>
              <p>
                Dinou provides two distinct mechanisms for handling assets. Choose the right pattern for your use case:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border my-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4">Feature</th>
                      <th className="p-4">Static Directory (<code>public/</code>)</th>
                      <th className="p-4">Imported Assets (<code>src/assets/</code>)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-semibold text-xs">Filesystem Location</td>
                      <td className="p-4 font-mono text-xs"><code>./public/*</code> (project root)</td>
                      <td className="p-4 font-mono text-xs"><code>./src/**/*</code></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-xs">Bundler Processing</td>
                      <td className="p-4 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        None (Bypasses bundlers entirely)
                      </td>
                      <td className="p-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                        Processed by Webpack, Rollup, or Esbuild
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-xs">Production Destination</td>
                      <td className="p-4 font-mono text-xs"><code>.dinou/dist3/*</code></td>
                      <td className="p-4 font-mono text-xs"><code>.dinou/dist2/*</code> (Client bundle)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-xs">URL Path &amp; Naming</td>
                      <td className="p-4 text-xs">
                        <strong>Fixed, exact filename</strong> (e.g. <code>/favicon.ico</code>)
                      </td>
                      <td className="p-4 text-xs">
                        <strong>Content-hashed filename</strong> (e.g. <code>/logo.a9f2bc.png</code>)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-xs">Referencing Syntax</td>
                      <td className="p-4 font-mono text-xs"><code>&lt;img src=&quot;/images/hero.png&quot; /&gt;</code></td>
                      <td className="p-4 font-mono text-xs"><code>import hero from &quot;./hero.png&quot;;</code></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-xs">Cache-Busting Strategy</td>
                      <td className="p-4 text-xs">Manual URL query parameter (<code>?v=2</code>)</td>
                      <td className="p-4 text-xs">Automatic immutable content hash</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-xs">Best For</td>
                      <td className="p-4 text-xs">
                        Favicons, robots.txt, sitemaps, verification files, PDFs, OpenGraph cards
                      </td>
                      <td className="p-4 text-xs">
                        Component UI icons, bundled CSS background images, media imported in JS/TSX
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ================================================================= */}
            {/* SECTION 5: MIGRATION FROM LEGACY FAVICONS/ */}
            {/* ================================================================= */}
            <section id="migration-legacy" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                5. Migration from Legacy <code>favicons/</code>
                <span className="inline-flex items-center rounded-md bg-zinc-500/10 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 ring-1 ring-inset ring-zinc-500/20">
                  Upgrading to v7
                </span>
              </h2>
              <p>
                In early versions of Dinou, static assets were strictly scoped to a root <code>favicons/</code> folder.
                In Dinou v7, this concept has been broadened into the universal <code>public/</code> directory standard:
              </p>

              <div className="border border-border rounded-lg p-4 bg-card not-prose my-4 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Copy className="h-5 w-5 text-primary" />
                  <span>Migration Steps:</span>
                </div>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-2">
                  <li>
                    Create a <code>public/</code> folder at the project root if it does not already exist.
                  </li>
                  <li>
                    Move all contents from your existing <code>favicons/</code> directory into <code>public/</code>.
                  </li>
                  <li>
                    Delete the legacy <code>favicons/</code> folder.
                  </li>
                  <li>
                    Ensure your <code>&lt;link rel=&quot;icon&quot;&gt;</code> tags in <code>src/app/layout.tsx</code> point directly to root paths (e.g., <code>href=&quot;/favicon.ico&quot;</code>).
                  </li>
                </ol>
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
