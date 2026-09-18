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
  Link as LinkIcon,
  Database,
  ArrowUpDown,
  Cpu,
  Zap,
  Sparkles,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "concept", title: "The Concept", level: 2 },
  { id: "implementation", title: "Implementation", level: 2 },
  { id: "components", title: "Components Walkthrough", level: 3 },
  { id: "page-consumption", title: "Page Consumption", level: 3 },
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
              for surgical reactivity &mdash; with <strong>zero external dependencies required</strong> (and full compatibility with external state managers).
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="concept">
              <h2>The Concept</h2>
              <p>
                The Dinou Pattern leverages the unique ability of Server
                Functions to return Client Components over Flight RPC. After executing a mutation in Node.js, the server returns an invisible <strong>Headless State Updater</strong> component that:
              </p>
              <ol>
                <li>
                  Mounts on the client (rendering <code>null</code>, emitting 0 DOM nodes).
                </li>
                <li>
                  Executes a client-side <code>useEffect</code> to update a native store based on <code>useSyncExternalStore</code>.
                </li>
                <li>
                  Selectively invalidates dependent queries, streaming the updated UI via React 19 <code>&lt;Suspense&gt;</code> and <code>use()</code> without full-page reloads.
                </li>
              </ol>

              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Puzzle className="h-5 w-5 text-purple-500" />
                  <span>5-Step Architecture Flow</span>
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span><strong>1. Call:</strong> Client invokes a Server Function (e.g. <code>addPatternTask()</code>)</span>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span><strong>2. DB Mutation:</strong> Node.js updates the database or state</span>
                  </div>
                  <div className="flex items-center gap-2 ml-8">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span><strong>3. Flight Stream:</strong> Server returns the headless <code>&lt;PatternTaskUpdater /&gt;</code></span>
                  </div>
                  <div className="flex items-center gap-2 ml-12">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span><strong>4. Native Store:</strong> Updater mounts and increments key in <code>useSyncExternalStore</code></span>
                  </div>
                  <div className="flex items-center gap-2 ml-16">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <span><strong>5. Surgical Re-stream:</strong> Dependent <code>&lt;Suspense&gt;</code> re-fetches and renders the updated list</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="implementation">
              <h2>Implementation</h2>
              <p>
                Follow these steps to implement the Dinou Pattern using pure React 19 primitives with zero external state libraries &mdash; or optionally alongside your preferred global state manager.
              </p>

              <section id="components">
                <h3>1. The Native Store (React 19 <code>useSyncExternalStore</code>)</h3>
                <p>
                  Create a lightweight singleton store with native React 19 primitives. No external state library is required; however, if your project already uses or benefits from a state management library (such as Zustand, Jotai, or Redux), the Dinou Pattern is completely compatible and you can update your existing store inside the Headless Updater just as easily.
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
    patternStore.getSnapshot // For SSR compatibility
  );
}`}
                </CodeBlock>
                <p className="mt-2 text-xs text-muted-foreground">
                  <strong>Note on external state libraries:</strong> While native <code>useSyncExternalStore</code> provides surgical reactivity with zero extra packages in your bundle, you can freely plug in any state library of your choice (like a Zustand <code>set()</code> call or a Jotai atom) inside the updater without any friction.
                </p>

                <h3>2. The Headless Updater (Client Component)</h3>
                <p>
                  An invisible Client Component that renders <code>null</code> (0 DOM elements), but synchronizes the store when mounted.
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
    // When mounted on client after Server Function completes,
    // atomically updates the native React store
    patternStore.incrementTasksListKey();
  }, [id, taskText]);

  return null; // Headless component: emits zero DOM nodes
}`}
                </CodeBlock>

                <h3>3. The Server Function (Mutation)</h3>
                <p>
                  Performs the backend mutation in Node.js and returns the Headless Updater component over Flight RPC.
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

                <h3>4. Data Query Server Function</h3>
                <p>Fetches and renders the updated list directly on the server.</p>
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

                <h3>5. Display Component (Client Component)</h3>
                <p>Renders the list of tasks received from the server.</p>
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
              </section>

              <section id="page-consumption">
                <h3>6. The Page (Putting It All Together)</h3>
                <p>
                  The view coordinates mutation promises and queries with React 19&apos;s native <code>use()</code> hook and <code>&lt;Suspense&gt;</code>.
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
              </section>

              <Alert className="not-prose mt-6">
                <Zap className="h-4 w-4" />
                <AlertTitle>How It Works</AlertTitle>
                <AlertDescription>
                  <ol className="list-decimal pl-4 space-y-1">
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
                      <span>Zero External Dependencies Required</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Powered natively by React 19 primitives: <code>useSyncExternalStore</code>, <code>use()</code>, <code>&lt;Suspense&gt;</code>, and Flight RPC. If your project already uses or benefits from an external state manager like Zustand or Jotai, they work seamlessly alongside it.
                  </CardContent>
                </Card>
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
