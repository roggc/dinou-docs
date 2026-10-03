import type { ReactNode } from "react";
import { Hash, Sparkles } from "lucide-react";

export default function DynamicIdNestedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="p-6 rounded-3xl border-2 border-purple-500/40 bg-purple-50/20 dark:bg-purple-950/20 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-purple-200 dark:border-purple-800/60">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold">
          <Hash className="h-4 w-4" />
          Level-3 Nested Layout: src/test-dev/new-dynamic/[id]/layout.tsx
        </div>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-600 text-white font-bold">
          3-Level Nesting Verified
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}
