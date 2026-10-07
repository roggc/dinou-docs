"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";

export interface TabbedCodeItem {
  id: string;
  label: string;
  language?: string;
  code: string;
}

interface TabbedCodeBlockProps {
  tabs: TabbedCodeItem[];
  defaultTab?: string;
  containerClassName?: string;
}

export function TabbedCodeBlock({
  tabs,
  defaultTab,
  containerClassName = "",
}: TabbedCodeBlockProps) {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTab || tabs[0]?.id || ""
  );

  const currentTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  return (
    <div
      className={`w-full rounded-lg border border-border bg-card overflow-hidden ${containerClassName}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-2 py-1.5">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTabId(tab.id)}
              className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-background text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/40"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="relative">
        <CodeBlock
          key={currentTab.id}
          language={currentTab.language ?? "tsx"}
          containerClassName="rounded-none border-0"
        >
          {currentTab.code}
        </CodeBlock>
      </div>
    </div>
  );
}
