"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import {
  Scale,
  GitBranch,
  User,
  Heart,
  Github,
  Package,
  Calendar,
  ExternalLink,
  FileText,
} from "lucide-react";

const tocItems = [
  { id: "license", title: "📄 License", level: 2 },
  { id: "changelog", title: "📦 Changelog", level: 2 },
  { id: "credits", title: "👨💻 Credits", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw] overflow-x-hidden">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                License, Changelog & Credits
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              License information, version history, and credits for the Dinou
              framework.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="license">
              <h2>📄 License</h2>
              <p>
                Dinou is licensed under the <strong>MIT License</strong>. This
                is a permissive open source license that allows you to use,
                modify, and distribute the software with minimal restrictions.
              </p>

              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Scale className="h-5 w-5 text-blue-500" />
                  <span>MIT License Summary</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>✅ Free to use for personal and commercial projects</li>
                  <li>✅ Can modify and distribute the code</li>
                  <li>✅ Can sublicense the software</li>
                  <li>✅ Includes copyright notice and license text</li>
                  <li>✅ No warranty - software provided "as is"</li>
                </ul>
              </div>

              {/* Nueva Card para la Licencia */}
              <div className="not-prose mt-6">
                <a
                  href="https://github.com/roggc/dinou/blob/master/LICENSE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className="hover:border-blue-500 transition-colors cursor-pointer border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-2 font-semibold">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <span>Read Full License</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        View the full MIT License text on GitHub (LICENSE.md)
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </section>

            <section id="changelog">
              <h2>📦 Changelog</h2>
              <p>
                For a detailed list of changes, enhancements, and bug fixes
                across versions, see the <code>CHANGELOG.md</code> file in the
                Dinou repository.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Package className="h-5 w-5" />
                      <span>Version Tracking</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Each release includes detailed notes about new features,
                    breaking changes, bug fixes, and improvements.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Calendar className="h-5 w-5 text-green-500" />
                      <span>Update Frequency</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Dinou follows semantic versioning. Check the changelog
                    before upgrading to understand what has changed.
                  </CardContent>
                </Card>
              </div>

              {/* Nueva Card para el Changelog */}
              <div className="not-prose mt-6">
                <a
                  href="https://github.com/roggc/dinou/blob/master/CHANGELOG.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className="hover:border-purple-500 transition-colors cursor-pointer border-l-4 border-l-purple-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-2 font-semibold">
                        <GitBranch className="h-5 w-5 text-purple-500" />
                        <span>View Full Changelog</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        See version history and release notes on GitHub
                        (CHANGELOG.md)
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </section>

            <section id="credits">
              <h2>👨💻 Credits</h2>
              <p>
                Dinou was created and is maintained by <strong>@roggc</strong>{" "}
                (GitHub). This framework represents a culmination of experience
                with modern React patterns and a desire to create a
                developer-friendly full-stack solution.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-purple-500/20 bg-purple-50/50 dark:bg-purple-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <User className="h-5 w-5" />
                      <span>Creator & Maintainer</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Github className="h-4 w-4" />
                      <a
                        href="https://github.com/roggc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono hover:underline"
                      >
                        @roggc
                      </a>
                    </div>
                    <p>
                      Full-stack developer passionate about React, performance,
                      and developer experience.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span>Special Thanks</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="space-y-1">
                      <li>• The React team for React 19</li>
                      <li>• The open source community</li>
                      <li>• Early adopters and testers</li>
                      <li>• Contributors and issue reporters</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert className="not-prose mt-6">
                <Heart className="h-4 w-4 text-red-500" />
                <AlertTitle>Acknowledgments</AlertTitle>
                <AlertDescription>
                  <p>
                    Dinou builds upon the work of many amazing open source
                    projects and the collective knowledge of the React
                    community. Special thanks to everyone who has contributed
                    ideas, reported issues, or helped test the framework.
                  </p>
                  <p className="mt-2 font-semibold">
                    This project is a labor of love for the React ecosystem.
                  </p>
                </AlertDescription>
              </Alert>

              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Github className="h-5 w-5" />
                  <span>Project Links</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <div>
                    <strong>Repository:</strong>{" "}
                    <a
                      href="https://github.com/roggc/dinou"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs hover:underline"
                    >
                      https://github.com/roggc/dinou
                    </a>
                  </div>
                  <div>
                    <strong>Issues & Bug Reports:</strong>{" "}
                    <a
                      href="https://github.com/roggc/dinou/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs hover:underline"
                    >
                      GitHub Issues
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Hidden on Mobile */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
