"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Boxes, Cpu, FileOutput, Server } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "engine-flow", title: "📊 Pipeline Flow", level: 2 },
  { id: "bulk-vs-single", title: "🔄 Bulk Pipeline vs Single Route Compiler", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const RSCS_PIPELINE_DIAGRAM = `%%{init: {'themeVariables': { 'fontSize': '20px' }}}%%
graph TD
    Start["generateStaticRSCs(routes)<br/>(Entry function call for bulk routes)"] --> ReadManifest["Load React Client Manifest<br/>(Reads react-client-manifest.json)"]
    ReadManifest --> LoopRoutes["Iterate Crawled Routes<br/>(Sequential loop over static routes array)"]
    LoopRoutes --> MockContext["Inject Mock Express Context<br/>(Simulate req/res, cookies and headers)"]
    MockContext --> RunALS["Bind AsyncLocalStorage Context<br/>(requestStorage.run wraps execution)"]
    RunALS --> LoadJSX["Load Component Tree: getJSX()<br/>(Evaluates layout & page server components)"]
    LoadJSX --> Stream["Serialize Via renderToPipeableStream<br/>(React Server DOM Flight binary stream)"]
    Stream --> WriteRSC["Write Payload Directly to Target<br/>(Saves stream to dist2/route/rsc.rsc)"]`;

const RSCS_PIPELINE_CODE = `const fs = require("fs");
const path = require("path");
const { PassThrough } = require("stream");
const url = require("url");
const getJSX = require("./get-jsx.js");
const isWebpack = process.env.DINOU_BUILD_TOOL === "webpack";
const { renderToPipeableStream } = isWebpack
  ? require("react-server-dom-webpack/server")
  : require("@roggc/react-server-dom-esm/server");
const { requestStorage } = require("./request-context.js");

const OUT_DIR = path.resolve("dist2");

async function generateStaticRSCs(routes) {
  // 1. Read Client Manifest to map dynamic Client components correctly
  const manifest = JSON.parse(
    fs.readFileSync(
      path.resolve(
        isWebpack
          ? "dist3/react-client-manifest.json"
          : "react_client_manifest/react-client-manifest.json"
      ),
      "utf8"
    )
  );

  // 2. Loop through all crawled paths
  for (const route of routes) {
    const reqPath = route.endsWith("/") ? route : route + "/";
    const payloadPath = path.join(OUT_DIR, reqPath, "rsc.rsc");

    // 3. Inject Mock Request and Response Objects
    const mockRes = {
      _statusCode: 200,
      _headers: {},
      _cookies: [],
      cookie(name, value, options) {
        this._cookies.push({ name, value, options });
      },
      clearCookie(name, options) {},
      setHeader(name, value) {
        this._headers[name.toLowerCase()] = value;
      },
      status(code) {
        this._statusCode = code;
      },
      redirect(arg1, arg2) {
        let status = 302;
        let url = "";
        if (typeof arg1 === "number") {
          status = arg1;
          url = arg2;
        } else {
          url = arg1;
        }
        this._statusCode = status;
        this._redirectUrl = url;
        console.warn(\`⚠️ [SSG] Redirect detected in \${reqPath} -> \${url} (\${status})\`);
      },
    };

    const mockReq = {
      query: {},
      cookies: {},
      headers: {
        "user-agent": "Dinou-SSG-Builder",
        host: "localhost",
      },
      path: reqPath,
      method: "GET",
    };

    const mockContext = { req: mockReq, res: mockRes };

    try {
      fs.mkdirSync(path.dirname(payloadPath), { recursive: true });
      const fileStream = fs.createWriteStream(payloadPath);
      const passThrough = new PassThrough();

      // 4. Render JSX inside Request Storage
      await requestStorage.run(mockContext, async () => {
        const jsx = await getJSX(reqPath, {}, null, false);
        const { pipe } = isWebpack
          ? renderToPipeableStream(jsx, manifest)
          : renderToPipeableStream(jsx, url.pathToFileURL(process.cwd()).href + "/");

        pipe(passThrough);
        passThrough.pipe(fileStream);

        // Await stream finish
        await new Promise((resolve, reject) => {
          fileStream.on("finish", resolve);
          fileStream.on("error", reject);
          passThrough.on("error", reject);
        });
      });

      console.log("✅ Generated RSC payload:", reqPath);
    } catch (error) {
      console.error("❌ Error generating RSC payload for:", reqPath, error);
    }
  }

  console.log("🟢 Static RSC payload generation complete.");
}

module.exports = generateStaticRSCs;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Boxes className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                RSCs Pipeline (generate-static-rscs.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine how Dinou serializes all application routes into React Server Component payloads in bulk during the production build.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/generate-static-rscs.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                During the production server startup phase, we need to serialize the Server Components element trees of all crawled routes. The <code>generate-static-rscs.js</code> module manages this batch process, rendering routes to <code>rsc.rsc</code> payloads inside <code>dist2/</code>.
              </p>
            </section>

            <hr className="my-8" />

            {/* PIPELINE FLOW */}
            <section id="engine-flow">
              <h2>📊 Pipeline Flow</h2>
              <p>
                The flowchart below shows how routes are processed through the bulk serialization pipeline:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="450px">{RSCS_PIPELINE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* BULK VS SINGLE */}
            <section id="bulk-vs-single">
              <h2>🔄 Differences: Bulk vs. Single Route Compilation</h2>
              <p>
                Dinou has two modules for generating RSC payloads: <code>generate-static-rscs.js</code> (for batch generation at startup) and <code>generate-static-rsc.js</code> (for single routes during active traffic). They operate differently to optimize speed and prevent downtime:
              </p>
              <div className="my-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <th className="px-4 py-2 font-bold text-left">Feature</th>
                      <th className="px-4 py-2 font-bold text-left">Bulk Pipeline (generate-static-rscs.js)</th>
                      <th className="px-4 py-2 font-bold text-left">Single Route Compiler (generate-static-rsc.js)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr>
                      <td className="px-4 py-2 font-semibold">When does it run?</td>
                      <td className="px-4 py-2">Runs once in the background when the production server starts up.</td>
                      <td className="px-4 py-2">Runs on-demand when a user visits a page (ISR / ISG).</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">How does it write files?</td>
                      <td className="px-4 py-2">
                        <strong>Direct Writes:</strong> Writes directly to the final <code>rsc.rsc</code> file path. Safe because no public traffic is hitting the server yet during startup.
                      </td>
                      <td className="px-4 py-2">
                        <strong>Double-Buffered:</strong> Writes to a temporary <code>.tmp</code> file first, then renames it atomically to prevent serving a half-written file to an active user.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Manifest File Reads</td>
                      <td className="px-4 py-2">
                        Reads the <code>react-client-manifest.json</code> <strong>once</strong> at the start and reuses it for all routes. Highly efficient for batching.
                      </td>
                      <td className="px-4 py-2">
                        Reads the manifest from disk on every single execution to get the latest client component mappings.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full code of <code>generate-static-rscs.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{RSCS_PIPELINE_CODE}</CodeBlock>
              </div>
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
