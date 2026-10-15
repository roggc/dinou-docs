import type { ReactNode } from "react";
import { ViewTransition } from "react";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import "@/globals.css";

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
        <title>Dinou — Full-Stack React 19 Framework (RSC, PPR, Zero Lock-In)</title>
        <meta
          name="description"
          content="The ejectable React 19 framework built on web standards. Build full-stack apps and deploy anywhere with zero vendor lock-in."
        />
        <link key="canonical" rel="canonical" href="https://dinou.dev/" />
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
        {/* <link rel="preload" href="/styles.css" as="style" /> */}
        <link key="styles" rel="stylesheet" href="/styles.css" precedence="default" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            <Header />
            <ViewTransition name="page-content">
              {children}
            </ViewTransition>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
