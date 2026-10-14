export default function DeepLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl border-2 border-dashed border-purple-500/40 bg-purple-500/5 space-y-4">
      <div className="flex items-center justify-between text-xs font-mono text-purple-600 dark:text-purple-400 font-bold border-b border-purple-500/20 pb-2">
        <span>[Deep Catch-All Layout]</span>
        <span>Route: /test-dev/deep/[...slug]</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
