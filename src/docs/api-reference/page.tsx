import { Link } from "dinou";
import { ShieldCheck } from "lucide-react";
import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
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
// Type-Safe Routing components (Dinou v7)
import {
  PagePropsSection,
  LayoutPropsSection,
  ErrorPropsSection,
  PageFunctionsSection,
  RouteParamsSection,
  DinouRouteSection,
  DinouRoutePatternSection,
} from "./type-safe-routing";
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
} from "./server-cache";
import {
  StorageAdaptersSection,
} from "./storage-adapters";
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
  { id: "type-safe-routing", title: "3. Type-Safe Routing (dinou)", level: 2 },
  { id: "pageprops", title: "PageProps<T>", level: 3 },
  { id: "layoutprops", title: "LayoutProps<T>", level: 3 },
  { id: "errorprops", title: "ErrorProps<T>", level: 3 },
  { id: "pagefunctions", title: "PageFunctions & LayoutFunctions", level: 3 },
  { id: "routeparams", title: "RouteParams<T>", level: 3 },
  { id: "dinouroute", title: "DinouRoute", level: 3 },
  { id: "dinouroutepattern", title: "DinouRoutePattern", level: 3 },
  { id: "server-context-config", title: "4. Server Context & Config (dinou)", level: 2 },
  { id: "getcontext", title: "getContext()", level: 3 },
  { id: "getcontext-store", title: "Request & Response Store", level: 4 },
  { id: "getcontext-examples", title: "Production Patterns", level: 4 },
  { id: "defineconfig", title: "defineConfig()", level: 3 },
  { id: "defineconfig-schema", title: "Configuration Schema", level: 4 },
  { id: "defineconfig-examples", title: "Production Configuration", level: 4 },
  { id: "dinouplugin", title: "DinouPlugin", level: 3 },
  { id: "dinouplugin-lifecycle", title: "Lifecycle & Early Exit", level: 4 },
  { id: "dinouplugin-examples", title: "Production Plugins", level: 4 },
  { id: "server-cache-revalidation", title: "5. Server Cache & Revalidation (dinou/server)", level: 2 },
  { id: "revalidatepage", title: "revalidatePage()", level: 3 },
  { id: "revalidatepath", title: "revalidatePath()", level: 3 },
  { id: "revalidatetag", title: "revalidateTag()", level: 3 },
  { id: "dinoucacheslot", title: "<DinouCacheSlot>", level: 3 },
  { id: "dinoucacheslot-props", title: "Props & Micro-ISR", level: 4 },
  { id: "dinoucacheslot-examples", title: "Production Slot Patterns", level: 4 },
  { id: "storage-adapters", title: "6. Storage Adapters (dinou/server)", level: 2 },
  { id: "storage-adapters-list", title: "Built-In Adapters", level: 3 },
  { id: "storage-adapters-interface", title: "StorageAdapter Interface", level: 3 },
  { id: "storage-adapters-custom", title: "Custom Storage Engine", level: 3 },
  { id: "route-segment-contracts", title: "7. Route Lifecycles & Config", level: 2 },
  { id: "getprops", title: "getProps()", level: 3 },
  { id: "revalidate-config", title: "revalidate", level: 3 },
  { id: "ppr-config", title: "ppr", level: 3 },
  { id: "getcachetags", title: "getCacheTags", level: 3 },
  { id: "getstaticpaths", title: "getStaticPaths", level: 3 },
  { id: "allowisg", title: "allowISG", level: 3 },
  { id: "validateparams", title: "validateParams()", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Complete API Reference | Dinou v7 Docs</title>
      <meta
        name="description"
        content="Explore all exports across dinou, dinou/server, and route lifecycle contracts (page_functions.ts and layout_functions.ts) with TypeScript signatures."
      />
      <link rel="canonical" href="https://dinou.dev/docs/api-reference" />

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
              Explore all exports across{" "}
              <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded text-lg">dinou</code>,{" "}
              <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded text-lg">dinou/server</code>, and route lifecycle contracts (
              <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded text-base">page_functions.ts</code> &amp;{" "}
              <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded text-base">layout_functions.ts</code>) with TypeScript signatures, runtime behavior, and practical usage patterns.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* ================================================================= */}
            {/* SECTION 1: COMPONENTS */}
            {/* ================================================================= */}
            <section id="components" className="scroll-mt-20">
              <h2 className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span>1. Components <span className="whitespace-nowrap">(<code>dinou</code>)</span></span>
                <span className="inline-flex items-center shrink-0 rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
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
              <h2 className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span>2. Hooks &amp; Navigation <span className="whitespace-nowrap">(<code>dinou</code>)</span></span>
                <span className="inline-flex items-center shrink-0 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Universal &amp; Client Hooks
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
            {/* SECTION 3: TYPE-SAFE ROUTING */}
            {/* ================================================================= */}
            <section id="type-safe-routing" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span>3. Type-Safe Routing <span className="whitespace-nowrap">(<code>dinou</code>)</span></span>
                <span className="inline-flex items-center shrink-0 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Zero-Runtime Type System
                </span>
              </h2>
              <p>
                Dinou v7 introduces zero-runtime type safety with auto-generated declaration files and seamless IDE autocompletion for routes and parameters.
              </p>

              <div className="not-prose rounded-lg border border-blue-500/20 bg-blue-500/5 p-3.5 my-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-blue-500 shrink-0" />
                  <span>Looking for architectural deep-dives, module augmentation details, and zero-runtime benchmarks?</span>
                </div>
                <Link
                  href="/docs/type-safe-routing"
                  className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                >
                  Type-Safe Routing Guide &rarr;
                </Link>
              </div>

              <PagePropsSection />
              <LayoutPropsSection />
              <ErrorPropsSection />
              <PageFunctionsSection />
              <RouteParamsSection />
              <DinouRouteSection />
              <DinouRoutePatternSection />
            </section>

            {/* ================================================================= */}
            {/* SECTION 4: SERVER CONTEXT & CONFIG */}
            {/* ================================================================= */}
            <section id="server-context-config" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span>4. Server Context &amp; Config <span className="whitespace-nowrap">(<code>dinou</code>)</span></span>
                <span className="inline-flex items-center shrink-0 rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  Server-Side Execution
                </span>
              </h2>

              <GetContextSection />
              <DefineConfigSection />
              <DinouPluginSection />
            </section>

            {/* ================================================================= */}
            {/* SECTION 5: SERVER CACHE & REVALIDATION */}
            {/* ================================================================= */}
            <section id="server-cache-revalidation" className="scroll-mt-20 mt-12 pt-8 border-t">
              <span id="server-primitives-storage" className="scroll-mt-20" />
              <h2 className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span>5. Server Cache &amp; Revalidation <span className="whitespace-nowrap">(<code>dinou/server</code>)</span></span>
                <span className="inline-flex items-center shrink-0 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Micro-ISR &amp; Invalidation
                </span>
              </h2>

              <RevalidatePageSection />
              <RevalidatePathSection />
              <RevalidateTagSection />
              <DinouCacheSlotSection />
            </section>

            {/* ================================================================= */}
            {/* SECTION 6: STORAGE ADAPTERS */}
            {/* ================================================================= */}
            <section id="storage-adapters" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span>6. Storage Adapters <span className="whitespace-nowrap">(<code>dinou/server</code>)</span></span>
                <span className="inline-flex items-center shrink-0 rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                  Storage Abstraction &amp; Persistence
                </span>
              </h2>

              <StorageAdaptersSection />
            </section>

            {/* ================================================================= */}
            {/* SECTION 7: ROUTE LIFECYCLES & CONFIG */}
            {/* ================================================================= */}
            <section id="route-segment-contracts" className="scroll-mt-20 mt-12 pt-8 border-t">
              <span id="route-lifecycles-config" className="scroll-mt-20" />
              <h2 className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span>7. Route Lifecycles &amp; Config</span>
                <span className="inline-flex items-center shrink-0 rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
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
