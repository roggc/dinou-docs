"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { HardDrive, Server, Cpu, Zap } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "vfs-flow", title: "📊 VFS Operational Flow", level: 2 },
  { id: "optimizations", title: "⚡ Filesystem Optimizations", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const VFS_DIAGRAM = `graph TD
    Start[existsSync / readdirSync query] --> EnvCheck{Is Production?}
    
    EnvCheck -->|Yes| Prod[Production Mode]
    Prod --> BuildVfs[buildVfs warmup Crawl folders recursively & Cache metadata in vfs memory object]
    BuildVfs --> QueryMemory[Query vfs memory object Prevents OS Disk I/O bounds]
    
    EnvCheck -->|No| Dev[Development Mode]
    Dev --> QueryDisk[Query raw OS filesystem Supports hot file edits]`;

const VFS_CODE = `const fs = require("fs");
const path = require("path");

const isDevelopment = process.env.NODE_ENV !== "production";
const vfs = {};

// 1. Recursively build file metadata map in memory
function buildVfs(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const children = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const isDirectory = entry.isDirectory();
    children.push({
      name: entry.name,
      isDirectory
    });
    if (isDirectory) {
      buildVfs(fullPath);
    } else {
      vfs[fullPath] = { type: "file" };
    }
  }

  vfs[dir] = {
    type: "directory",
    children
  };
}

// 2. Production Warmup: Crawl the source directory at startup
if (!isDevelopment) {
  const srcDir = path.resolve(process.cwd(), "src");
  buildVfs(srcDir);
}

// 3. Optimized existsSync wrapper
function existsSync(filePath) {
  if (isDevelopment) {
    return fs.existsSync(filePath); // Live query in dev
  }
  const normalized = path.resolve(filePath);
  return !!vfs[normalized]; // Fast memory map query in prod
}

// 4. Optimized readdirSync wrapper
function readdirSync(dirPath, options) {
  if (isDevelopment) {
    return fs.readdirSync(dirPath, options);
  }
  const normalized = path.resolve(dirPath);
  const entry = vfs[normalized];
  if (!entry || entry.type !== "directory") {
    throw new Error(\`ENOTDIR: not a directory, readdir '\${dirPath}'\`);
  }

  if (options && options.withFileTypes) {
    return entry.children.map(child => ({
      name: child.name,
      isDirectory: () => child.isDirectory,
      isFile: () => !child.isDirectory
    }));
  }
  return entry.children.map(child => child.name);
}

module.exports = {
  existsSync,
  readdirSync
};`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <HardDrive className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Virtual File System (vfs.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the virtual file system wrapper, in-memory directories indexes, and production path query resolvers.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/vfs.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In a dynamic React framework, page routing and parallel slots resolution require scanning file structures continuously (e.g. searching for <code>page.tsx</code>, <code>layout.tsx</code>, or <code>error.tsx</code>). In production, checking the physical storage drive on every user request introduces I/O latency bottlenecks.
              </p>
              <p>
                The <code>vfs.js</code> file exposes a Virtual File System wrapper. In production, it crawls the <code>src/</code> directory once at startup and caches the folder structure in memory.
              </p>
            </section>

            <hr className="my-8" />

            {/* VFS OPERATIONAL FLOW */}
            <section id="vfs-flow">
              <h2>📊 VFS Operational Flow</h2>
              <p>
                The flowchart below shows how the virtual filesystem changes behavior based on the environment:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{VFS_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* OPTIMIZATIONS */}
            <section id="optimizations">
              <h2>⚡ Filesystem Optimizations</h2>
              <p>
                The dual-mode design optimizes both speed and developer experience:
              </p>
              <ul>
                <li>
                  <strong>Production Cache:</strong> During startup, <code>buildVfs()</code> builds a memory map containing folder trees and file states. Requests querying <code>existsSync()</code> or <code>readdirSync()</code> read directly from memory, avoiding disk I/O.
                </li>
                <li>
                  <strong>Development Live Queries:</strong> In development, caching files in memory would prevent hot-reloading from detecting new page files immediately. To resolve this, the wrapper bypasses the cache in development, querying the physical disk in real-time.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>vfs.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{VFS_CODE}</CodeBlock>
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
