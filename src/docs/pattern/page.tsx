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
                Advanced Patterns: The "Dinou Pattern"
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Combine Server Functions, Global State, and Smart Suspense for
              granular reactivity. Handle mutations and list updates without
              full page reloads.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="concept">
              <h2>The Concept</h2>
              <p>
                The Dinou Pattern leverages the unique ability of Server
                Functions to return Client Components. After a mutation, we
                return a "Headless State Updater" component that:
              </p>
              <ol>
                <li>Performs the database operation on the server</li>
                <li>
                  Returns a Client Component that updates global state when it
                  mounts
                </li>
                <li>
                  Triggers re-fetching of dependent data through{" "}
                  <code>resourceId</code> changes
                </li>
              </ol>
              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Puzzle className="h-5 w-5 text-purple-500" />
                  <span>Architecture Diagram</span>
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Mutation triggers Server Function</span>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Server performs DB operation</span>
                  </div>
                  <div className="flex items-center gap-2 ml-8">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span>Returns Headless Updater Component</span>
                  </div>
                  <div className="flex items-center gap-2 ml-12">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span>Updater changes global state on mount</span>
                  </div>
                  <div className="flex items-center gap-2 ml-16">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>
                      <code>resourceId</code> changes trigger re-fetch
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section id="implementation">
              <h2>Implementation</h2>
              <p>
                Follow these steps to implement the Dinou Pattern for a todo
                list with add functionality.
              </p>

              <section id="components">
                <h3>1. The Global Store (Atoms)</h3>
                <p>
                  Define atoms for state management using{" "}
                  <code>jotai-wrapper</code>.
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/atoms.js
import { atom } from "jotai";
import getAPIFromAtoms from "jotai-wrapper";

export const { useAtom, useSetAtom, useAtomValue, getAtom, selectAtom } =
  getAPIFromAtoms({
    tasksListKey: atom(0), // Cache buster for tasks list
    isAddTask: atom(false), // Flag to show add task UI
    // Add other atoms as needed...
  });`}
                </CodeBlock>

                <h3>2. The Headless Updater (Client Component)</h3>
                <p>
                  A component that renders nothing but updates global state when
                  mounted.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/components/add-task-updater.jsx
"use client";
import { useEffect } from "react";
import { useSetAtom } from "@/atoms";

export default function AddTaskUpdater() {
  const setTasksListKey = useSetAtom("tasksListKey");
  const setIsAddTask = useSetAtom("isAddTask");

  useEffect(() => {
    // Update the key to force re-fetch of tasks list
    setTasksListKey((k) => k + 1);
    // Reset the add task flag
    setIsAddTask(false);
  }, [setTasksListKey, setIsAddTask]);

  return null; // Renders nothing visually
}`}
                </CodeBlock>

                <h3>3. The Server Function (Mutation)</h3>
                <p>
                  Performs the database operation and returns the Headless
                  Updater.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/server-functions/add-task.jsx
"use server";
import AddTaskUpdater from "../components/add-task-updater";
import { tasks } from "./db";

export async function addTask(text) {
  // Perform database mutation
  tasks.push(text);

  // 🪄 Magic: Return the updater to run client-side logic
  return <AddTaskUpdater />;
}`}
                </CodeBlock>

                <h3>4. Data Fetching Server Function</h3>
                <p>Fetches the current list of tasks.</p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/server-functions/tasks-list.jsx
"use server";
import { tasks } from "./db";
import TasksListDisplay from "../components/tasks-list-display";

export async function tasksList() {
  return <TasksListDisplay tasks={tasks} />;
}`}
                </CodeBlock>

                <h3>5. Display Component (Client Component)</h3>
                <p>Renders the list of tasks.</p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/components/tasks-list-display.jsx
"use client";

export default function TasksListDisplay({ tasks }) {
  return (
    <div>
      {tasks.map((t, index) => (
        <div key={index}>{t}</div>
      ))}
    </div>
  );
}`}
                </CodeBlock>
              </section>

              <section id="page-consumption">
                <h3>6. The Page (Putting It All Together)</h3>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/page.jsx
"use client";
import Suspense from "react-enhanced-suspense";
import { useAtomValue, useAtom } from "@/atoms";
import { addTask } from "./server-functions/add-task";
import { tasksList } from "./server-functions/tasks-list";
import { useState } from "react";

export default function Page() {
  const tasksListKey = useAtomValue("tasksListKey");
  const [isAddTask, setIsAddTask] = useAtom("isAddTask");
  const [text, setText] = useState("");

  return (
    <div>
      {/* Mutation Form */}
      <input 
        type="text" 
        value={text}
        onChange={(e) => setText(e.target.value)} 
      />
      <button onClick={() => setIsAddTask(true)}>
        Add Task
      </button>

      {/* Conditional mutation suspense */}
      {isAddTask && (
        <Suspense fallback="Adding task..." resourceId="add-task">
          {() => addTask(text)}
        </Suspense>
      )}

      {/* Reactive List */}
      <Suspense
        fallback={<div>Loading tasks...</div>}
        resourceId={\`tasks-list-\${tasksListKey}\`}
      >
        {() => tasksList()}
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
                      User clicks "Add Task", setting <code>isAddTask</code> to{" "}
                      <code>true</code>
                    </li>
                    <li>
                      Conditional <code>Suspense</code> renders and calls{" "}
                      <code>addTask()</code>
                    </li>
                    <li>
                      Server adds task to DB, returns{" "}
                      <code>AddTaskUpdater</code>
                    </li>
                    <li>
                      <code>AddTaskUpdater</code> mounts, increments{" "}
                      <code>tasksListKey</code>
                    </li>
                    <li>
                      Changed <code>resourceId</code> triggers re-fetch of{" "}
                      <code>tasksList()</code>
                    </li>
                    <li>Updated list streams to the UI</li>
                  </ol>
                </AlertDescription>
              </Alert>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <ArrowUpDown className="h-5 w-5" />
                      <span>Granular Reactivity</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Only affected data re-fetches. Other parts of the page
                    remain unchanged and performant.
                  </CardContent>
                </Card>
                <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <LinkIcon className="h-5 w-5" />
                      <span>Loose Coupling</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Server Functions, State, and UI are decoupled. Easy to test,
                    refactor, and maintain.
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
