import { ViewTransition } from "react";
import { ThemeProvider } from "@/docs/components/theme-provider";
import { DocsHeader } from "@/docs/components/docs-header";
import { DocsSidebar } from "@/docs/components/docs-sidebar";
import { SidebarProvider } from "@/docs/components/ui/sidebar";
import type { LayoutProps } from "./dinou";
import "@/docs/globals.css";

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dinou Docs" />
        <meta
          property="og:title"
          content="Dinou Documentation — Full-Stack React 19 Framework"
        />
        <meta
          property="og:description"
          content="Official documentation for Dinou v10: Type-Safe Routing, React Server Components, 3D Layered Caching, Partial Prerendering, Server Functions, and multi-runtime deployments."
        />
        <meta property="og:image" content="https://dinou.dev/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Dinou v10 Documentation" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Dinou Documentation — Full-Stack React 19 Framework"
        />
        <meta
          name="twitter:description"
          content="Official documentation for Dinou v10: Type-Safe Routing, React Server Components, 3D Layered Caching, Partial Prerendering, Server Functions, and multi-runtime deployments."
        />
        <meta name="twitter:image" content="https://dinou.dev/og-image.png" />
        <link key="favicon" rel="icon" type="image/png" href="/favicon.ico" />
        <link
          key="apple-touch-icon"
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          key="favicon-32"
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          key="favicon-16"
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link key="manifest" rel="manifest" href="/site.webmanifest" />
        <link key="styles" rel="stylesheet" href="/styles.css" precedence="default" />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-500/20 selection:text-blue-600 dark:selection:text-blue-400">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex flex-col min-h-screen w-full">
              <DocsHeader />
              <div className="sidebar-layout w-full max-w-[1728px] mx-auto flex-1">
                <DocsSidebar />
                <div className="sidebar-content flex-1">
                  <div className="flex-1 w-full">
                    <ViewTransition name="docs-content">
                      {children}
                    </ViewTransition>
                  </div>
                </div>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
