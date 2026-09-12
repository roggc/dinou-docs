"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import { Link } from "dinou";
import { ArrowRight, RefreshCw, Sparkles, FolderArchive } from "lucide-react";

export default function MigrationIndexPage() {
  return (
    <div className="flex-1 w-full max-w-[100vw] py-8 lg:py-12">
      <div className="container max-w-4xl px-4 md:px-6 mx-auto">
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-7 w-7 text-blue-500" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Upgrade Guides
            </h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Step-by-step migration guides to help you update your Dinou applications between major versions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-8 not-prose">
          {/* v5 to v6 */}
          <Link href="/docs/migration/v5-to-v6" className="group">
            <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    Latest Version
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
                <CardTitle className="text-xl font-bold mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  Migration from v5 to v6
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  Dinou v6 consolidates all internal build and manifest folders (<code>public</code>, <code>dist2</code>, <code>dist3</code>, <code>react_client_manifest</code>, <code>server_functions_manifest</code>) into a single <code>.dinou</code> directory.
                </p>
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  Read v5 to v6 migration guide &rarr;
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* v4 to v5 */}
          <Link href="/docs/migration/v4-to-v5" className="group">
            <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-purple-500/50 hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                    Previous Major
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                </div>
                <CardTitle className="text-xl font-bold mt-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center gap-2">
                  <FolderArchive className="h-5 w-5 text-purple-500" />
                  Migration from v4 to v5
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  Dinou v5 introduced React Flight streaming architecture, synchronous Server Components, On-Demand Revalidation, and the native Plugin System.
                </p>
                <div className="text-xs font-medium text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  Read v4 to v5 migration guide &rarr;
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
