"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Play, Settings, RefreshCw, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "build-flow", title: "📊 Production Build Runner Flow", level: 2 },
  { id: "dev-flow", title: "📊 Development HMR Server Flow", level: 2 },
  { id: "code-build", title: "⚙️ build.mjs Code Walkthrough", level: 2 },
  { id: "code-dev", title: "⚙️ dev.mjs Code Walkthrough", level: 2 },
];

const BUILD_DIAGRAM = `                             build.mjs (Production)
                                       │
                                       ▼
                             [Clear Output Dirs]
                       (dist3, manifests folders)
                                       │
                                       ▼
                             [getEsbuildEntries()]
                        (Crawl client & CSS pages)
                                       │
                                       ▼
                       [Orchestrate Entrypoints Map]
                                       │
                                       ▼
                              [esbuild.build()]
                       (Configs from prod helper)`;

const DEV_DIAGRAM = `                           dev.mjs (Development Run)
                                       │
                                       ▼
                             [Clear Output Dirs]
                              (public folder)
                                       │
                                       ▼
                       [chokidar.watch("src") Ready]
                                       │
                                       ▼
                             [createEsbuildContext]
                       (esbuild.context + ctx.watch)
                                       │
                                       ▼
                           [Monitor file changes]
                                       │
             ┌─────────────────────────┼─────────────────────────┐
             ▼                         ▼                         ▼
      [File Add/Delete]         [Client Comp Edit]        [Server Action Edit]
             │                         │                         │
     getEsbuildEntries()         Add to changedIds          Ignore refresh
     recreate context            HMR push update                 │
     broadcast reload                  │                         │
             └─────────────────────────┼─────────────────────────┘
                                       ▼
                               [Live Update Browser]`;

const BUILD_CODE = `import esbuild from "esbuild";
import fs from "node:fs/promises";
import getConfigEsbuildProd from "./helpers-esbuild/get-config-esbuild-prod.mjs";
import getEsbuildEntries from "./helpers-esbuild/get-esbuild-entries.mjs";
import { fileURLToPath } from "url";
import path from "node:path";
import { updateManifestForModule } from "./helpers-esbuild/update-manifest-for-module.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outdir = "dist3";

// 1. Clean previous build states
await fs.rm(outdir, { recursive: true, force: true });
await fs.rm("react_client_manifest", { recursive: true, force: true });
await fs.rm("server_functions_manifest", { recursive: true, force: true });

const absPathToClientRedirect = path.resolve(__dirname, "../core/client-redirect.jsx");
const absPathToLink = path.resolve(__dirname, "../core/link.jsx");

// 2. Define framework entrypoints
const frameworkEntryPoints = {
  main: path.resolve(__dirname, "../core/client.jsx"),
  error: path.resolve(__dirname, "../core/client-error.jsx"),
  serverFunctionProxy: path.resolve(__dirname, "../core/server-function-proxy.js"),
  runtime: path.resolve(__dirname, "react-refresh/react-refresh-runtime.mjs"),
  "react-refresh-entry": path.resolve(__dirname, "react-refresh/react-refresh-entry.js"),
  dinouClientRedirect: absPathToClientRedirect,
  dinouLink: absPathToLink,
};

try {
  const manifest = {};

  // 3. Resolve entrypoints for all client pages, css files, and static assets
  const [esbuildEntries, detectedCSSEntries, detectedAssetEntries] =
    await getEsbuildEntries({ manifest });

  updateManifestForModule(absPathToClientRedirect, await fs.readFile(absPathToClientRedirect, "utf8"), true, manifest);
  updateManifestForModule(absPathToLink, await fs.readFile(absPathToLink, "utf8"), true, manifest);

  const componentEntryPoints = [...esbuildEntries].reduce((acc, dCE) => ({ ...acc, [dCE.outfileName]: dCE.absPath }), {});
  const cssEntryPoints = [...detectedCSSEntries].reduce((acc, dCSSE) => ({ ...acc, [dCSSE.outfileName]: dCSSE.absPath }), {});
  const assetEntryPoints = [...detectedAssetEntries].reduce((acc, dAE) => ({ ...acc, [dAE.outfileName]: dAE.absPath }), {});

  const entryPoints = {
    ...frameworkEntryPoints,
    ...componentEntryPoints,
    ...cssEntryPoints,
    ...assetEntryPoints,
  };

  // 4. Trigger production build
  await esbuild.build(
    getConfigEsbuildProd({
      entryPoints,
      manifest,
      outdir,
    })
  );
} catch (err) {
  console.error("Error in build:", err);
}`;

const DEV_CODE = `import esbuild from "esbuild";
import fs from "node:fs/promises";
import getConfigEsbuild from "./helpers-esbuild/get-config-esbuild.mjs";
import getEsbuildEntries from "./helpers-esbuild/get-esbuild-entries.mjs";
import chokidar from "chokidar";
import path from "node:path";
import { regex as assetRegex } from "../core/asset-extensions.js";
import normalizePath from "./helpers-esbuild/normalize-path.mjs";
import { fileURLToPath, pathToFileURL } from "url";
import { updateManifestForModule } from "./helpers-esbuild/update-manifest-for-module.mjs";
import { useServerRegex } from "../constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outdir = "public";
await fs.rm(outdir, { recursive: true, force: true });
await fs.rm("react_client_manifest", { recursive: true, force: true });
await fs.rm("server_functions_manifest", { recursive: true, force: true });

let currentCtx = null;
let debounceTimer = null;
let clientComponentsPaths = [];
let currentServerFiles = new Set();

const absPathToClientRedirect = path.resolve(__dirname, "../core/client-redirect.jsx");
const absPathToLink = path.resolve(__dirname, "../core/link.jsx");

const frameworkEntryPoints = {
  main: path.resolve(__dirname, "../core/client.jsx"),
  error: path.resolve(__dirname, "../core/client-error.jsx"),
  serverFunctionProxy: path.resolve(__dirname, "../core/server-function-proxy.js"),
  runtime: path.resolve(__dirname, "react-refresh/react-refresh-runtime.mjs"),
  "react-refresh-entry": path.resolve(__dirname, "react-refresh/react-refresh-entry.js"),
  dinouClientRedirect: absPathToClientRedirect,
  dinouLink: absPathToLink,
};

const changedIds = new Set();
const hmrEngine = { value: null };

// 1. Initialize filesystem watcher
const watcher = chokidar.watch("src", {
  ignoreInitial: true,
  ignored: /node_modules|dist/,
});

const codeCssRegex = /.(js|jsx|ts|tsx|css|scss|less)$/i;

let manifest = {};
let entryPoints = {};

async function updateEntriesAndComponents() {
  manifest = {};
  const [esbuildEntries, detectedCSSEntries, detectedAssetEntries, serverFiles] = await getEsbuildEntries({ manifest });

  updateManifestForModule(absPathToClientRedirect, await fs.readFile(absPathToClientRedirect, "utf8"), true, manifest);
  updateManifestForModule(absPathToLink, await fs.readFile(absPathToLink, "utf8"), true, manifest);

  currentServerFiles = new Set(serverFiles.map((f) => normalizePath(path.resolve(f))));

  const componentEntryPoints = [...esbuildEntries].reduce((acc, dCE) => ({ ...acc, [dCE.outfileName]: dCE.absPath }), {});
  clientComponentsPaths = Object.values(componentEntryPoints);

  const cssEntryPoints = [...detectedCSSEntries].reduce((acc, dCSSE) => ({ ...acc, [dCSSE.outfileName]: dCSSE.absPath }), {});
  const assetEntryPoints = [...detectedAssetEntries].reduce((acc, dAE) => ({ ...acc, [dAE.outfileName]: dAE.absPath }), {});

  entryPoints = {
    ...frameworkEntryPoints,
    ...componentEntryPoints,
    ...cssEntryPoints,
    ...assetEntryPoints,
  };
}

async function createEsbuildContext() {
  try {
    if (currentCtx) {
      await currentCtx.dispose(); // Dispose previous watch thread
    }

    await fs.rm(outdir, { recursive: true, force: true });
    currentCtx = await esbuild.context(
      getConfigEsbuild({
        entryPoints,
        manifest,
        changedIds,
        hmrEngine,
      })
    );

    await currentCtx.watch();
  } catch (err) {
    console.error("Error recreating context:", err);
  }
}

// 2. Initial compiler setup on watch ready
watcher.on("ready", async () => {
  await updateEntriesAndComponents();
  await createEsbuildContext();
});

const debounceRecreate = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    await createEsbuildContext();
  }, 300);
};

const debounceRecreateAndReload = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    await createEsbuildContext();
    hmrEngine.value.broadcastMessage({ type: "reload" });
  }, 300);
};

let reloadTimer = null;
const debounceReload = () => {
  if (reloadTimer) clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    if (hmrEngine.value) {
      hmrEngine.value.broadcastMessage({ type: "reload" });
    }
  }, 100);
};

// 3. React on filesystem additions, deletions and modifications
watcher.on("add", async (file) => {
  const ext = path.extname(file);
  if (codeCssRegex.test(ext) || assetRegex.test(ext)) {
    await updateEntriesAndComponents();
    debounceRecreateAndReload();
  }
});

watcher.on("unlink", async (file) => {
  const ext = path.extname(file);
  if (codeCssRegex.test(ext) || assetRegex.test(ext)) {
    await updateEntriesAndComponents();
    if (currentCtx) {
      await currentCtx.dispose();
      currentCtx = null;
    }
    debounceRecreate();
  }
});

watcher.on("change", async (file) => {
  const resolvedFile = normalizePath(path.resolve(file));
  const oldManifest = { ...manifest };
  const oldEntryKeys = JSON.stringify(Object.keys(entryPoints).sort());

  await updateEntriesAndComponents();

  const newEntryKeys = JSON.stringify(Object.keys(entryPoints).sort());
  const entryPointsChanged = oldEntryKeys !== newEntryKeys;

  const isClientModule = clientComponentsPaths.includes(resolvedFile);
  const isServerModule = currentServerFiles.has(resolvedFile);

  // 4. Hot Module Replacement (HMR) bypass logic
  if (isClientModule && !isServerModule && oldManifest[pathToFileURL(resolvedFile).href]) {
    changedIds.add(resolvedFile); // Trigger client hot-reload updates
    return;
  }

  const fileContent = await fs.readFile(resolvedFile, "utf8").catch(() => "");
  if (useServerRegex.test(fileContent.trim())) {
    return; // Server action changes do not reload the browser
  }

  if (entryPointsChanged || file.endsWith(".css") || file.endsWith(".scss")) {
    debounceRecreateAndReload();
  } else {
    debounceReload();
  }
});`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Play className="h-6 w-6 text-primary text-yellow-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                esbuild Runners
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand the core script executors that coordinate production releases and hot-reloading dev servers.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Location:</strong> <br />
              • Prod Build: <code>./dinou/esbuild/build.mjs</code> <br />
              • Dev Server: <code>./dinou/esbuild/dev.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou exposes two main compiler runners. The production builder compiles minified output modules, while the development server watches for changes to provide Hot Module Replacement (HMR) without reloading the page.
              </p>
            </section>

            <hr className="my-8" />

            {/* BUILD RUNNER FLOW */}
            <section id="build-flow">
              <h2>📊 Production Build Runner Flow</h2>
              <p>
                The flowchart below traces the production build pipeline:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{BUILD_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* DEV RUNNER FLOW */}
            <section id="dev-flow">
              <h2>📊 Development HMR Server Flow</h2>
              <p>
                The flowchart below shows how development changes trigger recompilation or HMR updates:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{DEV_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH BUILD */}
            <section id="code-build">
              <h2>⚙️ build.mjs Code Walkthrough</h2>
              <p>
                Below is the full, complete code of the production build runner:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{BUILD_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH DEV */}
            <section id="code-dev">
              <h2>⚙️ dev.mjs Code Walkthrough</h2>
              <p>
                Below is the full, complete code of the development watch runner:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{DEV_CODE}</CodeBlock>
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
