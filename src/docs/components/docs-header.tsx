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

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-2 mr-4">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center space-x-2">
            {/* <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-purple-600">
              <Sparkles className="h-3 w-3 text-white" />
            </div> */}
            <a href="/">
              <img src={dinou} alt="dinou logo" className="h-6 w-6" />
            </a>
            <span className="font-bold">dinou</span>
            <a href="/docs">
              <Badge variant="secondary" className="text-xs">
                docs
              </Badge>
            </a>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/getting-started"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Getting Started
            </a>
            <a
              href="/routing"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Routing
            </a>
            <a
              href="/api-reference"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            >
              API Reference
            </a>
          </nav> */}

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
