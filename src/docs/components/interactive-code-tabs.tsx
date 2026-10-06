"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";
import { Badge } from "@/docs/components/ui/badge";
import { FileCode, CheckCircle2 } from "lucide-react";

interface TabItem {
  id: string;
  filename: string;
  badge: string;
  badgeColor: string;
  description: string;
  language: string;
  code: string;
}

const tabsData: TabItem[] = [
  {
    id: "page",
    filename: "src/page.tsx",
    badge: "Server Component",
    badgeColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    description: "Rendered on the server by default. Receives typed props directly from getProps with zero client bundle overhead.",
    language: "tsx",
    code: `// src/page.tsx — Server Component by default
import Counter from "./counter";

interface HomePageProps {
  user: { name: string };
  articles: Array<{ id: string; title: string }>;
}

export default function HomePage({ user, articles }: HomePageProps) {
  return (
    <main className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
      
      {/* Client component: Only this button sends JavaScript to the browser */}
      <Counter initialCount={0} />

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Latest Articles</h2>
        <ul className="divide-y divide-slate-800">
          {articles.map((item) => (
            <li key={item.id} className="py-2">{item.title}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}`,
  },
  {
    id: "page_functions",
    filename: "src/page_functions.ts",
    badge: "Server Data & ISR",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    description: "Server-side data fetching and cache rules. getProps returns props directly without wrapper boilerplate.",
    language: "typescript",
    code: `// src/page_functions.ts — Direct server data & caching rules
export const revalidate = 60; // ISR: Cache for 60s (0 = SSR, false = SSG)

export async function getProps() {
  // Fetch directly from your DB, CMS, or API on the server
  const user = await fetchCurrentUser();
  const articles = await fetchLatestArticles();

  // Returned properties pass directly to HomePage props in page.tsx
  return {
    user,
    articles,
  };
}`,
  },
  {
    id: "client",
    filename: "src/counter.tsx",
    badge: "'use client' Interactive",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    description: "Surgical client interactivity. Only this component is bundled for the browser and hydrated.",
    language: "tsx",
    code: `// src/counter.tsx — Surgical client interactivity
"use client";

import { useState } from "react";

export default function Counter({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);

  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
    >
      Interactive Count: {count}
    </button>
  );
}`,
  },
  {
    id: "layout",
    filename: "src/layout.tsx",
    badge: "Persistent Shell",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    description: "Persistent nested layouts. Navigating between child routes preserves layout state without unmounting.",
    language: "tsx",
    code: `// src/layout.tsx — Persistent nested layout shell
import { Link } from "dinou";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <header className="border-b border-slate-800 p-4 flex justify-between items-center">
          <Link href="/" className="font-bold tracking-tight">My Dinou App</Link>
          <nav className="flex gap-4 text-sm text-slate-400">
            <Link href="/" className="hover:text-slate-100">Home</Link>
            <Link href="/docs" className="hover:text-slate-100">Docs</Link>
          </nav>
        </header>

        {/* Child page content renders here without unmounting the layout */}
        {children}
      </body>
    </html>
  );
}`,
  },
];

export function InteractiveCodeTabs() {
  const [activeTabId, setActiveTabId] = useState<string>("page");

  const currentTab = tabsData.find((t) => t.id === activeTabId) ?? tabsData[0];

  return (
    <div className="not-prose my-6 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
      {/* Tab bar header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 bg-slate-900/90 px-3 py-2 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {tabsData.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer select-none ${
                  isActive
                    ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
                <span>{tab.filename}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <Badge
            variant="outline"
            className={`text-[11px] font-mono border ${currentTab.badgeColor}`}
          >
            {currentTab.badge}
          </Badge>
        </div>
      </div>

      {/* Code display */}
      <div className="relative">
        <CodeBlock language={currentTab.language} containerClassName="rounded-none">
          {currentTab.code}
        </CodeBlock>
      </div>

      {/* Dynamic explanatory footer */}
      <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-900/50 text-xs text-slate-400 flex items-center gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span>{currentTab.description}</span>
      </div>
    </div>
  );
}
