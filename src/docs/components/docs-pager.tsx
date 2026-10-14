"use client";

import { usePathname, Link } from "dinou";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { docsNavigation } from "@/docs/lib/docs-navigation";

export function DocsPager() {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  // Flatten active navigation items across all sections
  const flatItems: { title: string; href: string; sectionTitle: string }[] = [];
  for (const section of docsNavigation) {
    for (const item of section.items) {
      flatItems.push({
        title: item.title,
        href: item.href,
        sectionTitle: section.title,
      });
    }
  }

  const normalizedPath = pathname.replace(/\/$/, "");
  const currentIndex = flatItems.findIndex((item) => item.href === normalizedPath);

  if (currentIndex === -1) {
    return null;
  }

  const prev = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
  const next = currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null;

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 not-prose w-full">
      <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex-1 flex flex-col items-start p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-blue-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-all text-left shadow-sm"
          >
            <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1.5 transition-colors">
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Previous</span>
            </div>
            <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1 hidden sm:block" />
        )}

        {next ? (
          <Link
            href={next.href}
            className="group flex-1 flex flex-col items-end p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-blue-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-all text-right sm:ml-auto shadow-sm"
          >
            <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1.5 transition-colors">
              <span>Next</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
            <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {next.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1 hidden sm:block" />
        )}
      </div>
    </div>
  );
}
