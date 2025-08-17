import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Code2, Image, Layers } from "lucide-react";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50"
    >
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Badge
            variant="outline"
            className="border-slate-200 dark:border-slate-700"
          >
            Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-100">
            Powerful tools for modern React development
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-600 dark:text-slate-300 md:text-xl">
            dinou equips you with everything needed to build fast, scalable, and
            customizable React 19 applications with ease.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
          <Card className="relative overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-slate-900 dark:text-slate-100">
                Dynamic Routing & Rendering
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Flexible routing and rendering options to optimize performance
                and user experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li>&bull; File-based routing system</li>
                <li>&bull; Server-Side Rendering (SSR)</li>
                <li>&bull; Static Site Generation (SSG)</li>
                <li>&bull; Incremental Static Regeneration (ISR)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                <Code2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-slate-900 dark:text-slate-100">
                React 19 & Developer Freedom
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Harness the power of React 19 with full control over your
                development environment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li>
                  &bull; Pure React 19: Server Functions, Suspense, Server
                  Components
                </li>
                <li>&bull; TypeScript or JavaScript support</li>
                <li>
                  &bull; Full customization with <code>npm run eject</code>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <Image className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-slate-900 dark:text-slate-100">
                Flexible Styling & Assets
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Seamless integration of styles and assets for a tailored
                development experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li>&bull; Support for .css, .module.css, and Tailwind.css</li>
                <li>
                  &bull; Assets support (.png, .jpeg, .jpg, .gif, .svg, .webp,
                  ...)
                </li>
                <li>&bull; Import alias in tsconfig.json/jsconfig.json</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
