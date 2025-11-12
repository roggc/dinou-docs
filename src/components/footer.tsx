"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, Github, Twitter } from "lucide-react";
import { RiNpmjsFill } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
      <div className="container flex flex-col gap-4 py-10 px-4 md:px-6 lg:flex-row lg:gap-8">
        <div className="flex flex-col gap-4 lg:flex-1">
          <div className="flex items-center space-x-2">
            {/* <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-purple-600">
              <Sparkles className="h-3 w-3 text-white" />
            </div> */}
            <span className="font-bold text-slate-900 dark:text-slate-100">
              Dinou
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            A React 19 framework for building modern web applications.
          </p>
          <div className="flex space-x-4">
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
                  <a href="https://github.com/roggc/dinou">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>

            {/* <Button variant="ghost" size="sm" asChild>
              <a href="https://twitter.com/dinoujs">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button> */}
          </div>
        </div>

        <div className="grid gap-8 ">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Documentation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/docs"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Getting Started
                </a>
              </li>
              <li>
                <a
                  href="/docs/routing"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Core Concepts
                </a>
              </li>
              <li>
                <a
                  href="/docs/parameters"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/docs/environment"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Configuration
                </a>
              </li>
            </ul>
          </div>

          {/* <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  GitHub Discussions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div> */}

          {/* <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 py-6 px-4 md:px-6 lg:flex-row lg:items-center border-t border-slate-200 dark:border-slate-800">
        {/* <p className="text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Roger Gomez Castells (@roggc).
        </p> */}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Dinou is licensed under the{" "}
          <a
            href="https://github.com/roggc/dinou/blob/master/LICENSE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-900 dark:hover:text-slate-100"
          >
            MIT License
          </a>
          .
        </p>
        {/* <nav className="flex gap-4 lg:ml-auto">
          <a
            href="#"
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          >
            Terms of Service
          </a>
        </nav> */}
      </div>
    </footer>
  );
}
