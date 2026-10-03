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
  Image as ImageIcon,
  Video,
  Music,
  FolderTree,
  AlertCircle,
  CheckCircle2,
  Zap,
  Layers,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Code2,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "Assets & Media in Dinou", level: 2 },
  { id: "imported-vs-public", title: "Imported Assets vs Public Directory", level: 2 },
  { id: "supported-formats", title: "Supported Extensions (21 Formats)", level: 2 },
  { id: "usage-examples", title: "Usage in Server & Client Components", level: 2 },
  { id: "images", title: "Images (Raster & Vector)", level: 3 },
  { id: "video-audio", title: "Video & Audio Media", level: 3 },
  { id: "svg-patterns", title: "SVG Handling Patterns", level: 3 },
  { id: "path-aliases", title: "Path Aliases in Asset Imports", level: 2 },
  { id: "caching-bundling", title: "Asset Hashing & Immutable Caching", level: 2 },
  { id: "typescript-support", title: "TypeScript Declarations (dinou/env)", level: 2 },
  { id: "custom-extensions", title: "Extending Custom Formats (Eject)", level: 2 },
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
                Assets &amp; Media
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Import images, videos, and audio files directly into your components with automatic content-hashing, static optimization, and ambient TypeScript support for <strong>21 media formats</strong>.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>Assets &amp; Media in Dinou</h2>
              <p>
                In Dinou, media files imported into JavaScript or TypeScript components are treated as first-class module dependencies. When you import an asset (e.g. <code>import logo from &quot;./logo.png&quot;</code>), the active bundler (esbuild, rollup, or webpack):
              </p>
              <ol>
                <li>
                  <strong>Fingerprints the file:</strong> Computes a cryptographic content-hash based on the asset content.
                </li>
                <li>
                  <strong>Emits the asset:</strong> Copies the optimized asset to the build output directory under <code>/assets/[name]-[hash].[ext]</code>.
                </li>
                <li>
                  <strong>Returns a string URL:</strong> Resolves the JavaScript import to the final public URL string (e.g. <code>&quot;/assets/logo-8f1e2a.png&quot;</code>).
                </li>
              </ol>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                      <Sparkles className="h-4 w-4" />
                      <span>RSC &amp; SSR Safe</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Imports resolve to plain URL strings, rendering identically in server SSR HTML and client hydration with zero mismatch.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/50 dark:bg-purple-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                      <Zap className="h-4 w-4" />
                      <span>Immutable Caching</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Content-hashed URLs can be served with aggressive <code>max-age=31536000, immutable</code> browser cache headers.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <ShieldCheck className="h-4 w-4" />
                      <span>TypeScript Verified</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Built-in ambient declarations in <code>dinou/env</code> prevent broken imports and typos at build time.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Imported vs Public Directory */}
            <section id="imported-vs-public" className="mt-12">
              <h2>Imported Assets vs Public Directory</h2>
              <p>
                Dinou provides two complementary ways to manage static files. Understanding when to use each ensures optimal caching and bundle performance:
              </p>

              <div className="not-prose my-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-left">
                      <th className="p-3 font-semibold border-b">Feature</th>
                      <th className="p-3 font-semibold border-b text-blue-600 dark:text-blue-400">Imported Assets (src/)</th>
                      <th className="p-3 font-semibold border-b text-muted-foreground">Public Directory (public/)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-xs">
                    <tr>
                      <td className="p-3 font-medium">Location</td>
                      <td className="p-3 font-mono">src/components/, src/assets/</td>
                      <td className="p-3 font-mono">public/ (project root)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Access Method</td>
                      <td className="p-3 font-mono">import logo from &quot;./logo.png&quot;</td>
                      <td className="p-3 font-mono">&lt;img src=&quot;/favicon.ico&quot; /&gt;</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Bundler Processing</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Processed, fingerprinted, tree-shaken</td>
                      <td className="p-3 text-muted-foreground">Bypasses bundlers (direct copy)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Cache Invalidation</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Automatic via content hash</td>
                      <td className="p-3 text-muted-foreground">Manual cache-busting required</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Type Safety</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Verified by TypeScript (dinou/env)</td>
                      <td className="p-3 text-muted-foreground">Unchecked raw URL strings</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Recommended For</td>
                      <td className="p-3">Component icons, UI graphics, illustrations, media</td>
                      <td className="p-3"><code>robots.txt</code>, <code>favicon.ico</code>, <code>sitemap.xml</code>, static files</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground">
                For more details on static file serving that bypasses the bundlers, refer to the <Link href="/docs/public" className="underline font-semibold text-foreground">Public Directory Documentation</Link>.
              </p>
            </section>

            {/* Supported Extensions */}
            <section id="supported-formats" className="mt-12">
              <h2>Supported Extensions (21 Formats)</h2>
              <p>
                Dinou recognizes 21 media extensions out-of-the-box across images, video, and audio:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Format Extensions</th>
                      <th className="p-3.5">Common MIME Types</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card text-xs">
                    <tr>
                      <td className="p-3.5 font-semibold flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                        <span>Images (10)</span>
                      </td>
                      <td className="p-3.5 font-mono text-foreground font-semibold">
                        .png, .jpg, .jpeg, .gif, .svg, .webp, .avif, .ico, .mjpeg, .mjpg
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        image/png, image/jpeg, image/webp, image/svg+xml, image/avif
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold flex items-center gap-2">
                        <Video className="h-4 w-4 text-purple-500" />
                        <span>Video (6)</span>
                      </td>
                      <td className="p-3.5 font-mono text-foreground font-semibold">
                        .mp4, .webm, .ogg, .mov, .avi, .mkv
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        video/mp4, video/webm, video/ogg, video/quicktime
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
                        audio/mpeg, audio/wav, audio/flac, audio/aac
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
                Importing media files works identically in both Server Components (RSC) and Client Components (<code>&quot;use client&quot;</code>).
              </p>

              {/* Sub-section: Images */}
              <div id="images" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Images (Raster &amp; Vector)</h3>
                <p>
                  Importing an image returns its fingerprinted URL string, which can be passed directly to standard JSX <code>&lt;img&gt;</code> elements:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/avatar.tsx
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
}`}
                </CodeBlock>
              </div>

              {/* Sub-section: Video & Audio */}
              <div id="video-audio" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Video &amp; Audio Media</h3>
                <p>
                  Video and audio files are imported in the same manner and fed to HTML5 media tags:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/media-hero.tsx
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
        <h1 className="text-3xl font-bold">Experience Dinou</h1>
        <button
          onClick={playSound}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition shadow"
        >
          Play Welcome Chime
        </button>
      </div>
    </div>
  );
}`}
                </CodeBlock>
              </div>

              {/* Sub-section: SVG Patterns */}
              <div id="svg-patterns" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">SVG Handling Patterns</h3>
                <p>
                  SVGs can be used in two primary ways depending on your styling requirements:
                </p>
                <div className="grid gap-4 sm:grid-cols-2 not-prose my-4">
                  <div className="rounded-lg border bg-card p-4 space-y-2">
                    <div className="font-semibold text-sm text-foreground">1. As an External Asset (&lt;img&gt;)</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Best for complex illustrations and logos that do not need dynamic CSS color changes.
                    </p>
                    <code className="block p-2 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
                      import logo from &quot;./logo.svg&quot;;<br />
                      &lt;img src=&#123;logo&#125; alt=&quot;Logo&quot; /&gt;
                    </code>
                  </div>
                  <div className="rounded-lg border bg-card p-4 space-y-2">
                    <div className="font-semibold text-sm text-foreground">2. As Inline JSX Component</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Best for interactive UI icons where you need Tailwind classes (e.g. <code>className=&quot;fill-current text-blue-500&quot;</code>).
                    </p>
                    <code className="block p-2 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
                      export function Icon(&#123; className &#125;) &#123;<br />
                      &nbsp;&nbsp;return &lt;svg className=&#123;className&#125;&gt;...&lt;/svg&gt;;<br />
                      &#125;
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Path Aliases */}
            <section id="path-aliases" className="mt-12">
              <h2>Path Aliases in Asset Imports</h2>
              <p>
                Dinou&apos;s bundlers resolve path aliases configured in <code>tsconfig.json</code> for media imports as well as code modules. You do not need to use fragile relative paths like <code>../../assets/logo.png</code>:
              </p>
              <CodeBlock
                language="tsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// Clean path alias resolution
import companyLogo from "@/assets/brand/logo.svg";
import heroBanner from "@/assets/images/banner.webp";`}
              </CodeBlock>
            </section>

            {/* Asset Hashing & Caching */}
            <section id="caching-bundling" className="mt-12">
              <h2>Asset Hashing &amp; Immutable Caching</h2>
              <p>
                When building for production (<code>dinou build</code>), Dinou writes fingerprinted files into the distribution directory:
              </p>
              <CodeBlock
                language="text"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`.dinou/dist3/assets/
├── logo-4b2a8f.png
├── banner-9c1d3e.webp
└── intro-sound-7e2f1a.mp3`}
              </CodeBlock>

              <div className="rounded-xl border p-4 bg-card not-prose space-y-2 my-4">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Production Caching Strategy</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Because every asset file name contains a hash representing its exact binary content, edge CDNs and browsers can cache assets indefinitely without risk of stale content:
                </p>
                <code className="block p-2.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono">
                  Cache-Control: public, max-age=31536000, immutable
                </code>
                <p className="text-xs text-muted-foreground">
                  When you modify an asset, its hash changes, producing a new URL that browsers download immediately.
                </p>
              </div>
            </section>

            {/* TypeScript Support */}
            <section id="typescript-support" className="mt-12">
              <h2>TypeScript Declarations (dinou/env)</h2>
              <p>
                Starting with <strong>Dinou v6.1.0</strong> and <strong>v7</strong>, ambient type declarations for all 21 media extensions are packaged directly into <code>dinou/env</code>.
              </p>
              <p>
                Verify that <code>dinou-env.d.ts</code> exists in your project root:
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`/// <reference types="dinou/env" />`}
              </CodeBlock>

              <p className="mt-3 text-sm">
                And confirm your <code>tsconfig.json</code> includes the reference:
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
                  If working on an older project prior to <code>dinou/env</code>, you can define ambient asset types manually in <code>src/assets.d.ts</code>:
                  <code className="block mt-1 p-2 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
                    declare module &quot;*.png&quot; &#123; const value: string; export default value; &#125;<br />
                    declare module &quot;*.webp&quot; &#123; const value: string; export default value; &#125;<br />
                    declare module &quot;*.svg&quot; &#123; const value: string; export default value; &#125;
                  </code>
                </AlertDescription>
              </Alert>
            </section>

            {/* Custom Extensions */}
            <section id="custom-extensions" className="mt-12">
              <h2>Extending Custom Formats (Eject)</h2>
              <p>
                If your application requires specialized binary formats (e.g. <code>.hdr</code>, <code>.glb</code>, <code>.gltf</code> for 3D graphics, or <code>.wasm</code>), you can <Link href="/docs/eject" className="underline font-semibold text-foreground">eject Dinou</Link> to take full ownership of the pipeline.
              </p>
              <p>
                In an ejected project, simply add your custom extensions to the array in <code>dinou/core/asset-extensions.js</code>:
              </p>
              <CodeBlock
                language="javascript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// dinou/core/asset-extensions.js
const extensions = [
  "png", "jpg", "jpeg", "gif", "svg", "webp", "avif", "ico",
  "mp4", "webm", "ogg", "mov", "avi", "mkv",
  "mp3", "wav", "flac", "m4a", "aac",
  "mjpeg", "mjpg",
  // Custom additions:
  "glb", "gltf", "hdr"
];`}
              </CodeBlock>
              <p className="text-xs text-muted-foreground mt-2">
                All three bundlers (esbuild, rollup, webpack) and the dual-engine runtime will automatically recognize and fingerprint your new file extensions.
              </p>
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
