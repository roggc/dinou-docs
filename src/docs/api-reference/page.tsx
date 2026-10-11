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
  Link as LinkIcon,
  Server,
  Shield,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Replace,
  Zap,
  Database,
  Layers,
  Settings,
  CheckCircle2,
  Code2,
  Boxes,
  Flame,
  Globe,
  Sliders,
  ArrowRightLeft,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  LinkSection,
  ClientRedirectSection,
} from "./components";
import {
  RedirectSection,
  UseSearchParamsSection,
  UsePathnameSection,
  UseRouterSection,
  RefreshSlotSection,
  UseNavigationLoadingSection,
} from "./hooks-navigation";
import {
  GetContextSection,
  DefineConfigSection,
  DinouPluginSection,
} from "./server-context-config";
import {
  DinouCacheSlotSection,
  RevalidatePageSection,
  RevalidatePathSection,
  RevalidateTagSection,
  StorageAdaptersSection,
} from "./server-storage";
import {
  GetPropsContract,
  RevalidateContract,
  PprContract,
  GetCacheTagsContract,
  GetStaticPathsContract,
  AllowIsgContract,
  ValidateParamsContract,
} from "./contracts";

const tocItems = [
  { id: "components", title: "1. Components (dinou)", level: 2 },
  { id: "link", title: "<Link>", level: 3 },
  { id: "clientredirect", title: "<ClientRedirect>", level: 3 },
  { id: "hooks-navigation", title: "2. Hooks & Navigation (dinou)", level: 2 },
  { id: "redirect", title: "redirect()", level: 3 },
  { id: "usesearchparams", title: "useSearchParams()", level: 3 },
  { id: "usesearchparams-server", title: "in Server Components", level: 4 },
  { id: "usesearchparams-client", title: "in Client Components", level: 4 },
  { id: "usepathname", title: "usePathname()", level: 3 },
  { id: "usepathname-server", title: "in Server Components", level: 4 },
  { id: "usepathname-client", title: "in Client Components", level: 4 },
  { id: "userouter", title: "useRouter()", level: 3 },
  { id: "userouter-methods", title: "Methods Reference", level: 4 },
  { id: "userouter-caching", title: "Client Cache & Options", level: 4 },
  { id: "userouter-examples", title: "Production Patterns", level: 4 },
  { id: "refreshslot", title: "refreshSlot()", level: 3 },
  { id: "refreshslot-parameters", title: "Parameters & Wildcard", level: 4 },
  { id: "refreshslot-architecture", title: "Targeted Revalidation", level: 4 },
  { id: "refreshslot-examples", title: "Production Patterns", level: 4 },
  { id: "usenavigationloading", title: "useNavigationLoading()", level: 3 },
  { id: "usenavigationloading-behavior", title: "Trigger Events & SSR", level: 4 },
  { id: "usenavigationloading-architecture", title: "Non-Blocking Transitions", level: 4 },
  { id: "usenavigationloading-examples", title: "Production Indicators", level: 4 },
  { id: "server-context-config", title: "3. Server Context & Config (dinou)", level: 2 },
  { id: "getcontext", title: "getContext()", level: 3 },
  { id: "getcontext-store", title: "Request & Response Store", level: 4 },
  { id: "getcontext-examples", title: "Production Patterns", level: 4 },
  { id: "defineconfig", title: "defineConfig()", level: 3 },
  { id: "defineconfig-schema", title: "Configuration Schema", level: 4 },
  { id: "defineconfig-examples", title: "Production Configuration", level: 4 },
  { id: "dinouplugin", title: "DinouPlugin", level: 3 },
  { id: "dinouplugin-lifecycle", title: "Lifecycle & Early Exit", level: 4 },
  { id: "dinouplugin-examples", title: "Production Plugins", level: 4 },
  { id: "server-primitives-storage", title: "4. Server & Storage (dinou/server)", level: 2 },
  { id: "revalidatepage", title: "revalidatePage()", level: 3 },
  { id: "revalidatepath", title: "revalidatePath()", level: 3 },
  { id: "revalidatetag", title: "revalidateTag()", level: 3 },
  { id: "dinoucacheslot", title: "<DinouCacheSlot>", level: 3 },
  { id: "dinoucacheslot-props", title: "Props & Micro-ISR", level: 4 },
  { id: "dinoucacheslot-examples", title: "Production Slot Patterns", level: 4 },
  { id: "storage-adapters", title: "Storage Adapters", level: 3 },
  { id: "storage-adapters-list", title: "Built-In Adapters", level: 4 },
  { id: "storage-adapters-interface", title: "StorageAdapter Interface", level: 4 },
  { id: "storage-adapters-custom", title: "Custom StorageAdapter", level: 4 },
  { id: "route-segment-contracts", title: "5. Route Segment Contracts", level: 2 },
  { id: "getprops", title: "getProps()", level: 3 },
  { id: "revalidate-config", title: "revalidate", level: 3 },
  { id: "ppr-config", title: "ppr", level: 3 },
  { id: "getcachetags", title: "getCacheTags", level: 3 },
  { id: "getstaticpaths", title: "getStaticPaths", level: 3 },
  { id: "allowisg", title: "allowISG", level: 3 },
  { id: "validateparams", title: "validateParams()", level: 3 },
  { id: "type-safe-routing", title: "6. Type-Safe Routing (dinou)", level: 2 },
  { id: "pageprops", title: "PageProps<T>", level: 3 },
  { id: "layoutprops", title: "LayoutProps<T>", level: 3 },
  { id: "pagefunctions", title: "PageFunctions & LayoutFunctions", level: 3 },
  { id: "routeparams", title: "RouteParams<T>", level: 3 },
  { id: "dinouroute", title: "DinouRoute", level: 3 },
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
                📚 Complete API Reference
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore all exports across <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded text-lg">dinou</code> and{" "}
              <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded text-lg">dinou/server</code> with TypeScript signatures, runtime behavior, and practical usage patterns.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* ================================================================= */}
            {/* SECTION 1: COMPONENTS */}
            {/* ================================================================= */}
            <section id="components" className="scroll-mt-20">
              <h2 className="flex items-center gap-3">
                1. Components (<code>dinou</code>)
                <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  Universal / Client
                </span>
              </h2>

              <LinkSection />
              <ClientRedirectSection />
            </section>

            {/* ================================================================= */}
            {/* SECTION 2: HOOKS & NAVIGATION */}
            {/* ================================================================= */}
            <section id="hooks-navigation" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                2. Hooks & Navigation (<code>dinou</code>)
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Universal & Client Hooks
                </span>
              </h2>

              <RedirectSection />
              <UseSearchParamsSection />
              <UsePathnameSection />
              <UseRouterSection />
              <RefreshSlotSection />
              <UseNavigationLoadingSection />
            </section>

            {/* ================================================================= */}
            {/* SECTION 3: SERVER CONTEXT & CONFIG */}
            {/* ================================================================= */}
            <section id="server-context-config" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                3. Server Context &amp; Config (<code>dinou</code>)
                <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  Server-Side Execution
                </span>
              </h2>

              <GetContextSection />
              <DefineConfigSection />
              <DinouPluginSection />
            </section>

            {/* ================================================================= */}
            {/* SECTION 4: SERVER PRIMITIVES & STORAGE */}
            {/* ================================================================= */}
            <section id="server-primitives-storage" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                4. Server Primitives &amp; Storage (<code>dinou/server</code>)
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Micro-ISR &amp; Invalidation
                </span>
              </h2>

              <RevalidatePageSection />
              <RevalidatePathSection />
              <RevalidateTagSection />
              <DinouCacheSlotSection />
              <StorageAdaptersSection />
            </section>

            {/* ================================================================= */}
            {/* SECTION 5: ROUTE SEGMENT CONTRACTS */}
            {/* ================================================================= */}
            <section id="route-segment-contracts" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                5. Route Segment Contracts
                <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                  page_functions.ts &amp; layout_functions.ts
                </span>
              </h2>
              <p>
                Dinou strictly decouples UI components from server-side lifecycle contracts. Route lifecycles are declared in parallel <code>page_functions.ts</code> (or <code>layout_functions.ts</code>) files.
              </p>

              <GetPropsContract />
              <RevalidateContract />
              <PprContract />
              <GetCacheTagsContract />
              <GetStaticPathsContract />
              <AllowIsgContract />
              <ValidateParamsContract />

            </section>

            {/* ================================================================= */}
            {/* SECTION 6: TYPE-SAFE ROUTING */}
            {/* ================================================================= */}
            <section id="type-safe-routing" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                6. Type-Safe Routing (<code>dinou</code>)
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Zero-Runtime Type System
                </span>
              </h2>
              <p>
                Dinou v7 introduces zero-runtime type safety with auto-generated declaration files and seamless IDE autocompletion for routes and parameters.
              </p>

              {/* PageProps */}
              <section id="pageprops" className="scroll-mt-20 mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>PageProps&lt;T&gt;</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    TypeScript Generic
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    page.tsx
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Official TypeScript interface for typing React Page components (<code>page.tsx</code>). Takes the route pattern string as a generic parameter and automatically infers the strongly typed <code>params</code> object.
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
                  {`import type { PageProps } from "dinou";

// Trigger Ctrl + Space inside "" to pick from all registered routes
export default function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  // ✅ params.slug is strongly typed as string
  return <h1>Post: {params.slug}</h1>;
}`}
                </CodeBlock>
              </section>

              {/* LayoutProps */}
              <section id="layoutprops" className="scroll-mt-20 mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>LayoutProps&lt;T&gt;</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    TypeScript Generic
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    layout.tsx
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Official TypeScript interface for typing React Layout components (<code>layout.tsx</code>). In addition to inferred <code>params</code>, it strictly types <code>children: React.ReactNode</code>.
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
                  {`import type { LayoutProps } from "dinou";

export default function BlogLayout({ children, params }: LayoutProps<"/blog/[slug]">) {
  return (
    <section>
      <header>Category: {params.slug}</header>
      <main>{children}</main>
    </section>
  );
}`}
                </CodeBlock>
              </section>

              {/* PageFunctions & LayoutFunctions */}
              <section id="pagefunctions" className="scroll-mt-20 mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>PageFunctions&lt;TParams, TProps&gt;</code> &amp; <code>LayoutFunctions&lt;TParams, TProps&gt;</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    TypeScript Generics
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Server Lifecycle Contracts
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Canonical TypeScript interfaces for typing server lifecycle files (<code>page_functions.ts</code> and <code>layout_functions.ts</code>). Both interfaces accept either a route pattern string directly (e.g. <code>&quot;/blog/[slug]&quot;</code>) or a direct parameters dictionary, providing complete compile-time type safety, IDE autocompletion, and index-access typing (e.g. <code>PageFunctions[&quot;revalidate&quot;]</code>) without boilerplate.
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
                  {`import type { PageFunctions, LayoutFunctions } from "dinou";

// 1. Direct route string pattern (automatically infers route parameters)
export const getProps: PageFunctions<
  "/blog/[slug]",
  { postTitle: string }
>["getProps"] = async (params) => {
  return { postTitle: \`Article: \${params.slug}\` };
};

// 2. Strict index-access typing for layout_functions.ts
export const ppr: LayoutFunctions["ppr"] = true;
export const revalidate: LayoutFunctions["revalidate"] = 3600;`}
                </CodeBlock>
              </section>

              {/* RouteParams */}
              <section id="routeparams" className="scroll-mt-20 mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>RouteParams&lt;T&gt;</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    TypeScript Utility
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Params Inference
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  A standalone utility type representing the inferred parameters dictionary of a given route pattern. While <code>PageProps</code> and <code>PageFunctions</code> resolve route strings directly, <code>RouteParams</code> is ideal for typing Server Actions, services, or error boundary components that do not inherit framework props automatically.
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
                  {`import type { RouteParams } from "dinou";

// 1. In Server Actions or external services
export async function getAuthorBio(params: RouteParams<"/blog/[slug]">) {
  return fetchBioBySlug(params.slug);
}

// 2. In error.tsx boundaries
interface ErrorProps {
  error: Error;
  params: RouteParams<"/blog/[slug]">;
}`}
                </CodeBlock>
              </section>

              {/* DinouRoute */}
              <section id="dinouroute" className="scroll-mt-20 mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>DinouRoute</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Union Type
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Zero-Runtime
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  A union type representing all valid destinations in the application. Powers <code>&lt;Link href&gt;</code> and <code>router.push(href)</code>, and can be imported to type custom navigation components.
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
                  {`import type { DinouRoute } from "dinou";
import { Link } from "dinou";

// Typing reusable navigation buttons with project-wide autocompletion
interface NavButtonProps {
  href: DinouRoute;
  label: string;
}

export function NavButton({ href, label }: NavButtonProps) {
  return <Link href={href}>{label}</Link>;
}`}
                </CodeBlock>
              </section>
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
