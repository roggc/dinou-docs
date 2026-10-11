import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import { Badge } from "@/docs/components/ui/badge";
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
  Info,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";

const tocItems = [
  { id: "concept", title: "The Concept & Architecture", level: 2 },
  { id: "flight-rpc", title: "Flight RPC & Headless Updaters", level: 3 },
  { id: "architecture-flow", title: "5-Step Execution Lifecycle", level: 3 },
  { id: "implementation", title: "Step-by-Step Implementation", level: 2 },
  { id: "step-1-store", title: "1. The Global Store (Zustand)", level: 3 },
  { id: "step-2-updater", title: "2. The Headless Client Updater", level: 3 },
  { id: "step-3-mutation", title: "3. Server Function Mutation", level: 3 },
  { id: "step-4-query", title: "4. Server Data Query Function", level: 3 },
  { id: "step-5-display", title: "5. Display Component", level: 3 },
  { id: "step-6-page", title: "6. Putting It All Together in the Page", level: 3 },
  { id: "zero-dependency", title: "Zero-Dependency Option (useSyncExternalStore)", level: 2 },
  { id: "comparison", title: "Comparison & Key Advantages", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-foreground bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              >
                Architectural Pattern
              </Badge>
              <Badge
                variant="outline"
                className="font-mono text-xs text-emerald-700 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/30"
              >
                Surgical Reactivity
              </Badge>
              <Badge
                variant="outline"
                className="font-mono text-xs text-muted-foreground"
              >
                Flight RPC + Global Store
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                The Dinou Pattern
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Combine Server Functions, Headless Client Updaters, and React 19 primitives
              (<code>use()</code> and <code>&lt;Suspense&gt;</code>) with your global store (such as <strong>Zustand</strong>)
              for surgical, zero-layout-shift reactivity &mdash; without route-wide reloads or lost input focus.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Concept Section */}
            <section id="concept">
              <h2>The Concept &amp; Architecture</h2>
              <p>
                In full-stack React applications, mutations often trigger broad page re-renders or full route re-fetches. This can cause unnecessary re-renders of unrelated components, reset unsaved form inputs, or cause visible layout shifts.
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
                    <div className="flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                      <Cpu className="h-4 w-4" />
                      <span>Server Authority</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The Server Function owns the business logic, validates inputs, and updates the database in secure Node.js runtime.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-4 space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400">
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
                    <Puzzle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <span>Lifecycle Timeline</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
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
                      <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</div>
                      <div>
                        <div className="font-semibold text-foreground">Flight Stream Response</div>
                        <div className="text-xs text-muted-foreground">Rather than raw JSON, the server streams back the invisible <code>&lt;PatternTaskUpdater /&gt;</code> Client Component.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</div>
                      <div>
                        <div className="font-semibold text-foreground">Headless Mount &amp; Store Update</div>
                        <div className="text-xs text-muted-foreground">The updater mounts (rendering <code>null</code>), and its <code>useEffect</code> invalidates the key in the global store (e.g. <code>useTaskStore.getState().invalidateTasks()</code>).</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">5</div>
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
                Here is the complete, modular implementation showing how Server Functions, Flight RPC, and Zustand orchestrate surgical reactivity without route revalidations:
              </p>

              {/* Step 1: Global Store */}
              <div id="step-1-store" className="mt-8">
                <h3>1. The Global Store (Zustand)</h3>
                <p>
                  A minimal store holding a reactive invalidation key. Any global state manager (such as Zustand, Jotai, or Redux) works identically:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/stores/task-store.ts
import { create } from "zustand";

interface TaskStore {
  tasksKey: number;
  invalidateTasks: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasksKey: 0,
  invalidateTasks: () => set((state) => ({ tasksKey: state.tasksKey + 1 })),
}));`}
                </CodeBlock>
                <p className="mt-2 text-xs text-muted-foreground">
                  <strong>Why it matters:</strong> Calling <code>invalidateTasks()</code> increments <code>tasksKey</code>, signaling subscribing components to re-fetch their Suspense stream without triggering route-wide re-renders.
                </p>
              </div>

              {/* Step 2: Headless Updater */}
              <div id="step-2-updater" className="mt-8">
                <h3>2. The Headless Client Updater</h3>
                <p>
                  An invisible Client Component that renders <code>null</code> (0 DOM elements), but invokes the store&apos;s invalidation action when mounted:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/pattern-updater.tsx
"use client";
import { useEffect } from "react";
import { useTaskStore } from "../stores/task-store";

export default function PatternTaskUpdater({ id }: { id?: string }) {
  useEffect(() => {
    // Atomically signal the store outside the render cycle
    useTaskStore.getState().invalidateTasks();
  }, [id]);

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
  return <PatternTaskUpdater key={id} id={id} />;
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
                  The view coordinates mutation promises and queries with React 19&apos;s native <code>use()</code> hook and <code>&lt;Suspense&gt;</code>. Switch tabs below to explore each component in the unified architecture:
                </p>
                <TabbedCodeBlock
                  containerClassName="w-full overflow-hidden rounded-lg my-4"
                  tabs={[
                    {
                      id: "page",
                      label: "src/page.tsx",
                      language: "tsx",
                      code: `"use client";
import { useState, useEffect, Suspense, use, type ReactNode } from "react";
import { addPatternTask, fetchPatternTasks } from "./server-functions/pattern-demo";
import { useTaskStore } from "./stores/task-store";

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
  const tasksKey = useTaskStore((state) => state.tasksKey);
  const [text, setText] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const [mutationKey, setMutationKey] = useState(0);
  const [mutationPromise, setMutationPromise] = useState<Promise<ReactNode> | null>(null);
  const [tasksPromise, setTasksPromise] = useState<Promise<ReactNode>>(() => fetchPatternTasks());

  // Invalidate and re-fetch only when the store increments tasksKey
  useEffect(() => {
    if (tasksKey > 0) {
      setTasksPromise(fetchPatternTasks());
    }
  }, [tasksKey]);

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
        key={\`pattern-tasks-\${tasksKey}\`}
        fallback={<div>Streaming updated list from Node.js...</div>}
      >
        <TasksStream promise={tasksPromise} />
      </Suspense>
    </div>
  );
}`,
                    },
                    {
                      id: "store",
                      label: "src/stores/task-store.ts",
                      language: "typescript",
                      code: `import { create } from "zustand";

interface TaskStore {
  tasksKey: number;
  invalidateTasks: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasksKey: 0,
  invalidateTasks: () => set((state) => ({ tasksKey: state.tasksKey + 1 })),
}));`,
                    },
                    {
                      id: "updater",
                      label: "src/components/pattern-updater.tsx",
                      language: "tsx",
                      code: `"use client";
import { useEffect } from "react";
import { useTaskStore } from "../stores/task-store";

export default function PatternTaskUpdater({ id }: { id?: string }) {
  useEffect(() => {
    // Atomically signal the store outside the render cycle
    useTaskStore.getState().invalidateTasks();
  }, [id]);

  return null; // Headless component: emits zero DOM nodes and 0 layout shifts
}`,
                    },
                    {
                      id: "server-fn",
                      label: "src/server-functions/pattern-demo.tsx",
                      language: "tsx",
                      code: `"use server";
import type { ReactNode } from "react";
import PatternTaskUpdater from "../components/pattern-updater";
import PatternTasksList from "../components/pattern-tasks-list";
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
  return <PatternTaskUpdater key={id} id={id} />;
}

export async function fetchPatternTasks(): Promise<ReactNode> {
  return <PatternTasksList tasks={[...tasksDb]} />;
}`,
                    },
                    {
                      id: "display",
                      label: "src/components/pattern-tasks-list.tsx",
                      language: "tsx",
                      code: `"use client";

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
}`,
                    },
                  ]}
                />
              </div>

              <Alert className="not-prose mt-8">
                <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
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
                      <code>PatternTaskUpdater</code> mounts, executing its <code>useEffect</code> to call <code>useTaskStore.getState().invalidateTasks()</code>.
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

              {/* Technical Notes & Error Handling Callout */}
              <div className="rounded-xl border border-border/80 bg-muted/20 p-5 not-prose mt-6 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Production Notes: Error Handling &amp; React Lifecycle</span>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Point 1: Server errors & atomic rollbacks */}
                  <div className="rounded-lg border bg-card p-4 space-y-2">
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Server-Side Mutation Errors &amp; Atomic Rollbacks
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Flight RPC streams server errors as rejected promises. If the Server Function throws in Node.js, the promise rejects on the client and the Headless Updater <strong>never mounts</strong>. This guarantees that your client-side store is never corrupted with failed mutation state.
                    </p>
                    <CodeBlock
                      language="typescript"
                      containerClassName="w-full overflow-hidden rounded-md mt-2"
                    >
{`try {
  const p = addPatternTask(trimmed);
  setMutationPromise(p);
  await p; // If Node.js throws, execution jumps to catch
} catch (error) {
  // Headless updater never mounted; store was NOT modified!
  console.error("Mutation failed on server:", error);
  toast.error("Failed to add task");
}`}
                    </CodeBlock>
                  </div>

                  {/* Points 2 & 3 */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-lg border bg-card p-3.5 space-y-1.5">
                      <div className="font-semibold text-foreground flex items-center gap-2">
                        <RefreshCw className="h-3.5 w-3.5 text-amber-500" />
                        Consecutive Mutation Keys
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        When triggering multiple rapid mutations, incrementing <code>setMutationKey((k) =&gt; k + 1)</code> on the <code>&lt;Suspense key=...&gt;</code> boundary forces React to cleanly unmount the previous updater and mount the new one fresh.
                      </p>
                    </div>

                    <div className="rounded-lg border bg-card p-3.5 space-y-1.5">
                      <div className="font-semibold text-foreground flex items-center gap-2">
                        <Code2 className="h-3.5 w-3.5 text-slate-500" />
                        Lightweight Headless Footprint
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Keep Headless Updaters purely functional with zero DOM output (<code>return null</code>). They exist solely as the reactive bridge between the Server Function RPC response and the client-side store.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Zero-Dependency Alternative */}
            <section id="zero-dependency" className="mt-12">
              <h2>Zero-Dependency Option: Native <code>useSyncExternalStore</code></h2>
              <p>
                If you prefer not to include any third-party state libraries in your client bundle, you can achieve the exact same surgical reactivity using React 19&apos;s native <code>useSyncExternalStore</code> hook:
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// src/stores/native-store.ts
import { useSyncExternalStore } from "react";

let tasksKey = 0;
const listeners = new Set<() => void>();

export const nativeTaskStore = {
  getSnapshot: () => tasksKey,
  invalidateTasks: () => {
    tasksKey += 1;
    listeners.forEach((listener) => listener());
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useNativeTasksKey(): number {
  return useSyncExternalStore(
    nativeTaskStore.subscribe,
    nativeTaskStore.getSnapshot,
    nativeTaskStore.getSnapshot // Server snapshot for SSR hydration safety
  );
}`}
              </CodeBlock>
              <p className="mt-3 text-sm text-muted-foreground">
                In your Headless Updater, simply invoke <code>nativeTaskStore.invalidateTasks()</code> instead of <code>useTaskStore.getState().invalidateTasks()</code>. The lifecycle, Flight RPC streaming, and selective re-fetching behavior remain 100% identical.
              </p>
            </section>

            {/* Comparison Section */}
            <section id="comparison" className="mt-12">
              <h2>Comparison &amp; Key Advantages</h2>
              <p>
                Comparing the Dinou Pattern against traditional client-side data fetching (REST / React Query):
              </p>

              <div className="not-prose my-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-left">
                      <th className="p-3 font-semibold border-b">Feature</th>
                      <th className="p-3 font-semibold border-b text-emerald-600 dark:text-emerald-400">The Dinou Pattern</th>
                      <th className="p-3 font-semibold border-b text-muted-foreground">REST / React Query (SPA)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-xs">
                    <tr>
                      <td className="p-3 font-medium">Reactivity Scope</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Surgical (targeted boundary only)</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400">Surgical (query key invalidation)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Form / Input Focus</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">100% Preserved (zero blur or reset)</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400">Preserved</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Bundle Overhead</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">~1 KB (Zustand) or 0 KB (Native)</td>
                      <td className="p-3 text-amber-600 dark:text-amber-400 font-medium">~12&ndash;15 KB (client query library)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Backend Architecture</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Direct Node.js Server Functions (&quot;use server&quot;)</td>
                      <td className="p-3 text-amber-600 dark:text-amber-400 font-medium">Requires dedicated HTTP API endpoints (/api/...)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Data Transport</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">React Flight RPC (typed component streaming)</td>
                      <td className="p-3 text-amber-600 dark:text-amber-400 font-medium">JSON serialization + manual client fetch logic</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Boilerplate</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Zero API routes, controllers, or fetch hooks</td>
                      <td className="p-3 text-amber-600 dark:text-amber-400 font-medium">Manual endpoints, fetch hooks, error states, and types</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">DOM Impact</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">0 DOM nodes emitted by headless updater</td>
                      <td className="p-3 text-muted-foreground">N/A (data only)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <ArrowUpDown className="h-5 w-5" />
                      <span>Surgical Reactivity</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Only the targeted component re-fetches and re-renders. Inputs, local states, and other UI sections remain completely untouched.
                  </CardContent>
                </Card>
                <Card className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Sparkles className="h-5 w-5" />
                      <span>Zero Friction State Management</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Pairs seamlessly with your existing global store (Zustand, Jotai, or Redux) or native <code>useSyncExternalStore</code> alongside React 19&apos;s Flight RPC and <code>&lt;Suspense&gt;</code>.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
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
