"use client";

import { usePathname } from "@/docs/hooks/use-pathname";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  Plug,
  Hexagon,
  Star,
  Rocket,
  DraftingCompass,
  Package,
  Boxes,
  BookMarked,
  Brain,
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
        title: "About",
        href: "/docs/about",
        icon: Copyright,
      },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        title: "Routing System",
        href: "/docs/routing",
        icon: Route,
      },
      {
        title: "Layouts",
        href: "/docs/layouts",
        icon: FileText,
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
        title: "Data Fetching",
        href: "/docs/data-fetching",
        icon: Database,
      },
      {
        title: "Server Functions",
        href: "/docs/server-functions",
        icon: Zap,
      },
      {
        title: "Advanced Patterns",
        href: "/docs/pattern",
        icon: Brain,
      },
      {
        title: "API Reference",
        href: "/docs/api-reference",
        icon: BookMarked,
      },
      {
        title: "Cheatsheet",
        href: "/docs/cheatsheet",
        icon: Atom,
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
    title: "Settings",
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
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r fixed left-0 top-0 h-full z-30">
      <SidebarContent className="scrollbar-thin">
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <a href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
