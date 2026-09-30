"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type PackageManager = "npm" | "pnpm" | "bun" | "deno";

const commands: Record<PackageManager, { install: string; dev: string }> = {
  npm: {
    install: "npx create-dinou@latest my-app",
    dev: "cd my-app && npm run dev",
  },
  pnpm: {
    install: "pnpm create dinou my-app",
    dev: "cd my-app && pnpm dev",
  },
  bun: {
    install: "bun create dinou my-app",
    dev: "cd my-app && bun dev",
  },
  deno: {
    install: "deno run -A npm:create-dinou my-app",
    dev: "cd my-app && deno task dev",
  },
};

export function TerminalTabs() {
  const [activePm, setActivePm] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);

  const currentCmd = commands[activePm];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCmd.install);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="overflow-hidden bg-[#0d1117] text-slate-100 border border-slate-700/80 dark:border-slate-800 shadow-2xl rounded-2xl">
        {/* Top bar with tabs */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="text-xs text-slate-400 font-mono ml-2">bash</span>
          </div>

          <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
            {(["npm", "pnpm", "bun", "deno"] as PackageManager[]).map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => setActivePm(pm)}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                  activePm === pm
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm sm:text-base relative bg-[#0d1117]">
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            onClick={handleCopy}
            title="Copy command"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy install command</span>
          </Button>

          <div className="space-y-3.5 pr-8">
            <div className="flex items-start">
              <span className="text-emerald-400 font-bold mr-2.5 select-none">$</span>
              <span className="text-white font-semibold tracking-wide">{currentCmd.install}</span>
            </div>
            <div className="text-slate-300 text-xs sm:text-sm pl-3.5 border-l-2 border-slate-700/80">
              Creating a new Dinou app with React 19...
            </div>
            <div className="text-emerald-300 text-xs sm:text-sm pl-3.5 border-l-2 border-emerald-500/60 font-medium">
              ✔ Ready to deploy to Cloudflare, Bun, Deno, Node & SSG
            </div>
            <div className="flex items-start pt-1.5">
              <span className="text-emerald-400 font-bold mr-2.5 select-none">$</span>
              <span className="text-white font-semibold tracking-wide">{currentCmd.dev}</span>
            </div>
            <div className="text-sky-300 text-xs sm:text-sm flex items-center gap-2 pt-1 font-medium">
              <span className="text-emerald-400 font-bold">➜</span>
              <span>Local server running on <span className="text-white underline underline-offset-4 decoration-sky-400/50">http://localhost:3000</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
