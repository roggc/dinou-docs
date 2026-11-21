"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Search,
  FileText,
  Hash,
  Code2,
  CornerDownLeft,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useRouter, type DinouLinkTarget } from "dinou";
import {
  docSearchIndex,
  type DocSearchItem,
} from "@/docs/lib/search-index";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const QUICK_JUMP_HREFS = [
  "/docs",
  "/docs/getting-started",
  "/docs/routing",
  "/docs/navigation",
  "/docs/type-safe-routing",
  "/docs/request-context",
  "/docs/page-functions",
  "/docs/rendering",
  "/docs/3d-segmentation",
  "/docs/server-functions",
  "/docs/api-reference",
  "/docs/migration/v9-to-v10",
];

const QUICK_JUMP_ITEMS: DocSearchItem[] = QUICK_JUMP_HREFS.map((href) =>
  docSearchIndex.find((item) => item.kind === "page" && item.href === href)
).filter((item): item is DocSearchItem => Boolean(item));

function expandIdentifier(text: string): string {
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-/.:#<>()[\]{}"'`]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function stripLeadingSectionNumber(title: string): string {
  return title.replace(/^\d+(?:\.\d+)*\.?\s+/, "").trim();
}

function tokenizeQuery(query: string): string[] {
  const raw = query.trim().toLowerCase();
  if (!raw) return [];
  const parts = raw
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
  return Array.from(new Set(parts));
}

interface PreparedSearchEntry {
  item: DocSearchItem;
  titleLower: string;
  cleanTitleLower: string;
  titleExpanded: string;
  titleWords: string[];
  pageLower: string;
  pageExpanded: string;
  sectionLower: string;
  descLower: string;
  keywordsJoined: string;
  hrefLower: string;
  isOldMigration: boolean;
}

const preparedIndex: PreparedSearchEntry[] = docSearchIndex.map((item) => {
  const titleLower = item.title.toLowerCase();
  const cleanTitleLower = stripLeadingSectionNumber(item.title).toLowerCase();
  const titleExpanded = expandIdentifier(cleanTitleLower);
  const titleWords = titleExpanded.split(" ").filter(Boolean);
  const pageLower = item.pageTitle.toLowerCase();
  const pageExpanded = expandIdentifier(item.pageTitle);
  const sectionLower = item.section.toLowerCase();
  const descLower = (item.description || "").toLowerCase();
  const keywordsJoined = (item.keywords || [])
    .map((k) => `${k.toLowerCase()} ${expandIdentifier(k)}`)
    .join(" ");
  const hrefLower = item.href.toLowerCase();
  const isOldMigration =
    item.href.startsWith("/docs/migration/v") &&
    !item.href.startsWith("/docs/migration/v9-to-v10");

  return {
    item,
    titleLower,
    cleanTitleLower,
    titleExpanded,
    titleWords,
    pageLower,
    pageExpanded,
    sectionLower,
    descLower,
    keywordsJoined,
    hrefLower,
    isOldMigration,
  };
});

function searchDocs(query: string, limit = 30): DocSearchItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return QUICK_JUMP_ITEMS;

  const expandedQuery = expandIdentifier(normalizedQuery);
  const tokens = tokenizeQuery(normalizedQuery);
  if (tokens.length === 0) return QUICK_JUMP_ITEMS;

  const wantsMigration =
    normalizedQuery.includes("migrat") ||
    normalizedQuery.includes("upgrade") ||
    /\bv[4-9]\b/.test(normalizedQuery);

  const scored: Array<{ item: DocSearchItem; score: number }> = [];

  for (const entry of preparedIndex) {
    let score = 0;
    let allTokensMatched = true;

    for (const token of tokens) {
      const tokenExpanded = expandIdentifier(token);
      let tokenScore = 0;

      // Title matches
      if (
        entry.cleanTitleLower === token ||
        entry.titleExpanded === token ||
        entry.titleWords.includes(token) ||
        (tokenExpanded && entry.titleWords.includes(tokenExpanded))
      ) {
        tokenScore = Math.max(tokenScore, 48);
      } else if (
        entry.cleanTitleLower.startsWith(token) ||
        entry.titleWords.some((w) => w.startsWith(token)) ||
        (tokenExpanded &&
          entry.titleWords.some((w) => w.startsWith(tokenExpanded)))
      ) {
        tokenScore = Math.max(tokenScore, 34);
      } else if (
        entry.titleLower.includes(token) ||
        entry.titleExpanded.includes(token) ||
        (tokenExpanded && entry.titleExpanded.includes(tokenExpanded))
      ) {
        tokenScore = Math.max(tokenScore, 22);
      }

      // Keyword matches (curated aliases & symbols)
      if (
        entry.keywordsJoined &&
        (entry.keywordsJoined.includes(token) ||
          (tokenExpanded && entry.keywordsJoined.includes(tokenExpanded)))
      ) {
        tokenScore = Math.max(tokenScore, 20);
      }

      // Page title matches
      if (
        entry.pageLower.includes(token) ||
        entry.pageExpanded.includes(token)
      ) {
        tokenScore = Math.max(tokenScore, 15);
      }

      // Description matches
      if (entry.descLower.includes(token)) {
        tokenScore = Math.max(tokenScore, 11);
      }

      // Section / URL href matches
      if (
        entry.sectionLower.includes(token) ||
        entry.hrefLower.includes(token)
      ) {
        tokenScore = Math.max(tokenScore, 8);
      }

      if (tokenScore === 0) {
        allTokensMatched = false;
        break;
      }
      score += tokenScore;
    }

    if (!allTokensMatched) continue;

    // Whole-query bonuses for exact / prefix / phrase matches
    if (
      entry.cleanTitleLower === normalizedQuery ||
      entry.titleExpanded === expandedQuery
    ) {
      score += 200;
    } else if (
      entry.cleanTitleLower.startsWith(normalizedQuery) ||
      entry.titleExpanded.startsWith(expandedQuery)
    ) {
      score += 110;
    } else if (
      entry.titleLower.includes(normalizedQuery) ||
      entry.titleExpanded.includes(expandedQuery)
    ) {
      score += 65;
    }

    // Kind prioritization
    if (entry.item.kind === "page") score += 14;
    else if (entry.item.kind === "api") score += 12;

    // Slightly de-prioritize older migration guides unless explicitly searched
    if (entry.isOldMigration && !wantsMigration) {
      score -= 10;
    }

    scored.push({ item: entry.item, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightMatch({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  const tokens = tokenizeQuery(query).filter((t) => t.length >= 2);
  if (tokens.length === 0) return <>{text}</>;

  const pattern = new RegExp(
    `(${tokens
      .sort((a, b) => b.length - a.length)
      .map(escapeRegex)
      .join("|")})`,
    "gi"
  );
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 === 1 ? (
          <mark
            key={idx}
            className="bg-blue-500/15 text-blue-700 dark:text-blue-300 rounded-xs px-0.5 font-semibold"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

function scrollToHashElement(hash: string) {
  if (!hash) return;
  const targetId = hash.replace(/^#/, "");
  if (!targetId) return;

  const tryScroll = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    return false;
  };

  if (tryScroll()) return;

  let attempts = 0;
  const maxAttempts = 30;
  const interval = window.setInterval(() => {
    attempts += 1;
    if (tryScroll() || attempts >= maxAttempts) {
      window.clearInterval(interval);
    }
  }, 50);
}

export interface DocsSearchProps {
  variant?: "docs" | "landing";
}

export function DocsSearch({ variant = "docs" }: DocsSearchProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMac, setIsMac] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  // Hydration-safe OS shortcut detection
  React.useEffect(() => {
    if (typeof navigator !== "undefined") {
      const platform =
        (navigator as Navigator & { userAgentData?: { platform?: string } })
          .userAgentData?.platform ||
        navigator.platform ||
        navigator.userAgent ||
        "";
      setIsMac(/mac|iphone|ipad|ipod/i.test(platform));
    }
  }, []);

  // Global Ctrl+K / Cmd+K and "/" shortcut listener
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (
        e.key === "/" &&
        !open &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        const active = document.activeElement as HTMLElement | null;
        const tag = active?.tagName;
        const isEditable =
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          Boolean(active?.isContentEditable);
        if (!isEditable) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [open]);

  const results = React.useMemo(() => searchDocs(query), [query]);

  // Reset active selection when query or open state changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  // Keep active row visible when navigating with arrow keys
  React.useEffect(() => {
    if (!open) return;
    const el = itemRefs.current[activeIndex];
    if (el) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, open]);

  const handleSelect = React.useCallback(
    (item: DocSearchItem) => {
      setOpen(false);
      setQuery("");

      const hashIdx = item.href.indexOf("#");
      const targetPath =
        hashIdx >= 0 ? item.href.slice(0, hashIdx) : item.href;
      const targetHash = hashIdx >= 0 ? item.href.slice(hashIdx) : "";
      const currentPath =
        typeof window !== "undefined"
          ? window.location.pathname.replace(/\/+$/, "") || "/"
          : "";
      const normalizedTargetPath = targetPath.replace(/\/+$/, "") || "/";

      if (targetHash && currentPath === normalizedTargetPath) {
        window.history.pushState(null, "", item.href);
        scrollToHashElement(targetHash);
        return;
      }

      router.push(item.href as DinouLinkTarget);
      if (targetHash) {
        window.setTimeout(() => scrollToHashElement(targetHash), 60);
      }
    },
    [router]
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length > 0) {
        setActiveIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length > 0) {
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = results[activeIndex];
      if (selected) {
        handleSelect(selected);
      }
    }
  };

  const shortcutLabel = isMac ? "⌘K" : "Ctrl K";

  return (
    <>
      {variant === "docs" ? (
        <>
          {/* Desktop pill trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Search documentation"
            className="hidden sm:inline-flex h-9 w-52 md:w-64 lg:w-72 items-center justify-between gap-2 rounded-lg border border-input bg-muted/40 hover:bg-muted/80 px-3 text-xs md:text-sm text-muted-foreground transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="h-3.5 w-3.5 shrink-0 opacity-70" />
              <span className="truncate">Search docs...</span>
            </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground shrink-0">
              {shortcutLabel}
            </kbd>
          </button>

          {/* Mobile icon trigger */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setOpen(true)}
            className="sm:hidden h-9 w-9 p-0 cursor-pointer"
            aria-label="Search documentation"
          >
            <Search className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          {/* Landing 2xl+ compact pill trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Search documentation"
            className="hidden 2xl:inline-flex h-8 items-center gap-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 px-2.5 text-xs text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
          >
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span>Search</span>
            <kbd className="pointer-events-none inline-flex h-4 select-none items-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-1 font-mono text-[10px] font-medium text-slate-500 dark:text-slate-400">
              {shortcutLabel}
            </kbd>
          </button>

          {/* Landing <2xl icon trigger with tooltip */}
          <div className="2xl:hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(true)}
                  className="h-8 w-8 p-0 cursor-pointer"
                  aria-label="Search documentation"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search docs ({shortcutLabel})</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </>
      )}

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              inputRef.current?.focus();
            }}
            className="fixed left-1/2 top-[10vh] sm:top-[14vh] z-50 w-[calc(100vw-1.5rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-2xl duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <DialogPrimitive.Title className="sr-only">
              Search Dinou Documentation
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Search pages, sections, hooks, and API references across Dinou Docs.
            </DialogPrimitive.Description>

            {/* Search Input Header */}
            <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search docs, hooks, APIs (e.g. useSearchParams, getContext, ppr)..."
                aria-label="Search documentation"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-5 items-center rounded border border-border bg-muted/60 px-1.5 font-mono text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div
              role="listbox"
              aria-label="Search results"
              className="max-h-[min(60vh,460px)] overflow-y-auto p-2"
            >
              {!query.trim() && (
                <div className="px-2.5 pt-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Quick Jump
                </div>
              )}

              {results.length === 0 ? (
                <div className="py-12 px-4 text-center space-y-1.5">
                  <p className="text-sm font-medium text-foreground">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Try searching for a hook (<code>useSearchParams</code>), concept (<code>ppr</code>, <code>cookies</code>), or runtime (<code>cloudflare</code>, <code>netlify</code>).
                  </p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {results.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={item.id}
                        ref={(el) => {
                          itemRefs.current[idx] = el;
                        }}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => handleSelect(item)}
                        className={`w-full flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors cursor-pointer ${
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent/60 text-foreground"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {item.kind === "page" ? (
                            <FileText
                              className={`h-4 w-4 ${
                                isActive
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ) : item.kind === "api" ? (
                            <Code2
                              className={`h-4 w-4 ${
                                isActive
                                  ? "text-purple-600 dark:text-purple-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ) : (
                            <Hash
                              className={`h-4 w-4 ${
                                isActive
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-medium truncate ${
                                item.kind === "api" ? "font-mono text-[13px]" : ""
                              }`}
                            >
                              <HighlightMatch text={item.title} query={query} />
                            </span>
                            {item.kind === "api" && (
                              <span className="inline-flex items-center rounded bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-purple-600 dark:text-purple-400 shrink-0">
                                API
                              </span>
                            )}
                            {item.kind === "page" && (
                              <span className="inline-flex items-center rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400 shrink-0">
                                {item.section}
                              </span>
                            )}
                          </div>

                          {item.kind === "page" && item.description ? (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              <HighlightMatch
                                text={item.description}
                                query={query}
                              />
                            </p>
                          ) : (
                            <p className="text-xs text-muted-foreground truncate mt-0.5">
                              {item.section} &rsaquo; {item.pageTitle}
                            </p>
                          )}
                        </div>

                        {isActive && (
                          <CornerDownLeft className="h-3.5 w-3.5 mt-1 shrink-0 text-muted-foreground" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Keyboard Footer */}
            <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="inline-flex h-4 w-4 items-center justify-center rounded border border-border bg-background">
                    <ArrowUp className="h-2.5 w-2.5" />
                  </kbd>
                  <kbd className="inline-flex h-4 w-4 items-center justify-center rounded border border-border bg-background">
                    <ArrowDown className="h-2.5 w-2.5" />
                  </kbd>
                  <span>Navigate</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="inline-flex h-4 items-center justify-center rounded border border-border bg-background px-1">
                    <CornerDownLeft className="h-2.5 w-2.5" />
                  </kbd>
                  <span>Open</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1">
                  <kbd className="inline-flex h-4 items-center justify-center rounded border border-border bg-background px-1 font-mono text-[10px]">
                    /
                  </kbd>
                  <span>or</span>
                  <kbd className="inline-flex h-4 items-center justify-center rounded border border-border bg-background px-1 font-mono text-[10px]">
                    {shortcutLabel}
                  </kbd>
                </span>
              </div>
              <span className="font-mono text-[10px]">
                {query.trim()
                  ? `${results.length} result${results.length === 1 ? "" : "s"}`
                  : `${docSearchIndex.length} indexed entries`}
              </span>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
