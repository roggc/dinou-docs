"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";
import { Copy, Check, FileCode } from "lucide-react";

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
  const [copied, setCopied] = useState(false);

  const currentTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  const copyToClipboard = async () => {
    if (!currentTab) return;
    await navigator.clipboard.writeText(currentTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`w-full min-w-0 rounded-lg border border-[#30363d] bg-[#1e2227] overflow-hidden shadow-sm ${containerClassName}`}
    >
      {/* Integrated Terminal / Editor Tab Bar Header */}
      <div className="flex items-center justify-between border-b border-[#181a1f] bg-[#1e2227] px-2.5 py-1.5 gap-2">
        <div className="flex items-center gap-2 min-w-0 overflow-x-auto scrollbar-none">
          {/* Terminal Window Dots */}
          <div className="hidden sm:flex items-center gap-1.5 pl-1 pr-1.5 flex-shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
          </div>

          {/* Tab Buttons */}
          <div className="flex items-center gap-1 min-w-0">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer select-none whitespace-nowrap ${
                    isActive
                      ? "bg-[#282c34] text-white shadow-sm border border-[#3e4451]"
                      : "text-gray-400 hover:text-gray-200 hover:bg-[#282c34]/50"
                  }`}
                >
                  <FileCode className="h-3.5 w-3.5 opacity-70 flex-shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Copy Button in Header */}
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-gray-400 hover:text-white rounded hover:bg-[#282c34] transition-colors cursor-pointer flex-shrink-0"
          title="Copy code"
          aria-label="Copy active code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Stacked Code Tabs in CSS Grid (Keeps height fixed to tallest tab) */}
      <div className="grid grid-cols-1 grid-rows-1 w-full min-w-0 bg-[#282c34] relative">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              className={`col-start-1 row-start-1 w-full min-w-0 h-full transition-opacity duration-150 ${
                isActive
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none invisible"
              }`}
            >
              <CodeBlock
                language={tab.language ?? "typescript"}
                containerClassName="rounded-none border-0 h-full"
                customStyle={{
                  borderRadius: 0,
                  background: "#282c34",
                }}
                hideCopyButton
              >
                {tab.code}
              </CodeBlock>
            </div>
          );
        })}
      </div>
    </div>
  );
}
