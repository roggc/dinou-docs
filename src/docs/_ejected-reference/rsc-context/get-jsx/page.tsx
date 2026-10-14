"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { FileText, Cpu, Layout, HelpCircle } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "resolution-flow", title: "📊 RSC Resolution Pipeline", level: 2 },
  { id: "page-functions", title: "⚙️ Page Functions & getProps", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const GET_JSX_DIAGRAM = `graph TD
    Start[getJSX reqPath, query] --> PathCheck{Look for page.* in path}
    PathCheck -->|Found| Found[Import pageModule]
    PathCheck -->|Not Found| Resolve[getFilePathAndDynamicParams to locate nearest page]
    Resolve --> Found
    Found --> CheckFuncs{Check page_functions}
    CheckFuncs -->|Exists| RunProps[Executes getProps server helper]
    CheckFuncs -->|None| CreatePage[Create React Page Element with props]
    RunProps --> CreatePage
    CreatePage --> WrapLayouts[Wrap with parent layouts recursively]
    WrapLayouts --> CheckSlots[Check parallel slots and isolate errors]`;

const GET_JSX_CODE = `const path = require("path");
const { existsSync } = require("./vfs");
const React = require("react");
const { getFilePathAndDynamicParams } = require("./get-file-path-and-dynamic-params");
const importModule = require("./import-module");
const { asyncRenderJSXToClientJSX } = require("./render-jsx-to-client-jsx");

async function getJSX(
  reqPath,
  query,
  isNotFound = null,
  isDevelopment = false,
  forceNotFound = false,
) {
  const srcFolder = path.resolve(process.cwd(), "src");
  const reqSegments = reqPath.split("/").filter(Boolean);

  let pagePath;
  // 1. Resolve path segments to find physical files
  const [filePath, dParams] = getFilePathAndDynamicParams(
    reqSegments,
    query,
    srcFolder,
  );
  pagePath = filePath;
  let dynamicParams = dParams ?? {};

  let jsx;
  let pageFunctionsProps;

  // 2. Handle 404 - Not Found files fallback routing
  if (!pagePath || forceNotFound) {
    if (isNotFound) isNotFound.value = true;
    const [notFoundPath, dParams] = getFilePathAndDynamicParams(
      reqSegments,
      query,
      srcFolder,
      "not_found",
      true,
      false,
    );
    if (!notFoundPath) {
      jsx = React.createElement("div", null, \`Page not found: no "page" file found for "\${reqPath}"\`);
    } else {
      const pageModule = await importModule(notFoundPath);
      const Page = pageModule.default ?? pageModule;
      let props = { params: dParams ?? {} };
      const notFoundDir = path.dirname(notFoundPath);

      // Check if page_functions.js contains server getProps() hooks for 404
      const [pageFunctionsPath] = getFilePathAndDynamicParams(
        reqSegments,
        query,
        notFoundDir,
        "page_functions",
        true,
        true,
        undefined,
        reqSegments.length,
      );
      if (pageFunctionsPath) {
        const pageFunctionsModule = await importModule(pageFunctionsPath);
        const getProps = pageFunctionsModule.getProps;
        pageFunctionsProps = await getProps?.(dParams ?? {});
        props = { ...props, ...(pageFunctionsProps?.page ?? {}) };
      }

      jsx = React.createElement(Page, props);
    }
  } else {
    // 3. Resolve active route page component
    if (isNotFound) isNotFound.value = false;
    const pageModule = await importModule(pagePath);
    const Page = pageModule.default ?? pageModule;
    let props = { params: dynamicParams };

    const pageFolder = path.dirname(pagePath);
    const [pageFunctionsPath] = getFilePathAndDynamicParams(
      reqSegments,
      query,
      pageFolder,
      "page_functions",
      true,
      true,
      undefined,
      reqSegments.length,
    );
    if (pageFunctionsPath) {
      const pageFunctionsModule = await importModule(pageFunctionsPath);
      const getProps = pageFunctionsModule.getProps;
      pageFunctionsProps = await getProps?.(dynamicParams);
      props = { ...props, ...(pageFunctionsProps?.page ?? {}) };
    }

    jsx = React.createElement(Page, props);
  }

  // 4. Check for 'no_layout' boundary bypass
  if (
    getFilePathAndDynamicParams(
      reqSegments,
      query,
      srcFolder,
      "no_layout",
      false,
    )[0]
  ) {
    return jsx;
  }

  // 5. Wrap layout components recursively (Outer -> Inner)
  const layouts = getFilePathAndDynamicParams(
    reqSegments,
    query,
    srcFolder,
    "layout",
    true,
    false,
    undefined,
    0,
    {},
    true,
  );

  if (layouts && Array.isArray(layouts)) {
    let index = 0;
    for (const [layoutPath, dParams, slots] of layouts.reverse()) {
      const layoutModule = await importModule(layoutPath);
      const layoutFolderPath = path.dirname(layoutPath);
      const resetLayoutPath = getFilePathAndDynamicParams(
        [],
        {},
        layoutFolderPath,
        "reset_layout",
        false,
      )[0];
      const Layout = layoutModule.default ?? layoutModule;
      const updatedSlots = {};

      // 6. Map and try-catch render parallel slots in layouts
      for (const [slotName, slotElement] of Object.entries(slots)) {
        let updatedSlotElement;
        try {
          await asyncRenderJSXToClientJSX(slotElement);
          updatedSlotElement = slotElement;
        } catch (e) {
          const slotFilePath = slotElement.props?.__modulePath;
          if (slotFilePath) {
            const realSlotFolder = path.dirname(slotFilePath);
            const [slotErrorPath, slotErrorParams] = getFilePathAndDynamicParams(
              reqSegments,
              query,
              realSlotFolder,
              "error",
              true,
              true,
              undefined,
              reqSegments.length,
            );

            if (slotErrorPath) {
              const slotErrorModule = await importModule(slotErrorPath);
              const SlotError = slotErrorModule.default ?? slotErrorModule;
              updatedSlotElement = React.createElement(SlotError, {
                params: slotErrorParams,
                key: slotName,
                error: { message: e.message || "Unknown Slot Error", name: e.name },
              });
            } else {
              updatedSlotElement = null;
            }
          } else {
            updatedSlotElement = null;
          }
        } finally {
          updatedSlots[slotName] = updatedSlotElement;
        }
      }

      let props = { params: dParams, ...updatedSlots };
      if (index === layouts.length - 1 || resetLayoutPath) {
        props = { ...props, ...(pageFunctionsProps?.layout ?? {}) };
      }
      jsx = React.createElement(Layout, props, jsx);
      if (resetLayoutPath) {
        break;
      }
      index++;
    }
  }

  return jsx;
}

module.exports = getJSX;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                RSC Tree Builder (get-jsx.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand how pages are crawled, how data dependencies are fetched via page functions, and how layout wrappers are mounted recursively.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/get-jsx.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In standard frameworks, a router only matches paths to a single file. In Dinou, <code>get-jsx.js</code> is the central compiler entrypoint that resolves the entire React Server Component (RSC) tree for a request. It handles file lookup, triggers Server-side data fetching via page functions, wraps the page inside parent layouts, and configures fallback routes.
              </p>
            </section>

            <hr className="my-8" />

            {/* RESOLUTION FLOW */}
            <section id="resolution-flow">
              <h2>📊 RSC Resolution Pipeline</h2>
              <p>
                The flowchart below shows how routes are compiled to Server elements:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{GET_JSX_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* PAGE FUNCTIONS */}
            <section id="page-functions">
              <h2>⚙️ Page Functions & getProps</h2>
              <p>
                To load dynamic data on the server, Dinou supports adjacent data helpers inside <code>page_functions.js</code>. The loader executes these hooks:
              </p>
              <ul>
                <li>
                  <strong>Server Data Loader:</strong> When a route resolves, <code>get-jsx.js</code> searches for <code>page_functions.js</code>, imports it, and runs <code>getProps(params)</code>.
                </li>
                <li>
                  <strong>Props Injection:</strong> Merges the output data properties (e.g. <code>page</code> and <code>layout</code> props) into the component, enabling data hydration before rendering.
                </li>
                <li>
                  <strong>Layout Nesting & Reset:</strong> Walks directory segments upwards, nesting layouts recursively. If a layout folder contains <code>reset_layout</code>, layout nesting halts.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>get-jsx.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{GET_JSX_CODE}</CodeBlock>
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
