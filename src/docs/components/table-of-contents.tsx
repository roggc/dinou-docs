"use client";

import { useEffect, useState } from "react";
import { cn } from "@/docs/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

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

  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">On This Page</p>
      <nav className="space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block text-sm transition-colors hover:text-foreground",
              item.level === 2 && "pl-0",
              item.level === 3 && "pl-4",
              item.level === 4 && "pl-8",
              activeId === item.id
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
