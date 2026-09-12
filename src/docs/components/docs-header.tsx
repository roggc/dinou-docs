"use client";

import { Github, Sparkles } from "lucide-react";
import { Button } from "@/docs/components/ui/button";
import { ThemeToggle } from "@/docs/components/theme-toggle";
import { Badge } from "@/docs/components/ui/badge";
import { SidebarTrigger } from "@/docs/components/ui/sidebar";
import dinou from "@/docs/images/dinou.png";
import { RiNpmjsFill } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/docs/components/ui/tooltip";
import { Link, usePathname } from "dinou";

export function DocsHeader() {
  const pathname = usePathname();
  const isEjected = pathname.startsWith("/docs/ejected-reference");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* CAMBIA EL CONTENEDOR PRINCIPAL - QUITA px-4 Y USA UN CONTENEDOR FLEX MÁS AMPLIO */}
      <div className="flex h-14 items-center justify-between w-full">
        <div className="flex items-center gap-2 pl-4 md:pl-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center space-x-2">
            <Link href="/">
              <img src={dinou} alt="Dinou logo" className="w-6" width={24} />
            </Link>
            <span className="font-bold">Dinou</span>
            <Link href="/docs">
              <Badge variant="secondary" className="text-xs">
                docs v5
              </Badge>
            </Link>
          </div>

          {/* Top navigation tabs */}
          <nav className="hidden sm:flex items-center space-x-1 ml-3 md:ml-6 pl-3 md:pl-6 border-l border-slate-200 dark:border-slate-800">
            <Link
              href="/docs"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                !isEjected
                  ? "bg-slate-100 dark:bg-slate-800 text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-900"
              }`}
            >
              Docs
            </Link>
            <Link
              href="/docs/ejected-reference"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                isEjected
                  ? "bg-slate-100 dark:bg-slate-800 text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-900"
              }`}
            >
              <span>Ejected Reference</span>
              <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                Internals
              </span>
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end pr-4 md:pr-6">
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://www.npmjs.com/package/dinou" target="_blank">
                    <RiNpmjsFill className="h-4 w-4" />
                    <span className="sr-only">npm</span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>npm</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://github.com/roggc/dinou" target="_blank">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
