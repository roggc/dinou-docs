import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Image as ImageIcon,
  Video,
  Music,
  Type as FontIcon,
  Zap,
  Sparkles,
  ShieldCheck,
  FolderTree,
  ArrowRight,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Link } from "./dinou";

const tocItems = [
  { id: "overview", title: "Assets & Media in Dinou", level: 2 },
  { id: "imported-vs-public", title: "Imported Assets vs Public Directory", level: 2 },
  { id: "supported-formats", title: "Supported Extensions (26 Formats)", level: 2 },
  { id: "usage-examples", title: "Usage in Server & Client Components", level: 2 },
  { id: "path-aliases", title: "Path Aliases & CSS url() Assets", level: 2 },
  { id: "caching-bundling", title: "Production Output, Caching & HTTP Range", level: 2 },
  { id: "typescript-support", title: "TypeScript Declarations (dinou/env)", level: 2 },
  { id: "custom-extensions", title: "Extending Custom Formats (assetExtensions)", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Assets &amp; Media | Dinou Docs</title>
      <meta
        name="description"
        content="Import images, videos, audio, and fonts directly into your components with deterministic path-and-content hashing, HTTP Range streaming, and ambient TypeScript support."
      />
      <link rel="canonical" href="https://dinou.dev/docs/assets" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Static Media Pipeline
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Assets &amp; Media
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Import images, videos, audio, and web fonts directly into your components with deterministic path-and-content hashing, HTTP byte-range media streaming, and ambient TypeScript support for <strong>26 built-in formats</strong>.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>Assets &amp; Media in Dinou</h2>
              <p>
                In Dinou, media and font files imported into JavaScript, TypeScript, or CSS are treated as first-class module dependencies. When you import an asset (e.g. <code>import logo from &quot;./logo.png&quot;</code>), the active bundler (Esbuild, Rollup, or Webpack) and runtime engine:
              </p>
              <ol>
                <li>
                  <strong>Fingerprints path + content:</strong> Computes a deterministic 8-character SHA-256 hash combining the normalized project-relative path and the file&apos;s binary bytes.
                </li>
                <li>
                  <strong>Emits the asset:</strong> Writes the file to the public static distribution directory under <code>.dinou/dist3/assets/[name]-[hash].[ext]</code> (and <code>.dinou/cloudflare/assets/assets/</code> on Cloudflare Workers).
                </li>
                <li>
                  <strong>Returns a plain URL string:</strong> Resolves the import identically across RSC, SSR, and client bundles to the public URL (e.g. <code>&quot;/assets/logo-8f1e2a4c.png&quot;</code>).
                </li>
              </ol>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <Card className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <span>RSC, SSR &amp; Edge Safe</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Imports resolve to identical URL strings across Node.js, Bun, Deno, and Cloudflare Workers with zero hydration mismatch or Base64 bundle bloat.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <Zap className="h-4 w-4" />
                      <span>Path + Content Hashed</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Prevents collisions when separate folders import identically named files while automatically busting 1-year <code>immutable</code> caches on file edits.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <ShieldCheck className="h-4 w-4" />
                      <span>TypeScript Verified</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Built-in ambient declarations in <code>dinou/env</code> plus auto-generated types for custom <code>assetExtensions</code> in <code>.dinou/types/routes.d.ts</code>.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Imported vs Public Directory */}
            <section id="imported-vs-public" className="mt-12">
              <h2>Imported Assets vs. Public Directory</h2>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  <FolderTree className="h-4 w-4 text-emerald-500" />
                  <span>Two Complementary Asset Strategies</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  In Dinou, files imported inside your code (<code>src/**/*</code> or aliased directories) are processed by bundlers, fingerprinted with deterministic path-and-content hashes, and emitted into <code>.dinou/dist3/assets/*</code> with 1-year <code>immutable</code> caching. In contrast, files placed in <code>public/</code> bypass bundlers entirely and are copied directly into the web root with fixed, unhashed URLs (ideal for <code>favicon.ico</code>, <code>robots.txt</code>, PWA manifests, and verification files).
                </p>
                <div className="pt-2 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-muted-foreground">Looking for the detailed side-by-side feature matrix?</span>
                  <Link
                    href="/docs/public#public-vs-assets"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
                  >
                    <span>View Public vs. Imported Assets Matrix</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Supported Extensions */}
            <section id="supported-formats" className="mt-12">
              <h2>Supported Extensions (26 Formats)</h2>
              <p>
                Dinou recognizes <strong>26 media and font extensions</strong> out-of-the-box across images, video, audio, and web fonts:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Format Extensions</th>
                      <th className="p-3.5">Served MIME Types</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card text-xs">
                    <tr>
                      <td className="p-3.5 font-semibold flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-emerald-500" />
                        <span>Images (10)</span>
                      </td>
                      <td className="p-3.5 font-mono text-foreground font-semibold">
                        .png, .jpg, .jpeg, .gif, .svg, .webp, .avif, .ico, .mjpeg, .mjpg
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        image/png, image/jpeg, image/gif, image/svg+xml, image/webp, image/avif, image/x-icon, video/x-motion-jpeg
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold flex items-center gap-2">
                        <Video className="h-4 w-4 text-amber-500" />
                        <span>Video (6)</span>
                      </td>
                      <td className="p-3.5 font-mono text-foreground font-semibold">
                        .mp4, .webm, .ogg, .mov, .avi, .mkv
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        video/mp4, video/webm, video/ogg, video/quicktime, video/x-msvideo, video/x-matroska
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold flex items-center gap-2">
                        <Music className="h-4 w-4 text-emerald-500" />
                        <span>Audio (5)</span>
                      </td>
                      <td className="p-3.5 font-mono text-foreground font-semibold">
                        .mp3, .wav, .flac, .m4a, .aac
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        audio/mpeg, audio/wav, audio/flac, audio/mp4, audio/aac
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold flex items-center gap-2">
                        <FontIcon className="h-4 w-4 text-blue-500" />
                        <span>Fonts (5)</span>
                      </td>
                      <td className="p-3.5 font-mono text-foreground font-semibold">
                        .woff, .woff2, .ttf, .otf, .eot
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        font/woff, font/woff2, font/ttf, font/otf, application/vnd.ms-fontobject
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Usage Examples */}
            <section id="usage-examples" className="mt-12">
              <h2>Usage in Server &amp; Client Components</h2>
              <p>
                Importing media and font files works identically in both Server Components (RSC) and Client Components (<code>&quot;use client&quot;</code>). Imported assets resolve to fingerprinted URL strings that can be passed directly to standard JSX elements like <code>&lt;img&gt;</code>, <code>&lt;video&gt;</code>, <code>&lt;audio&gt;</code>, <code>&lt;link rel=&quot;preload&quot;&gt;</code>, or Web Audio APIs:
              </p>

              <TabbedCodeBlock
                containerClassName="w-full overflow-hidden rounded-lg my-6"
                tabs={[
                  {
                    id: "images",
                    label: "src/components/avatar.tsx (Server Component)",
                    language: "tsx",
                    code: `// src/components/avatar.tsx
import userAvatar from "./avatar.webp";
import defaultIcon from "./user-placeholder.svg";

export function UserAvatar({ hasCustomPhoto }: { hasCustomPhoto?: boolean }) {
  const photoSrc = hasCustomPhoto ? userAvatar : defaultIcon;

  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden border">
      <img
        src={photoSrc}
        alt="User profile avatar"
        width={48}
        height={48}
        loading="lazy"
        className="object-cover w-full h-full"
      />
    </div>
  );
}`,
                  },
                  {
                    id: "video-audio",
                    label: "src/components/media-hero.tsx (Client Video & Audio)",
                    language: "tsx",
                    code: `// src/components/media-hero.tsx
"use client";

import heroBgVideo from "./hero-ambient.mp4";
import heroWebmVideo from "./hero-ambient.webm";
import chimeAudio from "./welcome-chime.mp3";

export function MediaHero() {
  const playSound = () => {
    const audio = new Audio(chimeAudio);
    audio.play().catch(() => {});
  };

  return (
    <div className="relative h-96 flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Background Video with multiple format fallbacks */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src={heroWebmVideo} type="video/webm" />
        <source src={heroBgVideo} type="video/mp4" />
      </video>

      <div className="text-center text-white space-y-4 p-6 bg-black/40 backdrop-blur-sm rounded-xl">
        <h2 className="text-3xl font-bold">Experience Dinou</h2>
        <button
          type="button"
          onClick={playSound}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition shadow"
        >
          Play Welcome Chime
        </button>
      </div>
    </div>
  );
}`,
                  },
                  {
                    id: "preload-fonts",
                    label: "src/layout.tsx (Font Preloading)",
                    language: "tsx",
                    code: `// src/layout.tsx
import type { LayoutProps } from "./dinou";
import interVariable from "@/assets/fonts/inter-latin.woff2";
import "./globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href={interVariable}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/styles.css" precedence="dinou-styles" />
      </head>
      <body>{children}</body>
    </html>
  );
}`,
                  },
                ]}
              />
            </section>

            {/* Path Aliases & CSS url() */}
            <section id="path-aliases" className="mt-12">
              <h2>Path Aliases &amp; CSS <code>url()</code> Assets</h2>
              <p>
                Dinou resolves path aliases configured in <code>tsconfig.json</code> or <code>jsconfig.json</code> (as well as bare <code>node_modules</code> asset specifiers) identically across Esbuild, Rollup, Webpack, and all server/edge engines:
              </p>
              <CodeBlock
                language="tsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// Path aliases from tsconfig.json / jsconfig.json
import companyLogo from "@/assets/brand/logo.svg";
import heroBanner from "@/assets/images/banner.webp";

// Package assets from node_modules
import interWoff2 from "@fontsource/inter/files/inter-latin-400-normal.woff2";`}
              </CodeBlock>

              <p className="mt-4">
                Relative and aliased <code>url(...)</code> references inside stylesheets (such as <code>@font-face</code> or <code>background-image</code>) share the <strong>exact same fingerprinting pipeline</strong>, emitting a single deduplicated file in <code>/assets/[name]-[hash].[ext]</code> when an asset is referenced from both CSS and TSX. See the{" "}
                <Link href="/docs/styles" className="underline font-semibold text-foreground">
                  Styles documentation
                </Link>{" "}
                for full details on CSS asset handling.
              </p>
            </section>

            {/* Production Build Output */}
            <section id="caching-bundling" className="mt-12">
              <h2>Production Output, Caching &amp; HTTP Range</h2>
              <p>
                When building for production (<code>dinou build</code>), Dinou emits all imported media and font files into <code>.dinou/dist3/assets/</code> with sanitized names and 8-character path-and-content SHA-256 hashes:
              </p>
              <CodeBlock
                language="text"
                containerClassName="w-full overflow-hidden rounded-lg my-4"
              >
{`.dinou/dist3/assets/
├── logo-4b2a8f1c.png
├── banner-9c1d3e72.webp
├── inter-latin-0f4e81b3.woff2
└── intro-sound-7e2f1a90.mp3`}
              </CodeBlock>
              <ul>
                <li>
                  <strong>Immutable CDN &amp; Browser Caching:</strong> Every file under <code>/assets/*</code> is served with <code>Cache-Control: public, max-age=31536000, immutable</code>. Replacing an image or video at the same source path produces a new hash automatically on the next build.
                </li>
                <li>
                  <strong>HTTP Byte-Range Streaming (<code>206 Partial Content</code>):</strong> Dinou&apos;s development server and standalone Node.js, Bun, and Deno servers natively support RFC 9110 <code>Range: bytes=...</code> requests with <code>Accept-Ranges: bytes</code>, enabling instant <code>&lt;video&gt;</code> and <code>&lt;audio&gt;</code> timeline scrubbing and native Safari media playback.
                </li>
              </ul>
            </section>

            {/* TypeScript Support */}
            <section id="typescript-support" className="mt-12">
              <h2>TypeScript Declarations (<code>dinou/env</code>)</h2>
              <p>
                Ambient type declarations for all 26 built-in media and font extensions are packaged directly into <code>dinou/env</code>.
              </p>
              <p>
                Ensure that <code>dinou-env.d.ts</code> exists in your project root:
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`/// <reference types="dinou/env" />`}
              </CodeBlock>

              <p className="mt-3 text-sm">
                And include both <code>dinou-env.d.ts</code> and <code>.dinou/types/**/*.d.ts</code> in your <code>tsconfig.json</code>:
              </p>
              <CodeBlock
                language="json"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`{
  "compilerOptions": {
    "paths": {
      "@/*": [
        "./src/*"
      ]
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
    ".dinou/types/**/*.d.ts"
  ]
}`}
              </CodeBlock>
            </section>

            {/* Custom Extensions */}
            <section id="custom-extensions" className="mt-12">
              <h2>Extending Custom Formats (<code>assetExtensions</code>)</h2>
              <p>
                If your application imports specialized binary or 3D formats—such as <code>.glb</code>, <code>.gltf</code>, and <code>.hdr</code> for Three.js / WebGL scenes, or <code>.wasm</code> and <code>.pdf</code>—register them via <code>assetExtensions</code> in <code>dinou.config.ts</code> without ejecting:
              </p>
              <CodeBlock
                language="ts"
                containerClassName="w-full overflow-hidden rounded-lg my-4"
              >
{`// dinou.config.ts
import { defineConfig } from "dinou";

export default defineConfig({
  // Leading dots are optional ("glb" and ".glb" both work)
  assetExtensions: ["glb", "gltf", "hdr", "wasm"],
});`}
              </CodeBlock>
              <p>
                Once added to <code>dinou.config.ts</code>:
              </p>
              <ul>
                <li>
                  <strong>All 3 bundlers &amp; all 4 runtimes</strong> (Esbuild, Rollup, Webpack, Node.js, Bun, Deno, and Cloudflare Workers) automatically fingerprint and emit imports matching those extensions into <code>/assets/[name]-[hash].[ext]</code>.
                </li>
                <li>
                  <strong>Automatic TypeScript Ambient Types:</strong> Running <code>npx dinou typegen</code> (or starting <code>dinou dev</code> / <code>dinou build</code>) automatically generates <code>declare module &quot;*.glb&quot;</code> declarations inside <code>.dinou/types/routes.d.ts</code>—no manual <code>.d.ts</code> boilerplate required.
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                If you have <Link href="/docs/eject" className="underline font-semibold text-foreground">ejected Dinou</Link>, you can also inspect or customize the default 26 extensions directly in <code>dinou/core/asset-extensions.js</code> and <code>dinou/assets.d.ts</code>.
              </p>
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
