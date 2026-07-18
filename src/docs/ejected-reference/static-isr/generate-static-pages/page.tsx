"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Boxes, Globe, FileCode, Server } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "engine-flow", title: "📊 Pipeline Flow", level: 2 },
  { id: "bulk-vs-single", title: "🔄 Bulk Pipeline vs Single Page Compiler", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const PAGES_PIPELINE_DIAGRAM = `graph TD
    Start[generateStaticPages routes] --> LoopRoutes[For each route...]
    LoopRoutes --> MockCtx[Inject Mock Request & Response]
    MockCtx --> RenderApp[1. renderAppToHtml mockRes Renders page component stream]
    RenderApp --> ProcessMeta[2. processMetadata effects Resolves side-effect cookies/redirects]
    ProcessMeta --> WriteHTML[Pipe HTML to dist2/index.html]
    WriteHTML --> WriteMeta[3. Write dist2/metadata.json generatedAt, tags, revalidate]
    WriteMeta --> UpdateStatus[Update status-manifest]`;

const PAGES_PIPELINE_CODE = `// generate-static-pages.js
const path = require("path");
const { mkdirSync, createWriteStream } = require("fs");
const fs = require("fs").promises;
const renderAppToHtml = require("./render-app-to-html.js");
const { getStaticMetadata } = require("./build-static-pages.js");
const { processMetadata } = require("./get-ssg-metadata.js");
const { updateStatus } = require("./status-manifest.js");

const OUT_DIR = path.resolve("dist2");

async function generateStaticPages(routes) {
  // 1. Loop through all crawled route paths
  for (const route of routes) {
    const reqPath = route.endsWith("/") ? route : route + "/";
    const htmlPath = path.join(OUT_DIR, reqPath, "index.html");

    const query = {};
    const paramsString = JSON.stringify(query);
    const capturedStatus = {};
    const contextForChild = {
      req: {
        query,
        cookies: {},
        headers: {
          "user-agent": "Dinou-SSG-Builder",
          host: "localhost",
          "x-forwarded-proto": "http",
        },
        path: reqPath,
        method: "GET",
      },
    };

    try {
      mkdirSync(path.dirname(htmlPath), { recursive: true });
      const fileStream = createWriteStream(htmlPath);
      let htmlStream = null;

      // 2. Mock Response fulfilling Server-Side rendering contracts
      const mockRes = {
        headersSent: true,
        _cookies: [],
        cookie(name, value, options) {
          this._cookies.push({ name, value, options });
        },
        write: (chunk) => {
          if (!fileStream.writableEnded) fileStream.write(chunk);
        },
        end: (chunk) => {
          if (chunk && !fileStream.writableEnded) fileStream.write(chunk);
          if (htmlStream) htmlStream.unpipe(fileStream);
          if (!fileStream.writableEnded) fileStream.end();
        },
        status: (code) => {
          if (code !== 200) console.warn(\`[SSG] Status \${code} ignored for \${reqPath}\`);
          capturedStatus.value = code;
        },
        setHeader: () => {},
        clearCookie: () => {},
        redirect: () => {},
      };

      // 3. Render Component Tree to HTML readable Stream
      htmlStream = renderAppToHtml(
        reqPath,
        paramsString,
        contextForChild,
        mockRes,
        capturedStatus
      );

      // 4. Retrieve static compile metadata and extract cookie/redirect side-effects
      const metadata = getStaticMetadata(reqPath);
      let sideEffectScripts = "";
      if (metadata && metadata.effects) {
        sideEffectScripts = processMetadata(metadata.effects);
      }

      // 5. Pipe HTML components directly into output directory
      await new Promise((resolve, reject) => {
        if (sideEffectScripts) fileStream.write(sideEffectScripts);
        htmlStream.pipe(fileStream, { end: false });

        htmlStream.on("end", () => {
          if (!fileStream.writableEnded) fileStream.end();
          updateStatus(reqPath, capturedStatus.value);
          resolve();
        });

        htmlStream.on("error", (err) => {
          if (err.code === "ERR_STREAM_WRITE_AFTER_END") resolve();
          else reject(err);
        });

        fileStream.on("error", reject);
      });

      // 6. Write cache verification metadata file
      if (metadata) {
        const metadataPath = path.join(OUT_DIR, reqPath, "metadata.json");
        await fs.writeFile(
          metadataPath,
          JSON.stringify({
            revalidate: metadata.revalidate,
            generatedAt: Date.now(),
            effects: metadata.effects,
            tags: metadata.tags || [],
          }, null, 2),
          "utf8"
        );
      }

      console.log("✅ Generated HTML:", reqPath);
    } catch (error) {
      if (error.code === "ERR_STREAM_WRITE_AFTER_END") {
        console.log("⚠️ Ignored write-after-end race condition for:", reqPath);
      } else {
        console.error("❌ Error rendering:", reqPath);
      }
    }
  }

  console.log("🟢 Static page generation complete.");
}

module.exports = generateStaticPages;`;

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
                HTML Pipeline (generate-static-pages.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand build-time static HTML page generation for multiple routes, stream piping, and metadata serialization.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/generate-static-pages.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                During the static compilation build phase (<code>npm run build</code>), we need to output complete physical HTML pages for all crawled static directories. The <code>generate-static-pages.js</code> module manages this batch execution, piping rendering components to <code>index.html</code> inside <code>dist2/</code>.
              </p>
            </section>

            <hr className="my-8" />

            {/* PIPELINE FLOW */}
            <section id="engine-flow">
              <h2>📊 Pipeline Flow</h2>
              <p>
                The flowchart below shows how routes are processed through the bulk HTML generation pipeline:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{PAGES_PIPELINE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* BULK VS SINGLE */}
            <section id="bulk-vs-single">
              <h2>🔄 Bulk Pipeline vs Single Page Compiler</h2>
              <p>
                Unlike the single-page builder <code>generate-static-page.js</code> (which handles runtime ISR/ISG cache updates):
              </p>
              <ul>
                <li>
                  <strong>Direct Writes:</strong> Writes directly to final files on disk instead of writing to <code>.tmp</code> files first, since no user traffic hits the server during the build phase.
                </li>
                <li>
                  <strong>Status Manifest Invalidation:</strong> Updates the in-memory <code>status-manifest.js</code> map at compile-time to synchronise routing states for immediate post-build execution.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full code of <code>generate-static-pages.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PAGES_PIPELINE_CODE}</CodeBlock>
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
