"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  Github,
  BookOpen,
  Sparkles,
  Check,
  Copy,
  Terminal,
} from "lucide-react";
import { FeaturesSection } from "@/components/features-section";
import { Link } from "dinou";

export default function Page() {
  const [copied, setCopied] = useState(false);
  const installCommand = "npx create-dinou@latest my-app";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-1 overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)]"></div>

      {/* Hero Section */}
      <section id="main" className="w-full py-20 md:py-32 lg:py-40 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4 max-w-4xl">
              <div className="flex justify-center">
                <Badge
                  variant="secondary"
                  className="px-4 py-1.5 text-sm border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
                >
                  <Sparkles className="mr-2 h-3.5 w-3.5 text-blue-500" />
                  {/* CAMBIO: De "Native" a "Built for" para evitar confusión con React Native */}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                    Built for React 19
                  </span>
                </Badge>
              </div>

              {/* CAMBIO: Título más sobrio y descriptivo */}
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-slate-900 dark:text-white">
                Modern Full-Stack
                <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  React Framework
                </span>
              </h1>

              <p className="mx-auto max-w-[700px] text-lg text-slate-600 dark:text-slate-400 md:text-xl leading-relaxed">
                {/* CAMBIO: Actions -> Server Functions */}
                Unlock the full potential of Server Components and Server
                Functions. Zero configuration, blazing fast builds, and designed
                specifically for the React 19 era.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
              <Button
                size="lg"
                className="text-base h-12 px-8 rounded-full"
                asChild
              >
                <Link href="/docs">
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base h-12 px-8 rounded-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm"
                asChild
              >
                <a
                  href="https://github.com/roggc/dinou"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Quick Start / Code Section */}
      <section
        id="development"
        className="w-full py-20 md:py-32 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-200 dark:border-slate-800"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300">
                <Terminal className="mr-2 h-4 w-4" />
                Zero Configuration
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
                Start coding in seconds
              </h2>
              <p className="text-slate-600 dark:text-slate-400 md:text-lg leading-relaxed">
                Don&apos;t waste time configuring bundlers. Dinou comes
                pre-configured with the best defaults for modern React
                applications. Just run the init command and start coding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button variant="default" asChild>
                  <Link href="/docs">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read the Guide
                  </Link>
                </Button>
              </div>
            </div>

            {/* Terminal Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative overflow-hidden bg-[#1e1e1e] text-slate-50 border-slate-800 shadow-2xl rounded-xl">
                {/* Mac-like header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/10">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="text-xs text-slate-400 font-mono">bash</div>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-sm relative">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy command</span>
                  </Button>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">$</span>
                      <span className="text-slate-300">{installCommand}</span>
                    </div>
                    <div className="text-slate-500">
                      Creating a new Dinou app in{" "}
                      <span className="text-blue-400">./my-app</span>...
                    </div>
                    <div className="text-slate-500">
                      <span className="text-green-500">✔</span> Project
                      initialized
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">$</span>
                      <span className="text-slate-300">
                        cd my-app && npm run dev
                      </span>
                    </div>
                    <div className="text-blue-400">
                      ready started server on http://localhost:3000
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      {/* CAMBIO: Añadido ID "ready" para posible link en el header */}
      <section
        id="ready"
        className="w-full py-20 md:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-100/50 dark:to-slate-900/50 -z-10" />
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to ship?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 md:text-xl">
              Join the new wave of React developers building faster, lighter,
              and simpler web applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
              <Button size="lg" className="text-base rounded-full px-8" asChild>
                <Link href="/docs">Get Started Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base rounded-full px-8"
                asChild
              >
                <a
                  href="https://github.com/roggc/dinou"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Source
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
