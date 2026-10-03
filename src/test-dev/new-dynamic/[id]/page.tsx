import { Sparkles, Hash, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function DynamicIdPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <div className="p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/10 backdrop-blur-sm space-y-4">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-xs tracking-wider uppercase">
          <Hash className="h-4 w-4" />
          Dynamic Route Created Live During Dev
        </div>

        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Resolved Parameter:{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent underline decoration-purple-500">
            {params?.id || "N/A"}
          </span>
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          If you are seeing this page, Dinou&apos;s dev watcher successfully registered a <strong>new folder structure with dynamic parameter bracket notation (<code>[id]</code>)</strong> in memory on the fly without restarting the server!
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <a
            href="/test-dev/new-dynamic/react-19-rocks"
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-background border border-purple-300 dark:border-purple-800 hover:border-purple-500 text-purple-600 dark:text-purple-400 transition-colors"
          >
            Try: /test-dev/new-dynamic/react-19-rocks
          </a>
          <a
            href="/test-dev/new-dynamic/zero-disk-io"
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-background border border-purple-300 dark:border-purple-800 hover:border-purple-500 text-purple-600 dark:text-purple-400 transition-colors"
          >
            Try: /test-dev/new-dynamic/zero-disk-io
          </a>
        </div>
      </div>

      <a
        href="/test-dev"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to /test-dev
      </a>
    </div>
  );
}
