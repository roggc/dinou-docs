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
import { Lock, Globe, Cpu } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  {
    id: "environment-variables",
    title: "🔐 Environment Variables (.env)",
    level: 2,
  },
  { id: "security", title: "Security Best Practices", level: 3 },
  { id: "access", title: "Access & Usage", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Environment Variables
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage secrets and configuration securely with environment
              variables in Dinou.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="environment-variables">
              <h2>🔐 Environment Variables (`.env`)</h2>
              <p>
                Dinou automatically loads environment variables from a{" "}
                <code>.env</code> file for server-side code.
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`# .env
API_SECRET=my_secret_value
DB_HOST=localhost
DATABASE_URL=postgresql://user:pass@localhost:5432/db`}
              </CodeBlock>
              <section id="security">
                <h3>Security Best Practices</h3>
                <Alert className="not-prose mt-4">
                  <Lock className="h-4 w-4" />
                  <AlertTitle>Secure Your Variables</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                      <li>
                        Always add <code>.env</code> to your{" "}
                        <code>.gitignore</code>
                      </li>
                      <li>
                        Use different <code>.env</code> files for development,
                        staging, and production
                      </li>
                      <li>
                        Never commit secrets or API keys to version control
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </section>
              <section id="access">
                <h3>Access & Usage</h3>
                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                        <Globe className="h-5 w-5" />
                        <span>Where They Work</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Available in Server Components, Server Functions, and
                      `getProps`. Not accessible in Client Components for
                      security.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <Cpu className="h-5 w-5 text-purple-500" />
                        <span>Runtime Access</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Use `process.env.VARIABLE_NAME` in server-side code.
                      Variables are injected at runtime.
                    </CardContent>
                  </Card>
                </div>
              </section>
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
