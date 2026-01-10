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
  Package,
  Rocket,
  Download,
  Server,
  Play,
  Hammer,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
  Cpu,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "bundlers-running", title: "⚡ Bundlers & Running the App", level: 2 },
  { id: "development", title: "Development", level: 3 },
  { id: "production-build", title: "Production Build", level: 3 },
  { id: "production-server", title: "Start Production Server", level: 3 },
  { id: "eject-dinou", title: "⏏️ Eject Dinou", level: 2 },
  { id: "deployment", title: "🚀 Deployment", level: 2 },
  { id: "supported-platforms", title: "Supported Platforms", level: 3 },
  { id: "runtime-command", title: "Runtime Command", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw] overflow-x-hidden">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Bundlers, Eject & Deployment
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Build, customize, and deploy your Dinou application. Choose your
              bundler, eject for full control, and deploy to production.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="bundlers-running">
              <h2>⚡ Bundlers & Running the App</h2>
              <p>
                Dinou is flexible and integrates with three major bundlers:{" "}
                <strong>esbuild</strong> (default), <strong>Rollup</strong>, and{" "}
                <strong>Webpack</strong>.
              </p>

              <section id="development">
                <h3>Development</h3>
                <p>
                  Start the development server with hot reloading. Files are
                  emitted to the <code>public</code> folder.
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Command</th>
                        <th className="p-4">Bundler</th>
                        <th className="p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr className="bg-green-50/50 dark:bg-green-900/10">
                        <td className="p-4 font-mono text-xs">
                          <code>npm run dev</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <strong>esbuild</strong>
                        </td>
                        <td className="p-4 text-xs">
                          Default. Fastest startup time.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <code>npm run dev:esbuild</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <strong>esbuild</strong>
                        </td>
                        <td className="p-4 text-xs">
                          Explicit esbuild command.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <code>npm run dev:rollup</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <strong>Rollup</strong>
                        </td>
                        <td className="p-4 text-xs">
                          Uses Rollup for bundling.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <code>npm run dev:webpack</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <strong>Webpack</strong>
                        </td>
                        <td className="p-4 text-xs">
                          Uses Webpack for bundling.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="production-build">
                <h3>Production Build</h3>
                <p>
                  Compile the application for production. Files are emitted to
                  the <code>dist3</code> folder.
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Command</th>
                        <th className="p-4">Bundler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr className="bg-blue-50/50 dark:bg-blue-900/10">
                        <td className="p-4 font-mono text-xs">
                          <code>npm run build</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <strong>esbuild</strong> (Default)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <code>npm run build:esbuild</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <strong>esbuild</strong> (Explicit)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <code>npm run build:rollup</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <strong>Rollup</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <code>npm run build:webpack</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <strong>Webpack</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="production-server">
                <h3>Start Production Server</h3>
                <p>
                  Run the built application from the <code>dist3</code> folder.
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Command</th>
                        <th className="p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <code>npm start</code>
                        </td>
                        <td className="p-4 text-xs">
                          Same as <code>npm run start:esbuild</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <code>npm run start:esbuild</code>
                        </td>
                        <td className="p-4 text-xs">
                          Use after building with esbuild.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <code>npm run start:rollup</code>
                        </td>
                        <td className="p-4 text-xs">
                          Use after building with Rollup.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <code>npm run start:webpack</code>
                        </td>
                        <td className="p-4 text-xs">
                          Use after building with Webpack.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Alert className="not-prose mt-4">
                  <Server className="h-4 w-4" />
                  <AlertTitle>Server Output</AlertTitle>
                  <AlertDescription>
                    The production server runs on{" "}
                    <code>http://localhost:3000</code> by default. You can
                    configure the port via the <code>PORT</code> environment
                    variable.
                  </AlertDescription>
                </Alert>
              </section>
            </section>

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
              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Download className="h-5 w-5 text-amber-500" />
                  <span>What Happens When You Eject?</span>
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
                  <li>Gives you complete freedom to customize the framework</li>
                  <li>
                    <strong>Note:</strong> This action is irreversible
                  </li>
                </ul>
              </div>
              <Alert className="not-prose mt-6">
                <Hammer className="h-4 w-4" />
                <AlertTitle>When to Consider Ejecting</AlertTitle>
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

      {/* Sidebar TOC - Hidden on Mobile */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
