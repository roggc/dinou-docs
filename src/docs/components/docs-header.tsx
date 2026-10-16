"use client";

import { Github, Sparkles } from "lucide-react";
import { Button } from "@/docs/components/ui/button";
import { ThemeToggle } from "@/docs/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/docs/components/ui/sidebar";
import dinou from "@/docs/images/dinou.png";
import { RiNpmjsFill } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/docs/components/ui/tooltip";
import { Link } from "dinou";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* CAMBIA EL CONTENEDOR PRINCIPAL - QUITA px-4 Y USA UN CONTENEDOR FLEX MÁS AMPLIO */}
      <div className="flex h-16 items-center justify-between w-full max-w-[1728px]">
        <div className="flex items-center gap-2 pl-4 md:pl-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center space-x-2.5">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-85">
              <img src={dinou} alt="Dinou" className="w-8 h-8 sm:w-9 sm:h-9" width={36} height={36} />
            </Link>
            <Badge variant="outline" className="inline-flex text-[11px] font-mono px-2 py-0.5 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5">
              v7
            </Badge>
          </div>
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
