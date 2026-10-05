"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type OptionKey = "npm" | "npx";

const COMMANDS: Record<OptionKey, string> = {
  npm: "npm create dinou@latest my-app",
  npx: "npx create-dinou@latest my-app",
};

export function QuickStartBadge() {
  const [selected, setSelected] = useState<OptionKey>("npm");
  const [copied, setCopied] = useState(false);

  const command = COMMANDS[selected];

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-flex items-center max-w-full">
      <div className="inline-flex items-center gap-2 sm:gap-3 p-1.5 pl-2 sm:pl-2.5 rounded-full bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 backdrop-blur-md shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
        
        {/* Toggle options: npm vs npx */}
        <div className="flex items-center p-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/50 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setSelected("npm")}
            className={`px-2.5 py-0.5 text-xs font-mono font-medium rounded-full transition-all duration-150 cursor-pointer ${
              selected === "npm"
                ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            npm
          </button>
          <button
            type="button"
            onClick={() => setSelected("npx")}
            className={`px-2.5 py-0.5 text-xs font-mono font-medium rounded-full transition-all duration-150 cursor-pointer ${
              selected === "npx"
                ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            npx
          </button>
        </div>

        {/* Command and Copy trigger */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 text-left group pr-1 sm:pr-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full cursor-pointer"
          title="Click to copy command"
          aria-label={`Copy command: ${command}`}
        >
          <span className="text-slate-400 dark:text-slate-500 font-mono text-xs sm:text-sm select-none">
            $
          </span>
          <code className="font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {command}
          </code>

          <div
            className={`flex items-center justify-center w-7 h-7 rounded-full transition-all ml-0.5 ${
              copied
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                : "bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white"
            }`}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
