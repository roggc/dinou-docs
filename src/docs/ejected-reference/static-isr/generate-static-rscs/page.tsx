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

const RSCS_PIPELINE_DIAGRAM = `                  generateStaticRSCs(routes)
                             │
                             ▼
              [Read React Client Manifest]
                             │
                             ▼
                    [For each route...]
                             │
                             ▼
             [Inject Mock Request & Response]
                             │
                             ▼
             [requestStorage.run(mockContext)]
                             │
                    getJSX(reqPath) ──► Loads React Tree
                    renderToPipeableStream() ──► Serializes stream
                             │
                             ▼
               [Write directly to dist2/rsc.rsc]`;

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
              Understand build-time react serialization for multiple routes, client bundle mappings, and bulk stream piping.
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
                During the static compilation phase (<code>npm run build</code>), we need to serialize the Server Components element trees of all crawled routes. The <code>generate-static-rscs.js</code> module manages this batch process, rendering routes to <code>rsc.rsc</code> payloads inside <code>dist2/</code>.
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
                <CodeBlock language="text">{RSCS_PIPELINE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* BULK VS SINGLE */}
            <section id="bulk-vs-single">
              <h2>🔄 Bulk Pipeline vs Single Route Compiler</h2>
              <p>
                Unlike the single-route builder <code>generate-static-rsc.js</code> (which handles runtime ISR/ISG cache refreshes):
              </p>
              <ul>
                <li>
                  <strong>Direct Writes:</strong> Write directly to final files on disk instead of writing to <code>.tmp</code> files first, since no user traffic hits the server during the build phase.
                </li>
                <li>
                  <strong>Cached Manifest Lookup:</strong> Reads the client component mappings manifest once at the start of execution, bypassing read overhead across files.
                </li>
              </ul>
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
