"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription } from "@/docs/components/ui/alert";
import { Info } from "lucide-react";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "client-components", title: "With Client Components", level: 2 },
  { id: "server-components", title: "With Server Components", level: 2 },
];

export default function ImagesPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Images</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to use images (.png, .jpeg, .jpg, .gif, .svg, and .webp)
              in Dinou.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Dinou is ready to support the use of images in your components.
                Supported formats include <code>.png</code>, <code>.jpeg</code>,{" "}
                <code>.jpg</code>, <code>.gif</code>, <code>.svg</code>, and{" "}
                <code>.webp</code>.
              </p>

              <Alert className="not-prose">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Only images imported under{" "}
                  <code>"use client"</code> directive will be detected by Dinou
                  and generated in <code>public</code> folder.
                </AlertDescription>
              </Alert>
            </section>

            <section id="client-components">
              <h2>With Client Components</h2>
              <p>Just import the image and use it:</p>

              <CodeBlock language="typescript">
                {`// src/component.tsx
"use client";

import image from "./image.png"; // import the image from where it is located (inside src folder)

export default function Component() {
  return <img src={image} alt="image" />;
}`}
              </CodeBlock>
            </section>

            <section id="server-components">
              <h2>With Server Components</h2>
              <p>
                If you use server components, then you must create an additional
                file (e.g. <code>images.ts</code>) with the{" "}
                <code>"use client"</code> directive and import there the images
                too:
              </p>

              <h3>Images Import File</h3>
              <CodeBlock language="typescript">
                {`// src/images.ts
"use client";

import "./image.png";`}
              </CodeBlock>

              <h3>Server Component</h3>
              <CodeBlock language="typescript">
                {`// src/component.tsx
import image from "./image.png"; // import the image from where it is located (inside src folder)

export default async function Component() {
  return <img src={image} alt="image" />;
}`}
              </CodeBlock>
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
