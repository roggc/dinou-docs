"use client";

import { Github, Sparkles } from "lucide-react";
import { Button } from "@/docs/components/ui/button";
import { ThemeToggle } from "@/docs/components/theme-toggle";
import { Badge } from "@/docs/components/ui/badge";
import { SidebarTrigger } from "@/docs/components/ui/sidebar";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-2 mr-4">
          <SidebarTrigger className="md:hidden" />
          <a href="/" className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-purple-600">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="font-bold">dinou</span>
            <Badge variant="secondary" className="text-xs">
              docs
            </Badge>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center space-x-6">
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
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/roggc/dinou">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
