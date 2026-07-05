"use client";

import { Link } from "dinou";
import { HelpCircle, Home, Github } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center p-6 md:p-12 min-h-[60vh]">
      <div className="max-w-md w-full text-center space-y-8 bg-card border rounded-2xl p-8 shadow-lg relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
          <HelpCircle className="w-8 h-8" />
        </div>

        {/* Text */}
        <div className="space-y-3">
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            404 Error
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Page Not Found
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            The page you are looking for might have been moved, renamed, or doesn't exist.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/docs/getting-started"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Go to Docs</span>
          </Link>
          <a
            href="https://github.com/roggc/dinou-docs/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground font-medium rounded-xl border hover:bg-muted/80 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Report Issue</span>
          </a>
        </div>
      </div>
    </main>
  );
}
