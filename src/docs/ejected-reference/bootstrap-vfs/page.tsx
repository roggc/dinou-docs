"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Terminal, Cpu, HardDrive, LayoutGrid } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "bootstrap-flow", title: "📊 Server Startup Flow", level: 2 },
  { id: "files", title: "📂 Module Directory", level: 2 },
];

const BOOTSTRAP_VFS_DIAGRAM = `graph TD
    Start[🚀 Server Startup node core] --> RegisterPaths[register-paths.js Load tsconfig paths aliases]
    RegisterPaths --> WarmupVFS[vfs.js Warmup src/ directory cache for production]
    WarmupVFS --> Middleware[🌐 Routing Middleware Bypasses OS file I/O lookups]`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Bootstrapping & VFS Utils
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover runtime path alias registers, virtual memory file indexes, and production route optimizations.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Group Summary:</strong> <br />
              • Paths alias register: <a href="/docs/ejected-reference/bootstrap-vfs/path-register"><code>./dinou/core/register-paths.js</code></a> <br />
              • Virtual filesystem: <a href="/docs/ejected-reference/bootstrap-vfs/vfs"><code>./dinou/core/vfs.js</code></a>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Before Node.js begins compiling components or routing incoming traffic, it must bootstrap the runtime environment:
              </p>
              <ul>
                <li><strong>Alias Mapping:</strong> Imports inside files that use custom path configurations (e.g. <code>import Component from "@/components/Component"</code>) will fail unless Node is taught how to parse these alias patterns.</li>
                <li><strong>Filesystem Optimization:</strong> Constantly performing disk operations (like <code>fs.existsSync</code>) for routing lookups degrades server throughput. The framework must implement memory-level caches to avoid disk latency in production.</li>
              </ul>
              <p>
                The **Bootstrapping & VFS Utils** group contains the core configuration files responsible for these startup tasks.
              </p>
            </section>

            <hr className="my-8" />

            {/* BOOTSTRAP FLOW */}
            <section id="bootstrap-flow">
              <h2>📊 Server Startup Flow</h2>
              <p>
                The diagram below traces the bootstrapping sequence executed when the server process starts:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{BOOTSTRAP_VFS_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* FILE DIRECTORY */}
            <section id="files">
              <h2>📂 Module Directory</h2>
              <p>
                Explore each component file in detail:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                <a href="/docs/ejected-reference/bootstrap-vfs/path-register" className="border rounded-xl p-5 hover:bg-muted/50 transition-colors flex flex-col justify-between">
                  <div>
                    <LayoutGrid className="h-6 w-6 text-blue-500 mb-3" />
                    <h3 className="font-bold text-base my-0">Path Aliases Register</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Locates compiler configurations and registers absolute paths aliases inside the running process.
                    </p>
                  </div>
                  <span className="text-xs text-blue-500 font-semibold mt-4">View Docs →</span>
                </a>

                <a href="/docs/ejected-reference/bootstrap-vfs/vfs" className="border rounded-xl p-5 hover:bg-muted/50 transition-colors flex flex-col justify-between">
                  <div>
                    <HardDrive className="h-6 w-6 text-purple-500 mb-3" />
                    <h3 className="font-bold text-base my-0">Virtual File System</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Constructs an in-memory representation of the folder structure to eliminate I/O disk checking bottlenecks.
                    </p>
                  </div>
                  <span className="text-xs text-purple-500 font-semibold mt-4">View Docs →</span>
                </a>
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
