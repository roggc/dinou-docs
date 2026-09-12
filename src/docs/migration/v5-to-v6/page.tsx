"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import {
  FolderArchive,
  FolderSync,
  CheckCircle2,
  AlertTriangle,
  FolderTree,
  Sparkles,
  GitBranch,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "1. Overview & Breaking Change", level: 2 },
  { id: "directory-consolidation", title: "2. Folder Consolidation into .dinou", level: 2 },
  { id: "gitignore-update", title: "3. Updating .gitignore", level: 2 },
  { id: "ejected-projects", title: "4. Ejected Projects (dinou/)", level: 2 },
  { id: "zero-code-changes", title: "5. Zero Application Code Changes", level: 2 },
];

export default function MigrationV5ToV6Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Migration from v5 to v6
              </h1>
              <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                v6.0.0
              </span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou v6 encapsulates all internal build artifacts, manifests, and runtime caches into a single, clean <code>.dinou</code> directory at the root of your project.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* 1. Overview & Breaking Change */}
            <section id="overview">
              <h2>1. Overview & Breaking Change</h2>
              <p>
                Dinou v6.0.0 is a streamlined major release designed to declutter your project root. 
                Prior to v6, Dinou generated up to five separate directories directly in the project root to manage client manifests, server function proxies, development bundles, and static cache files.
              </p>

              <Alert className="not-prose my-6 border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertTitle className="text-amber-600 dark:text-amber-400">
                  The Only Breaking Change in v6.0.0
                </AlertTitle>
                <AlertDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  All internal output folders (<code>react_client_manifest</code>, <code>server_functions_manifest</code>, <code>public</code>, <code>dist2</code>, and <code>dist3</code>) are now consolidated inside <strong><code>.dinou/</code></strong>. 
                  <div className="mt-2 font-semibold text-foreground">
                    Required Action: Update your project's <code>.gitignore</code> file to ignore <code>.dinou</code> instead of the individual folders.
                  </div>
                </AlertDescription>
              </Alert>

              <div className="border border-green-500/20 bg-green-50/30 dark:bg-green-950/10 rounded-lg p-4 bg-card not-prose">
                <div className="flex items-center gap-2 font-semibold mb-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Zero Application Code Changes Required</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your application code under <code>src/</code> remains 100% identical. All React Server Components, Client Components, Server Actions, routing patterns, hooks, and plugins continue to function without any modifications.
                </p>
              </div>
            </section>

            {/* 2. Folder Consolidation into .dinou */}
            <section id="directory-consolidation" className="mt-12 pt-8 border-t">
              <h2>2. Internal Folder Consolidation into <code>.dinou</code></h2>
              <p>
                Here is a comparison of how internal build and manifest directories are structured between versions:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <Card className="border-slate-200 dark:border-slate-800 min-w-0 w-full">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <FolderArchive className="h-4 w-4 text-slate-400" />
                      In Dinou v5 (and earlier)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p className="text-muted-foreground">
                      Five separate folders were generated directly in your project root:
                    </p>
                    <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1 font-mono">
                      <li><code>public/</code> (dev assets & bundles)</li>
                      <li><code>dist3/</code> (production bundles)</li>
                      <li><code>dist2/</code> (pre-rendered static HTML & RSC)</li>
                      <li><code>react_client_manifest/</code> (client manifest)</li>
                      <li><code>server_functions_manifest/</code> (actions manifest)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10 min-w-0 w-full">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      In Dinou v6.0.0
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p className="text-muted-foreground">
                      All folders are cleanly grouped under a single <strong><code>.dinou/</code></strong> directory:
                    </p>
                    <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1 font-mono">
                      <li><code>.dinou/public/</code></li>
                      <li><code>.dinou/dist3/</code></li>
                      <li><code>.dinou/dist2/</code></li>
                      <li><code>.dinou/react_client_manifest/</code></li>
                      <li><code>.dinou/server_functions_manifest/</code></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3>Directory Tree Comparison</h3>
              <div className="not-prose my-4">
                <CodeBlock language="text" hideHeader>
                  {`# Before (v5.x): Cluttered project root
my-app/
├── dist2/                      # Static pre-rendered pages & RSC payloads
├── dist3/                      # Production client bundles & assets
├── public/                     # Development client bundles & assets
├── react_client_manifest/      # React client components manifest
├── server_functions_manifest/  # Server actions manifest
├── src/                        # Your application code
├── package.json
└── tsconfig.json

# After (v6.0.0): Clean, organized project root
my-app/
├── .dinou/                     # Consolidated framework artifacts
│   ├── dist2/
│   ├── dist3/
│   ├── public/
│   ├── react_client_manifest/
│   └── server_functions_manifest/
├── src/                        # Your application code (untouched)
├── package.json
└── tsconfig.json`}
                </CodeBlock>
              </div>
            </section>

            {/* 3. Updating .gitignore */}
            <section id="gitignore-update" className="mt-12 pt-8 border-t">
              <h2>3. Updating <code>.gitignore</code></h2>
              <p>
                Update your <code>.gitignore</code> file to replace the individual folder entries with <code>.dinou</code>:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="diff">
                  {` node_modules
-.dinou build folders
-dist2
-dist3
-public
-react_client_manifest
-server_functions_manifest
+.dinou
 .env`}
                </CodeBlock>
              </div>

              <p>
                Your final recommended <code>.gitignore</code> now only needs three entries:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="text" containerClassName="w-full overflow-hidden rounded-lg">
                  {`node_modules
.dinou
.env`}
                </CodeBlock>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-muted/30 not-prose my-4">
                <div className="flex items-center gap-2 font-semibold mb-1 text-sm">
                  <FolderSync className="h-4 w-4 text-blue-500" />
                  <span>Housekeeping: Deleting Legacy Folders</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  After upgrading to <code>dinou@6.0.0</code>, you can safely delete the old root output folders left over from previous builds:
                </p>
                <div className="mt-2">
                  <CodeBlock language="bash" hideHeader>
                    {`# Optional: Remove old legacy build directories
rm -rf dist2 dist3 public react_client_manifest server_functions_manifest`}
                  </CodeBlock>
                </div>
              </div>
            </section>

            {/* 4. Ejected Projects (dinou/) */}
            <section id="ejected-projects" className="mt-12 pt-8 border-t">
              <h2>4. Ejected Projects (<code>dinou/</code>)</h2>
              <p>
                If you are running an <strong>ejected</strong> Dinou application (where the <code>dinou/</code> directory lives directly inside your repository), the internal core files and bundler configurations have been updated to use the new <code>.dinou</code> output paths:
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>
                  <strong>Bundler Configurations:</strong> Build scripts in <code>dinou/rollup/</code>, <code>dinou/esbuild/</code>, and <code>dinou/webpack/</code> now output bundles and manifests to <code>.dinou/public/</code>, <code>.dinou/dist3/</code>, <code>.dinou/react_client_manifest/</code>, and <code>.dinou/server_functions_manifest/</code>.
                </li>
                <li>
                  <strong>Core Server & SSG:</strong> Modules in <code>dinou/core/</code> (such as <code>server.js</code>, <code>render-html.js</code>, <code>render-app-to-html.js</code>, <code>generate-static-*.js</code>, and <code>cache-revalidate.js</code>) now read and write cached pages and manifests under <code>.dinou/dist2/</code> and <code>.dinou/...</code>.
                </li>
              </ul>

              <div className="not-prose my-4">
                <Alert>
                  <GitBranch className="h-4 w-4 text-blue-500" />
                  <AlertTitle>Updating Ejected Core Files</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1">
                    If you customized parts of <code>dinou/core/</code> in your ejected app, ensure any direct path references like <code>path.resolve(process.cwd(), "dist2")</code> or <code>"dist3"</code> are updated to point to <code>".dinou/dist2"</code> or <code>".dinou/dist3"</code>.
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* 5. Zero Application Code Changes */}
            <section id="zero-code-changes" className="mt-12 pt-8 border-t">
              <h2>5. Zero Application Code Changes</h2>
              <p>
                To summarize, upgrading from Dinou v5 to v6 requires no changes to your application code:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Routing & Pages (src/)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All file-system routes (<code>src/page.tsx</code>, <code>src/[lang]/...</code>, layouts, and route parameters) remain identical.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Server Functions & Actions</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Server Functions marked with <code>"use server"</code> work seamlessly with arguments, FormData, and transitions.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Plugins (dinou.config.js)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The plugin system introduced in v5.2.0 remains fully compatible without modifying your hooks or config.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>SSG, ISG & Revalidation</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <code>getStaticPaths()</code>, on-demand revalidation, and static bailouts continue operating normally, outputting cleanly into <code>.dinou/dist2/</code>.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
