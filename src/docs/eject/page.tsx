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
import { Download, Hammer, AlertTriangle } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "eject-dinou", title: "⏏️ Eject Dinou", level: 2 },
  { id: "what-happens", title: "What Happens When You Eject?", level: 3 },
  { id: "when-to-eject", title: "When to Consider Ejecting", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw] overflow-x-hidden">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Eject Dinou
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Gain full control by ejecting Dinou for complete customization of
              your framework.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="eject-dinou">
              <h2>⏏️ Eject Dinou</h2>
              <p>
                If you need full control over the internal configuration or
                build logic, you can "eject" the framework.
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`# Using npm script
npm run eject

# Or using the CLI directly
npx dinou eject`}
              </CodeBlock>
              <section id="what-happens">
                <h3>What Happens When You Eject?</h3>
                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Download className="h-5 w-5 text-amber-500" />
                    <span>Ejection Process</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                    <li>
                      Copies the entire Dinou core into a <code>dinou/</code>{" "}
                      folder in your project root
                    </li>
                    <li>
                      Allows direct modification of build scripts, server logic,
                      and configuration
                    </li>
                    <li>
                      Gives you complete freedom to customize the framework
                    </li>
                    <li>
                      <strong>Note:</strong> This action is irreversible
                    </li>
                  </ul>
                </div>
              </section>
              <section id="when-to-eject">
                <h3>When to Consider Ejecting</h3>
                <Alert className="not-prose mt-6">
                  <Hammer className="h-4 w-4" />
                  <AlertTitle>Ejection Use Cases</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                      <li>Need to modify the internal bundling process</li>
                      <li>Require custom server middleware or routing logic</li>
                      <li>
                        Want to add support for additional file types or build
                        features
                      </li>
                      <li>Debugging deep framework issues</li>
                    </ul>
                  </AlertDescription>
                </Alert>
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
