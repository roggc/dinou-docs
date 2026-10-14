/**
 * WhatIsDinou:
 * Standalone, parkable component extracted from introduction page.
 * Ready to be reincorporated or placed anywhere in the documentation.
 */
export function WhatIsDinou() {
  return (
    <section id="what-is-dinou" className="scroll-mt-20">
      <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
        What is Dinou?
      </h2>
      <p>
        <strong>Dinou</strong> is a modern full-stack web framework engineered around standard{" "}
        <strong>React 19 primitives</strong> (React Server Components, Suspense streaming, and Server Actions).
        It removes unnecessary magic, proprietary macros, and vendor lock-in to give developers full visibility and control over their entire application stack.
      </p>
      <p>
        Whether you are building a lightning-fast content site, an interactive SaaS platform, or an edge-deployed API, Dinou provides a streamlined developer experience without sacrificing architectural transparency.
      </p>
    </section>
  );
}
