"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/docs/components/theme-provider";
import { DocsHeader } from "@/docs/components/docs-header";
import { DocsSidebar } from "@/docs/components/docs-sidebar";
import { SidebarProvider, SidebarInset } from "@/docs/components/ui/sidebar";
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
        <title>dinou app</title>
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
        <link rel="manifest" href="/site.webmanifest"></link>
        <link href="/styles.css" rel="stylesheet"></link>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            {/* <div className="flex min-h-screen">
              <DocsSidebar />
              <SidebarInset className="flex-1">
                <DocsHeader />
                <div className="flex-1">{children}</div>
              </SidebarInset>
            </div> */}
            <div className="sidebar-layout">
              <DocsSidebar />
              <div className="sidebar-content">
                <DocsHeader />
                <main className="flex-1">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
