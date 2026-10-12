import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";

/**
 * Under the Hood: Navigation Lifecycle
 * Extracted standalone section for developers inspecting or ejecting Dinou internals.
 */
export function UnderTheHoodSection() {
  return (
    <section id="under-the-hood" className="scroll-mt-20">
      <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
        7. Under the Hood: Navigation Lifecycle
      </h2>
      <p>
        For developers inspecting or ejecting Dinou internals, the navigation subsystem is managed across two core modules:
      </p>

      <div className="grid sm:grid-cols-2 gap-4 not-prose my-4">
        <Card>
          <CardHeader className="p-4 pb-2">
            <div className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
              dinou/core/link.jsx
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
            The <code>&lt;Link&gt;</code> component intercepts clicks (preventing default browser reloads) and forwards navigations to the router via <code>useRouter().push(href, &#123; fresh &#125;)</code>. It also attaches <code>onMouseEnter</code> to prefetch the target route on hover.
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <div className="font-mono font-bold text-xs text-purple-600 dark:text-purple-400">
              dinou/core/navigation.js
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
            Implements the client navigation hooks (<code>useRouter</code>, <code>usePathname</code>, <code>useSearchParams</code>, <code>useNavigationLoading</code>). On the client, they read from <code>RouterContext</code>; during server-side SSR, they dynamically resolve from the request store via AsyncLocalStorage.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
