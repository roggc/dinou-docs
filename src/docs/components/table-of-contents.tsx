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
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
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
