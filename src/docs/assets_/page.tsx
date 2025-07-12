"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription } from "@/docs/components/ui/alert";
import { Info } from "lucide-react";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "server-components", title: "With Server Components", level: 2 },
  { id: "typescript", title: "TypeScript Declaration", level: 2 },
  { id: "custom-extension", title: "Custom Extensions", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Assets or Media Files</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to use media files like images, video, and sound in
              dinou.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                dinou supports the use of media files in your components.
                Supported file extensions are:
                <code>.png</code>, <code>.jpeg</code>, <code>.jpg</code>,{" "}
                <code>.gif</code>, <code>.svg</code>, <code>.webp</code>,{" "}
                <code>.avif</code>, <code>.ico</code>, <code>.mp4</code>,{" "}
                <code>.webm</code>, <code>.ogg</code>, <code>.mov</code>,{" "}
                <code>.avi</code>, <code>.mkv</code>, <code>.mp3</code>,{" "}
                <code>.wav</code>, <code>.flac</code>, <code>.m4a</code>,{" "}
                <code>.aac</code>, <code>.mjpeg</code>, <code>.mjpg</code>.
              </p>
            </section>

            <section id="usage">
              <h2>Usage</h2>
              <p>
                Just import the asset as a default import and use it in your
                component:
              </p>
              <CodeBlock language="typescript">
                {`// src/component.tsx
"use client";

import image from "./image.png";

export default function Component() {
  return <img src={image} alt="image" />;
}`}
              </CodeBlock>

              <Alert className="not-prose mt-2">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Only assets imported under a{" "}
                  <code>"use client"</code> directive will be detected by
                  Webpack and generated in the webpack output folder.
                </AlertDescription>
              </Alert>
            </section>

            <section id="server-components">
              <h2>With Server Components</h2>
              <p>
                If you're using server components, you need to create a separate
                client file (e.g. <code>assets.ts</code>) to trigger Webpack’s
                detection:
              </p>

              <h3>Client Asset File</h3>
              <CodeBlock language="typescript">
                {`// src/assets.ts
"use client";

import "./image.png";`}
              </CodeBlock>

              <h3>Server Component</h3>
              <CodeBlock language="typescript">
                {`// src/component.tsx
import image from "./image.png";

export default async function Component() {
  return <img src={image} alt="image" />;
}`}
              </CodeBlock>
            </section>

            <section id="typescript">
              <h2>TypeScript Declaration</h2>
              <p>
                You should declare each supported file extension in a
                declaration file (e.g. <code>src/assets.d.ts</code>):
              </p>
              <CodeBlock language="typescript">
                {`// src/assets.d.ts
declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

// continue with the rest...
`}
              </CodeBlock>
            </section>

            <section id="custom-extension">
              <h2>Custom Extensions</h2>
              <p>
                If you need to support a new file extension, you can eject and
                customize dinou. Add the extension in these three places:
              </p>
              <ul>
                <li>
                  <code>webpack.config.js</code>
                </li>
                <li>
                  <code>dinou/server.js</code>
                </li>
                <li>
                  <code>dinou/render-html.js</code>
                </li>
              </ul>
              <p>
                Just search for the existing file extensions and append your
                own.
              </p>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
