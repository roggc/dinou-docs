"use client";

import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { ArrowRightLeft, Code2, ShieldCheck } from "lucide-react";

export function ClientRedirectSection() {
  return (
    <section id="clientredirect" className="scroll-mt-20 mt-8">
      <div className="flex items-center gap-2">
        <h3 className="m-0">
          <code>&lt;ClientRedirect&gt;</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          "use client"
        </span>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          Declarative Primitive
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        A declarative Client Component that triggers an immediate, seamless route replacement upon mounting in the browser. It renders no DOM markup (<code>null</code>) and executes a soft router replacement (<code>replace: true</code>), ensuring that the redirected URL does not create trap loops in the user&apos;s browser back history.
      </p>

      {/* Declarative Companion & History Replacement Cards */}
      <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
        <div className="p-4 rounded-lg bg-card border border-border space-y-2">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <ArrowRightLeft className="h-4 w-4 text-emerald-500" />
            <span>Declarative Companion to <code>redirect()</code></span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            While <code>redirect()</code> is the imperative function typically used with early returns (e.g. <code>return redirect(&quot;/login&quot;)</code>), <code>&lt;ClientRedirect&gt;</code> is the underlying JSX component returned by <code>redirect()</code>. It enables you to express redirections declaratively directly inside your JSX element tree.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border space-y-2">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-500" />
            <span>History Replacement (<code>replace: true</code>)</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            When executed, <code>&lt;ClientRedirect&gt;</code> performs a <code>router.replace()</code> rather than a <code>push()</code>. This replaces the current entry in the browser&apos;s history stack so users clicking the browser Back button are not immediately bounced forward again in an infinite redirect loop.
          </p>
        </div>
      </div>

      {/* Props Table */}
      <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
        <table className="w-full text-xs text-left border-collapse min-w-[600px]">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th className="p-3">Prop</th>
              <th className="p-3">Type</th>
              <th className="p-3">Default</th>
              <th className="p-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card text-muted-foreground">
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">to</td>
              <td className="p-3 font-mono text-[11px] text-foreground align-top">string</td>
              <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Required</td>
              <td className="p-3 align-top leading-relaxed">
                The destination path to navigate to. Supports absolute internal paths (e.g. <code>&quot;/auth/sign-in&quot;</code>), relative paths (e.g. <code>&quot;./onboarding&quot;</code>), and query parameters (e.g. <code>&quot;/pricing?plan=pro&quot;</code>).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Practical Implementation Examples */}
      <div className="not-prose my-6 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <Code2 className="h-4 w-4 text-emerald-500" />
          <span>Usage Patterns</span>
        </div>
        <TabbedCodeBlock
          defaultTab="declarative-jsx"
          tabs={[
            {
              id: "declarative-jsx",
              label: "conditional-render.tsx (Declarative JSX)",
              language: "tsx",
              code: `// src/components/billing-gate.tsx (Client Component)
"use client";

import { ClientRedirect } from "dinou";

interface BillingGateProps {
  hasActiveSubscription: boolean;
  children: React.ReactNode;
}

export function BillingGate({ hasActiveSubscription, children }: BillingGateProps) {
  // Declarative ternary redirection directly inside JSX
  return hasActiveSubscription ? (
    <>{children}</>
  ) : (
    <ClientRedirect to="/pricing?upgrade=required" />
  );
}`,
            },
            {
              id: "client-guard",
              label: "client-guard.tsx (Client Auth Guard)",
              language: "tsx",
              code: `// src/components/client-guard.tsx (Client Component)
"use client";

import { ClientRedirect } from "dinou";
import { useAuth } from "@/hooks/use-auth";

export function ClientAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Loading session...</div>;
  }

  if (!user) {
    // Replaces browser history with /sign-in immediately upon mount
    return <ClientRedirect to="/auth/sign-in?from=/dashboard" />;
  }

  return <>{children}</>;
}`,
            },
            {
              id: "equivalence",
              label: "guard-comparison.tsx (Equivalence with redirect)",
              language: "tsx",
              code: `// Pattern A: Imperative function return (Universal: Server & Client)
import { redirect } from "dinou";

export default function PageA({ isAllowed }: { isAllowed: boolean }) {
  if (!isAllowed) {
    return redirect("/unauthorized");
  }
  return <div>Welcome to Page A</div>;
}

// Pattern B: Declarative JSX Component (Client Component)
import { ClientRedirect } from "dinou";

export function PageB({ isAllowed }: { isAllowed: boolean }) {
  if (!isAllowed) {
    return <ClientRedirect to="/unauthorized" />;
  }
  return <div>Welcome to Page B</div>;
}`,
            },
          ]}
        />
      </div>
    </section>
  );
}
