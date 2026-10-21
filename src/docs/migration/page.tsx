import { Link } from "dinou";
import { DocsPager } from "@/docs/components/docs-pager";
import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  ArrowRight,
  RefreshCw,
  Sparkles,
  FolderArchive,
  Layers,
  Cpu,
  Boxes,
  Globe,
  CheckCircle2,
} from "lucide-react";

export default function MigrationIndexPage() {
  return (
    <div className="flex-1 w-full max-w-[100vw] py-8 lg:py-12">
      <title>Upgrade Guides | Dinou Docs</title>
      <meta
        name="description"
        content="Step-by-step migration guides and breaking change summaries to help you upgrade your Dinou applications between major versions."
      />
      <link rel="canonical" href="https://dinou.dev/docs/migration" />

      <div className="container max-w-5xl px-4 md:px-6 mx-auto">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900">
              Upgrade Guides
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              Dinou
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <RefreshCw className="h-8 w-8 text-blue-500 shrink-0" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Upgrade Guides
            </h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Step-by-step migration guides and breaking change summaries to help you upgrade your Dinou applications between major versions.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid gap-6 md:grid-cols-2 mt-8 not-prose">
          {/* v7 to v8 */}
          <Link href="/docs/migration/v7-to-v8" className="group">
            <Card className="h-full border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/10 hover:border-emerald-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Latest Major • v8
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
                <CardTitle className="text-xl font-bold mt-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-500 shrink-0" />
                  Migration from v7 to v8
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3 flex-1 flex flex-col justify-between">
                <p className="leading-relaxed">
                  <strong className="text-foreground font-semibold">100% transparent upgrade with zero code changes required.</strong> Dinou v8 is an internal architectural evolution from hybrid CommonJS to pure ECMAScript Modules (<code>&quot;type&quot;: &quot;module&quot;</code>), unifying source extensions (<code>.js</code>), modernizing package exports, and fixing layout routing stability with <code>allowISG: false</code>.
                </p>
                <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-2">
                  Read v7 to v8 migration guide &rarr;
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* v6 to v7 */}
          <Link href="/docs/migration/v6-to-v7" className="group">
            <Card className="h-full border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/10 hover:border-blue-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    v7.0.0
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
                <CardTitle className="text-xl font-bold mt-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-blue-500 shrink-0" />
                  Migration from v6 to v7
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3 flex-1 flex flex-col justify-between">
                <p className="leading-relaxed">
                  Breaking changes in data fetching contracts (<code>getProps</code> direct return, <code>revalidate</code> in seconds, and removal of <code>dynamic</code>), Layered Segmentation (<code>layout_functions</code> &amp; <code>DinouCacheSlot</code>), Partial Prerendering (PPR), 0-Fork Dual-Bundle in-memory engine, and universal multi-runtime deployments.
                </p>
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 pt-2">
                  Read v6 to v7 migration guide &rarr;
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* v5 to v6 */}
          <Link href="/docs/migration/v5-to-v6" className="group">
            <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-purple-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                    v6.0.0
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                </div>
                <CardTitle className="text-xl font-bold mt-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center gap-2">
                  <FolderArchive className="h-5 w-5 text-purple-500 shrink-0" />
                  Migration from v5 to v6
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3 flex-1 flex flex-col justify-between">
                <p className="leading-relaxed">
                  Consolidates all internal build and manifest directories (<code>public</code>, <code>dist2</code>, <code>dist3</code>, <code>react_client_manifest</code>, <code>server_functions_manifest</code>) into a single, clean <code>.dinou</code> directory.
                </p>
                <div className="text-xs font-medium text-purple-600 dark:text-purple-400 flex items-center gap-1 pt-2">
                  Read v5 to v6 migration guide &rarr;
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* v4 to v5 */}
          <Link href="/docs/migration/v4-to-v5" className="group">
            <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-slate-400/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-slate-500/10 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-400 ring-1 ring-inset ring-slate-500/20">
                    v5.0.0
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
                </div>
                <CardTitle className="text-xl font-bold mt-3 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors flex items-center gap-2">
                  <Layers className="h-5 w-5 text-slate-500 shrink-0" />
                  Migration from v4 to v5
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3 flex-1 flex flex-col justify-between">
                <p className="leading-relaxed">
                  Introduced React Flight streaming architecture during SSR, synchronous Server Components, on-demand revalidation, and the native Dinou plugin system.
                </p>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1 pt-2">
                  Read v4 to v5 migration guide &rarr;
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Documentation Previous / Next Pager */}
        <DocsPager />
      </div>
    </div>
  );
}
