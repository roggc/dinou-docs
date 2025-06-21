"use client";

import type { ReactNode } from "react";
import "./global.css";
import Header from "@/components/header";
// import { ThemeProvider } from "next-themes";
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
          <div className="h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
              {sidebar}

              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
