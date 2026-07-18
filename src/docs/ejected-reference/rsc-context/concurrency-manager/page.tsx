"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { GitBranch, ShieldCheck, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "queue-flow", title: "📊 Concurrency Queue Flow", level: 2 },
  { id: "why-limiter", title: "⚡ Resource Protection", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const LIMITER_DIAGRAM = `graph TD
    Start[async run task] --> LimitCheck{Is activeCount >= limit?}
    
    LimitCheck -->|Yes| QueueTask[Push resolve callback to queue & Wait for promise resolve signal]
    LimitCheck -->|No| Proceed[Proceed immediately]
    
    QueueTask --> Proceed
    Proceed --> Inc[Increment activeCount]
    Inc --> ExecTask[Execute Task]
    ExecTask --> Dec[Decrement activeCount]
    
    Dec --> QueueCheck{Is queue populated?}
    QueueCheck -->|Yes| ShiftQueue[Shift next resolve signal from queue]
    QueueCheck -->|No| Exit[Exit run block / No-op]`;

const LIMITER_CODE = `class ConcurrencyManager {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent;
    this.activeCount = 0;
    this.queue = [];
  }

  /**
   * Executes an asynchronous task respecting the concurrency limit.
   * @param {Function} task - Function that returns a promise (e.g., render/fork logic)
   */
  async run(task) {
    // 1. If active renders exceed limit, queue a pending promise callback
    if (this.activeCount >= this.maxConcurrent) {
      await new Promise((resolve) => this.queue.push(resolve));
    }

    this.activeCount++;

    try {
      // 2. Execute target async task
      return await task();
    } finally {
      this.activeCount--;

      // 3. Pop and execute the next task in the queue once current task finishes
      if (this.queue.length > 0) {
        const nextResolve = this.queue.shift();
        nextResolve(); // Resolves the promise in step 1, letting the queued task proceed
      }
    }
  }

  // Helper for server status monitoring
  getStatus() {
    return { active: this.activeCount, queued: this.queue.length };
  }
}

// 4. Initialize global instance bound to CPU cores
const os = require("os");
const MAX_PROCESSES =
  process.env.MAX_CONCURRENT_RENDERS || Math.max(1, os.cpus().length * 2);

const processLimiter = new ConcurrencyManager(MAX_PROCESSES);

module.exports = processLimiter;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <GitBranch className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Concurrency Manager (concurrency-manager.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the rendering process limiter, async queue scheduler, and cpu-bound scaling systems.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/concurrency-manager.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                RSC servers compile complex component trees and load multiple database states. Under high request traffic, initiating too many render cycles concurrently can saturate CPU bounds and trigger memory out-of-memory (OOM) crashes.
              </p>
              <p>
                The <code>concurrency-manager.js</code> file exposes a global queue manager that restricts concurrent page renders to a safe threshold, deferring additional incoming requests to a queue.
              </p>
            </section>

            <hr className="my-8" />

            {/* QUEUE FLOW */}
            <section id="queue-flow">
              <h2>📊 Concurrency Queue Flow</h2>
              <p>
                The flowchart below traces the task scheduling lifecycle of the concurrency queue:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{LIMITER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* WHY LIMITER */}
            <section id="why-limiter">
              <h2>⚡ Resource Protection</h2>
              <p>
                The manager configures limit thresholds dynamically to fit the host hardware:
              </p>
              <ul>
                <li>
                  <strong>CPU-Bound Scaling:</strong> Defaults the concurrency limit to <code>CPUs * 2</code>. For example, on a 4-core processor, it permits up to 8 concurrent render cycles, queueing any additional operations.
                </li>
                <li>
                  <strong>Configurable Limits:</strong> Allows overriding limits via the <code>MAX_CONCURRENT_RENDERS</code> environment variable.
                </li>
                <li>
                  <strong>Automatic Resolution:</strong> Leverages Javascript `try/finally` blocks to guarantee that queued tasks proceed even if an active rendering thread crashes.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>concurrency-manager.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{LIMITER_CODE}</CodeBlock>
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
