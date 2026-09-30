import type { ReactNode } from "react";
import { ViewTransition } from "react";
import { ThemeProvider } from "@/docs/components/theme-provider";
import { DocsHeader } from "@/docs/components/docs-header";
import { DocsSidebar } from "@/docs/components/docs-sidebar";
import { SidebarProvider } from "@/docs/components/ui/sidebar";
import "@/docs/globals.css";

export default function Layout({
  children,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dinou Docs | React 19 Full-Stack Framework</title>
        <meta
          name="description"
          content="Official documentation for Dinou v7 — the lightweight, ejectable React 19 framework featuring React Server Components, multi-runtime deployment, and private folders."
        />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* <link rel="preload" href="/styles.css" as="style" /> */}
        <link rel="stylesheet" href="/styles.css" precedence="default" />
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
              <div className="sidebar-layout w-full flex-1">
                <DocsSidebar />
                <div className="sidebar-content flex-1">
                  <main className="flex-1 w-full">
                    <ViewTransition name="docs-content">
                      {children}
                    </ViewTransition>
                  </main>
                </div>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
