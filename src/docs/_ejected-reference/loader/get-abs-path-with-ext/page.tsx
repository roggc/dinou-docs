"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Compass, Settings, GitFork, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "resolver-flow", title: "📊 Extension Resolution Flow", level: 2 },
  { id: "esm-rules", title: "⚡ Node ESM Resolver Challenges", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const RESOLVER_DIAGRAM = `%%{init: {'themeVariables': { 'fontSize': '20px' }}}%%
graph TD
    Start["getAbsPathWithExt(specifier)<br/>(Entry function call)"] --> AliasCheck{"Does it match tsconfig alias?<br/>(Check paths mapping)"}
    AliasCheck -->|"Yes"| ResolveAlias["Resolve Tsconfig Alias<br/>(Map alias path to absolute directory)"]
    AliasCheck -->|"No"| RelCheck{"Is relative path?<br/>(Starts with ./ or ../)"}
    
    RelCheck -->|"Yes"| ResolveRel["Resolve Relative Path<br/>(Relative to parentURL directory)"]
    RelCheck -->|"No"| ReturnEmpty["Return specifier as-is<br/>(External package / Bare import)"]

    ResolveAlias --> ExistCheck{"Does exact file exist?<br/>(fs.existsSync check)"}
    ResolveRel --> ExistCheck

    ExistCheck -->|"Yes"| ReturnPath["Return Absolute Path<br/>(Exact file found directly)"]
    ExistCheck -->|"No"| LoopExt["Probe File Extensions<br/>(Try: .js, .ts, .jsx, .tsx)"]
    LoopExt --> ExtExistCheck{"Found matched file?<br/>(Extension candidate exists)"}
    
    ExtExistCheck -->|"Yes"| ReturnPathWithExt["Return Path With Extension<br/>(Resolved candidate path)"]
    ExtExistCheck -->|"No"| TryIndex["Probe Directory Indexes<br/>(Try: /index.js, /index.tsx, etc.)"]
    TryIndex --> IndexExistCheck{"Found index file?<br/>(Index candidate exists)"}
    
    IndexExistCheck -->|"Yes"| ReturnIndexPath["Return Index File Path<br/>(Resolved folder index)"]
    IndexExistCheck -->|"No"| ReturnNull["Return null<br/>(Let default loader handle/crash)"]`;

const RESOLVER_CODE = `const fs = require("fs");
const path = require("path");
const { fileURLToPath, pathToFileURL } = require("url");

// 1. Read tsconfig/jsconfig to build map of alias configurations
function loadTsconfigAliases() {
  const cwd = process.cwd();
  const tsconfigPath = path.resolve(cwd, "tsconfig.json");
  const jsconfigPath = path.resolve(cwd, "jsconfig.json");
  const configFile = fs.existsSync(tsconfigPath)
    ? tsconfigPath
    : fs.existsSync(jsconfigPath)
    ? jsconfigPath
    : null;
    
  if (!configFile) return new Map();

  let config;
  try {
    config = JSON.parse(fs.readFileSync(configFile, "utf8"));
  } catch (err) {
    return new Map();
  }

  const paths = (config.compilerOptions && config.compilerOptions.paths) || {};
  const baseUrl = (config.compilerOptions && config.compilerOptions.baseUrl) || ".";
  const absoluteBase = path.resolve(cwd, baseUrl);
  const map = new Map();

  for (const key of Object.keys(paths)) {
    const targets = paths[key];
    if (!targets || !targets.length) continue;
    let target = Array.isArray(targets) ? targets[0] : targets;
    const keyIsWildcard = key.endsWith("/*");
    const targetIsWildcard = target.endsWith("/*");
    const alias = keyIsWildcard ? key.slice(0, -1) : key;
    const targetBase = targetIsWildcard ? target.slice(0, -1) : target;
    const resolvedTargetBase = path.resolve(absoluteBase, targetBase);

    map.set(alias, { resolvedTargetBase, keyIsWildcard, targetIsWildcard });
  }
  return map;
}

const aliasMap = loadTsconfigAliases();

// 2. Loop through extensions if the path does not exist
function tryExtensions(filePath) {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return filePath;
  const exts = [".js", ".ts", ".jsx", ".tsx"];
  
  for (const ext of exts) {
    const f = filePath + ext;
    if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  
  // 3. Fallback: If it is a directory, check for index.* files
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    for (const ext of exts) {
      const f = path.join(filePath, "index" + ext);
      if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
    }
  }
  return null;
}

exports.getAbsPathWithExt = function getAbsPathWithExt(specifier, context) {
  // 4. Resolve via tsconfig aliases
  if (aliasMap.size > 0) {
    for (const [alias, info] of aliasMap.entries()) {
      if (specifier.startsWith(alias)) {
        const absPath = path.resolve(info.resolvedTargetBase, specifier.slice(alias.length));
        return tryExtensions(absPath);
      }
    }
  }

  // 5. Resolve relative pathing relative to parent module
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    const parentURL = context.parentURL || pathToFileURL(process.cwd()).href;
    const parentDir = path.dirname(fileURLToPath(parentURL));
    const absPath = path.resolve(parentDir, specifier);
    return tryExtensions(absPath);
  }

  return null;
};`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Compass className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Path Extension Resolver (get-abs-path-with-ext.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine explicit file extension normalizations, directory index redirects, and tsconfig custom path alias resolutions.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/get-abs-path-with-ext.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Node.js's ES module (ESM) resolver is strict: imports like <code>import "./Component"</code> or <code>import "@/utils"</code> fail because they lack file extensions or refer to directories rather than files.
              </p>
              <p>
                The <code>get-abs-path-with-ext.js</code> utility resolves this restriction. It implements custom ESM path mapping to resolve alias configurations, append appropriate extensions, and locate directory indexes automatically.
              </p>
            </section>

            <hr className="my-8" />

            {/* RESOLUTION FLOW */}
            <section id="resolver-flow">
              <h2>📊 Extension Resolution Flow</h2>
              <p>
                The flowchart below traces the path resolution cascade for imports:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="1050px">{RESOLVER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* ESM RULES */}
            <section id="esm-rules">
              <h2>⚡ Node ESM Resolver Challenges</h2>
              <p>
                The resolver handles two main resolution scenarios:
              </p>
              <ul>
                <li>
                  <strong>Alias Resolution:</strong> Translates alias config keys (e.g. <code>@/</code>) to their target physical folder bases (e.g. <code>src/</code>) by parsing <code>tsconfig.json</code>.
                </li>
                <li>
                  <strong>Extension Matching:</strong> Appends extensions (<code>.js</code>, <code>.ts</code>, <code>.jsx</code>, <code>.tsx</code>) to find the correct file on disk, or looks for an <code>index</code> file if the path is a directory.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>get-abs-path-with-ext.js</code>:
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
