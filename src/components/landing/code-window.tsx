"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";

// Transparent One Dark theme ensuring no unwanted line backgrounds/highlights
const cleanOneDark = {
  ...oneDark,
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "transparent",
    textShadow: "none",
  },
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "transparent",
    textShadow: "none",
  },
};

interface CodeWindowProps {
  filename: string;
  code: string;
  language?: string;
  statusLeft?: string;
  statusRight?: string;
  className?: string;
}

export function CodeWindow({
  filename,
  code,
  language = "tsx",
  statusLeft = "Native React 19 RSC Pipeline",
  statusRight = "TypeScript 5.x",
  className = "",
}: CodeWindowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-[#0d1117] text-slate-100 shadow-2xl overflow-hidden flex flex-col ${className}`}
    >
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="text-xs text-slate-300 font-mono ml-2 font-medium">
            {filename}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-md transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Syntax Highlighted Code Body */}
      <div className="overflow-x-auto flex-1 text-xs sm:text-[13px] leading-relaxed bg-[#0d1117]">
        <SyntaxHighlighter
          language={language}
          style={cleanOneDark}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "transparent",
            fontSize: "inherit",
            lineHeight: "1.65",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
          codeTagProps={{
            style: {
              background: "transparent",
            },
          }}
          wrapLines={false}
          wrapLongLines={false}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>

      {/* Editor Footer / Info Bar */}
      {(statusLeft || statusRight) && (
        <div className="px-4 py-2.5 bg-[#161b22]/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono shrink-0">
          {statusLeft && (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{statusLeft}</span>
            </span>
          )}
          {statusRight && <span>{statusRight}</span>}
        </div>
      )}
    </div>
  );
}
