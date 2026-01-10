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
import { Rocket, CheckCircle2, XCircle, Zap, Cpu } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "deployment", title: "🚀 Deployment", level: 2 },
  { id: "supported-platforms", title: "Supported Platforms", level: 3 },
  { id: "runtime-command", title: "Runtime Command", level: 3 },
  { id: "deployment-checklist", title: "Deployment Checklist", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw] overflow-x-hidden">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Deployment
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Deploy your Dinou application to production on supported
              platforms.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="deployment">
              <h2>🚀 Deployment</h2>
              <p>
                Dinou apps can be deployed to any platform supporting Node.js,
                provided you can pass the required custom flags.
              </p>

              <section id="supported-platforms">
                <h3>Supported Platforms</h3>
                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>✅ Recommended: DigitalOcean App Platform</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Works seamlessly. Allows full control over the runtime
                      command, essential for the required{" "}
                      <code>--conditions react-server</code> flag.
                    </CardContent>
                  </Card>
                  <Card className="border-red-500/20 bg-red-50/50 dark:bg-red-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
                        <XCircle className="h-5 w-5" />
                        <span>❌ Not Supported: Netlify</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Currently incompatible because it does not support passing
                      custom Node.js flags (
                      <code>--conditions react-server</code>) during runtime.
                    </CardContent>
                  </Card>
                </div>
                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Cpu className="h-5 w-5 text-blue-500" />
                    <span>
                      Other Platforms (Render, Fly.io, Railway, Vercel, etc.)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ensure your platform allows customization of the start
                    command. The key requirement is the ability to pass the{" "}
                    <code>--conditions react-server</code> flag to Node.js.
                  </p>
                </div>
              </section>

              <section id="runtime-command">
                <h3>Runtime Command</h3>
                <p>
                  Your production start command must include the React Server
                  Components condition flag.
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`node --conditions react-server dist3/index.js`}
                </CodeBlock>
                <p className="mt-4">
                  In your <code>package.json</code> scripts:
                </p>
                <CodeBlock
                  language="json"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`{
  "scripts": {
    "start": "node --conditions react-server dist3/index.js"
  }
}`}
                </CodeBlock>
              </section>

              <section id="deployment-checklist">
                <h3>Deployment Checklist</h3>
                <Alert className="not-prose mt-6">
                  <Zap className="h-4 w-4" />
                  <AlertTitle>Deployment Checklist</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                      <li>
                        ✅ Build your app with <code>npm run build</code>
                      </li>
                      <li>
                        ✅ Set environment variables on your hosting platform
                      </li>
                      <li>
                        ✅ Configure the start command with{" "}
                        <code>--conditions react-server</code>
                      </li>
                      <li>✅ Ensure Node.js version 18+ is available</li>
                      <li>
                        ✅ Test the production build locally before deploying
                      </li>
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
