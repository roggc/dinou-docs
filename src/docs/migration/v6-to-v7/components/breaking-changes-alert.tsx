import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function BreakingChangesAlert() {
  return (
    <Alert className="not-prose my-6 border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10">
      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertTitle className="text-amber-700 dark:text-amber-300 font-semibold">
        Action Required: 3 Contract Breaking Changes
      </AlertTitle>
      <AlertDescription className="text-sm text-muted-foreground mt-1">
        While standard React component trees, layouts, and Server Functions (<code>&quot;use server&quot;</code>) remain fully compatible, Dinou v7 introduces <strong>three breaking changes</strong> in data-fetching and route caching signatures: the <code>getProps</code> return format, the <code>revalidate</code> time unit (now strictly in seconds), and the elimination of the <code>dynamic</code> keyword in favor of <code>revalidate</code> as the single source of truth.
      </AlertDescription>
    </Alert>
  );
}
