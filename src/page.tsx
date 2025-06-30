"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Code2,
  Rocket,
  Shield,
  Sparkles,
  Github,
  Twitter,
  BookOpen,
  Download,
  Star,
  Users,
  Activity,
} from "lucide-react";
import { FeaturesSection } from "@/components/features-section";

export default function Page() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section id="main" className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="px-3 py-1 border-slate-200 dark:border-slate-700"
              >
                <Sparkles className="mr-2 h-3 w-3" />
                Built for React 19
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 dark:text-slate-100">
                dinou: a minimal
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  React 19 framework
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-slate-600 dark:text-slate-300 md:text-xl">
                dinou is a minimal React 19 framework that leverages React 19's
                latest features to help you build modern web applications with
                zero configuration and maximum developer experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base" asChild>
                <a href="#get-started">
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started
                </a>
              </Button>
              <Button variant="outline" size="lg" className="text-base" asChild>
                <a href="https://github.com/dinou/dinou">
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </a>
              </Button>
            </div>

            {/* <div className="flex items-center space-x-8 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>2.1k stars</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>50k+ downloads</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Active community</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <FeaturesSection />
      {/* Code Example Section */}
      <section id="development" className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              {/* <Badge
                variant="outline"
                className="border-slate-200 dark:border-slate-700"
              >
                Simple API
              </Badge> */}
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900 dark:text-slate-100">
                Get started in seconds
              </h2>
              <p className="text-slate-600 dark:text-slate-300 md:text-lg">
                Create a new dinou app with a single command. No complex
                configuration files or setup required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <a href="#get-started">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read the docs
                  </a>
                </Button>
                {/* <Button variant="outline" asChild>
                  <a href="https://github.com/dinou/examples">View examples</a>
                </Button> */}
              </div>
            </div>

            <Card className="p-6 bg-slate-900 dark:bg-slate-950 text-slate-50 border-slate-700 dark:border-slate-800">
              <pre className="text-sm overflow-x-auto">
                <code className="text-slate-100 dark:text-slate-200">{`# Create a new dinou app
npx create-dinou@latest my-app

# Start developing
cd my-app
npm run dev

# Build for production
npm run build`}</code>
              </pre>
            </Card>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                99.9%
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Uptime guarantee
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {"<100ms"}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Cold start time
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                10k+
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Developers using dinou
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Get Started Section */}
      {/* <section id="get-started" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Badge
              variant="outline"
              className="border-slate-200 dark:border-slate-700"
            >
              Get Started
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-100">
              Ready to build something amazing?
            </h2>
            <p className="mx-auto max-w-[600px] text-slate-600 dark:text-slate-300 md:text-xl">
              Join thousands of developers who are already building the future
              with dinou.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base" asChild>
                <a href="https://docs.dinou.dev/getting-started">
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started Now
                </a>
              </Button>
              <Button variant="outline" size="lg" className="text-base" asChild>
                <a href="https://github.com/dinou/dinou">
                  <Github className="mr-2 h-5 w-5" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
