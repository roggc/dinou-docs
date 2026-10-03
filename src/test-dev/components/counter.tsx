"use client";

import { useState } from "react";
import { Plus, Minus, RotateCcw, Sparkles } from "lucide-react";

export function Counter({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);
  const [text, setText] = useState("");
  const [activeColor, setActiveColor] = useState("blue");

  const colors: Record<string, string> = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    emerald: "bg-emerald-600 hover:bg-emerald-700 text-white",
    purple: "bg-purple-600 hover:bg-purple-700 text-white",
    rose: "bg-rose-600 hover:bg-rose-700 text-white",
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500 animate-spin" />
          <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
            ⚡ HMR V2 Live Updated Counter!
          </h4>
        </div>
        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800 font-bold">
          FAST REFRESH ACTIVE
        </span>
      </div>

      {/* Counter Display & Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white min-w-[70px]">
          {count}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-transform active:scale-95 shadow-sm"
            title="Increment +1"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setCount((c) => c + 5)}
            className="flex items-center justify-center h-10 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-transform active:scale-95 shadow-sm"
            title="Increment +5"
          >
            +5
          </button>
          <button
            type="button"
            onClick={() => setCount((c) => c * 2)}
            className="flex items-center justify-center h-10 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-transform active:scale-95 shadow-sm"
            title="Multiply x2"
          >
            x2
          </button>
          <button
            type="button"
            onClick={() => setCount((c) => Math.round(c ** 1.2))}
            className="flex items-center justify-center h-10 px-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs transition-transform active:scale-95 shadow-sm"
            title="Exponential ^1.2"
          >
            ^1.2
          </button>
          <button
            type="button"
            onClick={() => setCount((c) => c - 1)}
            className="flex items-center justify-center h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold transition-transform active:scale-95"
            title="Decrement"
          >
            <Minus className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setCount(initialCount)}
            className="flex items-center justify-center h-10 w-10 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* State Preservation Test Input */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <label htmlFor="hmr-test-input" className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
          State Preservation Test (Type something here before modifying code):
        </label>
        <input
          id="hmr-test-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="E.g. Testing HMR state..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />
        {text && (
          <p className="text-xs text-blue-600 dark:text-blue-400">
            Active state: <strong>&ldquo;{text}&rdquo;</strong> (length: {text.length})
          </p>
        )}
      </div>

      {/* Theme Swatch */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-xs text-muted-foreground">Color accent:</span>
        {(["blue", "emerald", "purple", "rose"] as const).map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setActiveColor(color)}
            className={`h-6 px-2.5 rounded text-xs font-medium capitalize transition-all ${
              activeColor === color
                ? `${colors[color]} ring-2 ring-offset-2 ring-offset-background ring-slate-400`
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}
