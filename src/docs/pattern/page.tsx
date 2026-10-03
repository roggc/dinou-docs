"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Puzzle,
  Box,
  RefreshCw,
  Database,
  ArrowUpDown,
  Cpu,
  Zap,
  Sparkles,
  CheckCircle2,
  Layers,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Code2,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "concept", title: "The Concept & Architecture", level: 2 },
  { id: "flight-rpc", title: "Flight RPC & Headless Updaters", level: 3 },
  { id: "architecture-flow", title: "5-Step Execution Lifecycle", level: 3 },
  { id: "implementation", title: "Step-by-Step Implementation", level: 2 },
  { id: "step-1-store", title: "1. The Native Store (useSyncExternalStore)", level: 3 },
  { id: "step-2-updater", title: "2. The Headless Client Updater", level: 3 },
  { id: "step-3-mutation", title: "3. Server Function Mutation", level: 3 },
  { id: "step-4-query", title: "4. Server Data Query Function", level: 3 },
  { id: "step-5-display", title: "5. Display Component", level: 3 },
  { id: "step-6-page", title: "6. Putting It All Together in the Page", level: 3 },
  { id: "external-stores", title: "Integration with External Stores (Zustand)", level: 2 },
  { id: "comparison", title: "Comparison & Key Advantages", level: 2 },
  { id: "best-practices", title: "Best Practices & Error Handling", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Advanced Patterns: The &quot;Dinou Pattern&quot;
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Combine Server Functions, Headless Client Updaters, and pure React 19 primitives
              (<code>useSyncExternalStore</code>, <code>use()</code>, and <code>&lt;Suspense&gt;</code>)
              for surgical reactivity &mdash; with <strong>zero external dependencies required</strong> (and full compatibility with external state managers like Zustand or Jotai).
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Concept Section */}
            <section id="concept">
              <h2>The Concept &amp; Architecture</h2>
              <p>
                In standard React Server Component frameworks, mutations often require triggering a full-tree re-render via route revalidation (such as <code>revalidatePath</code>). While simple, full-page revalidation can cause unnecessary re-renders of unrelated components, reset unsaved form inputs, or cause layout shifts.
              </p>
              <p>
                The <strong>Dinou Pattern</strong> offers a modern alternative by leveraging the unique ability of Server Functions to return Client Components directly over the React Flight RPC protocol. After executing a mutation securely in Node.js, the server returns an invisible <strong>Headless State Updater</strong> component that:
              </p>
              <ol>
                <li>
                  Mounts on the client (rendering <code>null</code>, emitting 0 DOM nodes and 0 layout shifts).
                </li>
                <li>
                  Executes a client-side <code>useEffect</code> upon mounting to notify a store.
                </li>
                <li>
                  Selectively invalidates only dependent queries, streaming the updated UI via React 19 <code>&lt;Suspense&gt;</code> and <code>use()</code> without full-page reloads.
                </li>
              </ol>

              {/* Sub-section: Flight RPC */}
              <div id="flight-rpc" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Flight RPC &amp; Headless Updaters</h3>
                <p>
                  Because Server Functions communicate using the React Flight protocol rather than plain JSON REST endpoints, the server can return serialized references to Client Components with custom props:
                </p>
                <div className="grid gap-4 sm:grid-cols-2 not-prose my-4">
                  <div className="rounded-lg border bg-card p-4 space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-blue-600 dark:text-blue-400">
                      <Cpu className="h-4 w-4" />
                      <span>Server Authority</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The Server Function owns the business logic, validates inputs, and updates the database in secure Node.js runtime.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-4 space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-purple-600 dark:text-purple-400">
                      <Layers className="h-4 w-4" />
                      <span>Client Synchronization</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Returning the headless component allows the server to orchestrate client state transitions without coupling to client network listeners.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub-section: 5-Step Architecture Flow */}
              <div id="architecture-flow" className="mt-8">
                <h3 className="text-lg font-bold">5-Step Execution Lifecycle</h3>
                <p>
                  The following flow illustrates how the mutation, stream, store update, and surgical re-render operate in unison:
                </p>

                <div className="border rounded-xl p-5 bg-card not-prose mt-4 shadow-sm">
                  <div className="flex items-center gap-2 font-semibold mb-4 text-sm">
                    <Puzzle className="h-5 w-5 text-purple-500" />
                    <span>Lifecycle Timeline</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
                      <div>
                        <div className="font-semibold text-foreground">Client Invocation</div>
                        <div className="text-xs text-muted-foreground">User submits an action; client invokes the Server Function (e.g. <code>addPatternTask()</code>) and sets a mutation promise into a headless boundary.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</div>
                      <div>
                        <div className="font-semibold text-foreground">Backend Mutation (Node.js)</div>
                        <div className="text-xs text-muted-foreground">The Server Function writes changes safely to the database or external services on the server.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</div>
                      <div>
                        <div className="font-semibold text-foreground">Flight Stream Response</div>
                        <div className="text-xs text-muted-foreground">Rather than raw JSON, the server streams back the invisible <code>&lt;PatternTaskUpdater /&gt;</code> Client Component.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</div>
                      <div>
                        <div className="font-semibold text-foreground">Headless Mount &amp; Store Update</div>
                        <div className="text-xs text-muted-foreground">The updater mounts (rendering <code>null</code>), and its <code>useEffect</code> signals the native store via <code>useSyncExternalStore</code>.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">5</div>
                      <div>
                        <div className="font-semibold text-foreground">Surgical Stream Re-fetch</div>
                        <div className="text-xs text-muted-foreground">Only the dependent query <code>&lt;Suspense&gt;</code> boundary re-fetches and streams the updated list, leaving form focus and scroll untouched.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Implementation Walkthrough */}
            <section id="implementation" className="mt-12">
              <h2>Step-by-Step Implementation</h2>
              <p>
                Here is the complete, modular implementation using native React 19 primitives with zero external packages.
              </p>

              {/* Step 1: Native Store */}
              <div id="step-1-store" className="mt-8">
                <h3>1. The Native Store (React 19 <code>useSyncExternalStore</code>)</h3>
                <p>
                  Create a lightweight singleton store with native React 19 primitives. It has zero external dependencies, is lightweight, and is 100% SSR-safe:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/pattern-store.ts
import { useSyncExternalStore } from "react";

// Pure native React 19 global state (0 external dependencies)
let tasksListKey = 0;
const listeners = new Set<() => void>();

export const patternStore = {
  getSnapshot: () => tasksListKey,
  incrementTasksListKey: () => {
    tasksListKey += 1;
    listeners.forEach((listener) => listener());
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useTasksListKey(): number {
  return useSyncExternalStore(
    patternStore.subscribe,
    patternStore.getSnapshot,
    patternStore.getSnapshot // Server snapshot for SSR hydration safety
  );
}`}
                </CodeBlock>
                <p className="mt-2 text-xs text-muted-foreground">
                  <strong>SSR Compatibility:</strong> Providing <code>patternStore.getSnapshot</code> as the third argument ensures identical initial values during server rendering and client hydration, preventing hydration mismatch warnings.
                </p>
              </div>

              {/* Step 2: Headless Updater */}
              <div id="step-2-updater" className="mt-8">
                <h3>2. The Headless Client Updater</h3>
                <p>
                  An invisible Client Component that renders <code>null</code> (0 DOM elements), but synchronizes the store when mounted:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/pattern-updater.tsx
"use client";
import { useEffect } from "react";
import { patternStore } from "../pattern-store";

export default function PatternTaskUpdater({ id, taskText }: { id?: string; taskText?: string }) {
  useEffect(() => {
    // When mounted on the client after Server Function completes,
    // atomically updates the React store
    patternStore.incrementTasksListKey();
  }, [id, taskText]);

  return null; // Headless component: emits zero DOM nodes and 0 layout shifts
}`}
                </CodeBlock>
              </div>

              {/* Step 3: Server Function Mutation */}
              <div id="step-3-mutation" className="mt-8">
                <h3>3. The Server Function Mutation</h3>
                <p>
                  Performs the backend mutation in Node.js and returns the Headless Updater component over Flight RPC:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/server-functions/pattern-demo.tsx
"use server";
import type { ReactNode } from "react";
import PatternTaskUpdater from "../components/pattern-updater";
import { tasksDb } from "./db";

export async function addPatternTask(text: string): Promise<ReactNode> {
  const trimmed = text.trim();
  const id = Math.random().toString(36).substring(2, 9);
  
  if (trimmed) {
    tasksDb.unshift({
      id,
      text: trimmed,
      createdAt: new Date().toLocaleTimeString(),
    });
  }

  // The server orchestrates the client by returning the Headless Updater!
  return <PatternTaskUpdater key={id} id={id} taskText={trimmed} />;
}`}
                </CodeBlock>
              </div>

              {/* Step 4: Data Query Function */}
              <div id="step-4-query" className="mt-8">
                <h3>4. Server Data Query Function</h3>
                <p>Fetches and renders the updated list directly on the server:</p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/server-functions/pattern-demo.tsx (continued)
"use server";
import type { ReactNode } from "react";
import PatternTasksList from "../components/pattern-tasks-list";
import { tasksDb } from "./db";

export async function fetchPatternTasks(): Promise<ReactNode> {
  return <PatternTasksList tasks={[...tasksDb]} />;
}`}
                </CodeBlock>
              </div>

              {/* Step 5: Display Component */}
              <div id="step-5-display" className="mt-8">
                <h3>5. Display Component (Client Component)</h3>
                <p>Renders the list of tasks received from the server query:</p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/pattern-tasks-list.tsx
"use client";

export interface PatternTaskItem {
  id: string;
  text: string;
  createdAt: string;
}

export default function PatternTasksList({ tasks }: { tasks: PatternTaskItem[] }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-muted-foreground text-sm">No tasks yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="p-2.5 rounded-lg border bg-card flex justify-between">
          <span>{task.text}</span>
          <span className="text-xs text-muted-foreground">{task.createdAt}</span>
        </li>
      ))}
    </ul>
  );
}`}
                </CodeBlock>
              </div>

              {/* Step 6: Page Coordination */}
              <div id="step-6-page" className="mt-8">
                <h3>6. Putting It All Together in the Page</h3>
                <p>
                  The view coordinates mutation promises and queries with React 19&apos;s native <code>use()</code> hook and <code>&lt;Suspense&gt;</code>:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/page.tsx
"use client";
import { useState, useEffect, Suspense, use, type ReactNode } from "react";
import { addPatternTask, fetchPatternTasks } from "./server-functions/pattern-demo";
import { useTasksListKey } from "./pattern-store";

function TasksStream({ promise }: { promise: Promise<ReactNode> }) {
  // Native React 19: unroll the Flight stream promise
  const content = use(promise);
  return <>{content}</>;
}

function MutationStream({ promise }: { promise: Promise<ReactNode> }) {
  const content = use(promise);
  return <>{content}</>;
}

export default function Page() {
  const tasksListKey = useTasksListKey();
  const [text, setText] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const [mutationKey, setMutationKey] = useState(0);
  const [mutationPromise, setMutationPromise] = useState<Promise<ReactNode> | null>(null);
  const [tasksPromise, setTasksPromise] = useState<Promise<ReactNode>>(() => fetchPatternTasks());

  // Invalidate and re-fetch only when the store increments tasksListKey
  useEffect(() => {
    if (tasksListKey > 0) {
      setTasksPromise(fetchPatternTasks());
    }
  }, [tasksListKey]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isMutating) return;

    setIsMutating(true);
    setMutationKey((k) => k + 1);
    const p = addPatternTask(trimmed);
    p.finally(() => {
      setIsMutating(false);
      setText("");
    });
    setMutationPromise(p);
  };

  return (
    <div className="space-y-6">
      {/* 1. Mutation Form */}
      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task..."
          disabled={isMutating}
          className="input"
        />
        <button type="submit" disabled={isMutating || !text.trim()} className="btn-primary">
          {isMutating ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* 2. Headless Mutation Mount (renders null, updates store) */}
      {mutationPromise && (
        <Suspense key={\`mutation-\${mutationKey}\`} fallback={null}>
          <MutationStream promise={mutationPromise} />
        </Suspense>
      )}

      {/* 3. Surgical Reactive Tasks List */}
      <Suspense
        key={\`pattern-tasks-\${tasksListKey}\`}
        fallback={<div>Streaming updated list from Node.js...</div>}
      >
        <TasksStream promise={tasksPromise} />
      </Suspense>
    </div>
  );
}`}
                </CodeBlock>
              </div>

              <Alert className="not-prose mt-8">
                <Zap className="h-4 w-4" />
                <AlertTitle>How It Works</AlertTitle>
                <AlertDescription>
                  <ol className="list-decimal pl-4 space-y-1.5 mt-2 text-xs leading-relaxed">
                    <li>
                      User submits the form, initiating <code>addPatternTask()</code> without full-page reloads.
                    </li>
                    <li>
                      The mutation promise is passed to a headless <code>&lt;Suspense&gt;</code> boundary.
                    </li>
                    <li>
                      Server mutates the database in Node.js and returns <code>&lt;PatternTaskUpdater /&gt;</code> over Flight RPC.
                    </li>
                    <li>
                      <code>PatternTaskUpdater</code> mounts, executing its <code>useEffect</code> to increment <code>tasksListKey</code> in the native <code>useSyncExternalStore</code>.
                    </li>
                    <li>
                      The store notifies the page, calling <code>fetchPatternTasks()</code> to obtain the fresh stream.
                    </li>
                    <li>
                      Only the tasks list <code>&lt;Suspense&gt;</code> boundary updates smoothly, keeping inputs, state, and scroll position completely intact.
                    </li>
                  </ol>
                </AlertDescription>
              </Alert>
            </section>

            {/* External Store Integration */}
            <section id="external-stores" className="mt-12">
              <h2>Integration with External Stores (Zustand &amp; Jotai)</h2>
              <p>
                While the native <code>useSyncExternalStore</code> pattern provides surgical reactivity with <strong>zero external packages</strong> in your client bundle, the Dinou Pattern works just as seamlessly with popular state managers like Zustand, Jotai, or Redux.
              </p>
              <p>
                To use an external state library, simply invoke your store&apos;s action inside the Headless Updater:
              </p>
              <CodeBlock
                language="tsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// src/components/zustand-task-updater.tsx
"use client";
import { useEffect } from "react";
import { useTaskStore } from "../stores/task-store";

export default function ZustandTaskUpdater({ newTask }: { newTask: { id: string; text: string } }) {
  useEffect(() => {
    // Directly update the Zustand store outside React render cycle
    useTaskStore.getState().addTask(newTask);
  }, [newTask]);

  return null; // Headless component
}`}
              </CodeBlock>
              <p className="mt-3 text-sm text-muted-foreground">
                This flexibility allows you to adopt the Dinou Pattern incrementally without abandoning your existing state management architecture.
              </p>
            </section>

            {/* Comparison Section */}
            <section id="comparison" className="mt-12">
              <h2>Comparison &amp; Key Advantages</h2>
              <p>
                Comparing the Dinou Pattern against traditional route revalidation and legacy client-only data fetching:
              </p>

              <div className="not-prose my-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-left">
                      <th className="p-3 font-semibold border-b">Feature</th>
                      <th className="p-3 font-semibold border-b text-blue-600 dark:text-blue-400">Dinou Pattern</th>
                      <th className="p-3 font-semibold border-b text-muted-foreground">revalidatePath (Route Level)</th>
                      <th className="p-3 font-semibold border-b text-muted-foreground">REST / React Query</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-xs">
                    <tr>
                      <td className="p-3 font-medium">Reactivity Scope</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Surgical (targeted boundary only)</td>
                      <td className="p-3 text-muted-foreground">Broad (entire route page tree)</td>
                      <td className="p-3 text-muted-foreground">Surgical (query key invalidation)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Form / Input Focus</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">100% Preserved (zero blur or reset)</td>
                      <td className="p-3 text-muted-foreground">Risk of reset if not isolated</td>
                      <td className="p-3 text-muted-foreground">Preserved</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Bundle Overhead</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">0 KB (React 19 native primitives)</td>
                      <td className="p-3 text-muted-foreground">0 KB</td>
                      <td className="p-3 text-muted-foreground">~12&ndash;15 KB (client library)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Backend Authority</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Direct Node.js Server Functions</td>
                      <td className="p-3 text-muted-foreground">Direct Node.js Server Actions</td>
                      <td className="p-3 text-muted-foreground">Requires dedicated API endpoint</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">DOM Impact</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">0 DOM nodes emitted by updater</td>
                      <td className="p-3 text-muted-foreground">Full route DOM diffing</td>
                      <td className="p-3 text-muted-foreground">N/A (data only)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <ArrowUpDown className="h-5 w-5" />
                      <span>Surgical Reactivity</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Only the targeted component re-fetches and re-renders. Inputs, local states, and other UI sections remain completely untouched.
                  </CardContent>
                </Card>
                <Card className="border-purple-500/20 bg-purple-50/50 dark:bg-purple-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <Sparkles className="h-5 w-5" />
                      <span>Zero External Dependencies</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Powered natively by React 19 primitives: <code>useSyncExternalStore</code>, <code>use()</code>, <code>&lt;Suspense&gt;</code>, and Flight RPC. If your project already uses an external state manager like Zustand or Jotai, it works seamlessly alongside it.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Best Practices Section */}
            <section id="best-practices" className="mt-12">
              <h2>Best Practices &amp; Error Handling</h2>

              <div className="space-y-6 mt-4">
                <div className="rounded-lg border p-4 bg-card not-prose space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>Server-Side Mutation Errors &amp; Atomic Rollbacks</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Because Flight RPC streams errors as rejected promises, if the server mutation throws an exception in Node.js, the promise rejects on the client and the Headless Updater <strong>never mounts</strong>. This guarantees that your client-side store is never corrupted with failed mutation state.
                  </p>
                  <CodeBlock
                    language="typescript"
                    containerClassName="w-full overflow-hidden rounded-lg mt-2"
                  >
{`try {
  const p = addPatternTask(trimmedText);
  setMutationPromise(p);
  await p; // If Node.js throws, execution jumps to catch
} catch (error) {
  // Headless updater never mounted; store was NOT modified!
  console.error("Mutation failed on server:", error);
  toast.error("Failed to add task");
}`}
                  </CodeBlock>
                </div>

                <div className="rounded-lg border p-4 bg-card not-prose space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <RefreshCw className="h-4 w-4 text-blue-500" />
                    <span>Unique Mutation Keys in Consecutive Calls</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    When invoking the mutation multiple times in rapid succession, increment a mutation key (e.g. <code>setMutationKey((k) =&gt; k + 1)</code>) on the mutation <code>&lt;Suspense key=...&gt;</code> boundary. This forces React to unmount the previous updater and mount the new one fresh.
                  </p>
                </div>

                <div className="rounded-lg border p-4 bg-card not-prose space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Code2 className="h-4 w-4 text-purple-500" />
                    <span>Lightweight Headless Footprint</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Keep Headless Updaters purely functional. Do not include heavy logic or DOM markup inside them. They exist solely as the reactive bridge between the Server Function RPC response and the client-side state store.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Hidden on Mobile */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
