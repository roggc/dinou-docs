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
import { Package, Server, Zap } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "bundlers-running", title: "⚡ Bundlers & Running the App", level: 2 },
  { id: "development", title: "Development", level: 3 },
  { id: "production-build", title: "Production Build", level: 3 },
  { id: "production-server", title: "Start Production Server", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Bundlers & Running the App
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Build and run your Dinou application with esbuild, Rollup, or
              Webpack.
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
