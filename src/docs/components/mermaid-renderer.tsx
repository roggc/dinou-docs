"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

// Initialize mermaid configurations globally
mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  themeVariables: {
    background: "#0f172a", // Slate-900 matching Tailwind dark theme
    primaryColor: "#3b82f6", // Blue-500
    primaryTextColor: "#f8fafc", // Slate-50
    lineColor: "#64748b", // Slate-500
  },
});

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute("data-processed");
      try {
        mermaid.contentLoaded();
      } catch (err) {
        console.error("[Mermaid Render Error]:", err);
      }
    }
  }, [chart]);

  return (
    <div className="my-6 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 shadow-inner overflow-x-auto max-w-full">
      <div className="mermaid min-w-[800px] w-full text-center" ref={ref}>
        {chart}
      </div>
    </div>
  );
}
