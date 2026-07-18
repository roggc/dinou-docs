"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Hammer, Cpu, Database, Compass, Eye, ShieldAlert } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "structure-diagram", title: "📊 Architecture Flow", level: 2 },
  { id: "bailout-proxy", title: "🛡️ 1. Dynamic Bailout Proxy", level: 2 },
  { id: "crawler-engine", title: "🔍 2. Directory Crawler & Route Collector", level: 2 },
  { id: "mock-context", title: "🎭 3. Mock Request & Response Context", level: 2 },
  { id: "page-builder", title: "🏗️ 4. Static Page Compiler", level: 2 },
];

const STATIC_CRAWLER_DIAGRAM = `               [npm run build] ──► Triggers buildStaticPages()
                                         │
                                         ▼
                     ┌──────────────────────────────────────┐
                     │            collectPages()            │
                     │  (Recursively crawls src/ routes)    │
                     └──────────────────┬───────────────────┘
                                        │
                                        ├─► Normal routes: e.g. /docs
                                        └─► Dynamic routes: calls getStaticPaths()
                                                │
                                                ▼
                     ┌──────────────────────────────────────┐
                     │          buildStaticPage()           │
                     │  (Mock-renders each path segment)    │
                     └──────────────────┬───────────────────┘
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
┌─────────────────────────┐                            ┌─────────────────────────┐
│  createBailoutProxy()   │                            │   AsyncLocalStorage     │
│ (Wraps headers/cookies) │                            │  (Injects mock Req/Res) │
└────────────┬────────────┘                            └────────────┬────────────┘
             │                                                      │
             ▼                                                      ▼
    [Access detected?]                                   [Evaluates Page Components]
             │                                                      │
             ├─► Yes ──► Bailout (Mark isStatic = false)            │
             └─► No  ──► Commit: rsc.rsc & index.html ◄─────────────┘`;

const BAILOUT_PROXY_CODE = `function createBailoutProxy(target, label, onBailout) {
  const safeTarget = target || {};

  return new Proxy(safeTarget, {
    get(t, prop, receiver) {
      // Ignore internal Node.js and Console debugging symbols
      if (
        typeof prop === "symbol" ||
        prop === "inspect" ||
        prop === "valueOf" ||
        prop === "toString"
      ) {
        return Reflect.get(t, prop, receiver);
      }

      // 🚨 ALARM: Dynamic access detected during static generation
      console.log(\`[StaticBailout] Access to \${label} detected: "\${String(prop)}".\`);
      
      // Execute callback to mark page compile state as dynamic
      onBailout();

      // Return the value from the original mock object
      return Reflect.get(t, prop, receiver);
    },

    ownKeys(t) {
      console.log(\`[StaticBailout] Iteration of \${label} detected.\`);
      onBailout();
      return Reflect.ownKeys(t);
    },

    has(t, prop) {
      console.log(\`[StaticBailout] Existence check (IN) in \${label}: "\${String(prop)}".\`);
      onBailout();
      return Reflect.has(t, prop);
    }
  });
}`;

const MOCK_CONTEXT_CODE = `// Mock Response matches the standard server middleware contract
const mockRes = {
  _statusCode: 200,
  _headers: {},
  _redirectUrl: null,
  _cookies: [],

  cookie(name, value, options) {
    this._cookies.push({ name, value, options, isClear: false });
  },

  clearCookie(name, options) {
    this._cookies.push({ name, value: "", options, isClear: true });
  },

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
    console.warn(\`⚠️ [SSG] Redirect detected in static compile -> \${url} (\${status})\`);
  }
};

// Spies throw flags when read during compilation
const cookiesProxy = createBailoutProxy({}, "Cookies", markAsDynamic);
const headersProxy = createBailoutProxy({}, "Headers", markAsDynamic);
const queryProxy = createBailoutProxy({}, "Query", markAsDynamic);

const mockReq = {
  query: queryProxy,
  cookies: cookiesProxy,
  headers: headersProxy,
  path: reqPath,
  method: "GET",
};

const mockContext = { req: mockReq, res: mockRes };`;

const PAGE_BUILDER_CODE = `async function buildStaticPage(reqPath, isDynamic = null) {
  const srcFolder = path.resolve(process.cwd(), "src");

  try {
    const segments = reqPath.split("/").filter(Boolean);
    let folderPath = srcFolder;
    let dynamicParams = {};

    // 1. Resolve physical path segments and extract dynamic parameters...
    // (Crawl directories, evaluate catch-alls, check config parameters)
    
    let isStatic = true;
    const markAsDynamic = () => {
      isStatic = false;
      if (isDynamic) isDynamic.value = true;
    };

    // 2. Set up context spies
    const mockContext = createMockContext(reqPath, markAsDynamic);

    // 3. Render inside Server AsyncLocalStorage Context
    await requestStorage.run(mockContext, async () => {
      const [pagePath, dParams] = getFilePathAndDynamicParams(
        segments,
        {},
        folderPath,
        "page",
        true,
        true,
        undefined,
        segments.length,
        dynamicParams
      );
      if (!pagePath) throw new Error(\`No page found for \${reqPath}\`);

      const pageModule = await importModule(pagePath);
      const Page = pageModule.default ?? pageModule;

      let props = { params: dParams };
      
      // Load static props if getProps() exists in page_functions.js
      const [pageFunctionsPath] = getFilePathAndDynamicParams(
        segments,
        {},
        folderPath,
        "page_functions",
        true,
        true
      );
      if (pageFunctionsPath) {
        const pageFuncs = await importModule(pageFunctionsPath);
        if (isDynamic && (isDynamic.value = pageFuncs.dynamic?.())) {
          return; // Early bailout if page is hard-configured as dynamic
        }
        const getProps = pageFuncs.getProps;
        const pageProps = await getProps?.(dParams);
        props = { ...props, ...(pageProps?.page ?? {}) };
      }

      // Render React Server Component (RSC) element tree
      const jsx = React.createElement(Page, props);
      
      // If no dynamic proxies were triggered, write the files!
      if (isStatic) {
        await generateStaticRSC(reqPath, jsx);
        await generateStaticPage(reqPath);
      }
    });
  } catch (err) {
    console.error(\`[SSG] Error compiling \${reqPath}:\`, err);
  }
}`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Hammer className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Static Crawler & Compiler (build-static-pages.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Crawl your codebase routes, inspect layout structures, mock client requests, and pre-compile static React Server Components.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/build-static-pages.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In a standard React Server Components architecture, static pages are compiled at build time to provide near-instant loading speeds. The <code>build-static-pages.js</code> script is Dinou's main compiler. It crawls the filesystem for page entry points, runs a mock render pass inside a simulated request context, and writes the output files (<code>index.html</code> and <code>rsc.rsc</code>) directly to the cache folder (<code>dist2/</code>).
              </p>
            </section>

            <hr className="my-8" />

            {/* ARCHITECTURE FLOW */}
            <section id="structure-diagram">
              <h2>📊 Architecture Flow</h2>
              <p>
                The diagram below demonstrates how pages are crawled, evaluated against dynamic proxies, and compiled:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{STATIC_CRAWLER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* DYNAMIC BAILOUT PROXY */}
            <section id="bailout-proxy">
              <h2>🛡️ 1. Dynamic Bailout Proxy</h2>
              <p>
                A page is considered <strong>static</strong> only if its output is identical for all users. If a component reads request-specific parameters (such as browser cookies or custom HTTP headers), the page must run dynamically on every request.
              </p>
              <p>
                Dinou accomplishes this using Javascript <code>Proxy</code> wrapper spies. When mock-rendering a page, the compiler injects proxies in place of <code>cookies()</code> and <code>headers()</code>. If any property is accessed during the render cycle, a bailout callback runs and marks the page compile state as dynamic:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{BAILOUT_PROXY_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CRAWLER ENGINE */}
            <section id="crawler-engine">
              <h2>🔍 2. Directory Crawler & Route Collector</h2>
              <p>
                When you compile the application, the <code>collectPages()</code> recursive method traverses your <code>src/</code> directory:
              </p>
              <ul>
                <li>
                  <strong>Static Folders & Route Groups:</strong> Skips parentheses directories (e.g. <code>(auth)</code>) when building the URL path but crawls their contents.
                </li>
                <li>
                  <strong>Dynamic Routes:</strong> If it encounters a dynamic folder (e.g. <code>[id]</code> or catch-all <code>[[...slug]]</code>), it imports the adjacent <code>page_functions.js</code> file, runs the <code>getStaticPaths()</code> API, and resolves all valid parameter combinations.
                </li>
                <li>
                  <strong>Gap Check:</strong> Evaluates catch-all parameter arrays to ensure there are no empty segments between active parameters, preventing malformed URLs.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* MOCK CONTEXT */}
            <section id="mock-context">
              <h2>🎭 3. Mock Request & Response Context</h2>
              <p>
                Since Server Components execute in a request container, Dinou mocks standard Express-like HTTP request and response structures before triggering the render.
              </p>
              <p>
                The mock objects fulfill the server contracts, allowing the page to execute safely and warn about potential compilation conflicts (such as triggering a HTTP redirect during a static build pass):
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{MOCK_CONTEXT_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* PAGE BUILDER */}
            <section id="page-builder">
              <h2>🏗️ 4. Static Page Compiler</h2>
              <p>
                The compilation of each individual route is encapsulated in <code>buildStaticPage()</code>. It resolves layout hierarchies, feeds props derived from <code>getProps()</code>, renders the component tree, and records the output if no bailout occurred:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PAGE_BUILDER_CODE}</CodeBlock>
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
