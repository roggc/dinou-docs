"use client";

import { CodeBlock } from "@/docs/components/code-block";

export function DinouRouteSection() {
  return (
    <section id="dinouroute" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>DinouRoute</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Union Type
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Outward Navigation
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        A union type representing all valid destinations in the application. It powers <code>&lt;Link href&gt;</code> and <code>router.push(href)</code>, automatically validating internal application routes, queries (<code>?key=val</code>), hashes (<code>#section</code>), relative paths (<code>./</code>, <code>../</code>), and external URLs (<code>https://...</code>).
      </p>

      <CodeBlock
        language="tsx"
        containerClassName="w-full overflow-hidden rounded-lg my-3"
      >
        {`import type { DinouRoute } from "dinou";
import { Link, useRouter } from "dinou";

// 1. Typing custom navigation components
interface NavButtonProps {
  href: DinouRoute;
  label: string;
}

export function NavButton({ href, label }: NavButtonProps) {
  return <Link href={href}>{label}</Link>;
}

// 2. Programmatic navigation with useRouter
export function ActionPanel() {
  const router = useRouter();

  const handleNavigate = (destination: DinouRoute) => {
    router.push(destination);
  };

  return <button onClick={() => handleNavigate("/docs/api-reference")}>API</button>;
}`}
      </CodeBlock>
    </section>
  );
}
