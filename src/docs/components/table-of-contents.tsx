"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/docs/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(() => items[0]?.id || "");
  const navRef = useRef<HTMLElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // 1. Bottom of page detection:
      // When reaching the end of the document, activate the last item in the list
      // even if the section is too short to physically scroll up to the top offset threshold.
      if (
        scrollHeight > innerHeight + 80 &&
        innerHeight + Math.ceil(scrollY) >= scrollHeight - 50
      ) {
        setActiveId(items[items.length - 1].id);
        return;
      }

      // 2. Reading offset (sticky navbar is 56px + clearance)
      const HEADER_OFFSET = 120;

      let currentActiveId = items[0]?.id || "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= HEADER_OFFSET) {
            currentActiveId = item.id;
          } else {
            // Document order guarantees subsequent items will be below threshold
            break;
          }
        }
      }

      setActiveId(currentActiveId);
    };

    // If there is an active hash in the URL on mount, activate it; otherwise compute scroll position
    const currentHash = window.location.hash.slice(1);
    if (currentHash && items.some((item) => item.id === currentHash)) {
      setActiveId(currentHash);
    } else {
      handleScroll();
    }

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && items.some((item) => item.id === hash)) {
        setActiveId(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [items]);

  // Keep active link visible in the independently scrollable TOC container
  useEffect(() => {
    if (activeId && activeLinkRef.current && navRef.current) {
      const nav = navRef.current;
      const link = activeLinkRef.current;
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();

      // Only scroll if item is outside the visible boundary of the nav container
      if (linkRect.top < navRect.top) {
        nav.scrollBy({
          top: linkRect.top - navRect.top - 12,
          behavior: "smooth",
        });
      } else if (linkRect.bottom > navRect.bottom) {
        nav.scrollBy({
          top: linkRect.bottom - navRect.bottom + 20,
          behavior: "smooth",
        });
      }
    }
  }, [activeId]);

  if (items.length === 0) return null;

  return (
    <div className={cn("flex flex-col max-h-[calc(100vh-6.5rem)] select-none", className)}>
      <p className="font-semibold text-xs tracking-wider uppercase text-muted-foreground/80 mb-2.5 shrink-0 pl-3">
        On This Page
      </p>
      <nav
        ref={navRef}
        dir="rtl"
        className="overflow-y-auto overflow-x-hidden overscroll-contain pl-3 pr-1 scrollbar-toc text-sm [direction:rtl]"
        style={{ scrollbarGutter: "stable" }}
      >
        <div dir="ltr" className="space-y-1 [direction:ltr] text-left">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                ref={isActive ? activeLinkRef : null}
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "block py-1 text-sm transition-colors hover:text-foreground leading-snug text-left",
                  item.level === 2 && "pl-0 font-medium",
                  item.level === 3 && "pl-3 text-[13px]",
                  item.level === 4 && "pl-6 text-[12px]",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
