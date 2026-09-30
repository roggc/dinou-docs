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
    <div className="relative group w-full max-w-2xl mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-700"></div>
      <div className="relative overflow-hidden bg-slate-950 text-slate-100 border border-slate-800 shadow-2xl rounded-2xl">
        {/* Top bar with tabs */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-slate-400 font-mono ml-2">bash</span>
          </div>

          <div className="flex items-center space-x-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800/80">
            {(["npm", "pnpm", "bun", "deno"] as PackageManager[]).map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => setActivePm(pm)}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                  activePm === pm
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm relative">
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800/80"
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

          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-emerald-400 mr-2 select-none">$</span>
              <span className="text-slate-200 font-medium">{currentCmd.install}</span>
            </div>
            <div className="text-slate-500 text-xs pl-4 border-l border-slate-800">
              Initializing Dinou v7 with React 19 Dual-Bundle AOT engine...
            </div>
            <div className="text-emerald-400/90 text-xs pl-4 border-l border-slate-800">
              ✔ Universal project structure ready (deploy to Node, Bun, Deno, Cloudflare)
            </div>
            <div className="flex items-start pt-1">
              <span className="text-emerald-400 mr-2 select-none">$</span>
              <span className="text-slate-200">{currentCmd.dev}</span>
            </div>
            <div className="text-blue-400 text-xs flex items-center gap-1.5 font-medium pt-1">
              <span>🚀</span>
              <span>Dinou v7 dev server listening on http://localhost:3000 (0-fork, in-RAM)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
