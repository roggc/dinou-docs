"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { FileCode, Globe, HardDrive, ShieldCheck } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "engine-flow", title: "📊 HTML Generation Flow", level: 2 },
  { id: "double-buffer", title: "⚡ Stale Safety & Double-Buffer Builds", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const HTML_BUILDER_DIAGRAM = `                  generateStaticPage(reqPath)
                             │
                             ▼
                [Create Temp File Path] ──► index.html.[timestamp].tmp
                             │
                             ▼
                [Inject Mock Context] ──► Mock req/res context
                             │
                             ▼
             [1. renderAppToHtml(mockRes)] ──► Renders page component stream
                             │
                             ▼
            [2. processMetadata(effects)] ──► Resolves side-effect cookies/redirects
                             │
                             ▼
                [Pipe HTML to Temp File] ──► Writes to disk cache
                             │
                             ▼
                [3. Write metadata.json] ──► Stores generatedAt, tags, revalidate
                             │
                             ▼
                [Return verification object]
                { success, tempPath, finalPath, status }`;

const HTML_BUILDER_CODE = `const path = require("path");
const { mkdirSync, createWriteStream, existsSync } = require("fs");
const fs = require("fs").promises;
const renderAppToHtml = require("./render-app-to-html.js");
const { getStaticMetadata } = require("./build-static-pages.js");
const { processMetadata } = require("./get-ssg-metadata.js");

const OUT_DIR = path.resolve("dist2");

async function generateStaticPage(reqPath) {
  const finalReqPath = reqPath.endsWith("/") ? reqPath : reqPath + "/";
  const htmlPath = path.join(OUT_DIR, finalReqPath, "index.html");
  // 1. Double-buffer file generation
  const tempHtmlPath = path.join(OUT_DIR, finalReqPath, \`index.html.\${Date.now()}-\\${Math.random()}.tmp\`);

  const query = {};
  const paramsString = JSON.stringify(query);
  const capturedStatus = {};

  const contextForChild = {
    req: {
      query,
      cookies: {},
      headers: {
        "user-agent": "Dinou-ISR-Revalidator",
        host: "localhost",
        "x-forwarded-proto": "http",
      },
      path: finalReqPath,
      method: "GET",
    },
  };

  try {
    mkdirSync(path.dirname(htmlPath), { recursive: true });
    const fileStream = createWriteStream(tempHtmlPath);
    let htmlStream = null;

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
        capturedStatus.value = code;
      },
      setHeader: () => {},
      clearCookie: () => {},
      redirect: () => {},
    };

    // 2. Render App to readable HTML Stream
    htmlStream = renderAppToHtml(
      finalReqPath,
      paramsString,
      contextForChild,
      mockRes,
      capturedStatus
    );

    // 3. Process dynamic compile side-effects (cookies, redirects)
    const metadata = getStaticMetadata(finalReqPath);
    let sideEffectScripts = "";
    if (metadata && metadata.effects) {
      sideEffectScripts = processMetadata(metadata.effects);
    }

    // 4. Pipe to temporary build path
    await new Promise((resolve, reject) => {
      if (sideEffectScripts) fileStream.write(sideEffectScripts);
      htmlStream.pipe(fileStream, { end: false });
      htmlStream.on("end", () => {
        if (!fileStream.writableEnded) fileStream.end();
        resolve();
      });
      htmlStream.on("error", (err) => {
        fileStream.end();
        if (err.code === "ERR_STREAM_WRITE_AFTER_END") resolve();
        else reject(err);
      });
      fileStream.on("error", reject);
    });

    // 5. Commit route metadata file detailing caching and tags
    if (metadata) {
      const metadataPath = path.join(OUT_DIR, finalReqPath, "metadata.json");
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

    const status = capturedStatus.value || 200;
    const success = status !== 500;

    return {
      success,
      type: "html",
      reqPath: finalReqPath,
      tempPath: tempHtmlPath,
      finalPath: htmlPath,
      status: status,
    };
  } catch (error) {
    await fs.unlink(tempHtmlPath).catch(() => {});
    return { success: false, tempPath: tempHtmlPath };
  }
}

module.exports = generateStaticPage;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                HTML Builder (generate-static-page.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine single-route HTML generation, side-effect script injection, and metadata cache parameters.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/generate-static-page.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In Incremental Static Regeneration (ISR) and Dynamic Pre-rendering (ISG), we need to refresh the HTML file on demand. The <code>generate-static-page.js</code> module compiles a single route to HTML using <code>renderAppToHtml()</code>, extracts side-effects, writes <code>index.html</code>, and writes <code>metadata.json</code>.
              </p>
            </section>

            <hr className="my-8" />

            {/* HTML GENERATION FLOW */}
            <section id="engine-flow">
              <h2>📊 HTML Generation Flow</h2>
              <p>
                The flowchart below shows how routes are compiled to HTML in the single-page builder:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{HTML_BUILDER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* DOUBLE BUFFER */}
            <section id="double-buffer">
              <h2>⚡ Stale Safety & Double-Buffer Builds</h2>
              <p>
                To avoid serving corrupt or partially written files to visitors:
              </p>
              <ul>
                <li>
                  <strong>Double-Buffering:</strong> Renders and writes the page to a temporary <code>.tmp</code> file path.
                </li>
                <li>
                  <strong>Atomic Swaps:</strong> Calling engines use <code>safeRename()</code> to overwrite the active <code>index.html</code> instantaneously once writing completes.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full code of <code>generate-static-page.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{HTML_BUILDER_CODE}</CodeBlock>
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
