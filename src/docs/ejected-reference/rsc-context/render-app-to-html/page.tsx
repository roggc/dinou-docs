"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Hammer, Server, Cpu, ArrowRightLeft } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "render-flow", title: "📊 HTML Renderer Sequence", level: 2 },
  { id: "ipc-channel", title: "⚡ Child IPC & Streaming Scripts", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const RENDER_APP_DIAGRAM = `graph TD
    Start[renderAppToHtml reqPath, res] --> CacheCheck{Verify if static RSC exists in dist2/}
    CacheCheck -->|Exists| ReadStatic[Read rsc.rsc from disk]
    CacheCheck -->|No| DynamicRender[Run getJSX in parent process]
    ReadStatic --> PipeChild[Pipe RSC payload to child stdin]
    DynamicRender --> PipeChild
    PipeChild --> ForkChild[fork render-html.js child worker]
    ForkChild --> IPC[Listen to child IPC events]
    IPC -->|DINOU_CONTEXT_COMMAND| HeadersCheck{Headers already sent?}
    HeadersCheck -->|No| ExpressAPI[Apply to res: cookie, status, setHeader]
    HeadersCheck -->|Yes| JSInject[Inject inline script tags in output HTML stream]
    ForkChild --> Output[Pipe child.stdout directly to Browser client]`;

const RENDER_APP_CODE = `const path = require("path");
const { fork } = require("child_process");
const url = require("url");
const fs = require("fs");
const getJSX = require("./get-jsx.js");
const { requestStorage } = require("./request-context.js");

const isDevelopment = process.env.NODE_ENV !== "production";
const isWebpack = process.env.DINOU_BUILD_TOOL === "webpack";

const { renderToPipeableStream } = isWebpack
  ? require("react-server-dom-webpack/server")
  : require("@roggc/react-server-dom-esm/server");

const manifestPath = path.resolve(
  process.cwd(),
  isWebpack
    ? (isDevelopment ? "public/react-client-manifest.json" : "dist3/react-client-manifest.json")
    : "react_client_manifest/react-client-manifest.json"
);

let cachedManifest = null;
function getManifest() {
  if (!isDevelopment && cachedManifest) return cachedManifest;
  try {
    const content = fs.readFileSync(manifestPath, "utf8");
    const parsed = JSON.parse(content);
    if (parsed && Object.keys(parsed).length > 0) {
      cachedManifest = parsed;
    }
    return cachedManifest || parsed;
  } catch (e) {
    return {};
  }
}

const registerLoaderPath = url.pathToFileURL(path.join(__dirname, "register-loader.mjs")).href;
const renderHtmlPath = path.resolve(__dirname, "render-html.js");
const childExecArgv = [].concat(\`--import=\${registerLoaderPath}\`);

const { resolveRelativeUrl } = require("./url-resolver");

function createParentResponseWrapper(reqPath, res, child) {
  let hasRedirected = false;
  const safeRedirect = (targetUrl) => {
    if (hasRedirected) return;
    hasRedirected = true;
    const resolvedUrl = resolveRelativeUrl(targetUrl, reqPath);
    let finalUrl = resolvedUrl.startsWith("/") && !resolvedUrl.startsWith("//") ? resolvedUrl : "/";

    if (res.headersSent) {
      res.write(\`<script>window.location.href = \${JSON.stringify(finalUrl)};</script>\`);
      res.end();
      child.stdout.unpipe(res);
      child.kill();
    } else {
      res.redirect(302, finalUrl);
      child.stdout.unpipe(res);
      child.kill();
    }
  };

  return {
    setHeader: (name, value) => {
      if (!res.headersSent) res.setHeader(name, value);
    },
    cookie: (name, value, options) => {
      if (res.headersSent) {
        if (options && options.httpOnly) return; // Cannot write HttpOnly in browser JS
        let cookieStr = \`\${name}=\${encodeURIComponent(value)}\`;
        if (options) {
          if (options.path) cookieStr += \`; path=\${options.path}\`;
          if (options.maxAge) cookieStr += \`; max-age=\${options.maxAge}\`;
          if (options.secure) cookieStr += \`; secure\`;
        }
        res.write(\`<script>document.cookie = \${JSON.stringify(cookieStr)};</script>\`);
      } else {
        res.cookie(name, value, options);
      }
    },
    clearCookie: (name, options) => {
      if (res.headersSent) {
        let cookieStr = \`\${name}=; Max-Age=0; path=\${options?.path || "/"};\`;
        res.write(\`<script>document.cookie = \${JSON.stringify(cookieStr)};</script>\`);
      } else {
        res.clearCookie(name, options);
      }
    },
    redirect: (arg1, arg2) => safeRedirect(arg2 || arg1),
    status: (code) => {
      if (!res.headersSent) res.status(code);
    },
  };
}

function renderAppToHtml(reqPath, paramsString, contextForChild, res, capturedStatus = null, isDynamic = false) {
  // 1. Fork render-html.js child worker process with ESM custom loader imports
  const child = fork(
    renderHtmlPath,
    [reqPath, paramsString, contextForChild ? JSON.stringify(contextForChild) : "{}", isDynamic ? "true" : "false"],
    {
      execArgv: childExecArgv,
      stdio: ["ignore", "pipe", "pipe", "ipc", "pipe"], // stdio[4] is the RSC stream pipe
    }
  );

  const query = JSON.parse(paramsString || "{}");
  const rscPath = path.resolve(process.cwd(), "dist2", reqPath.replace(/^\//, ""), "rsc.rsc");
  const hasStaticRsc = !isDynamic && fs.existsSync(rscPath);

  // 2. Fetch or Compile RSC elements and write them to child process stdio[4] channel
  if (hasStaticRsc) {
    child.stdio[4].write(fs.readFileSync(rscPath));
    child.stdio[4].end();
  } else {
    const parentRes = createParentResponseWrapper(reqPath, res, child);
    const context = { req: contextForChild ? contextForChild.req : {}, res: parentRes };
    requestStorage.run(context, () => {
      getJSX(reqPath, query, {}, isDevelopment)
        .then((jsx) => {
          const manifest = getManifest();
          const { pipe } = isWebpack
            ? renderToPipeableStream(jsx, manifest)
            : renderToPipeableStream(jsx, url.pathToFileURL(process.cwd()).href + "/");
          pipe(child.stdio[4]);
        })
        .catch(() => child.stdio[4].destroy());
    });
  }

  // 3. Listen to context proxy updates from child process
  child.on("message", (message) => {
    if (message && message.type === "DINOU_CONTEXT_COMMAND") {
      const { command, args } = message;
      if (res.headersSent) {
        // Late changes: inject inline JavaScript hacks in HTML output
        if (command === "redirect") {
          const rawUrl = args.length === 1 ? args[0] : args[1];
          const resolved = resolveRelativeUrl(rawUrl, reqPath);
          res.write(\`<script>window.location.href = \${JSON.stringify(resolved)};</script>\`);
          res.end();
          child.stdout.unpipe(res);
          child.kill();
        } else if (command === "cookie") {
          const [name, value, options] = args;
          if (options && options.httpOnly) return;
          let cookieStr = \`\${name}=\${encodeURIComponent(value)}\`;
          if (options?.path) cookieStr += \`; path=\${options.path}\`;
          res.write(\`<script>document.cookie = \${JSON.stringify(cookieStr)};</script>\`);
        }
      } else {
        // Normal Express header assignment
        if (typeof res[command] === "function") {
          res[command].apply(res, args);
        }
      }
    }
  });

  return child.stdout;
}

module.exports = renderAppToHtml;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Server className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                HTML App Renderer (render-app-to-html.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the server rendering orchestrator, parent-child fork tunnels, and late-header HTML script bypass injections.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/render-app-to-html.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Server-Side Rendering (SSR) needs to compile components into HTML and stream it to the client as fast as possible. In Dinou, <code>render-app-to-html.js</code> manages this process. It forks child worker processes to render pages, handles static payloads from disk, and maps inter-process (IPC) messages.
              </p>
            </section>

            <hr className="my-8" />

            {/* RENDER SEQUENCE */}
            <section id="render-flow">
              <h2>📊 HTML Renderer Sequence</h2>
              <p>
                The flowchart below traces parent-to-child data streams and Express process events:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{RENDER_APP_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* IPC AND STREAMING */}
            <section id="ipc-channel">
              <h2>⚡ Child IPC & Streaming Scripts</h2>
              <p>
                Streaming HTML chunks to the browser before completing the render cycle introduces a common framework problem: **late headers**. If a component deep inside the tree sets a cookie or triggers a redirect *after* Express has already sent the initial HTTP status and headers, normal HTTP header modification throws errors.
              </p>
              <p>
                Dinou solves this using **HTML Script-Injection Bypasses**:
              </p>
              <ul>
                <li>
                  <strong>Headers Not Sent:</strong> Executes standard Express cookie sets and redirect calls on the main thread.
                </li>
                <li>
                  <strong>Headers Sent:</strong> Injects inline script tags directly into the active HTML stream:
                  <div className="not-prose my-2 bg-muted/30 p-3 border rounded font-mono text-xs">
                    {`<script>document.cookie = "cookie_name=value; path=/";</script>
<script>window.location.href = "/login";</script>`}
                  </div>
                  These scripts run instantly on the browser upon parsing, simulating header redirections dynamically.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full code of <code>render-app-to-html.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{RENDER_APP_CODE}</CodeBlock>
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
