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
        icon: Zap,
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
        title: "Page Functions",
        href: "/docs/page-functions",
        icon: FileText,
      },
      {
        title: "Data Fetching",
        href: "/docs/data-fetching",
        icon: Database,
      },
      {
        title: "Server Components",
        href: "/docs/server-components",
        icon: Server,
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        title: "Dynamic Parameters",
        href: "/docs/dynamic-parameters",
        icon: Code,
      },
      {
        title: "Query Parameters",
        href: "/docs/query-parameters",
        icon: Code,
      },
      {
        title: "Navigation",
        href: "/docs/navigation",
        icon: Globe,
      },
      {
        title: "Styles & CSS",
        href: "/docs/styles",
        icon: Palette,
      },
      {
        title: "Images",
        href: "/docs/images",
        icon: ImageIcon,
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Environment Variables",
        href: "/docs/environment",
        icon: Settings,
      },
      {
        title: "Import Aliases",
        href: "/docs/import-aliases",
        icon: Code,
      },
      {
        title: "Ejecting",
        href: "/docs/ejecting",
        icon: Settings,
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
