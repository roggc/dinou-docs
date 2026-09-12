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
  { id: "page-builder", title: "🏗️ 4. Static Route Resolver", level: 2 },
  { id: "calling-modules", title: "🎯 Integration & Calling Modules", level: 2 },
];

const BULK_DIAGRAM = `graph TD
    Start["production startup / buildStaticPages()"] --> Collect["collectPages():<br/>Recursively crawls src/ routes"]
    Collect --> Normal["Normal routes"]
    Collect --> Dynamic["Dynamic parameter routes:<br/>getStaticPaths()"]
    Normal & Dynamic --> RenderBulk["Mock-renders page segments"]
    RenderBulk --> ProxyCheck["createBailoutProxy():<br/>Checks for headers, cookies, query access"]
    ProxyCheck --> AccessCheck{"Dynamic access detected?"}
    AccessCheck -->|"Yes"| SSR["Bailout:<br/>Skip file generation (Runtime SSR)"]
    AccessCheck -->|"No"| RegisterBulk["Success:<br/>Register staticRoutes & staticMetadata"]`;

const RUNTIME_DIAGRAM = `graph TD
    StartSingle["Runtime Request / buildStaticPage(reqPath)"] --> RenderSingle["Mock-renders page segment"]
    RenderSingle --> ProxyCheckSingle["createBailoutProxy():<br/>Checks for headers, cookies, query access"]
    ProxyCheckSingle --> AccessCheckSingle{"Dynamic access detected?"}
    AccessCheckSingle -->|"Yes"| SSRSingle["Bailout:<br/>Mark route as dynamic"]
    AccessCheckSingle -->|"No"| RegisterSingle["Success:<br/>Update staticMetadata for route"]`;

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
      
      if (!isStatic) {
        if (isDynamic) isDynamic.value = true;
        return;
      }

      staticRoutes.add(reqPath);
      staticMetadata.set(reqPath, {
        revalidate: revalidate?.(),
        effects: { redirect: mockRes._redirectUrl, cookies: mockRes._cookies },
        tags: cacheTags,
      });
    });
  } catch (err) {
    console.error(\`[SSG] Error evaluating \${reqPath}:\`, err);
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
                Static Crawler & Resolver (build-static-pages.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Crawl your codebase routes, inspect layout structures, mock client requests, and resolve static route configurations.
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
                In Dinou's architecture, static pages are evaluated and pre-rendered at server startup to provide near-instant loading speeds. The <code>build-static-pages.js</code> script acts as the central router crawler and static route evaluator. It traverses the filesystem to find page entry points, runs a mock render pass inside a simulated request context to detect if the page performs dynamic checks (which would cause a bailout), and registers the route and its metadata in-memory if no bailout occurs. This allows the caller orchestrator to trigger the actual RSC and HTML page compilation.
              </p>
            </section>

            <hr className="my-8" />

            {/* ARCHITECTURE FLOW */}
            <section id="structure-diagram">
              <h2>📊 Architecture Flow</h2>
              <p>
                The diagrams below demonstrate how routes are crawled and registered in bulk at server startup, versus how single paths are resolved at runtime:
              </p>
              <h3 className="text-sm font-semibold mt-4 mb-2">1. Bulk Startup Pass (buildStaticPages)</h3>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="800px">{BULK_DIAGRAM}</CodeBlock>
              </div>
              <h3 className="text-sm font-semibold mt-6 mb-2">2. Runtime Single-Route Pass (buildStaticPage)</h3>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="800px">{RUNTIME_DIAGRAM}</CodeBlock>
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
                Dinou accomplishes this using Javascript <code>Proxy</code> wrapper spies. When mock-rendering a page, the evaluator injects proxies in place of <code>cookies()</code> and <code>headers()</code>. If any property is accessed during the render cycle, a bailout callback runs and marks the route as dynamic:
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
                During production server startup, the <code>collectPages()</code> recursive method traverses your <code>src/</code> directory:
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
              <h2>🏗️ 4. Static Route Resolver</h2>
              <p>
                The evaluation of each individual route is encapsulated in <code>buildStaticPage()</code>. It resolves layout hierarchies, feeds props derived from <code>getProps()</code>, renders the component tree, and records the output if no bailout occurred:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PAGE_BUILDER_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CALLING MODULES */}
            <section id="calling-modules">
              <h2>🎯 Integration & Calling Modules</h2>
              <p>
                Dinou isolates route evaluation from file generation. The modules in <code>build-static-pages.js</code> are imported and invoked by different orchestration engines depending on the lifecycle phase:
              </p>

              <h3 className="text-sm font-semibold mt-4 mb-2">1. buildStaticPages() — Bulk Startup Pass</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Called once by the main static builder entry point (<a href="/docs/ejected-reference/static-isr/generate-static"><code>generate-static.js</code></a>) during production server startup. It performs the initial directory crawl to discover all static routes (including parameters fetched from <code>getStaticPaths()</code>) and populates the in-memory route registry.
              </p>

              <h3 className="text-sm font-semibold mt-6 mb-2">2. buildStaticPage() — Runtime Single-Route Pass</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Invoked dynamically to evaluate a single route and check for dynamic proxy bailouts. It is called by three runtime engines:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 list-disc pl-6 space-y-1">
                <li>
                  <a href="/docs/ejected-reference/static-isr/revalidating"><strong><code>revalidating.js</code> (Background ISR):</strong></a> Checks if a stale cache page has become dynamic before writing its background revalidation.
                </li>
                <li>
                  <a href="/docs/ejected-reference/static-isr/generating-isg"><strong><code>generating-isg.js</code> (On-Demand ISG):</strong></a> Mock-renders dynamic parameter routes on their first request to verify if they can be cached statically.
                </li>
                <li>
                  <a href="/docs/ejected-reference/static-isr/cache-revalidate"><strong><code>cache-revalidate.js</code> (On-Demand Revalidation API):</strong></a> Evaluates the target path when forced to purge cache by a manual revalidation request.
                </li>
              </ul>
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
