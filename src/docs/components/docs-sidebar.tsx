"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, Link } from "dinou";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/docs/components/ui/sidebar";
import {
  BookOpen,
  Route,
  Server,
  Database,
  Settings,
  FileText,
  Zap,
  Code,
  ImageIcon,
  Palette,
  Globe,
  Copyright,
  Atom,
  AtSign,
  Fingerprint,
  Plug,
  Hexagon,
  Star,
  Rocket,
  DraftingCompass,
  Package,
  Boxes,
  BookMarked,
  Brain,
  Shredder,
  ClipboardList,
  RefreshCw,
  Cpu,
  FolderTree,
  Terminal,
} from "lucide-react";

const navigation = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        icon: BookOpen,
      },
      {
        title: "Installation",
        href: "/docs/getting-started",
        icon: Package,
      },
      {
        title: "Why Dinou",
        href: "/docs/why-dinou",
        icon: Rocket,
      },
      {
        title: "About",
        href: "/docs/about",
        icon: Copyright,
      },
    ],
  },
  {
    title: "Upgrade Guides",
    items: [
      {
        title: "Migration from v4",
        href: "/docs/migration",
        icon: RefreshCw,
      },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        title: "Routing",
        href: "/docs/routing",
        icon: Route,
      },
      {
        title: "Layouts",
        href: "/docs/layouts",
        icon: FileText,
      },
      {
        title: "Route Parameters",
        href: "/docs/route-parameters",
        icon: Fingerprint,
      },
      {
        title: "Server & Client Components",
        href: "/docs/server-client-components",
        icon: Server,
      },
      {
        title: "Navigation",
        href: "/docs/navigation",
        icon: Globe,
      },
      {
        title: "Page Functions",
        href: "/docs/page-functions",
        icon: DraftingCompass,
      },
      {
        title: "Server Functions",
        href: "/docs/server-functions",
        icon: Zap,
      },
      {
        title: "Data Fetching",
        href: "/docs/data-fetching",
        icon: Database,
      },
      {
        title: "Advanced Patterns",
        href: "/docs/pattern",
        icon: Brain,
      },
      {
        title: "Rendering",
        href: "/docs/rendering",
        icon: Shredder,
      },
      {
        title: "On-Demand Revalidation",
        href: "/docs/revalidation",
        icon: RefreshCw,
      },
      {
        title: "React Compiler",
        href: "/docs/compiler",
        icon: Atom,
      },
      {
        title: "API Reference",
        href: "/docs/api-reference",
        icon: BookMarked,
      },
      {
        title: "Cheatsheet",
        href: "/docs/cheatsheet",
        icon: ClipboardList,
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        title: "Favicons",
        href: "/docs/favicons",
        icon: Code,
      },
      {
        title: "Styles",
        href: "/docs/styles",
        icon: Palette,
      },
      {
        title: "Assets",
        href: "/docs/assets",
        icon: ImageIcon,
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Env Vars",
        href: "/docs/env-vars",
        icon: Hexagon,
      },
      {
        title: "Alias",
        href: "/docs/alias",
        icon: AtSign,
      },
      {
        title: "Plugins",
        href: "/docs/plugins",
        icon: Settings,
      },
      {
        title: "Eject",
        href: "/docs/eject",
        icon: Plug,
      },
      {
        title: "Bundlers",
        href: "/docs/bundlers",
        icon: Boxes,
      },
      {
        title: "Deployment",
        href: "/docs/deployment",
        icon: Rocket,
      },
    ],
  },
  {
    title: "Guides",
    items: [
      {
        title: "Context Propagation",
        href: "/docs/context",
        icon: RefreshCw,
      },
      {
        title: "Internationalization",
        href: "/docs/i18n",
        icon: Globe,
      },
      {
        title: "Clerk Authentication",
        href: "/docs/clerk",
        icon: Fingerprint,
      },
      {
        title: "Architecture & Internals",
        href: "/docs/internals",
        icon: Cpu,
      },
    ],
  },
  {
    title: "Ejected Reference",
    items: [
      {
        title: "Overview",
        href: "/docs/ejected-reference",
        icon: BookOpen,
      },
      {
        title: "Server & RSC Core",
        href: "/docs/ejected-reference/server",
        icon: Cpu,
        subItems: [
          {
            title: "Main Server (server.js)",
            href: "/docs/ejected-reference/server",
          },
          {
            title: "HTML Renderer (render-html.js)",
            href: "/docs/ejected-reference/render-html",
          },
          {
            title: "ESM Loader (babel-esm-loader.js)",
            href: "/docs/ejected-reference/loader",
          },
        ],
      },
      {
        title: "Client & Routing",
        href: "/docs/ejected-reference/client-runtime",
        icon: Globe,
        subItems: [
          {
            title: "Overview",
            href: "/docs/ejected-reference/client-runtime",
          },
          {
            title: "SPA Hydration (client.jsx)",
            href: "/docs/ejected-reference/client-runtime/client",
          },
          {
            title: "Recovery Hydration (client-error.jsx)",
            href: "/docs/ejected-reference/client-runtime/client-error",
          },
          {
            title: "Router Hooks & Context (navigation.js)",
            href: "/docs/ejected-reference/client-runtime/navigation",
          },
          {
            title: "Link Click Hijacking (link.jsx)",
            href: "/docs/ejected-reference/client-runtime/link",
          },
          {
            title: "Actions Connection (server-function-proxy.js)",
            href: "/docs/ejected-reference/client-runtime/server-actions",
          },
        ],
      },
      {
        title: "Styles & Assets Hooks",
        href: "/docs/ejected-reference/assets-styling",
        icon: Settings,
      },
      {
        title: "Static & ISR Engines",
        href: "/docs/ejected-reference/static-isr",
        icon: RefreshCw,
      },
      {
        title: "esbuild Integration",
        href: "/docs/ejected-reference/bundlers/esbuild",
        icon: Zap,
        subItems: [
          {
            title: "1. Overview & Configs",
            href: "/docs/ejected-reference/bundlers/esbuild",
          },
          {
            title: "2. Build & Dev Runners",
            href: "/docs/ejected-reference/bundlers/esbuild/runners",
          },
          {
            title: "3. Core RSC Plugins",
            href: "/docs/ejected-reference/bundlers/esbuild/rsc-plugins",
          },
          {
            title: "4. Style & Asset Plugins",
            href: "/docs/ejected-reference/bundlers/esbuild/asset-plugins",
          },
          {
            title: "5. Optimization Plugins",
            href: "/docs/ejected-reference/bundlers/esbuild/opt-plugins",
          },
          {
            title: "6. ESM React Refresh",
            href: "/docs/ejected-reference/bundlers/esbuild/react-refresh",
          },
          {
            title: "7. Entry & File Helpers",
            href: "/docs/ejected-reference/bundlers/esbuild/helpers",
          },
        ],
      },
      {
        title: "Rollup Integration",
        href: "/docs/ejected-reference/bundlers/rollup",
        icon: RefreshCw,
        subItems: [
          {
            title: "1. Overview & Config",
            href: "/docs/ejected-reference/bundlers/rollup",
          },
          {
            title: "2. RSC Manifest Plugin",
            href: "/docs/ejected-reference/bundlers/rollup/rsc-manifest",
          },
          {
            title: "3. Server Functions Plugin",
            href: "/docs/ejected-reference/bundlers/rollup/server-functions",
          },
          {
            title: "4. Asset & Helpers Plugins",
            href: "/docs/ejected-reference/bundlers/rollup/assets-helpers",
          },
        ],
      },
      {
        title: "Webpack Integration",
        href: "/docs/ejected-reference/bundlers/webpack",
        icon: Boxes,
        subItems: [
          {
            title: "1. Overview & Config",
            href: "/docs/ejected-reference/bundlers/webpack",
          },
          {
            title: "2. Dynamic Entry Resolver",
            href: "/docs/ejected-reference/bundlers/webpack/entry-resolver",
          },
          {
            title: "3. Server Functions Loader",
            href: "/docs/ejected-reference/bundlers/webpack/server-functions",
          },
          {
            title: "4. Manifest Plugin",
            href: "/docs/ejected-reference/bundlers/webpack/manifest-generator",
          },
        ],
      },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { setOpenMobile } = useSidebar();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the mobile sidebar drawer automatically when navigation occurs (pathname changes)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setOpenMobile(false);
      prevPathname.current = pathname;
    }
  }, [pathname, setOpenMobile]);

  return (
    <Sidebar className="border-r fixed left-0 top-0 h-full z-30">
      <SidebarContent className="scrollbar-thin md:pt-14">
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  // Custom cast to handle typings dynamically or handle optional subItems
                  const anyItem = item as any;
                  const hasSubItems = anyItem.subItems && anyItem.subItems.length > 0;
                  const isParentActive = mounted && (
                    pathname === item.href || 
                    (hasSubItems && anyItem.subItems.some((sub: any) => pathname === sub.href))
                  );

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isParentActive && (!hasSubItems || pathname === item.href)}
                      >
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>

                      {hasSubItems && (
                        <div className="pl-6 border-l border-slate-200 dark:border-slate-800 ml-4 my-1 space-y-1">
                          {anyItem.subItems.map((sub: any) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block text-xs py-1 px-2 rounded-md transition-colors ${
                                mounted && pathname === sub.href
                                  ? "bg-slate-100 dark:bg-slate-800 font-semibold text-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-900"
                              }`}
                            >
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
