"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";

const tocItems = [
  { id: "changelog", title: "📦 Changelog", level: 2 },
  { id: "license", title: "License", level: 2 },
];

export default function AboutPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Changelog & License</h1>
            <p className="text-xl text-muted-foreground">
              Overview of recent changes and licensing information.
            </p>
          </div>

          <div className="prose max-w-none space-y-6">
            <section id="changelog">
              <h2>📦 Changelog</h2>
              <p>
                For a detailed list of changes, enhancements, and bug fixes
                across versions, see the{" "}
                <a href="/CHANGELOG.md" className="text-blue-600 underline">
                  CHANGELOG.md
                </a>
                .
              </p>
            </section>

            <section id="license">
              <h2>License</h2>
              <p>
                <code>dinou</code> is made by Roger Gomez Castells (@roggc) and
                is licensed under the MIT License.
              </p>
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
