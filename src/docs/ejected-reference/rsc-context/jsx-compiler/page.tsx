"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Cpu, HelpCircle, Server } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "compiler-flow", title: "📊 JSX Compiler Flow", level: 2 },
  { id: "client-references", title: "⚛️ Client References & Hydration", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const COMPILER_DIAGRAM = `                   asyncRenderJSXToClientJSX(jsx, key)
                                   │
                                   ▼
                       [Evaluate type of node]
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
   [Primitive/Value]       [Array / Children]      [Transitional Element]
         │                         │                         │
     Return as-is            Promise.all()             Check jsx.type
                             recursive call                  │
                                                             ▼
                                                [Is function / component?]
                                                 ├── Yes ──► [Is client ref?]
                                                 │            ├── Yes ──► Return element descriptor
                                                 │            └── No  ──► Execute Component(props),
                                                 │                        recursive compile returned JSX
                                                 └── No  ──► Recursive compile props`;

const COMPILER_CODE = `// Function to check if a component is a client component ('use client')
function isClientComponent(type) {
  if (!type) {
    return false;
  }
  const CLIENT_REFERENCE = Symbol.for("react.client.reference");
  return (
    (typeof type === "function" && type.$$typeof === CLIENT_REFERENCE) ||
    (typeof type === "object" && type.$$typeof === CLIENT_REFERENCE)
  );
}

// 1. Synchronous JSX compiler
function renderJSXToClientJSX(jsx, key = null) {
  if (
    typeof jsx === "string" ||
    typeof jsx === "number" ||
    typeof jsx === "boolean" ||
    typeof jsx === "function" ||
    typeof jsx === "undefined" ||
    jsx == null
  ) {
    return jsx;
  } else if (Array.isArray(jsx)) {
    return jsx.map((child, i) =>
      renderJSXToClientJSX(
        child,
        i + (typeof child?.type === "string" ? "_" + child?.type : "")
      )
    );
  } else if (typeof jsx === "symbol") {
    if (jsx === Symbol.for("react.fragment")) {
      return {
        $$typeof: Symbol.for("react.transitional.element"),
        type: Symbol.for("react.fragment"),
        props: {},
        key: key,
      };
    }
    throw new Error("Unsupported symbol: " + String(jsx));
  } else if (typeof jsx === "object") {
    if (jsx.$$typeof === Symbol.for("react.transitional.element")) {
      if (
        jsx.type === Symbol.for("react.fragment") ||
        jsx.type === Symbol.for("react.suspense") ||
        typeof jsx.type === "string"
      ) {
        return {
          ...jsx,
          props: renderJSXToClientJSX(jsx.props),
          key: key ?? jsx.key,
        };
      } else if (typeof jsx.type === "function") {
        const Component = jsx.type;
        const props = jsx.props;
        if (isClientComponent(Component)) {
          return {
            ...jsx,
            $$typeof: Symbol.for("react.transitional.element"),
            type: Component,
            props: renderJSXToClientJSX(props),
            key: key ?? jsx.key,
          };
        } else {
          // Server component: execute and process
          const returnedJsx = Component(props);
          return renderJSXToClientJSX(returnedJsx, key ?? jsx.key);
        }
      } else {
        throw new Error("Unsupported JSX type");
      }
    } else if (jsx instanceof Promise) {
      return jsx;
    } else {
      return Object.fromEntries(
        Object.entries(jsx).map(([propName, value]) => [
          propName,
          renderJSXToClientJSX(value),
        ])
      );
    }
  } else {
    throw new Error("Not implemented");
  }
}

// 2. Asynchronous JSX compiler (resolving async components)
async function asyncRenderJSXToClientJSX(jsx, key = null) {
  if (
    typeof jsx === "string" ||
    typeof jsx === "number" ||
    typeof jsx === "boolean" ||
    typeof jsx === "function" ||
    typeof jsx === "undefined" ||
    jsx === null
  ) {
    return jsx;
  } else if (Array.isArray(jsx)) {
    return await Promise.all(
      jsx.map((child, i) =>
        asyncRenderJSXToClientJSX(
          child,
          i + (typeof child?.type === "string" ? "_" + child?.type : "")
        )
      )
    );
  } else if (typeof jsx === "symbol") {
    if (jsx === Symbol.for("react.fragment")) {
      return {
        $$typeof: Symbol.for("react.transitional.element"),
        type: Symbol.for("react.fragment"),
        props: { key },
      };
    }
    throw new Error("Unsupported symbol: " + String(jsx));
  } else if (typeof jsx === "object") {
    if (jsx.$$typeof === Symbol.for("react.transitional.element")) {
      if (
        jsx.type === Symbol.for("react.fragment") ||
        jsx.type === Symbol.for("react.suspense") ||
        typeof jsx.type === "string"
      ) {
        return {
          ...jsx,
          props: {
            ...(await asyncRenderJSXToClientJSX(jsx.props, key ?? jsx.key)),
            key: key ?? jsx.key,
          },
        };
      } else if (typeof jsx.type === "function") {
        const Component = jsx.type;
        const props = jsx.props;
        if (isClientComponent(Component)) {
          return {
            ...jsx,
            $$typeof: Symbol.for("react.transitional.element"),
            type: Component,
            props: {
              ...(await asyncRenderJSXToClientJSX(props, key ?? jsx.key)),
              key: key ?? jsx.key,
            },
          };
        } else {
          // Server component: execute and process
          const returnedJsx = await Component(props);
          return await asyncRenderJSXToClientJSX(returnedJsx, key ?? jsx.key);
        }
      } else {
        throw new Error("Unsupported JSX type");
      }
    } else if (jsx instanceof Promise) {
      return jsx;
    } else {
      return Object.fromEntries(
        await Promise.all(
          Object.entries(jsx).map(async ([propName, value]) => [
            propName,
            await asyncRenderJSXToClientJSX(value),
          ])
        )
      );
    }
  } else {
    throw new Error("Not implemented");
  }
}

module.exports = {
  renderJSXToClientJSX,
  asyncRenderJSXToClientJSX,
};`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                JSX Compiler (render-jsx-to-client-jsx.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the server-side JSX element walker, asynchronous component resolver, and client reference binders.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/render-jsx-to-client-jsx.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In a standard React application, components are executed in the browser. In React 19 Server Components, however, Server Components must execute exclusively on the server, producing a JSON-like representation of transitional elements, while preserving references to Client Components (annotated with <code>"use client"</code>) for the browser to hydratize.
              </p>
              <p>
                The <code>render-jsx-to-client-jsx.js</code> file executes this traversal. It runs Server Component functions, resolves async data promises, and returns clean client transitional elements.
              </p>
            </section>

            <hr className="my-8" />

            {/* COMPILER FLOW */}
            <section id="compiler-flow">
              <h2>📊 JSX Compiler Flow</h2>
              <p>
                The flowchart below traces how React nodes are recursively evaluated:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{COMPILER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CLIENT REFERENCES */}
            <section id="client-references">
              <h2>⚛️ Client References & Hydration</h2>
              <p>
                How does the compiler distinguish between Server and Client components?
              </p>
              <ul>
                <li>
                  <strong>Client References:</strong> When a file starts with <code>"use client"</code>, the bundler generates a special pointer object instead of importing the code directly. This object contains a $$typeof field set to <code>Symbol.for("react.client.reference")</code>.
                </li>
                <li>
                  <strong>Bypassing Execution:</strong> When the JSX compiler detects a client reference via <code>isClientComponent()</code>, it bypasses component execution and returns the transitional element descriptor as-is. This informs the React client runtime where to import and mount the client-side module in the browser.
                </li>
                <li>
                  <strong>Recursive Resolving:</strong> If the node is a Server Component, the compiler invokes it (e.g. <code>returnedJsx = await Component(props)</code>) and repeats the compilation process on the returned nodes, resolving nested Server Components.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full code of <code>render-jsx-to-client-jsx.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{COMPILER_CODE}</CodeBlock>
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
