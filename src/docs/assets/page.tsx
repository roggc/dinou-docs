"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/docs/components/ui/card";
import {
  Image as ImageIcon,
  Video,
  Music,
  Zap,
  Sparkles,
  ShieldCheck,
  FolderTree,
  ArrowRight,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "Assets & Media in Dinou", level: 2 },
  { id: "imported-vs-public", title: "Imported Assets vs Public Directory", level: 2 },
  { id: "supported-formats", title: "Supported Extensions (21 Formats)", level: 2 },
  { id: "usage-examples", title: "Usage in Server & Client Components", level: 2 },
  { id: "path-aliases", title: "Path Aliases in Asset Imports", level: 2 },
  { id: "caching-bundling", title: "Production Build Output (.dinou/dist3/assets)", level: 2 },
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
              Import images, videos, and audio files directly into your components with deterministic path-based hashing and ambient TypeScript support for <strong>21 media formats</strong>.
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
                  <strong>Fingerprints the file:</strong> Generates a deterministic path/name-based hash.
                </li>
                <li>
                  <strong>Emits the asset:</strong> Copies the file to the client distribution directory under <code>.dinou/dist3/assets/[name]-[hash].[ext]</code>.
                </li>
                <li>
                  <strong>Returns a string URL:</strong> Resolves the JavaScript import to the final public URL string (e.g. <code>&quot;/assets/logo-8f1e2a.png&quot;</code>).
                </li>
              </ol>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <Card className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <span>RSC &amp; SSR Safe</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Imports resolve to plain URL strings, rendering identically in server SSR HTML and client hydration with zero mismatch.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <Zap className="h-4 w-4" />
                      <span>Zero Name Collisions</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Deterministic path-scoped hashes prevent filename collisions when different components import assets with the same name.
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
                    Built-in ambient declarations in <code>dinou/env</code> prevent broken imports and typos at build time.
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
                  In Dinou, files imported inside your code (<code>src/**/*</code>) are processed by bundlers, fingerprinted with deterministic path-based hashes, and emitted into <code>.dinou/dist3/assets/*</code> with immutable caching. In contrast, files placed in <code>public/</code> bypass bundlers entirely and are copied directly into the web root with fixed, unhashed URLs (ideal for <code>favicon.ico</code>, <code>robots.txt</code>, and verification files).
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
                        <ImageIcon className="h-4 w-4 text-emerald-500" />
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
                        <Video className="h-4 w-4 text-amber-500" />
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
                Importing media files works identically in both Server Components (RSC) and Client Components (<code>&quot;use client&quot;</code>). Imported assets resolve to fingerprinted URL strings that can be passed directly to standard JSX elements like <code>&lt;img&gt;</code>, <code>&lt;video&gt;</code>, <code>&lt;audio&gt;</code>, or Web Audio APIs:
              </p>

              <TabbedCodeBlock
                containerClassName="w-full overflow-hidden rounded-lg my-6"
                tabs={[
                  {
                    id: "images",
                    label: "src/components/avatar.tsx (Images)",
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
                    label: "src/components/media-hero.tsx (Video & Audio)",
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
        <h1 className="text-3xl font-bold">Experience Dinou</h1>
        <button
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
                ]}
              />
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

            {/* Production Build Output */}
            <section id="caching-bundling" className="mt-12">
              <h2>Production Build Output (<code>.dinou/dist3/assets/</code>)</h2>
              <p>
                When building for production (<code>dinou build</code>), Dinou bundles and emits all imported media files into the client distribution directory under <code>.dinou/dist3/assets/</code>, assigning each file a scoped, deterministic name:
              </p>
              <CodeBlock
                language="text"
                containerClassName="w-full overflow-hidden rounded-lg my-4"
              >
{`.dinou/dist3/assets/
├── logo-4b2a8f.png
├── banner-9c1d3e.webp
└── intro-sound-7e2f1a.mp3`}
              </CodeBlock>
              <p className="text-xs text-muted-foreground">
                This structure ensures that assets imported across different components never collide in filename, while keeping bundled media cleanly separated from root static files.
              </p>
            </section>

            {/* TypeScript Support */}
            <section id="typescript-support" className="mt-12">
              <h2>TypeScript Declarations (dinou/env)</h2>
              <p>
                Ambient type declarations for all 21 media extensions are packaged directly into <code>dinou/env</code>.
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
