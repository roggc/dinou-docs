"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { PackageOpen, Compass, Layers } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "manifest-flow", title: "📊 Manifest Lookup Flow", level: 2 },
  { id: "caching-hashing", title: "⚡ Asset Cache Invalidation", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Code Walkthrough", level: 2 },
];

const MANIFEST_FLOW_DIAGRAM = `graph TD
    Start[getAssetFromManifest name] --> EnvCheck{Verify Environment state}
    
    EnvCheck -->|Production| Prod[Read dist3/manifest.json & save in manifest cache]
    EnvCheck -->|Development| DevCheck{Check process.env.DINOU_BUILD_TOOL}
    
    DevCheck -->|webpack| ReadWeb[Read public/manifest.json]
    DevCheck -->|other| Bypass[Bypass / Use name as-is]
    
    Prod --> MapAsset[Extract asset mapped path e.g. main.js to main-1a2b3c4d.js]
    ReadWeb --> MapAsset
    Bypass --> MapAsset
    
    MapAsset --> Return[Return / + hashed_filename]`;

const ASSET_RESOLVER_CODE = `const fs = require("fs");
const path = require("path");

let manifest = {};
let read = false;
const isWebpack = process.env.DINOU_BUILD_TOOL === "webpack";

function getAssetFromManifest(name) {
  // 1. Production Mode: Read compiled assets from production output folder (dist3/)
  if (process.env.NODE_ENV === "production" && !read) {
    const manifestPath = path.resolve(process.cwd(), "dist3/manifest.json");
    if (fs.existsSync(manifestPath)) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      read = true; // Set lock to avoid read overhead on future lookups
    }
  // 2. Development Mode: If using Webpack, read from the public dev directory
  } else if (isWebpack && !read) {
    const manifestPath = path.resolve(process.cwd(), "public/manifest.json");
    if (fs.existsSync(manifestPath)) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      read = true;
    }
  }
  
  // 3. Resolve path and prepend root slash. Fall back to raw name if missing.
  return "/" + (manifest[name] || name);
}

module.exports = getAssetFromManifest;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <PackageOpen className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Asset Manifest Loader (get-asset-from-manifest.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand compiled bundle mappings, production build hash resolutions, and development bundler fallbacks.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/get-asset-from-manifest.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                To optimize loading speeds, web browsers cache static files aggressively. If you publish updates to a JavaScript file without changing its name (e.g. <code>main.js</code>), returning visitors may execute outdated code cached in their browser.
              </p>
              <p>
                Dinou solves this by appending short hashes representing content states to compiled file names (e.g., <code>main.js</code> maps to <code>main-f823e10d.js</code>). The <code>get-asset-from-manifest.js</code> utility resolves these dynamically generated filenames during HTML renders.
              </p>
            </section>

            <hr className="my-8" />

            {/* FLOW DIAGRAM */}
            <section id="manifest-flow">
              <h2>📊 Manifest Lookup Flow</h2>
              <p>
                The chart below traces how assets are resolved based on the environment:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{MANIFEST_FLOW_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CACHING AND HASHING */}
            <section id="caching-hashing">
              <h2>⚡ Asset Cache Invalidation</h2>
              <p>
                When you compile your application via <code>npm run build</code>, the compiler groups entries and outputs a JSON lookup file (<code>manifest.json</code>):
              </p>
              <div className="not-prose my-4 bg-muted/30 p-4 border rounded-xl font-mono text-xs text-slate-700 dark:text-slate-300">
                {`{
  "main.js": "main-5d82ef89.js",
  "client.js": "client-9c12b7a3.js",
  "styles.css": "styles-a82f321d.css"
}`}
              </div>
              <p>
                During Server-Side Rendering (SSR), when the HTML compiler constructs reference scripts:
              </p>
              <div className="not-prose my-4 bg-muted/30 p-4 border rounded-xl font-mono text-xs">
                {`// Instead of rendering a static script URL:
const scriptSrc = "/main.js";

// Dinou resolves it dynamically:
const scriptSrc = getAssetFromManifest("main.js"); // Returns "/main-5d82ef89.js"`}
              </div>
              <p>
                This ensures the browser downloads the new asset immediately when compilation states change, preventing client-side cache bugs.
              </p>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>get-asset-from-manifest.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{ASSET_RESOLVER_CODE}</CodeBlock>
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
