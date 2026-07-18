"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "manifest-flow", title: "📊 RSC Manifest Plugin Flow", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const RSC_MANIFEST_DIAGRAM = `graph TD
    Start[buildStart: scan all files] --> LoopFiles[Loop project files]
    LoopFiles --> CheckClient{Contains 'use client'?}
    
    CheckClient -->|Yes| EmitChunk[this.emitFile as chunk & updateManifestForModule]
    CheckClient -->|No| CheckPage{Is Page or Layout?}
    
    CheckPage -->|Yes| Watch[Add to watchFiles]
    CheckPage -->|No| Skip[Skip file]
    
    Watch --> DependencyCheck[getImportsAndAssetsAndCsss recursively]
    DependencyCheck --> EmitCSS[Emit css imports as chunks]
    DependencyCheck --> EmitAssets[Emit assets and add watchFiles]
    
    EmitChunk --> GenerateBundle[generateBundle: Map modules in output chunks to final names]
    GenerateBundle --> Write[Write react-client-manifest.json]`;

const MANIFEST_CODE = `const { readFileSync, writeFileSync, mkdirSync, existsSync } = require("fs");
const path = require("path");
const { dirname } = require("path");
const glob = require("fast-glob");
const { pathToFileURL } = require("url");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { regex } = require("../../core/asset-extensions.js");
const createScopedName = require("../../core/createScopedName.js");
const { getAbsPathWithExt } = require("../../core/get-abs-path-with-ext.js");
const { useClientRegex } = require("../../constants.js");
const parseExports = require("../../core/parse-exports.js");

function getDefaultExportName(code) {
  let name = null;
  try {
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });
    traverse(ast, {
      ExportDefaultDeclaration(p) {
        const decl = p.node.declaration;
        if (decl.type === "Identifier") {
          name = decl.name;
        } else if (
          (decl.type === "FunctionDeclaration" || decl.type === "ClassDeclaration") &&
          decl.id
        ) {
          name = decl.id.name;
        }
      },
    });
  } catch (e) {
    // Ignore parse errors
  }
  return name;
}

function reactClientManifestPlugin({
  srcDir = path.resolve("src"),
  manifestPath = "react_client_manifest/react-client-manifest.json",
  assetInclude = regex,
} = {}) {
  const manifest = {};
  const clientModules = new Set();
  const serverModules = new Set();

  function updateManifestForModule(absPath, code, isClientModule) {
    const fileUrl = pathToFileURL(absPath).href;
    const relPath =
      "./" + path.relative(process.cwd(), absPath).replace(/\\/g, "/");

    for (const key in manifest) {
      if (key.startsWith(fileUrl)) {
        delete manifest[key];
      }
    }

    if (isClientModule) {
      const exports = parseExports(code);
      for (const expName of exports) {
        const manifestKey =
          expName === "default" ? fileUrl : \`\${fileUrl}#\${expName}\`;
        manifest[manifestKey] = {
          id: relPath,
          chunks: expName,
          name: expName,
        };
      }
    }
  }

  async function getImportsAndAssetsAndCsss(
    code,
    baseFilePath,
    visited = new Set(),
    pluginContext
  ) {
    if (visited.has(baseFilePath)) {
      return { imports: [], assets: [], csss: [] };
    }
    visited.add(baseFilePath);

    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });
    const imports = new Set();
    const assets = new Set();
    const csss = new Set();

    const importNodes = [];
    traverse(ast, {
      ImportDeclaration(nodePath) {
        importNodes.push(nodePath);
      },
    });

    for (const nodePath of importNodes) {
      const source = nodePath.node.source.value;

      const absImportPathWithExt = getAbsPathWithExt(source, {
        parentURL: pathToFileURL(baseFilePath).href,
      });
      if (!absImportPathWithExt) {
        continue;
      }

      if (
        absImportPathWithExt.endsWith(".css") ||
        absImportPathWithExt.endsWith(".scss") ||
        absImportPathWithExt.endsWith(".less")
      ) {
        csss.add(absImportPathWithExt);
        continue;
      }

      if (assetInclude.test(absImportPathWithExt)) {
        assets.add(absImportPathWithExt);
        continue;
      }

      imports.add(absImportPathWithExt);

      try {
        const importCode = readFileSync(absImportPathWithExt, "utf8");
        const nested = await getImportsAndAssetsAndCsss(
          importCode,
          absImportPathWithExt,
          visited,
          pluginContext
        );
        nested.imports.forEach((nestedPath) => imports.add(nestedPath));
        nested.assets.forEach((nestedPath) => assets.add(nestedPath));
        nested.csss.forEach((nestedPath) => csss.add(nestedPath));
      } catch (err) {
        console.warn(
          \`[react-client-manifest] Could not read import: \${absImportPathWithExt}\`,
          err.message
        );
      }
    }

    return {
      imports: Array.from(imports),
      assets: Array.from(assets),
      csss: Array.from(csss),
    };
  }

  function emitAsset(absAssetPath, pluginContext) {
    const source = readFileSync(absAssetPath);
    const base = path.basename(absAssetPath, path.extname(absAssetPath));
    const scoped = createScopedName(base, absAssetPath);
    const ext = path.extname(absAssetPath);
    const fileName = \`assets/\${scoped}\${ext}\`;
    pluginContext.emitFile({
      type: "asset",
      fileName,
      source,
    });
  }

  function isPageOrLayout(absPath) {
    const fileName = path.basename(absPath);
    return fileName.startsWith("page.") || fileName.startsWith("layout.");
  }

  return {
    name: "react-client-manifest",
    async buildStart(options) {
      const srcFiles = await glob(["**/*.{js,jsx,ts,tsx}"], {
        cwd: srcDir,
        absolute: true,
      });

      const inputOption = options.input;
      let entryPoints = [];

      if (typeof inputOption === "string") {
        entryPoints = [inputOption];
      } else if (Array.isArray(inputOption)) {
        entryPoints = inputOption;
      } else if (typeof inputOption === "object" && inputOption !== null) {
        entryPoints = Object.values(inputOption);
      }
      const uniqueFiles = new Set([...srcFiles, ...entryPoints]);

      for (const absPath of uniqueFiles) {
        const code = readFileSync(absPath, "utf8");
        const normalizedPath = absPath.split(path.sep).join(path.posix.sep);
        const isClientModule = useClientRegex.test(code.trim());

        if (isClientModule) {
          clientModules.add(normalizedPath);
          updateManifestForModule(absPath, code, true);
          this.emitFile({
            type: "chunk",
            id: absPath,
            name: path.basename(absPath, path.extname(absPath)),
          });
        } else if (isPageOrLayout(absPath)) {
          serverModules.add(normalizedPath);
          this.addWatchFile(absPath);
          const { imports, assets, csss } = await getImportsAndAssetsAndCsss(
            code,
            absPath,
            new Set(),
            this
          );
          for (const importPath of imports) {
            this.addWatchFile(importPath);
          }
          for (const assetPath of assets) {
            this.addWatchFile(assetPath);
            emitAsset(assetPath, this);
          }
          for (const cssPath of csss) {
            this.addWatchFile(cssPath);
            this.emitFile({
              type: "chunk",
              id: cssPath,
              name: path.basename(cssPath, path.extname(cssPath)),
            });
          }
        }
      }
    },
    async transform(code, id) {
      if (id.includes("\\0") || id.startsWith("commonjsHelpers") || id.includes("node_modules/rollup") || id.includes("react-refresh")) return;
      const normalizedId = id.split(path.sep).join(path.posix.sep);
      const isClientModule = useClientRegex.test(code.trim());

      if (isClientModule) {
        if (!clientModules.has(normalizedId)) {
          clientModules.add(normalizedId);
          updateManifestForModule(id, code, true);
          this.emitFile({
            type: "chunk",
            id: id,
            name: path.basename(id, path.extname(id)),
          });
        }
      }
    },
    async watchChange(id) {
      if (
        !id.endsWith(".tsx") &&
        !id.endsWith(".jsx") &&
        !id.endsWith(".js") &&
        !id.endsWith(".ts")
      )
        return;
      const normalizedId = id.split(path.sep).join(path.posix.sep);
      if (!existsSync(id)) {
        const fileUrl = pathToFileURL(id).href;
        for (const key in manifest) {
          if (key.startsWith(fileUrl)) {
            delete manifest[key];
          }
        }
        clientModules.delete(normalizedId);
        serverModules.delete(normalizedId);
        return;
      }
      const code = readFileSync(id, "utf8");
      const isClientModule = useClientRegex.test(code.trim());

      updateManifestForModule(id, code, isClientModule);

      if (isClientModule) {
        clientModules.add(normalizedId);
        serverModules.delete(normalizedId);
        this.addWatchFile(id);
      } else {
        clientModules.delete(normalizedId);
        if (isPageOrLayout(id)) {
          serverModules.add(normalizedId);
          this.addWatchFile(id);
          const { imports, assets, csss } = await getImportsAndAssetsAndCsss(
            code,
            id,
            new Set(),
            this
          );
          for (const importPath of imports) {
            this.addWatchFile(importPath);
          }
          for (const assetPath of assets) {
            this.addWatchFile(assetPath);
          }
          for (const cssPath of csss) {
            this.addWatchFile(cssPath);
          }
        } else {
          serverModules.delete(normalizedId);
        }
      }
    },
    generateBundle(outputOptions, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== "chunk") continue;

        if (chunk.facadeModuleId) {
          const absModulePath = path.resolve(chunk.facadeModuleId);
          if (!absModulePath.includes("\\0") && !absModulePath.startsWith("commonjsHelpers")) {
            const fileUrl = pathToFileURL(absModulePath).href;
            manifest[fileUrl] = {
              id: "/" + fileName,
              chunks: "default",
              name: "default",
            };
            manifest[fileUrl + "#default"] = {
              id: "/" + fileName,
              chunks: "default",
              name: "default",
            };

            if (!chunk.exports.includes("default")) {
              try {
                const originalCode = readFileSync(absModulePath, "utf8");
                const defaultName = getDefaultExportName(originalCode);
                if (defaultName && chunk.exports.includes(defaultName)) {
                  chunk.code += \`\\nexport { \${defaultName} as default };\\n\`;
                  chunk.exports.push("default");
                }
              } catch (err) {
                // Ignore errors
              }
            }
          }
        }

        for (const modulePath of Object.keys(chunk.modules)) {
          if (modulePath.includes("\\0") || modulePath.startsWith("commonjsHelpers")) continue;
          const absModulePath = path.resolve(modulePath);
          const normalizedPath = absModulePath.split(path.sep).join(path.posix.sep);

          if (clientModules.has(normalizedPath)) {
            const fileUrl = pathToFileURL(absModulePath).href;
            for (const key of Object.keys(manifest)) {
              if (key === fileUrl || key.startsWith(fileUrl + "#")) {
                manifest[key].id = "/" + fileName;
              }
            }
          }
        }
      }
      const serialized = JSON.stringify(manifest, null, 2);
      mkdirSync(dirname(manifestPath), { recursive: true });
      writeFileSync(manifestPath, serialized);
    },
  };
}

module.exports = reactClientManifestPlugin;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-6 w-6 text-primary text-orange-600 dark:text-orange-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Rollup RSC Manifest Plugin
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the recursive dependency scanning, Babel AST parsing, and manifest generation hooks inside Rollup.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/rollup/rollup-plugins/rollup-plugin-react-client-manifest.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                RSC architectures require a mapping between Server Component hydration tokens and client bundles.
              </p>
              <p>
                The <code>rollup-plugin-react-client-manifest.js</code> plugin traces the project tree recursively. It watches components, parses default and named exports, and maps modules to final compiled file paths inside <code>react-client-manifest.json</code>.
              </p>
            </section>

            <hr className="my-8" />

            {/* MANIFEST FLOW */}
            <section id="manifest-flow">
              <h2>📊 RSC Manifest Plugin Flow</h2>
              <p>
                The flowchart below shows how the plugin coordinates file crawling, dependency checks, and manifest generation:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="750px">{RSC_MANIFEST_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of the React client manifest plugin:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{MANIFEST_CODE}</CodeBlock>
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
