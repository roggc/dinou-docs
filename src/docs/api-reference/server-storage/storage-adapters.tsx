"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  Layers,
  Sliders,
  Globe,
  Database,
  Code2,
  Settings,
} from "lucide-react";

export function StorageAdaptersSection() {
  return (
    <section id="storage-adapters" className="scroll-mt-20 mt-12 pt-8 border-t">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>Storage Adapters</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
          Storage Abstraction
        </span>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          Pluggable Engine
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Dinou completely decouples ISR and Micro-ISR caching logic from physical storage media. All pre-rendered HTML, RSC route payloads, segment layouts, and slot fragments are read and written through a unified <code>StorageAdapter</code> interface.
      </p>

      {/* Architecture Feature Cards */}
      <div className="grid md:grid-cols-3 gap-4 my-4 not-prose text-xs">
        <div className="p-4 rounded-lg bg-card border border-border space-y-2">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-amber-500" />
            <span>Physical Decoupling</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Switch between local disk, distributed memory caches, edge KV stores, or custom object storage without modifying application components or data loaders.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border space-y-2">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-purple-500" />
            <span>Companion Metadata</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Every cached entry preserves associated metadata, including generation timestamps (<code>generatedAt</code>), assigned cache tags, and ISR revalidation windows.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border space-y-2">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-blue-500" />
            <span>Cluster Sharing</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            In multi-instance setups (Kubernetes, Cloud Run, Edge workers), adapters like <code>RedisStorage</code> or <code>CloudflareKVStorage</code> share generated artifacts globally across all nodes.
          </p>
        </div>
      </div>

      {/* Sub-section 1: Built-in Adapters */}
      <div id="storage-adapters-list" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Database className="h-4 w-4 text-amber-500" />
            <span>Built-In Adapters Reference</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Production storage engines available directly from <code>dinou/server</code>.
        </p>

        <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-3">Adapter Class</th>
                <th className="p-3">Constructor Signature</th>
                <th className="p-3">Metadata Strategy</th>
                <th className="p-3">Target Environment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card text-muted-foreground">
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">FileSystemStorage</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">new FileSystemStorage(baseDir?: string)</td>
                <td className="p-3 align-top leading-relaxed">
                  Writes companion <code>metadata.json</code>, <code>layout.metadata.json</code>, and <code>slot.metadata.json</code> files alongside cached payloads.
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Local development, single-node Docker containers, VPS servers (default: <code>.dinou/dist2</code>).
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">RedisStorage</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">new RedisStorage(redisClient: any, prefix?: string)</td>
                <td className="p-3 align-top leading-relaxed">
                  Serializes content and metadata together as JSON strings under configurable key prefix (default: <code>&quot;dinou:cache:&quot;</code>).
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Multi-container Kubernetes clusters, AWS ECS, Google Cloud Run, distributed Node.js servers.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">CloudflareKVStorage</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">new CloudflareKVStorage(kvNamespace: any)</td>
                <td className="p-3 align-top leading-relaxed">
                  Leverages Cloudflare KV native metadata attributes via <code>getWithMetadata()</code> and <code>put(..., &#123; metadata &#125;)</code>.
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Cloudflare Workers &amp; Pages at global edge scale.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">DenoKVStorage</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">new DenoKVStorage(kvInstance?: any)</td>
                <td className="p-3 align-top leading-relaxed">
                  Stores atomic key-value records with automatic 16KB payload chunking for large HTML/RSC artifacts.
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Deno Deploy &amp; distributed edge runtimes.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">MemoryStorage</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">new MemoryStorage()</td>
                <td className="p-3 align-top leading-relaxed">
                  Maintains an in-memory JavaScript <code>Map</code> storing <code>&#123; content, metadata &#125;</code> tuples in memory.
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Unit testing, ephemeral CI/CD runners, preview sandboxes.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Adapter Helpers Note */}
        <div className="p-4 rounded-lg bg-muted/40 border border-border text-xs space-y-1">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <Code2 className="h-4 w-4 text-emerald-500" />
            <span>Global Storage Utilities</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Dinou exports <code>getStorageAdapter()</code> to access the active storage instance anywhere on the server, and <code>setStorageAdapter(adapter)</code> to dynamically swap the storage engine during initialization or test suites.
          </p>
        </div>
      </div>

      {/* Sub-section 2: StorageAdapter Interface Contract */}
      <div id="storage-adapters-interface" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Settings className="h-4 w-4 text-amber-500" />
            <span>StorageAdapter Contract &amp; Methods</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Abstract class methods required when implementing or interacting with storage engines.
        </p>

        <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-3">Method</th>
                <th className="p-3">Signature</th>
                <th className="p-3">Required?</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card text-muted-foreground">
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">get(key)</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  (key: string) =&gt; Promise&lt;&#123; content: string; metadata?: any &#125; | null&gt;
                </td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Yes</td>
                <td className="p-3 align-top leading-relaxed">
                  Retrieves the cached content string and companion metadata. Returns <code>null</code> on cache miss.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">set(key, content, metadata?)</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  (key: string, content: string, metadata?: any) =&gt; Promise&lt;void&gt;
                </td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Yes</td>
                <td className="p-3 align-top leading-relaxed">
                  Persists the rendered HTML, RSC stream, or slot JSON alongside its companion metadata object.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">has(key)</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  (key: string) =&gt; Promise&lt;boolean&gt;
                </td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Yes</td>
                <td className="p-3 align-top leading-relaxed">
                  Fast existence check to verify if a valid cache artifact exists without deserializing full content.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">delete(key)</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  (key: string) =&gt; Promise&lt;void&gt;
                </td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Yes</td>
                <td className="p-3 align-top leading-relaxed">
                  Removes the targeted cached artifact and associated metadata files or keys.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">keys(prefix?)</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  (prefix?: string) =&gt; Promise&lt;string[]&gt; | string[]
                </td>
                <td className="p-3 font-mono text-[11px] text-amber-600 dark:text-amber-400 align-top">Optional</td>
                <td className="p-3 align-top leading-relaxed">
                  Enumerates stored artifact keys. Required for <code>revalidateTag()</code> scanning and <code>revalidatePath(&#123; cascade: true &#125;)</code> child discovery in Edge runtime environments.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sub-section 3: Storage Configuration & Custom Adapters */}
      <div id="storage-adapters-custom" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-amber-500" />
            <span>Production Configuration &amp; Custom Implementation</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Configure distributed caching with built-in adapters like <code>RedisStorage</code> or extend <code>StorageAdapter</code> to implement a custom engine.
        </p>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="redis-storage"
            tabs={[
              {
                id: "redis-storage",
                label: "dinou.config.mjs (Redis Cluster)",
                language: "javascript",
                code: `// dinou.config.mjs
import { defineConfig } from "dinou/config";
import { RedisStorage } from "dinou/server";
import Redis from "ioredis";

// Connect to shared Redis cache (AWS ElastiCache, Upstash, or Redis cluster)
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export default defineConfig({
  // Share ISR pages and <DinouCacheSlot> fragments across all Docker / K8s replicas
  storage: new RedisStorage(redis, "dinou:cache:"),
});`,
              },
              {
                id: "custom-adapter",
                label: "sqlite-storage.ts (Custom Engine)",
                language: "typescript",
                code: `// src/lib/storage/sqlite-storage.ts
import { StorageAdapter } from "dinou/server";
import Database from "better-sqlite3";

export class SQLiteStorage extends StorageAdapter {
  private db: Database.Database;

  constructor(dbPath: string = ".dinou/cache.db") {
    super();
    this.db = new Database(dbPath);
    this.db.exec(\`
      CREATE TABLE IF NOT EXISTS dinou_cache (
        key TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        metadata TEXT
      );
    \`);
  }

  async get(key: string) {
    const row = this.db
      .prepare("SELECT content, metadata FROM dinou_cache WHERE key = ?")
      .get(key) as { content: string; metadata: string | null } | undefined;

    if (!row) return null;

    return {
      content: row.content,
      metadata: row.metadata ? JSON.parse(row.metadata) : null,
    };
  }

  async set(key: string, content: string, metadata: any = null): Promise<void> {
    const metaStr = metadata ? JSON.stringify(metadata) : null;
    this.db
      .prepare(
        "INSERT INTO dinou_cache (key, content, metadata) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET content = excluded.content, metadata = excluded.metadata"
      )
      .run(key, content, metaStr);
  }

  async has(key: string): Promise<boolean> {
    const row = this.db
      .prepare("SELECT 1 FROM dinou_cache WHERE key = ?")
      .get(key);
    return Boolean(row);
  }

  async delete(key: string): Promise<void> {
    this.db.prepare("DELETE FROM dinou_cache WHERE key = ?").run(key);
  }

  async keys(prefix: string = ""): Promise<string[]> {
    const rows = this.db
      .prepare("SELECT key FROM dinou_cache WHERE key LIKE ?")
      .all(\`\${prefix}%\`) as { key: string }[];
    return rows.map((r) => r.key);
  }
}`,
              },
              {
                id: "config-wiring",
                label: "dinou.config.mjs (Custom Wiring)",
                language: "javascript",
                code: `// dinou.config.mjs
import { defineConfig } from "dinou/config";
import { SQLiteStorage } from "./src/lib/storage/sqlite-storage.js";

export default defineConfig({
  // Register custom storage engine declaratively
  storage: new SQLiteStorage(".dinou/production-cache.db"),
});`,
              },
              {
                id: "programmatic-setup",
                label: "server-bootstrap.ts (Programmatic)",
                language: "typescript",
                code: `// server-bootstrap.ts
import { setStorageAdapter, getStorageAdapter } from "dinou/server";
import { SQLiteStorage } from "./src/lib/storage/sqlite-storage";

// Dynamically override or configure storage during server boot
const customStorage = new SQLiteStorage(".dinou/production-cache.db");
setStorageAdapter(customStorage);

// Inspect active storage adapter
const activeStorage = getStorageAdapter();
console.log("Dinou active storage adapter:", activeStorage.constructor.name);`,
              },
            ]}
          />
        </div>

        <Alert className="not-prose mt-4">
          <Database className="h-4 w-4 text-amber-500" />
          <AlertTitle>What is the Redis Key Prefix?</AlertTitle>
          <AlertDescription className="space-y-2 text-xs leading-relaxed">
            <p>
              The <code>prefix</code> parameter in <code>new RedisStorage(redis, prefix)</code> defines the namespace added to the front of every key stored in Redis:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <strong>Concrete Example:</strong> When Dinou caches the page <code>/catalog</code>, the actual key stored in your Redis database is <code>dinou:cache:catalog/index.html</code>.
              </li>
              <li>
                <strong>Avoid Collisions:</strong> If your Redis server is shared with user sessions, BullMQ queues, or database caches, this prefix guarantees that Dinou will never overwrite other application data.
              </li>
              <li>
                <strong>It is Optional:</strong> It defaults to <code>&quot;dinou:cache:&quot;</code>, so writing <code>new RedisStorage(redis)</code> is usually sufficient. You only need to change it if you share Redis across environments (e.g. <code>&quot;dinou:prod:&quot;</code> vs <code>&quot;dinou:staging:&quot;</code>).
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
}
