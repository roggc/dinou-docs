"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Github } from "lucide-react";
import dinou from "@/images/dinou.png";
import ModeToggle from "@/components/mode-toggle";
import { RiNpmjsFill } from "react-icons/ri";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-slate-200 dark:border-slate-800">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-2">
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div> */}
          <a href="/">
            <img src={dinou} className="w-10" />
          </a>
          {/* <Badge variant="secondary" className="text-xs">
            v1.0
          </Badge> */}
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#main"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            Main
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#development"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            Development
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://www.npmjs.com/package/dinou" target="_blank">
              <RiNpmjsFill className="h-4 w-4" />
              <span className="sr-only">npm</span>
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://github.com/roggc/dinou" target="_blank">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <ModeToggle />
          <Button size="sm" asChild>
            <a href="/docs">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
