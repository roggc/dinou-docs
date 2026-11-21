import { ViewTransition } from "react";
import type { LayoutProps } from "./dinou";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import "@/globals.css";

export default function Layout({ children }: LayoutProps) {
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
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dinou" />
        <meta property="og:url" content="https://dinou.dev/" />
        <meta
          property="og:title"
          content="Dinou — Full-Stack React 19 Framework (RSC, PPR, Zero Lock-In)"
        />
        <meta
          property="og:description"
          content="The ejectable React 19 framework built on web standards. 0-Fork Dual-Bundle engine, Type-Safe Routing, 3D Caching & PPR, Tri-Bundler freedom, and universal multi-runtime deployment."
        />
        <meta property="og:image" content="https://dinou.dev/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Dinou v10 — Full-Stack React 19 Framework" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Dinou — Full-Stack React 19 Framework (RSC, PPR, Zero Lock-In)"
        />
        <meta
          name="twitter:description"
          content="The ejectable React 19 framework built on web standards. Build full-stack apps and deploy anywhere with zero vendor lock-in."
        />
        <meta name="twitter:image" content="https://dinou.dev/og-image.png" />
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
