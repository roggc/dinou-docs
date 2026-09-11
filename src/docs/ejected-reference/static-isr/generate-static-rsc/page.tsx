"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Cpu, FileJson, Layers, ShieldCheck } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "engine-flow", title: "📊 RSC Serialization Flow", level: 2 },
  { id: "buffered-compilation", title: "⚡ Double-Buffered Compiling", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const RSC_BUILDER_DIAGRAM = `%%{init: {'themeVariables': { 'fontSize': '20px' }}}%%
graph TD
    Start["generateStaticRSC(reqPath)<br/>(Entry function call for single route)"] --> TempPath["Generate Temporary File Path<br/>(rsc.rsc.timestamp.tmp double-buffer)"]
    TempPath --> MockCtx["Inject Mock Express Context<br/>(Simulate req/res, cookies and headers)"]
    MockCtx --> RunALS["Bind AsyncLocalStorage Context<br/>(requestStorage.run wraps execution)"]
    
    RunALS --> LoadJSX["Load Component Tree: getJSX()<br/>(Evaluates layout & page server components)"]
    LoadJSX --> Stream["Serialize Via renderToPipeableStream<br/>(React Server DOM Flight stream)"]
    Stream --> PipeTemp["Pipe Stream to Disk<br/>(Writes payload into temporary file)"]
    
    PipeTemp --> ReturnObj["Return Validation Metadata<br/>(success, tempPath, finalPath, status)"]`;

const RSC_BUILDER_CODE = `const fs = require("fs");
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

async function generateStaticRSC(reqPath) {
  const finalReqPath = reqPath.endsWith("/") ? reqPath : reqPath + "/";

  const payloadPath = path.join(OUT_DIR, finalReqPath, "rsc.rsc");
  // 1. Create temporary file path with timestamp & random token to prevent collision
  const tempPayloadPath = path.join(OUT_DIR, finalReqPath, \`rsc.rsc.\${Date.now()}-\${Math.random()}.tmp\`);

  // 2. Setup mock response with status tracking
  const mockRes = {
    _statusCode: 200,
    _headers: {},
    _redirectUrl: null,
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
      console.warn(\`⚠️ [ISR] Redirect detected during RSC generation of \${reqPath} -> \${url} (\${status})\`);
    },
  };

  const mockContext = {
    req: {
      query: {},
      cookies: {},
      headers: {
        "user-agent": "Dinou-ISR-Revalidator",
        host: "localhost",
        "x-forwarded-proto": "http",
      },
      path: finalReqPath,
      method: "GET",
    },
    res: mockRes,
  };

  try {
    // 3. Load React Client Manifest
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

    fs.mkdirSync(path.dirname(payloadPath), { recursive: true });

    const fileStream = fs.createWriteStream(tempPayloadPath);
    const passThrough = new PassThrough();

    // 4. Run components inside Context Store
    await requestStorage.run(mockContext, async () => {
      const jsx = await getJSX(finalReqPath, {}, null, false);
      const { pipe } = isWebpack
        ? renderToPipeableStream(jsx, manifest)
        : renderToPipeableStream(jsx, url.pathToFileURL(process.cwd()).href + "/");
      pipe(passThrough);
      passThrough.pipe(fileStream);

      // Wait for the stream write to complete
      await new Promise((resolve, reject) => {
        fileStream.on("finish", resolve);
        fileStream.on("error", reject);
        passThrough.on("error", reject);
      });
    });

    const success = mockRes._statusCode !== 500;

    // 5. Return validation object - do NOT overwrite target file yet!
    return {
      success,
      type: "rsc",
      reqPath: finalReqPath,
      tempPath: tempPayloadPath,
      finalPath: payloadPath,
      status: mockRes._statusCode,
    };
  } catch (error) {
    console.error("❌ Error generating RSC payload:", error);
    if (fs.existsSync(tempPayloadPath)) fs.unlinkSync(tempPayloadPath);
    return { success: false, tempPath: tempPayloadPath };
  }
}

module.exports = generateStaticRSC;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                RSC Builder (generate-static-rsc.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine single-route React Server Component serialization, Flight stream buffering, and validation controls.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/generate-static-rsc.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                To support Incremental Static Regeneration (ISR) and Dynamic Pre-rendering (ISG), Dinou needs to compile individual routes on demand. The <code>generate-static-rsc.js</code> utility handles this by serializing React Server Components (RSC) into Flight payloads (<code>rsc.rsc</code>) for a single path.
              </p>
            </section>

            <hr className="my-8" />

            {/* PIPELINE CYCLE */}
            <section id="engine-flow">
              <h2>📊 RSC Serialization Flow</h2>
              <p>
                The flowchart below traces the steps executed during single-route RSC serialization:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="450px">{RSC_BUILDER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* BUFFERED COMPILATION */}
            <section id="buffered-compilation">
              <h2>⚡ Double-Buffered Compiling</h2>
              <p>
                To prevent serving broken payloads during an active compilation pass, the builder implements a double-buffering pattern:
              </p>
              <ol>
                <li>
                  <strong>Temporary Writes:</strong> Outputs the serialized stream into a temporary file name containing a timestamp and random float hash.
                </li>
                <li>
                  <strong>Safe Verification:</strong> Validates the response status code. If compilation fails (e.g. status <code>500</code>), it deletes the temp file and exits without committing.
                </li>
                <li>
                  <strong>Decoupled Renames:</strong> The final rename commit is left to the calling engines (like <code>revalidating</code> or <code>generating-isg</code>), which use atomic OS rename calls to overwrite the active cache with zero downtime.
                </li>
              </ol>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full code of <code>generate-static-rsc.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{RSC_BUILDER_CODE}</CodeBlock>
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
