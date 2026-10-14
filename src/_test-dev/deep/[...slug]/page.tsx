import { Link } from "dinou";
import { Layers, Compass, ArrowLeft } from "lucide-react";

export default function DeepSlugPage({ params }: { params?: { slug?: string[] } }) {
  const segments = Array.isArray(params?.slug) ? params.slug : [params?.slug || "root"];

  return (
    <div className="space-y-4 p-4 rounded-xl bg-card border border-purple-500/20">
      <div className="flex items-center gap-2">
        <Compass className="h-5 w-5 text-purple-500" />
        <h3 className="font-bold text-base text-foreground">Catch-All Dynamic Router Engine</h3>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Resolved parameters via Dinou dynamic segment matcher:
      </p>

      <div className="flex flex-wrap gap-2">
        {segments.map((seg, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 font-mono text-xs font-bold"
          >
            [{i}] &rarr; {seg}
          </span>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <Link
          href="/test-dev"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to /test-dev
        </Link>
        <Link
          href="/test-dev/deep/alpha/beta/gamma"
          className="text-xs font-mono text-purple-600 dark:text-purple-400 hover:underline"
        >
          Test 3-level slug &rarr;
        </Link>
      </div>
    </div>
  );
}
