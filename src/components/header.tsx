"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Github, BookOpen } from "lucide-react";
import dinou from "@/images/dinou.png";
import ModeToggle from "@/components/mode-toggle";
import { RiNpmjsFill } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "dinou";

export default function Header() {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-slate-200 dark:border-slate-800">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-2.5">
          <Link href="/" onClick={handleLogoClick} className="flex items-center transition-opacity hover:opacity-85">
            <img src={dinou} className="w-8 h-8 sm:w-9 sm:h-9" alt="Dinou" width={36} height={36} />
          </Link>
          <Badge variant="outline" className="inline-flex text-[11px] font-mono px-2 py-0.5 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5">
            v7
          </Badge>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#main"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#deploy-everywhere"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            Deploy
          </a>
          <a
            href="#segmentation"
            title="Two-Dimensional Layered Segmentation"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            Segmentation
          </a>
          <a
            href="#type-safe"
            title="Zero-Runtime Type-Safe Routing"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            Type-Safe
          </a>
          <a
            href="#engine-comparison"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            Evolution
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#ready"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            Start
          </a>

          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs sm:text-sm font-medium border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors shadow-none"
            asChild
          >
            <Link href="/docs" className="flex items-center">
              <BookOpen className="mr-1.5 h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Docs</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
            </Link>
          </Button>
        </nav>

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

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
