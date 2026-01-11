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
  FileType,
  AlertCircle,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "assets-media", title: "🖼️ Assets & Media", level: 2 },
  { id: "supported-extensions", title: "Supported Extensions", level: 3 },
  { id: "usage-example", title: "Usage Example", level: 3 },
  { id: "typescript-support", title: "TypeScript Support", level: 3 },
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
                Assets & Media
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Work with images, videos, and audio files in your Dinou
              application.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="assets-media">
              <h2>🖼️ Assets & Media</h2>
              <p>
                Dinou allows direct import of media files into your components.
                The framework supports a wide range of image, video, and audio
                formats.
              </p>

              <section id="supported-extensions">
                <h3>Supported Extensions</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Category</th>
                        <th className="p-4">Extensions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-semibold">Images</td>
                        <td className="p-4 font-mono text-xs">
                          .png, .jpg, .jpeg, .gif, .svg, .webp, .avif, .ico,
                          .mjpeg, .mjpg
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold">Video</td>
                        <td className="p-4 font-mono text-xs">
                          .mp4, .webm, .ogg, .mov, .avi, .mkv
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold">Audio</td>
                        <td className="p-4 font-mono text-xs">
                          .mp3, .wav, .flac, .m4a, .aac
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Alert className="not-prose mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Custom Extensions</AlertTitle>
                  <AlertDescription>
                    Need support for additional formats? You can{" "}
                    <a href="#eject-dinou" className="font-semibold underline">
                      eject Dinou
                    </a>{" "}
                    and modify <code>dinou/core/asset-extensions.js</code>.
                  </AlertDescription>
                </Alert>
              </section>

              <section id="usage-example">
                <h3>Usage Example</h3>
                <p>Import media files directly like any other module:</p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/components/Hero.tsx
"use client";
import logo from "./logo.png";
import heroVideo from "./hero-background.mp4";
import backgroundMusic from "./ambient.mp3";

export default function Hero() {
  return (
    <section className="relative">
      {/* Image */}
      <img 
        src={logo} 
        alt="Company Logo" 
        className="w-32 h-32"
      />
      
      {/* Video */}
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Audio (with controls) */}
      <audio controls className="hidden">
        <source src={backgroundMusic} type="audio/mpeg" />
      </audio>
      
      <div className="relative z-10">
        <h1>Welcome to Dinou</h1>
      </div>
    </section>
  );
}`}
                </CodeBlock>
              </section>

              <section id="typescript-support">
                <h3>TypeScript Support</h3>
                <p>
                  To avoid TypeScript errors when importing assets, create
                  declaration files for each format you use.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/assets.d.ts (or similar declaration file)
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.mp4" {
  const value: string;
  export default value;
}

declare module "*.mp3" {
  const value: string;
  export default value;
}

// Add declarations for other formats as needed...`}
                </CodeBlock>
                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <FileType className="h-5 w-5 text-blue-500" />
                    <span>Declaration Placement</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Place these declarations in a <code>.d.ts</code> file inside
                    your <code>src</code> directory. Make sure the file is
                    included in your <code>tsconfig.json</code>.
                  </p>
                </div>
              </section>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
