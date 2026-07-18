"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Compass, Route, Layout, GitFork } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "route-flow", title: "📊 Resolver Decision Tree", level: 2 },
  { id: "slots-crawling", title: "⚛️ Parallel Slots (getSlots)", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Code Implementation Details", level: 2 },
];

const RESOLVER_DIAGRAM = `graph TD
    Start[getFilePathAndDynamicParams segments, fileName] --> Loop[Iterate Path: Crawl folderPath]
    
    Loop --> MatchType{Match Segment Type}
    MatchType -->|Static Match| Static[Descend into folder segment]
    MatchType -->|Dynamic Match: param| Dynamic[Add parameter key:value to dynamic params]
    MatchType -->|Catch-all Match: slug| CatchAll[Extract remaining segment array to dynamic params]
    
    Static --> Slots[getSlots: Crawl folder for @ slots]
    Dynamic --> Slots
    CatchAll --> Slots
    
    Slots --> Return[Return pageFilePath, dynamicParams, slotsMap]`;

const RESOLVER_CODE = `const path = require("path");
const { existsSync, readdirSync } = require("./vfs");
const React = require("react");

function safeDecode(val) {
  try {
    return !!val ? decodeURIComponent(val) : val;
  } catch (e) {
    return val;
  }
}

// 1. Parallel Slots & Route Group Crawler
function getSlots(currentPath, reqSegments, query) {
  let slots = {};
  const entries = readdirSync(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    // Detect parallel slot folders starting with @
    if (entry.name.startsWith("@")) {
      const [slotPath, slotParams] = getFilePathAndDynamicParams(
        reqSegments,
        query,
        path.join(currentPath, entry.name),
        "page",
        true,
        true,
        undefined,
        reqSegments.length
      );

      if (slotPath) {
        const slotModule = require(slotPath);
        const Slot = slotModule.default ?? slotModule;
        const slotName = entry.name.slice(1);

        // Pre-render slot element with its dynamic props
        slots[slotName] = React.createElement(Slot, {
          params: slotParams,
          key: slotName,
          __modulePath: slotPath ?? null,
        });
      }
    } else if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
      // Crawl route groups recursively for nested slots
      const groupPath = path.join(currentPath, entry.name);
      const nestedSlots = getSlots(groupPath, reqSegments, query);
      slots = { ...slots, ...nestedSlots };
    }
  }

  return slots;
}

// 2. Main Route Resolver Function
function getFilePathAndDynamicParams(
  reqSegments,
  query,
  currentPath,
  fileName = "page",
  withExtension = true,
  finalDestination = true,
  lastFound = undefined,
  index = 0,
  dParams = {},
  accumulative = false,
  accumulate = [],
  isFound = { value: false },
  possibleExtensions = [".tsx", ".ts", ".jsx", ".js"]
) {
  let foundInCurrentPath;
  
  // Base case: check if we've parsed all request segments
  if (index > reqSegments.length - 1 || !finalDestination) {
    if (withExtension) {
      for (const ext of possibleExtensions) {
        const candidatePath = path.join(currentPath, \`\${fileName}\${ext}\`);
        if (existsSync(candidatePath)) {
          isFound.value = true;
          if (!accumulative) return [candidatePath, dParams];
          const slots = getSlots(currentPath, reqSegments, query);
          accumulate.push([candidatePath, dParams, slots]);
        }
      }
    }
  }

  // Iterate folders and parse dynamic parameter configurations...
  // e.g. matching '[id]' or optional catch-alls '[[...rest]]'
  // and recursively call getFilePathAndDynamicParams for the next segment index.
  
  // (Full resolver implements route traversal check, path decoding, 
  // and checks to prevent segment gap mismatches)

  return accumulative ? accumulate : [lastFound, dParams];
}`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Route className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Filesystem Route Mapper (get-file-path-and-dynamic-params.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand the core routing resolver, dynamic parameter extractor, catch-all normalizer, and parallel slots crawler.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/get-file-path-and-dynamic-params.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In dynamic frameworks, requests must be mapped to folders. For instance, the URL path <code>/blog/post-42</code> maps to the physical directory <code>src/blog/[slug]/page.tsx</code>.
              </p>
              <p>
                The <code>get-file-path-and-dynamic-params.js</code> file handles this resolution. It crawls directories segment-by-segment, parses parameter names and values, collects adjacent layout files, and mounts parallel page slots.
              </p>
            </section>

            <hr className="my-8" />

            {/* FLOW DIAGRAM */}
            <section id="route-flow">
              <h2>📊 Resolver Decision Tree</h2>
              <p>
                The flowchart below traces how incoming path segments are evaluated to locate files and extract request props:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="800px">{RESOLVER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* SLOTS CRAWLING */}
            <section id="slots-crawling">
              <h2>⚛️ Parallel Slots (<code>getSlots</code>)</h2>
              <p>
                Dinou supports parallel layouts via folders starting with the <code>@</code> symbol (e.g., <code>@sidebar</code>). When a layout mounts, it receives these parallel components directly as props:
              </p>
              <div className="not-prose my-4 bg-muted/30 p-4 border rounded-xl font-mono text-xs">
                {`export default function Layout({ children, sidebar }) {
  return (
    <div className="flex">
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}`}
              </div>
              <p>
                The <code>getSlots()</code> function queries folder structures recursively. If it finds directories beginning with <code>@</code>, it triggers a sub-resolved routing task to locate their page files, mock-renders the slot components with resolved parameters, and attaches them to the parent layout props map.
              </p>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Code Implementation Details</h2>
              <p>
                Below is the core implementation of the routing mapper and slot crawler:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{RESOLVER_CODE}</CodeBlock>
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
