"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription } from "@/docs/components/ui/alert";
import { Lightbulb, AlertTriangle } from "lucide-react";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "digitalocean", title: "DigitalOcean App Platform", level: 2 },
  { id: "netlify", title: "Netlify", level: 2 },
  { id: "other-platforms", title: "Other Platforms", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Deployment</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to deploy your dinou application to production.
            </p>
          </div>

          <div className="prose overflow-hidden max-w-full">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Projects built with <strong>dinou</strong> can be deployed to
                any platform that supports <code>Node.js</code> with custom
                flags.
              </p>
              <p>
                The most important requirement is that you can pass{" "}
                <code>--conditions react-server</code> to Node.js command that
                starts the app.
              </p>
            </section>

            <section id="digitalocean">
              <h2>✅ DigitalOcean App Platform</h2>
              <p>
                <strong>dinou</strong> works seamlessly on{" "}
                <a
                  href="https://www.digitalocean.com/products/app-platform"
                  target="_blank"
                >
                  DigitalOcean App Platform
                </a>
                . You can deploy your project easily without needing any special
                configuration.
              </p>

              {/* <Alert className="not-prose mt-2 mb-2">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  Make sure your <code>start</code> script in{" "}
                  <code>package.json</code> includes the required flag:
                </AlertDescription>
              </Alert>

              <CodeBlock language="json" containerClassName="w-full">
                {`{
  "scripts": {
    "start": "node --conditions react-server server.js"
  }
}`}
              </CodeBlock> */}

              <p>
                You can deploy by connecting your GitHub/GitLab repository or
                uploading your project manually.
              </p>
            </section>

            <section id="netlify">
              <h2>❌ Netlify</h2>
              <p>
                At the moment, <strong>Netlify is not compatible</strong> with
                dinou, because it does not allow passing{" "}
                <code>--conditions react-server</code> to Node.js. This flag is
                required for a dinou app to work.
              </p>

              <Alert className="not-prose mt-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <AlertDescription>
                  If Netlify adds support for custom flags in the future, dinou
                  compatibility might become possible.
                </AlertDescription>
              </Alert>
            </section>

            <section id="other-platforms">
              <h2>🛠 Other Platforms</h2>
              <p>
                You can also deploy dinou to other Node.js platforms like{" "}
                <code>Render</code>, <code>Fly.io</code>, <code>Railway</code>,
                etc.
              </p>
              <p>
                Just make sure the platform lets you pass{" "}
                <code>--conditions react-server</code> to the Node.js process.
              </p>

              {/* <Alert className="not-prose mt-2">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  Let us know if you deploy Dinou on another platform so we can
                  add it to the docs!
                </AlertDescription>
              </Alert> */}
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
