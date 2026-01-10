"use client";

import type { ReactNode } from "react";
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
        <title>Dinou docs</title>
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
      <body className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider /*style={{ "--sidebar-width": "8rem" }}*/>
            {/* REMUEVE EL CONTENEDOR CON GRADIENTE AQUÍ - SE MUEVE AL BODY */}
            <div className="flex flex-col min-h-screen w-full">
              <DocsHeader />
              <div className="sidebar-layout w-full">
                <DocsSidebar />
                <div className="sidebar-content w-full ml-0">
                  <main className="flex-1 w-full">{children}</main>
                </div>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
