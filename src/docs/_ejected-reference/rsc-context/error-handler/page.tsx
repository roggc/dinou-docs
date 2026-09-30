"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { ShieldAlert, HelpCircle, GitMerge } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "error-flow", title: "📊 Error Resolution Pipeline", level: 2 },
  { id: "slot-isolation", title: "⚛️ Parallel Slots Isolation", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Code Implementation Details", level: 2 },
];

const ERROR_DIAGRAM = `graph TD
    Start[getErrorJSX reqPath, error] --> FindError{Look for error.tsx on path?}
    
    FindError -->|Found pagePath| ImportPage[Import pageModule & Create React Element]
    FindError -->|Not Found| LocateParent[getFilePathAndDynamicParams to locate parent error page]
    LocateParent --> ImportPage
    
    ImportPage --> CheckLayouts[Check layouts recursively]
    CheckLayouts --> CheckSlots[Check parallel layout slots]
    
    CheckSlots -->|Slot resolves OK| Proceed[Proceed with render]
    CheckSlots -->|Slot rendering fails| SlotError[Retrieve slot __modulePath<br/>& Locate error.tsx in slot folder<br/>& Mount fallback element]`;

const ERROR_CODE = `const path = require("path");
const { existsSync } = require("./vfs");
const React = require("react");
const { getFilePathAndDynamicParams } = require("./get-file-path-and-dynamic-params");
const importModule = require("./import-module");
const { asyncRenderJSXToClientJSX } = require("./render-jsx-to-client-jsx");

async function getErrorJSX(reqPath, query, error, isDevelopment = false) {
  const srcFolder = path.resolve(process.cwd(), "src");
  const reqSegments = reqPath.split("/").filter(Boolean);

  let pagePath;
  // 1. Search for error.tsx in directory segments
  const [filePath, dParams] = getFilePathAndDynamicParams(
    reqSegments,
    query,
    srcFolder,
    "error"
  );
  pagePath = filePath;
  let dynamicParams = dParams ?? {};

  if (pagePath) {
    const pageModule = await importModule(pagePath);
    const Page = pageModule.default ?? pageModule;
    let jsx = React.createElement(Page, {
      params: dynamicParams ?? {},
      error,
    });

    // 2. Crawl parent layouts to wrap the error page
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
      true
    );

    if (layouts && Array.isArray(layouts)) {
      for (const [layoutPath, dParams, slots] of layouts.reverse()) {
        const layoutModule = await importModule(layoutPath);
        const Layout = layoutModule.default ?? layoutModule;
        const updatedSlots = {};

        // 3. Parallel Slot Error Isolation
        for (const [slotName, slotElement] of Object.entries(slots)) {
          let updatedSlotElement;
          try {
            // Test render slot element
            await asyncRenderJSXToClientJSX(slotElement);
            updatedSlotElement = slotElement;
          } catch (e) {
            // If slot element rendering fails, resolve its path via __modulePath
            const slotFilePath = slotElement.props?.__modulePath;
            if (slotFilePath) {
              const realSlotFolder = path.dirname(slotFilePath);
              // Locate error.tsx inside the slot folder
              const [slotErrorPath, slotErrorParams] = getFilePathAndDynamicParams(
                reqSegments,
                query,
                realSlotFolder,
                "error",
                true,
                true,
                undefined,
                reqSegments.length
              );

              if (slotErrorPath) {
                const slotErrorModule = await importModule(slotErrorPath);
                const SlotError = slotErrorModule.default ?? slotErrorModule;
                updatedSlotElement = React.createElement(SlotError, {
                  params: slotErrorParams,
                  key: slotName,
                  error: { message: e.message || "Unknown Slot Error" },
                });
              } else {
                updatedSlotElement = null; // Fallback if no slot error boundary
              }
            } else {
              updatedSlotElement = null;
            }
          } finally {
            updatedSlots[slotName] = updatedSlotElement;
          }
        }

        jsx = React.createElement(Layout, { params: dParams, ...updatedSlots }, jsx);
      }
    }
    return jsx;
  }
  return null;
}

module.exports = { getErrorJSX };`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Error Boundaries Handler (get-error-jsx.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the layout-aware error bounds resolver, dynamic boundary cascades, and parallel slot crash isolations.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/get-error-jsx.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                When a Server Component crashes during runtime, displaying a blank screen or a default server exception is a bad user experience. Dinou implements a directory-crawling error boundary system: if a page crashes, the framework searches for the nearest <code>error.tsx</code> file to display a fallback interface.
              </p>
              <p>
                The <code>get-error-jsx.js</code> utility resolves these fallbacks. It locates error boundaries, wraps them inside parent layouts, and isolates component failures.
              </p>
            </section>

            <hr className="my-8" />

            {/* ERROR RESOLUTION PIPELINE */}
            <section id="error-flow">
              <h2>📊 Error Resolution Pipeline</h2>
              <p>
                The flowchart below traces layout wrapping and slot-level exception handling:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{ERROR_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* SLOT ISOLATION */}
            <section id="slot-isolation">
              <h2>⚛️ Parallel Slots Isolation</h2>
              <p>
                A key feature of the handler is <strong>Parallel Slot Crash Isolation</strong>. In complex dashboards, a page might render multiple slots in parallel (e.g. <code>@sidebar</code> and <code>@feed</code>):
              </p>
              <ul>
                <li>
                  <strong>Slot-Level Try/Catch:</strong> The handler renders each slot in a separate try/catch block. If the feed component crashes (e.g. due to an API timeout), the sidebar and layout render uninterrupted.
                </li>
                <li>
                  <strong>Locating Slot Boundaries:</strong> By reading <code>slotElement.props.__modulePath</code>, the handler resolves the slot's directory and searches for a slot-specific <code>error.tsx</code>.
                </li>
                <li>
                  <strong>Targeted Fallbacks:</strong> Replaces the crashed slot with its local error fallback component, preserving the rest of the layout.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Code Implementation Details</h2>
              <p>
                Below is the core implementation of the slot-level boundary handler inside <code>get-error-jsx.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{ERROR_CODE}</CodeBlock>
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
