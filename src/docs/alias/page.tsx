"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { FolderTree, Settings, Zap } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "import-aliases", title: "🔗 Import Aliases (`@/`)", level: 2 },
  { id: "tsconfig-setup", title: "TypeScript Configuration", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3sl sm:text-4xl font-extrabold tracking-tight">
                Import Aliases
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Configure clean import paths for a more maintainable codebase in
              Dinou.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="import-aliases">
              <h2>🔗 Import Aliases (`@/`)</h2>
              <p>
                Dinou supports import aliases for cleaner, more maintainable
                import paths. Configure paths in your <code>tsconfig.json</code>
                .
              </p>

              <section id="tsconfig-setup">
                <h3>TypeScript Configuration</h3>
                <CodeBlock
                  language="json"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".", // Important: root of your project
    "paths": {
      "@/*": ["src/*"], // Maps @/ to src/
    },
    "allowJs": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src", "src/assets.d.ts"] // Include your declaration files
}`}
                </CodeBlock>
              </section>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-purple-500/20 bg-purple-50/50 dark:bg-purple-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <FolderTree className="h-5 w-5" />
                      <span>Before Aliases</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm font-mono">
                    <div className="text-muted-foreground">
                      import Button from "../../../components/Button";
                    </div>
                    <div className="text-muted-foreground">
                      import utils from "../../lib/utils";
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <Zap className="h-5 w-5" />
                      <span>With Aliases</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm font-mono">
                    <div>import Button from "@/components/Button";</div>
                    <div>import utils from "@/lib/utils";</div>
                  </CardContent>
                </Card>
              </div>

              <Alert className="not-prose mt-6">
                <Settings className="h-4 w-4" />
                <AlertTitle>IDE Support</AlertTitle>
                <AlertDescription>
                  Most modern IDEs (VSCode, WebStorm, etc.) automatically detect
                  import aliases from <code>tsconfig.json</code>, providing
                  autocomplete and jump-to-definition features.
                </AlertDescription>
              </Alert>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
