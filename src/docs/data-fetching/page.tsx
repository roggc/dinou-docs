import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import { ClickableTableRow } from "@/docs/components/clickable-table-row";
import { Badge } from "@/docs/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { AlertTriangle, Info, Workflow } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/docs/components/ui/table";

const tocItems = [
  {
    id: "overview",
    title: "Overview: 13-Strategy Architecture",
    level: 2,
  },
  {
    id: "strategy-1",
    title: "1. RSC Direct await (SSG)",
    level: 2,
  },
  {
    id: "strategy-2",
    title: "2. RSC Direct await (Dynamic SSR)",
    level: 2,
  },
  {
    id: "strategy-3",
    title: "3. RSC with <Suspense> (SSG)",
    level: 2,
  },
  {
    id: "strategy-4",
    title: "4. RSC with <Suspense> (Dynamic Streaming)",
    level: 2,
  },
  {
    id: "strategy-5",
    title: "5. RSC + <Suspense> + <DinouCacheSlot> (Static SSG / Asymmetric ISR)",
    level: 2,
  },
  {
    id: "strategy-6",
    title: "6. RSC + <Suspense> + <DinouCacheSlot> (Dynamic Micro-ISR)",
    level: 2,
  },
  {
    id: "strategy-7",
    title: "7. RSC with <Suspense> (PPR Hybrid)",
    level: 2,
  },
  {
    id: "strategy-8",
    title: "8. PPR + <DinouCacheSlot> (Peak Performance Synergy)",
    level: 2,
  },
  {
    id: "strategy-9",
    title: "9. RSC Promise ➔ Client use() (React 19)",
    level: 2,
  },
  {
    id: "strategy-10",
    title: "10. Client-First getProps (SSG)",
    level: 2,
  },
  {
    id: "strategy-11",
    title: "11. Client-First getProps (Dynamic SSR)",
    level: 2,
  },
  {
    id: "strategy-12",
    title: "12. Client Calling Server Function (Initial Mount - Dynamic RPC)",
    level: 2,
  },
  {
    id: "strategy-13",
    title: "13. Client Server Functions (User Actions & Mutations)",
    level: 2,
  },
  {
    id: "decision-guide",
    title: "Architectural Decision Guide",
    level: 2,
  },
];

function MetricCard({
  label,
  value,
  variant = "emerald",
  className = "",
}: {
  label: string;
  value: string;
  variant?: "emerald" | "rose" | "amber" | "slate";
  className?: string;
}) {
  const colorMap = {
    emerald: "border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30",
    rose: "border-rose-500/30 text-rose-700 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/30",
    amber: "border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/30",
    slate: "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/40",
  };

  return (
    <div className={`p-2.5 rounded-lg border bg-card text-center flex flex-col items-center justify-between gap-1.5 shadow-2xs ${className}`}>
      <span className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider">
        {label}
      </span>
      <Badge variant="outline" className={`font-mono text-[10px] py-0 px-2 leading-5 ${colorMap[variant]}`}>
        {value}
      </Badge>
    </div>
  );
}

export default function DataFetchingPage() {

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
                13 Execution Strategies
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Deep Dive Catalog
              </Badge>
              <Badge
                variant="outline"
                className="font-mono text-xs text-muted-foreground"
              >
                Strategy-by-Strategy
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Data Fetching: The 13 Strategies
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A comprehensive case-by-case engineering guide covering each of the 13 data fetching and rendering patterns available in Dinou.
              Every strategy is examined with concrete code snippets, runtime lifecycle behavior, TTFB metrics, server load characteristics, and production trade-offs.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-16">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                Overview: The 13-Strategy Architecture
              </h2>
              <p>
                Dinou provides unprecedented flexibility by separating <strong>where code executes</strong> (Server Component vs Client Component),{" "}
                <strong>when data is fetched</strong> (Build time vs Per-request vs On-demand), and{" "}
                <strong>how it is delivered</strong> (Blocking TTFB vs Progressive HTTP Streaming vs Micro-ISR Caching).
              </p>

              {/* Quick Jump Grid */}
              <div className="not-prose my-6 rounded-xl border border-slate-200 dark:border-slate-800/80 p-5 bg-card shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                    <Workflow className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Interactive Strategy Index</span>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    13 Architecture Patterns
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                  {[
                    {
                      id: "strategy-1",
                      num: 1,
                      name: "RSC Direct await (SSG)",
                      badge: "0ms TTFB",
                      numBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      badgeClass: "border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30",
                      hoverClass: "hover:border-emerald-500/40 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20",
                    },
                    {
                      id: "strategy-2",
                      num: 2,
                      name: "RSC Direct await (Dynamic)",
                      badge: "Blocked TTFB",
                      numBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                      badgeClass: "border-rose-500/30 text-rose-700 dark:text-rose-400 bg-rose-50/60 dark:bg-rose-950/30",
                      hoverClass: "hover:border-rose-500/40 hover:bg-rose-50/30 dark:hover:bg-rose-950/20",
                    },
                    {
                      id: "strategy-3",
                      num: 3,
                      name: "RSC with <Suspense> (SSG)",
                      badge: "0ms Static",
                      numBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      badgeClass: "border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30",
                      hoverClass: "hover:border-emerald-500/40 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20",
                    },
                    {
                      id: "strategy-4",
                      num: 4,
                      name: "RSC with <Suspense> (Dynamic)",
                      badge: "Streaming",
                      numBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      badgeClass: "border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-950/30",
                      hoverClass: "hover:border-amber-500/40 hover:bg-amber-50/30 dark:hover:bg-amber-950/20",
                    },
                    {
                      id: "strategy-5",
                      num: 5,
                      name: "RSC + <DinouCacheSlot> (Static)",
                      badge: "Micro-ISR",
                      numBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      badgeClass: "border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30",
                      hoverClass: "hover:border-emerald-500/40 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20",
                    },
                    {
                      id: "strategy-6",
                      num: 6,
                      name: "RSC + <DinouCacheSlot> (Dynamic)",
                      badge: "2ms Hit",
                      numBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      badgeClass: "border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30",
                      hoverClass: "hover:border-emerald-500/40 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20",
                    },
                    {
                      id: "strategy-7",
                      num: 7,
                      name: "RSC with <Suspense> (PPR)",
                      badge: "0ms Edge",
                      numBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      badgeClass: "border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30",
                      hoverClass: "hover:border-emerald-500/40 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20",
                    },
                    {
                      id: "strategy-8",
                      num: 8,
                      name: "PPR + <DinouCacheSlot> (Synergy)",
                      badge: "Peak Perf",
                      numBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      badgeClass: "border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30 font-semibold",
                      hoverClass: "hover:border-emerald-500/40 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20",
                    },
                    {
                      id: "strategy-9",
                      num: 9,
                      name: "RSC Promise ➔ Client use()",
                      badge: "React 19",
                      numBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      badgeClass: "border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-950/30",
                      hoverClass: "hover:border-amber-500/40 hover:bg-amber-50/30 dark:hover:bg-amber-950/20",
                    },
                    {
                      id: "strategy-10",
                      num: 10,
                      name: "Client-First getProps (SSG)",
                      badge: "0ms Client",
                      numBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      badgeClass: "border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30",
                      hoverClass: "hover:border-emerald-500/40 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20",
                    },
                    {
                      id: "strategy-11",
                      num: 11,
                      name: "Client-First getProps (Dynamic)",
                      badge: "SSR Client",
                      numBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                      badgeClass: "border-rose-500/30 text-rose-700 dark:text-rose-400 bg-rose-50/60 dark:bg-rose-950/30",
                      hoverClass: "hover:border-rose-500/40 hover:bg-rose-50/30 dark:hover:bg-rose-950/20",
                    },
                    {
                      id: "strategy-12",
                      num: 12,
                      name: "Client Calling Server Function",
                      badge: "Mount RPC",
                      numBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      badgeClass: "border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-950/30",
                      hoverClass: "hover:border-amber-500/40 hover:bg-amber-50/30 dark:hover:bg-amber-950/20",
                    },
                    {
                      id: "strategy-13",
                      num: 13,
                      name: "Client Server Functions (User)",
                      badge: "RPC Actions",
                      numBg: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
                      badgeClass: "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-100/70 dark:bg-slate-800/40",
                      hoverClass: "hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-100/30 dark:hover:bg-slate-800/20",
                    },
                  ].map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`group flex items-center justify-between gap-2 p-2 rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-card ${s.hoverClass} hover:shadow-xs transition-all duration-150`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold ${s.numBg}`}>
                          {s.num}
                        </span>
                        <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-foreground text-[11px] truncate">
                          {s.name}
                        </span>
                      </div>
                      <Badge variant="outline" className={`font-mono text-[9px] shrink-0 py-0 px-1.5 leading-4 rounded ${s.badgeClass}`}>
                        {s.badge}
                      </Badge>
                    </a>
                  ))}
                </div>
              </div>

              {/* Data Fetching & Rendering Strategies Matrix */}
              <div className="mt-8">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      Data Fetching &amp; Rendering Strategies Matrix
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      Detailed comparison across execution timing, TTFB, streaming resolution, server/database pressure, network waterfalls, and freshness:
                    </p>
                  </div>
                </div>

                <div className="not-prose my-4 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-card shadow-xs">
                  <div className="overflow-x-auto">
                    <Table className="w-full text-xs">
                      <TableHeader className="bg-slate-50 dark:bg-slate-900/60 border-b">
                        <TableRow>
                          <TableHead className="w-10 text-center font-bold">#</TableHead>
                          <TableHead className="min-w-[190px] font-bold">Strategy / Pattern</TableHead>
                          <TableHead className="min-w-[140px] font-bold">Execution Context</TableHead>
                          <TableHead className="min-w-[115px] font-bold">TTFB (First Byte)</TableHead>
                          <TableHead className="min-w-[125px] font-bold">Stream / Content Ready</TableHead>
                          <TableHead className="min-w-[125px] font-bold">Server &amp; DB Load</TableHead>
                          <TableHead className="min-w-[90px] font-bold text-center">Network Waterfall?</TableHead>
                          <TableHead className="min-w-[105px] font-bold">Data Freshness</TableHead>
                          <TableHead className="min-w-[200px] font-bold">Ideal Use Case</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                        {/* Row 1 */}
                        <ClickableTableRow
                          targetId="strategy-1"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-muted-foreground group-hover:text-foreground font-bold">1</TableCell>
                          <TableCell>
                            <a href="#strategy-1" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              RSC Direct await (SSG)
                            </a>
                            <div className="text-[11px] text-muted-foreground">Top-level <code>await</code> or <code>getProps</code> in Server Component</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Build Time (<code>npm run build</code>)</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              0ms (CDN Edge)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Instant (0ms)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Zero (Build Time)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-muted-foreground">Fixed at build</TableCell>
                          <TableCell className="text-muted-foreground">Blogs, documentation, static marketing pages.</TableCell>
                        </ClickableTableRow>

                        {/* Row 2 */}
                        <ClickableTableRow
                          targetId="strategy-2"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-rose-600 dark:text-rose-400 font-bold">2</TableCell>
                          <TableCell>
                            <a href="#strategy-2" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              RSC Direct await (Dynamic)
                            </a>
                            <div className="text-[11px] text-muted-foreground">Top-level <code>await</code> or <code>getProps</code> without <code>&lt;Suspense&gt;</code></div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Per Request (Server)</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                              Slow (Blocked)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-muted-foreground font-mono text-[11px]">N/A (Blocks TTFB)</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                              Heavy (100% queries)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                          <TableCell className="text-muted-foreground">Private views where entire UI requires a single critical query and waiting is acceptable.</TableCell>
                        </ClickableTableRow>

                        {/* Row 3 */}
                        <ClickableTableRow
                          targetId="strategy-3"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-muted-foreground group-hover:text-foreground font-bold">3</TableCell>
                          <TableCell>
                            <a href="#strategy-3" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              RSC with &lt;Suspense&gt; (SSG)
                            </a>
                            <div className="text-[11px] text-muted-foreground">Static route with async component boundary</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Build Time (Compiler awaits)</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              0ms (CDN Edge)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Instant (0ms)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Zero (Build Time)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-muted-foreground">Fixed at build</TableCell>
                          <TableCell className="text-muted-foreground">Decoupled async components in static pages; outputs final HTML without showing fallback.</TableCell>
                        </ClickableTableRow>

                        {/* Row 4 */}
                        <ClickableTableRow
                          targetId="strategy-4"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-amber-600 dark:text-amber-400 font-bold">4</TableCell>
                          <TableCell>
                            <a href="#strategy-4" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              RSC with &lt;Suspense&gt; (Dynamic)
                            </a>
                            <div className="text-[11px] text-muted-foreground">Streaming SSR on demand (without PPR)</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Per Request (Server streaming)</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                              Fast (Early Layout)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                              Slow (Waits 1-3s DB)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                              Heavy (100% queries)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                          <TableCell className="text-muted-foreground">Dynamic routes on runtimes without edge caching or when PPR is disabled.</TableCell>
                        </ClickableTableRow>

                        {/* Row 5 */}
                        <ClickableTableRow
                          targetId="strategy-5"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-muted-foreground group-hover:text-foreground font-bold">5</TableCell>
                          <TableCell>
                            <a href="#strategy-5" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              RSC with &lt;Suspense&gt; + &lt;DinouCacheSlot&gt; (Static / Asymmetric ISR)
                            </a>
                            <div className="text-[11px] text-muted-foreground">Pre-rendered static shell with decoupled slot TTL or <code>refreshSlot()</code></div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Build Time (Pre-rendered) + On-Demand Slot Reval</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              0ms (CDN Edge)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Instant (~0-2ms)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Near-Zero (Decoupled)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-amber-600 dark:text-amber-400 font-medium">Decoupled TTL / refreshSlot()</TableCell>
                          <TableCell className="text-muted-foreground">Static/ISR pages (e.g. 24h page revalidate) containing a widget (stock, pricing) needing fast updates (60s) or surgical in-place client refreshes.</TableCell>
                        </ClickableTableRow>

                        {/* Row 6 */}
                        <ClickableTableRow
                          targetId="strategy-6"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-muted-foreground group-hover:text-foreground font-bold">6</TableCell>
                          <TableCell>
                            <a href="#strategy-6" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              RSC with &lt;Suspense&gt; + &lt;DinouCacheSlot&gt; (Dynamic)
                            </a>
                            <div className="text-[11px] text-muted-foreground">Dynamic streaming with vertical Micro-ISR (TTL cache)</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Per Request (Cache hit: ~2ms / Miss: async query)</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                              Fast (Early Layout)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Instant (~2ms Cache)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Near-Zero (99% Offload)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-amber-600 dark:text-amber-400 font-medium">TTL / Tag Reval</TableCell>
                          <TableCell className="text-muted-foreground">Dynamic routes (with session/cookies) containing heavy widgets (analytics, feeds). Flushes layout instantly; slot streams from cache without DB load.</TableCell>
                        </ClickableTableRow>

                        {/* Row 7 */}
                        <ClickableTableRow
                          targetId="strategy-7"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-muted-foreground group-hover:text-foreground font-bold">7</TableCell>
                          <TableCell>
                            <a href="#strategy-7" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              RSC with &lt;Suspense&gt; (PPR Hybrid)
                            </a>
                            <div className="text-[11px] text-muted-foreground">Partial Prerendering (Static Shell + Live Uncached Hole)</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Static Shell (Build) + Live Hole (Server on every request)</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              0ms (Shell from Edge)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                              Slow (Hole waits for DB)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                              Heavy (100% Hole queries)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                          <TableCell className="text-muted-foreground">Instant static layout from Edge with zero-delay live streamed data for real-time personalization.</TableCell>
                        </ClickableTableRow>

                        {/* Row 8 */}
                        <ClickableTableRow
                          targetId="strategy-8"
                          className="cursor-pointer hover:bg-emerald-100/60 dark:hover:bg-emerald-950/40 bg-emerald-50/30 dark:bg-emerald-950/20 border-l-2 border-emerald-500 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-emerald-600 dark:text-emerald-400 font-bold">8</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <a href="#strategy-8" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                                PPR + &lt;DinouCacheSlot&gt; (PPR Hybrid Synergy)
                              </a>
                              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider">Synergy</span>
                            </div>
                            <div className="text-[11px] text-muted-foreground">Static Edge Shell + Cached Streamed Hole (Max Concurrency)</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Edge CDN (Shell) + Server Cache Storage (Slot)</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              0ms (Edge) + ~5ms (Slot)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Instant (~2-5ms Cache)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Near-Zero (99.9% Offload)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-amber-600 dark:text-amber-400 font-medium">TTL / Tag Reval</TableCell>
                          <TableCell className="text-muted-foreground">
                            <strong className="text-emerald-600 dark:text-emerald-400">Peak Performance:</strong> Instant CDN paint (0ms TTFB) with 99.9% database query offload. Ideal for high-traffic stores, trending catalog pages, and viral portals.
                          </TableCell>
                        </ClickableTableRow>

                        {/* Row 9 */}
                        <ClickableTableRow
                          targetId="strategy-9"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-amber-600 dark:text-amber-400 font-bold">9</TableCell>
                          <TableCell>
                            <a href="#strategy-9" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              RSC Promise ➔ Client use() (Dynamic / PPR)
                            </a>
                            <div className="text-[11px] text-muted-foreground">RSC initiates un-awaited Promise; Client unwraps via <code>use()</code></div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Server starts query; Client suspends</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              0ms (with PPR)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                              Waits for Promise
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                              Heavy (Live query)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                          <TableCell className="text-muted-foreground">Interactive stateful widgets (charts, canvas, filters) needing fresh streaming data.</TableCell>
                        </ClickableTableRow>

                        {/* Row 10 */}
                        <ClickableTableRow
                          targetId="strategy-10"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-muted-foreground group-hover:text-foreground font-bold">10</TableCell>
                          <TableCell>
                            <a href="#strategy-10" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              Client-First getProps (SSG)
                            </a>
                            <div className="text-[11px] text-muted-foreground"><code>page_functions.ts</code> + Client Component</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Build Time (<code>npm run build</code>)</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              0ms (CDN Edge)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Instant (0ms)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                              Zero (Build Time)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-muted-foreground">Fixed at build</TableCell>
                          <TableCell className="text-muted-foreground">Dinou Client-First model for highly interactive static web applications.</TableCell>
                        </ClickableTableRow>

                        {/* Row 11 */}
                        <ClickableTableRow
                          targetId="strategy-11"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-rose-600 dark:text-rose-400 font-bold">11</TableCell>
                          <TableCell>
                            <a href="#strategy-11" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              Client-First getProps (Dynamic)
                            </a>
                            <div className="text-[11px] text-muted-foreground"><code>page_functions.ts</code> + Client Component in SSR</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Per Request (Server awaits <code>getProps</code>)</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                              Slow (Blocked)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-muted-foreground font-mono text-[11px]">N/A (Blocks TTFB)</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                              Heavy (100% queries)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                          <TableCell className="text-muted-foreground">Complex SPAs where developers prefer classic React hooks and tolerate TTFB wait.</TableCell>
                        </ClickableTableRow>

                        {/* Row 12 */}
                        <ClickableTableRow
                          targetId="strategy-12"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-amber-600 dark:text-amber-400 font-bold">12</TableCell>
                          <TableCell>
                            <a href="#strategy-12" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              Client Calling Server Function (Initial Mount - Dynamic RPC)
                            </a>
                            <div className="text-[11px] text-muted-foreground">Client Component calls <code>&quot;use server&quot;</code> during initial mount</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Client RPC on mount</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                              Fast (Shell Only)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                              Delayed (Waterfall)
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                              Heavy (100% RPC queries)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-rose-600 dark:text-rose-400">Yes (Waterfall)</TableCell>
                          <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                          <TableCell className="text-muted-foreground">Supported, but sub-optimal compared to pattern 9 (RSC Promise streaming) due to the second HTTP round trip.</TableCell>
                        </ClickableTableRow>

                        {/* Row 13 */}
                        <ClickableTableRow
                          targetId="strategy-13"
                          className="cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <TableCell className="font-mono text-center text-slate-600 dark:text-slate-400 font-bold">13</TableCell>
                          <TableCell>
                            <a href="#strategy-13" className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:underline">
                              Client Calling Server Function (User Action - Dynamic RPC)
                            </a>
                            <div className="text-[11px] text-muted-foreground">Invoked on user button click, form submission, or mutation</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">Client on user action (POST RPC)</TableCell>
                          <TableCell>
                            <span className="font-mono text-xs text-muted-foreground">N/A (Post-Load)</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-muted-foreground font-mono text-[11px]">N/A (User Event)</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                              On-Demand (Per Action)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                          <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                          <TableCell className="text-muted-foreground">Form submissions, state persistence, on-demand data refreshes, and RPC actions.</TableCell>
                        </ClickableTableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 1 */}
            {/* ============================================================ */}
            <section id="strategy-1" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">
                    1
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    RSC Direct await (SSG)
                  </h2>
                </div>
                <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 font-mono text-xs">
                  Static Site Generation
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="0ms (CDN)" variant="emerald" />
                <MetricCard label="Stream Ready" value="Instant (0ms)" variant="emerald" />
                <MetricCard label="Server/DB Load" value="Zero at Runtime" variant="emerald" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="Build Time" variant="slate" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> The default behavior in Dinou. When a page has no dynamic parameters, headers, or cookies,
                Dinou executes the top-level <code>await</code> query during <code>npm run build</code>. The compiler resolves the promise, generates
                the static <code>index.html</code>, and bakes the pre-compiled binary RSC payload (<code>page.rsc</code>).
              </p>

              <CodeBlock language="tsx" containerClassName="my-3">
{`// src/blog/page.tsx (Static Route by Default)
import db from "@/lib/db"; // Stays 100% on the server

export default async function BlogIndexPage() {
  // Executed ONCE during build time ('npm run build')
  const posts = await db.posts.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Engineering Blog</h1>
      <div className="divide-y">
        {posts.map((post) => (
          <article key={post.id} className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-muted-foreground text-sm">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}`}
              </CodeBlock>

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>Zero Database Cost:</strong> Millions of visitors can hit the CDN without a single query reaching your database.</p>
                <p>• <strong>0kb JavaScript:</strong> No React client runtime is shipped for this data layer; the browser receives pure semantic HTML.</p>
                <p>• <strong>Ideal For:</strong> Documentation, corporate sites, blogs, release notes, and marketing pages.</p>
              </div>

              {/* Architectural Equivalence Alert */}
              <Alert className="not-prose my-4 border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
                <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <AlertTitle className="text-foreground font-bold text-xs uppercase tracking-wider">
                  Server Component Equivalence: getProps vs Direct await
                </AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1.5 space-y-1.5">
                  <p>
                    When a page is a <strong>Server Component</strong>, fetching data via <code>getProps</code> in <code>page_functions.ts</code> is <strong>functionally equivalent</strong> to executing queries directly with top-level <code>await</code> inside the component body (Strategies 1 &amp; 2).
                  </p>
                  <p>
                    Both patterns run exclusively on the server prior to rendering, introduce zero client JavaScript bundle overhead, exhibit identical database latency, and produce the exact same static HTML and pre-compiled <code>.rsc</code> payload. The primary architectural purpose of <code>getProps</code> is when utilizing the <strong>Client-First Model</strong> (Strategies 10 &amp; 11), where it extracts data on the server to feed directly as initial props into interactive Client Component pages (<code>&quot;use client&quot;</code>).
                  </p>
                </AlertDescription>
              </Alert>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 2 */}
            {/* ============================================================ */}
            <section id="strategy-2" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold text-sm">
                    2
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    RSC Direct await (Dynamic SSR)
                  </h2>
                </div>
                <Badge variant="outline" className="text-rose-600 border-rose-500/30 bg-rose-50/40 dark:bg-rose-950/20 font-mono text-xs">
                  Blocking Dynamic SSR
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="Slow (Blocked)" variant="rose" />
                <MetricCard label="Stream Ready" value="N/A (All-or-Nothing)" variant="slate" />
                <MetricCard label="Server/DB Load" value="Heavy (100% queries)" variant="rose" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="100% Live" variant="emerald" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> The component performs an un-Suspended top-level <code>await</code> on a route that is dynamic
                (e.g., due to reading request headers, cookies, or declaring <code>export const revalidate = 0</code> in <code>page_functions.ts</code>).
                The Node.js server halts the HTTP response until the database returns the data.
              </p>

              <TabbedCodeBlock
                containerClassName="my-3"
                tabs={[
                  {
                    id: "fn",
                    label: "src/account/billing/page_functions.ts",
                    language: "tsx",
                    code: `export const revalidate = 0; // Force dynamic SSR on every request`,
                  },
                  {
                    id: "page",
                    label: "src/account/billing/page.tsx",
                    language: "tsx",
                    code: `import { cookies } from "dinou/server";
import db from "@/lib/db";

export default async function BillingPage() {
  const sessionId = cookies().get("session_id");
  if (!sessionId) throw new Error("Unauthorized");

  // BLOCKS TTFB: The browser receives 0 bytes until this query resolves
  const invoices = await db.invoices.findBySession(sessionId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Billing History</h1>
      <table className="w-full mt-4">
        {invoices.map((inv) => (
          <tr key={inv.id}>
            <td>{inv.date}</td>
            <td>\${inv.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}`,
                  },
                ]}
              />

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>Latency Penalty:</strong> If the database takes 800ms, the visitor stares at a blank screen for 800ms before First Contentful Paint (FCP).</p>
                <p>• <strong>When Acceptable:</strong> Secure internal portals, critical authentication gates, or lightweight single-record lookups where streaming complexity is unnecessary.</p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 3 */}
            {/* ============================================================ */}
            <section id="strategy-3" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">
                    3
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    RSC with &lt;Suspense&gt; (SSG)
                  </h2>
                </div>
                <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 font-mono text-xs">
                  Static Compilation Settle
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="0ms (CDN)" variant="emerald" />
                <MetricCard label="Stream Ready" value="Instant (0ms)" variant="emerald" />
                <MetricCard label="Server/DB Load" value="Zero at Runtime" variant="emerald" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="Fixed at Build" variant="slate" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> You wrap asynchronous child components inside React <code>&lt;Suspense&gt;</code> on a static route.
                During <code>npm run build</code>, Dinou&apos;s compiler automatically waits for all Suspense boundaries to settle.
                The final emitted HTML includes the resolved markup directly; visitors <strong>never see the fallback skeleton</strong>.
              </p>

              <CodeBlock language="tsx" containerClassName="my-3">
{`// src/docs/page.tsx (Static Route with Suspense)
import { Suspense } from "react";
import db from "@/lib/db";
import { DocSkeleton } from "./skeleton";

export default function DocsPage() {
  return (
    <div className="docs-layout">
      <header><h1>API Reference</h1></header>
      {/* Compiler settles this during 'npm run build': */}
      <Suspense fallback={<DocSkeleton />}>
        <AsyncChangelog />
      </Suspense>
    </div>
  );
}

async function AsyncChangelog() {
  const versions = await db.changelog.findLatest();
  return <ChangelogList items={versions} />;
}`}
              </CodeBlock>

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>Architectural Cleanliness:</strong> Allows writing decoupled async components without worrying whether the page is static or dynamic.</p>
                <p>• <strong>Zero Flash of Skeleton:</strong> Because it is pre-rendered at build time, the browser renders the fully populated UI instantly on load.</p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 4 */}
            {/* ============================================================ */}
            <section id="strategy-4" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm">
                    4
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    RSC with &lt;Suspense&gt; (Dynamic Streaming SSR)
                  </h2>
                </div>
                <Badge variant="outline" className="text-amber-600 border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 font-mono text-xs">
                  Streaming SSR
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="Fast (Early Layout)" variant="emerald" />
                <MetricCard label="Stream Ready" value="Waits for DB (1-3s)" variant="amber" />
                <MetricCard label="Server/DB Load" value="Heavy (100% queries)" variant="rose" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="100% Live" variant="emerald" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> The page layout and headers are flushed immediately to the browser (fast TTFB).
                The slow child component executes its database query concurrently. Once resolved, the server sends an HTML chunk
                through the open HTTP connection that swaps out the skeleton fallback without refreshing the page.
              </p>

              <TabbedCodeBlock
                containerClassName="my-3"
                tabs={[
                  {
                    id: "fn",
                    label: "src/analytics/page_functions.ts",
                    language: "tsx",
                    code: `export const revalidate = 0; // Dynamic streaming SSR`,
                  },
                  {
                    id: "page",
                    label: "src/analytics/page.tsx",
                    language: "tsx",
                    code: `import { Suspense } from "react";
import db from "@/lib/db";
import { AnalyticsSkeleton } from "./skeleton";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Flushed immediately in chunk 1 (Early TTFB) */}
      <header>
        <h1 className="text-2xl font-bold">Revenue Analytics</h1>
        <p className="text-muted-foreground text-sm">Real-time calculations</p>
      </header>

      {/* Flushes skeleton in chunk 1, then streams resolved HTML in chunk 2 */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <SlowHeavyMetrics />
      </Suspense>
    </div>
  );
}

async function SlowHeavyMetrics() {
  // Heavy 1.5-second aggregation query:
  const data = await db.analytics.aggregateMonthlyRevenue();
  return <MetricsTable stats={data} />;
}`,
                  },
                ]}
              />

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>UX Advantage:</strong> The visitor immediately sees navigation, title, and skeletons instead of an unresponsive blank screen.</p>
                <p>• <strong>Caveat:</strong> Every single request still runs the full database query. For high traffic, protect this with Strategy 6.</p>
              </div>

              {/* Architectural Equivalence Alert: Server Component vs Server Function UI Return */}
              <Alert className="not-prose my-4 border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/20">
                <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-amber-700 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
                  Architectural Equivalence: Async Server Component vs Server Function UI Return
                </AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1.5 space-y-2">
                  <p>
                    Instead of declaring an inline async Server Component (<code>SlowHeavyMetrics</code>), you can alternatively execute the query inside an isolated <strong>Server Function</strong> (tagged with <code>&quot;use server&quot;</code>) that directly renders and returns the JSX component tree, and invoke it inside <code>&lt;Suspense&gt;</code>:
                  </p>
                  <TabbedCodeBlock
                    containerClassName="my-2"
                    tabs={[
                      {
                        id: "server-fn",
                        label: "src/analytics/server-functions.ts",
                        language: "tsx",
                        code: `"use server";

import db from "@/lib/db";
import { MetricsTable } from "./metrics-table";

export async function getMetricsTable() {
  const data = await db.analytics.aggregateMonthlyRevenue();
  return <MetricsTable stats={data} />;
}`,
                      },
                      {
                        id: "page",
                        label: "src/analytics/page.tsx",
                        language: "tsx",
                        code: `import { Suspense } from "react";
import { AnalyticsSkeleton } from "./skeleton";
import { getMetricsTable } from "./server-functions";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold">Revenue Analytics</h1>
      </header>

      {/* Directly invoke getMetricsTable() inside Suspense (no wrapper component needed!) */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        {getMetricsTable()}
      </Suspense>
    </div>
  );
}`,
                      },
                    ]}
                  />
                  <p>
                    Both patterns are <strong>functionally equivalent</strong> during dynamic streaming:
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Direct Promise Children:</strong> In React Server Components, <code>&lt;Suspense&gt;</code> natively accepts a <code>Promise&lt;ReactNode&gt;</code> directly as children (<code>&#123;getMetricsTable()&#125;</code>), eliminating the need for boilerplate async wrapper components.</li>
                    <li><strong>Identical HTTP Streaming Behavior:</strong> In both cases, the initial layout shell and <code>&lt;AnalyticsSkeleton /&gt;</code> are flushed immediately in chunk 1 (fast TTFB). When the query resolves, the server streams the rendered HTML/RSC payload into chunk 2.</li>
                    <li><strong>Zero Client JavaScript:</strong> Database logic, ORM queries, and credentials remain 100% on the server in both solutions.</li>
                    <li><strong>Versatility Bonus:</strong> Returning the JSX tree from a Server Function allows the exact same function to be triggered on-demand by Client Components later (e.g., a &quot;Refresh Metrics&quot; button or live filter) via Dinou&apos;s UI streaming RPC.</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 5 */}
            {/* ============================================================ */}
            <section id="strategy-5" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">
                    5
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    RSC + &lt;Suspense&gt; + &lt;DinouCacheSlot&gt; (Static SSG / Asymmetric ISR)
                  </h2>
                </div>
                <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 font-mono text-xs">
                  Static (SSG) + Micro-ISR
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="0ms (CDN Edge)" variant="emerald" />
                <MetricCard label="Stream Ready" value="Instant (~0-2ms)" variant="emerald" />
                <MetricCard label="Server/DB Load" value="Near-Zero" variant="emerald" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="Decoupled TTL" variant="amber" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> Solves the &quot;all-or-nothing&quot; revalidation problem. The base outer page and layout are pre-rendered at build time (<strong>Static Site Generation - SSG</strong>) or configured with long-term ISR (e.g., 24 hours) delivered with <strong>0ms TTFB from Edge CDN</strong>. Meanwhile, an inner volatile component is wrapped in <code>&lt;DinouCacheSlot&gt;</code> with a fast TTL (e.g., 60 seconds). The heavy outer page remains immutable at the Edge CDN, while the slot revalidates independently in server memory/KV storage.
              </p>

              <TabbedCodeBlock
                containerClassName="my-3"
                tabs={[
                  {
                    id: "fn",
                    label: "src/products/[slug]/page_functions.ts",
                    language: "tsx",
                    code: `export const revalidate = 86400; // Outer page revalidates once every 24 hours`,
                  },
                  {
                    id: "page",
                    label: "src/products/[slug]/page.tsx",
                    language: "tsx",
                    code: `import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";
import { LivePriceTicker, StaticDescription } from "./components";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="product-view">
      {/* Static product description: cached at Edge CDN for 24h */}
      <StaticDescription slug={params.slug} />

      {/* Asymmetric Micro-ISR: revalidates every 60s or via refreshSlot() */}
      <Suspense fallback={<p>Checking live pricing...</p>}>
        <DinouCacheSlot id={\`price-\${params.slug}\`} revalidate={60} tag="pricing">
          <LivePriceTicker slug={params.slug} />
        </DinouCacheSlot>
      </Suspense>
    </div>
  );
}`,
                  },
                ]}
              />

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>Targeted Invalidation:</strong> Calling <code>refreshSlot(&quot;price-prod-1&quot;)</code> from a client button refreshes only the price widget without rebuilding the 24-hour page cache.</p>
                <p>• <strong>Massive Cost Savings:</strong> Prevents volatile widgets from causing full-page rebuild cascades across thousands of static pages.</p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 6 */}
            {/* ============================================================ */}
            <section id="strategy-6" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">
                    6
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    RSC + &lt;Suspense&gt; + &lt;DinouCacheSlot&gt; (Dynamic Micro-ISR)
                  </h2>
                </div>
                <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 font-mono text-xs">
                  Server Cache Stream
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="Fast (Early Layout)" variant="emerald" />
                <MetricCard label="Stream Ready" value="~2ms (Cache Hit)" variant="emerald" />
                <MetricCard label="Server/DB Load" value="Near-Zero (99% Offload)" variant="emerald" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="TTL / Tag Reval" variant="amber" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> Used on dynamic routes that depend on user sessions, cookies, or headers.
                The layout shell streams immediately. Inside the page, heavy components are protected by <code>&lt;DinouCacheSlot&gt;</code>.
                On cache hit, the pre-computed RSC binary chunk is pulled from memory/KV in ~2ms and streamed down without querying PostgreSQL/MongoDB.
              </p>

              <TabbedCodeBlock
                containerClassName="my-3"
                tabs={[
                  {
                    id: "fn",
                    label: "src/feed/page_functions.ts",
                    language: "tsx",
                    code: `export const revalidate = 0; // Dynamic route with per-request session`,
                  },
                  {
                    id: "page",
                    label: "src/feed/page.tsx",
                    language: "tsx",
                    code: `import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";
import { UserGreeting, GlobalTrendingWidget } from "./components";

export default function FeedPage() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {/* 1. Dynamic per-user greeting (computed live on each request) */}
      <div className="col-span-2">
        <UserGreeting />
      </div>

      {/* 2. Global trending feed: cached for 300s in server memory (Micro-ISR) */}
      <aside className="col-span-1">
        <Suspense fallback={<p>Loading trends...</p>}>
          <DinouCacheSlot id="global-trending" revalidate={300} tag="trends">
            <GlobalTrendingWidget />
          </DinouCacheSlot>
        </Suspense>
      </aside>
    </div>
  );
}`,
                  },
                ]}
              />

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>Stream Speed:</strong> Instead of waiting 1.5 seconds for the DB on every page visit, the slot resolves in ~2ms from RAM.</p>
                <p>• <strong>Ideal For:</strong> Social feeds, dashboards, recommendations, and search suggestions in authenticated web apps.</p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 7 */}
            {/* ============================================================ */}
            <section id="strategy-7" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">
                    7
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    RSC with &lt;Suspense&gt; (PPR Hybrid)
                  </h2>
                </div>
                <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 font-mono text-xs">
                  Partial Prerendering
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="0ms (Shell from Edge)" variant="emerald" />
                <MetricCard label="Stream Ready" value="Slow (Waits for DB)" variant="rose" />
                <MetricCard label="Server/DB Load" value="Heavy (100% queries)" variant="rose" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="100% Live" variant="emerald" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> The page enables Partial Prerendering via <code>export const ppr = true</code>.
                At build time, Dinou pre-renders the navigation bar, footer, and component skeletons into immutable CDN artifacts.
                When a visitor arrives, the Edge CDN responds in <strong>0ms</strong> with the static shell. Simultaneously, the server
                executes the dynamic hole and streams the live HTML into the open connection.
              </p>

              <TabbedCodeBlock
                containerClassName="my-3"
                tabs={[
                  {
                    id: "fn",
                    label: "src/catalog/page_functions.ts",
                    language: "tsx",
                    code: `export const ppr = true; // Enables Partial Prerendering`,
                  },
                  {
                    id: "page",
                    label: "src/catalog/page.tsx",
                    language: "tsx",
                    code: `import { Suspense } from "react";
import db from "@/lib/db";
import { StockSkeleton } from "./skeleton";

export default function CatalogPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* 0ms TTFB: Served directly from Edge CDN */}
      <header>
        <h1 className="text-3xl font-bold">Catalog & Inventory</h1>
        <p className="text-muted-foreground">Shell painted in 0ms.</p>
      </header>

      {/* Dynamic Hole: Executed on request and streamed live */}
      <Suspense fallback={<StockSkeleton />}>
        <LiveStockBalance />
      </Suspense>
    </div>
  );
}

async function LiveStockBalance() {
  // Query executed on every request:
  const stock = await db.warehouse.getLiveInventory();
  return <p className="font-mono text-emerald-600">{stock} units remaining</p>;
}`,
                  },
                ]}
              />

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>Eliminates the SSR Bottleneck:</strong> The browser parses stylesheets and scripts in 0ms while the server computes data in the background.</p>
                <p>• <strong>Notice:</strong> Because the dynamic hole is uncached, heavy traffic will still send 100% of queries to the database. See Strategy 8 for caching the hole.</p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 8 */}
            {/* ============================================================ */}
            <section id="strategy-8" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">
                    8
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    PPR + &lt;DinouCacheSlot&gt; (Peak Performance Synergy)
                  </h2>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 font-mono text-xs">
                    PPR Hybrid Synergy
                  </Badge>
                  <Badge className="bg-emerald-600 text-white font-mono text-xs hover:bg-emerald-700">
                    Recommended
                  </Badge>
                </div>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="0ms (Edge CDN)" variant="emerald" />
                <MetricCard label="Stream Ready" value="~2-5ms (RAM Cache)" variant="emerald" />
                <MetricCard label="Server/DB Load" value="99.9% Offload" variant="emerald" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="TTL / Tag Reval" variant="amber" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> The gold standard for high-traffic web applications. Combines Partial Prerendering
                with component-level Micro-ISR. The Edge CDN delivers the static shell in <strong>0ms TTFB</strong>.
                The server streams the dynamic hole almost instantly (~2ms) because the sub-tree is cached in memory/KV storage.
                Visitors see zero visible skeleton flicker, while database queries are reduced by 99.9%.
              </p>

              <TabbedCodeBlock
                containerClassName="my-3"
                tabs={[
                  {
                    id: "fn",
                    label: "src/trending/page_functions.ts",
                    language: "tsx",
                    code: `export const ppr = true; // Static Edge Shell`,
                  },
                  {
                    id: "page",
                    label: "src/trending/page.tsx",
                    language: "tsx",
                    code: `import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";
import { TrendingGrid, TrendingSkeleton } from "./components";

export default function TrendingPage() {
  return (
    <main className="p-8 max-w-5xl mx-auto space-y-6">
      {/* 1. Static Layout: delivered immediately with 0ms TTFB from CDN Edge */}
      <header>
        <h1 className="text-3xl font-bold">Trending Products</h1>
        <p className="text-muted-foreground text-sm">Ultra-high traffic viral catalog.</p>
      </header>

      {/* 2. Micro-ISR Slot: resolves in ~2ms from server memory/KV cache without DB query */}
      <Suspense fallback={<TrendingSkeleton />}>
        <DinouCacheSlot id="viral-trending" revalidate={120} tag="trending">
          <TrendingGrid />
        </DinouCacheSlot>
      </Suspense>
    </main>
  );
}`,
                  },
                ]}
              />

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-emerald-50/30 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/20">
                <p>• <strong>Benchmarked Throughput:</strong> Under a spike of 50,000 requests/minute, only 1 query hits the database every 120 seconds.</p>
                <p>• <strong>User Experience:</strong> 0ms TTFB first paint + ~2ms content resolution = Feels like a static page with near-live freshness.</p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 9 */}
            {/* ============================================================ */}
            <section id="strategy-9" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm">
                    9
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    RSC Promise ➔ Client use() (React 19)
                  </h2>
                </div>
                <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 font-mono text-xs">
                  Promise Streaming
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="0ms (with PPR) / Fast" variant="emerald" />
                <MetricCard label="Stream Ready" value="Waits for Promise" variant="amber" />
                <MetricCard label="Server/DB Load" value="Heavy (Live query)" variant="rose" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="100% Live" variant="emerald" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> In React 19, Server Components can start an asynchronous data fetch without <code>await</code>,
                and pass the raw <code>Promise</code> across the flight serialization boundary to a Client Component.
                The Client Component unwraps it synchronously using the native <code>use()</code> hook inside <code>&lt;Suspense&gt;</code>.
                No <code>useEffect</code>, no client fetch cascades, and no duplicate network requests!
              </p>

              <TabbedCodeBlock
                containerClassName="my-3"
                tabs={[
                  {
                    id: "server",
                    label: "src/search/page.tsx (Server Component)",
                    language: "tsx",
                    code: `import { Suspense } from "react";
import db from "@/lib/db";
import { SearchResultsClient } from "./search-results-client";

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";

  // Start query WITHOUT awaiting! Passes un-awaited Promise to client:
  const resultsPromise = db.products.search({ query });

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Search Catalog</h1>
      <Suspense key={query} fallback={<p className="text-muted-foreground">Searching catalog...</p>}>
        <SearchResultsClient promise={resultsPromise} />
      </Suspense>
    </main>
  );
}`,
                  },
                  {
                    id: "client",
                    label: "src/search/search-results-client.tsx (Client Component)",
                    language: "tsx",
                    code: `"use client";

import { use, useState } from "react";

export function SearchResultsClient({ promise }: { promise: Promise<Product[]> }) {
  // Native React 19 hook: unwraps the Flight RPC promise directly
  const products = use(promise);
  const [filterPrice, setFilterPrice] = useState(100);

  return (
    <div>
      <input type="range" max={500} value={filterPrice} onChange={(e) => setFilterPrice(+e.target.value)} />
      <ul>
        {products.filter(p => p.price <= filterPrice).map((p) => (
          <li key={p.id}>{p.name} - \${p.price}</li>
        ))}
      </ul>
    </div>
  );
}`,
                  },
                ]}
              />

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>Zero Waterfall:</strong> The server initiates the query before the client even finishes parsing JavaScript.</p>
                <p>• <strong>Interactive State:</strong> The client component immediately has access to full client hooks (<code>useState</code>, <code>useMemo</code>) to filter or mutate UI state.</p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 10 */}
            {/* ============================================================ */}
            <section id="strategy-10" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">
                    10
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Client-First getProps (SSG)
                  </h2>
                </div>
                <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 font-mono text-xs">
                  Static Client Model
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="0ms (CDN Edge)" variant="emerald" />
                <MetricCard label="Stream Ready" value="Instant (0ms)" variant="emerald" />
                <MetricCard label="Server/DB Load" value="Zero at Runtime" variant="emerald" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="Fixed at Build" variant="slate" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> The page uses Dinou&apos;s Client-First Model. Data is retrieved on the server at build time
                via <code>getProps</code> in <code>page_functions.ts</code>, while <code>page.tsx</code> is an interactive Client Component
                marked with <code>&quot;use client&quot;</code>. The build generates static HTML with pre-serialized props, which hydrates into a full SPA on load.
              </p>

              <TabbedCodeBlock
                containerClassName="my-3"
                tabs={[
                  {
                    id: "fn",
                    label: "src/whiteboard/page_functions.ts",
                    language: "tsx",
                    code: `import db from "@/lib/db";

export async function getProps() {
  const defaultTemplates = await db.templates.findDefaults();
  return { defaultTemplates };
}`,
                  },
                  {
                    id: "page",
                    label: "src/whiteboard/page.tsx",
                    language: "tsx",
                    code: `"use client";

import { useState } from "react";
import { CanvasStage, ToolPalette } from "@/components/canvas";

export default function WhiteboardPage({ defaultTemplates }: { defaultTemplates: any[] }) {
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplates[0]);

  return (
    <div className="h-screen flex flex-col">
      <ToolPalette onSelect={setSelectedTemplate} />
      <CanvasStage initialData={selectedTemplate} />
    </div>
  );
}`,
                  },
                ]}
              />

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>Ergonomics:</strong> Perfect for developers migrating from Vite/CRA who want classic React hooks everywhere without losing SSG SEO and 0ms TTFB.</p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 11 */}
            {/* ============================================================ */}
            <section id="strategy-11" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold text-sm">
                    11
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Client-First getProps (Dynamic SSR)
                  </h2>
                </div>
                <Badge variant="outline" className="text-rose-600 border-rose-500/30 bg-rose-50/40 dark:bg-rose-950/20 font-mono text-xs">
                  Dynamic Client SSR
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="Slow (Blocked)" variant="rose" />
                <MetricCard label="Stream Ready" value="N/A (Blocks TTFB)" variant="slate" />
                <MetricCard label="Server/DB Load" value="Heavy (100% queries)" variant="rose" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="100% Live" variant="emerald" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> The same Client-First approach as Strategy 10, but configured for on-demand dynamic execution
                (e.g., dynamic params or <code>revalidate = 0</code>). On every request, the server executes <code>getProps</code>, passes the data
                into the client page component, and renders the initial HTML document.
              </p>

              <TabbedCodeBlock
                containerClassName="my-3"
                tabs={[
                  {
                    id: "fn",
                    label: "src/editor/[docId]/page_functions.ts",
                    language: "tsx",
                    code: `import db from "@/lib/db";

export const revalidate = 0; // Dynamic SSR

export async function getProps(params: { docId: string }) {
  const document = await db.documents.findById(params.docId);
  return { document };
}`,
                  },
                  {
                    id: "page",
                    label: "src/editor/[docId]/page.tsx",
                    language: "tsx",
                    code: `"use client";

import { useState } from "react";

export default function DocumentEditor({ document }: { document: any }) {
  const [content, setContent] = useState(document.initialBody);

  return (
    <div className="editor-container">
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
    </div>
  );
}`,
                  },
                ]}
              />

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>Trade-off:</strong> Because the server waits for <code>getProps</code> before sending the first byte, TTFB is slower compared to streaming patterns.</p>
                <p>• <strong>Advantage:</strong> Eliminates client-side spinner flashing upon initial navigation compared to classic Single Page Apps.</p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 12 */}
            {/* ============================================================ */}
            <section id="strategy-12" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm">
                    12
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Client Calling Server Function (Initial Mount - Dynamic RPC)
                  </h2>
                </div>
                <Badge variant="outline" className="text-amber-600 border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 font-mono text-xs">
                  Initial Mount RPC
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="Fast (Shell Only)" variant="emerald" />
                <MetricCard label="Stream Ready" value="Delayed (Waterfall)" variant="rose" />
                <MetricCard label="Server/DB Load" value="Heavy (100% RPC)" variant="rose" />
                <MetricCard label="Waterfall" value="YES (Waterfall)" variant="rose" />
                <MetricCard label="Data Freshness" value="100% Live" variant="emerald" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> A Client Component triggers a Server Function on initial mount via RPC.
                In Dinou and modern React 19, this is accomplished without legacy <code>useEffect</code> hooks; instead,
                the initial Server Function promise is initialized in state or component instantiation and unwrapped synchronously
                using React 19&apos;s native <code>use()</code> hook inside <code>&lt;Suspense&gt;</code>.
              </p>

              <TabbedCodeBlock
                containerClassName="my-3"
                tabs={[
                  {
                    id: "server-fn",
                    label: "src/dashboard/server-functions.ts",
                    language: "tsx",
                    code: `"use server";

import db from "@/lib/db";

export async function fetchDashboardStats() {
  const count = await db.users.count();
  const active = await db.users.countActiveSessions();
  return { count, active };
}`,
                  },
                  {
                    id: "widget",
                    label: "src/dashboard/stats-widget.tsx",
                    language: "tsx",
                    code: `"use client";

import { useState, use, Suspense } from "react";
import { fetchDashboardStats } from "./server-functions";

function StatsContent({ promise }: { promise: Promise<{ count: number; active: number }> }) {
  // Pure React 19 use() unrolls the Flight RPC promise within Suspense (no useEffect!)
  const data = use(promise);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-3 border rounded-lg bg-card">
        <span className="text-xs text-muted-foreground block">Total Users</span>
        <strong className="text-xl">{data.count}</strong>
      </div>
      <div className="p-3 border rounded-lg bg-card">
        <span className="text-xs text-muted-foreground block">Active Sessions</span>
        <strong className="text-xl text-emerald-600">{data.active}</strong>
      </div>
    </div>
  );
}

export function DashboardStatsWidget() {
  // Initiates Server Function RPC on initial mount without useEffect:
  const [statsPromise] = useState(() => fetchDashboardStats());

  return (
    <div className="p-4 border rounded-xl space-y-3">
      <h3 className="font-semibold text-sm">System Overview</h3>
      <Suspense fallback={<p className="text-xs text-muted-foreground">Loading metrics over RPC...</p>}>
        <StatsContent promise={statsPromise} />
      </Suspense>
    </div>
  );
}`,
                  },
                ]}
              />

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>Modern React 19 Ergonomics:</strong> Unrolls promises synchronously with <code>use()</code> inside <code>&lt;Suspense&gt;</code>. Eliminates legacy <code>useEffect</code> lifecycle hooks, manual loading flags (<code>isLoading</code>, <code>error</code>), and fetch boilerplate.</p>
                <p>• <strong>Network Round Trip:</strong> Supported and idiomatic for client widgets, but incurs a second client-side HTTP round trip after hydration. When you control the parent route, prefer <strong>Strategy 9 (RSC Promise)</strong> to initiate the promise on the server and eliminate the extra round trip.</p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* STRATEGY 13 */}
            {/* ============================================================ */}
            <section id="strategy-13" className="scroll-mt-20 pt-6 border-t">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 font-mono font-bold text-sm">
                    13
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Client Server Functions (User Actions &amp; Mutations)
                  </h2>
                </div>
                <Badge variant="outline" className="text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 font-mono text-xs">
                  Type-Safe RPC Mutations
                </Badge>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 not-prose my-3 text-[11px]">
                <MetricCard label="TTFB" value="N/A (Post-Load)" variant="slate" />
                <MetricCard label="Stream Ready" value="N/A (User Event)" variant="slate" />
                <MetricCard label="Server/DB Load" value="On-Demand" variant="slate" />
                <MetricCard label="Waterfall" value="None" variant="emerald" />
                <MetricCard label="Data Freshness" value="100% Live" variant="emerald" className="col-span-2 sm:col-span-1" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>How it works:</strong> The official, idiomatic role for Server Functions. Invoked exclusively in response to
                user-triggered events (button clicks, form submissions, drag-and-drop actions). Server Functions execute securely on the server,
                mutate state, and trigger on-demand cache revalidation via <code>revalidateTag</code>.
              </p>

              <TabbedCodeBlock
                containerClassName="my-3"
                tabs={[
                  {
                    id: "server-fn",
                    label: "src/cart/server-functions.ts",
                    language: "tsx",
                    code: `"use server";

import db from "@/lib/db";
import { revalidateTag } from "dinou/server";

export async function addToCart(productId: string, quantity: number) {
  // Direct server mutation with ORM
  await db.cart.addItem({ productId, quantity });

  // On-demand invalidation: purges cache tag across CDNs and Micro-ISR slots
  await revalidateTag("cart");

  return { success: true };
}`,
                  },
                  {
                    id: "button",
                    label: "src/cart/add-to-cart-button.tsx",
                    language: "tsx",
                    code: `"use client";

import { useTransition } from "react";
import { addToCart } from "./server-functions";

export function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await addToCart(productId, 1);
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending} className="btn-primary">
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
}`,
                  },
                ]}
              />

              <div className="not-prose text-xs text-muted-foreground space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border">
                <p>• <strong>Strict Rule:</strong> Only call Server Functions in mutative event contexts. Never invoke them during the render phase or inside components.</p>
                <p>• <strong>Type Safety:</strong> Arguments and return types are inferred end-to-end between client and server without manual fetch boilerplate.</p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* DECISION GUIDE */}
            {/* ============================================================ */}
            <section id="decision-guide" className="scroll-mt-20 pt-8 border-t">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                Architectural Decision Guide
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When deciding which strategy to apply to a new feature or page, follow this quick decision tree:
              </p>

              <div className="not-prose grid gap-4 sm:grid-cols-2 my-6 text-xs">
                <Card className="border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20 shadow-xs">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                      Is the content public or marketing?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground space-y-1">
                    <p>➔ <strong>Strategy 1 (RSC SSG):</strong> 0ms TTFB, 0kb client JS, 100% CDN cached.</p>
                    <p>➔ If parts change periodically: <strong>Strategy 5 (Static SSG / Asymmetric ISR)</strong>.</p>
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20 shadow-xs">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                      High-traffic store or viral catalog?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground space-y-1">
                    <p>➔ <strong>Strategy 8 (PPR + CacheSlot):</strong> Instant 0ms Edge layout + ~2ms cached hole. 99.9% database query offload.</p>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/20 shadow-xs">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-amber-700 dark:text-amber-400">
                      Interactive tool, canvas, or complex editor?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground space-y-1">
                    <p>➔ <strong>Strategy 10 / 11 (Client-First):</strong> Server gets data via <code>getProps</code>, page is 100% interactive client component.</p>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/20 shadow-xs">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-amber-700 dark:text-amber-400">
                      Live search filter or client widget?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground space-y-1">
                    <p>➔ <strong>Strategy 9 (React 19 use()):</strong> Start query on server, stream raw promise to client component without waterfalls.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Visible on Desktop */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
