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
import { docsNavigation } from "@/docs/lib/docs-navigation";

export function DocsSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { setOpenMobile } = useSidebar();
  const prevPathname = useRef(pathname);

  const normalizedPath = pathname ? pathname.replace(/\/$/, "") : "";

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
    <Sidebar collapsible="none" className="border-r z-30">
      <SidebarContent className="scrollbar-thin pt-2">
        {docsNavigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = mounted && normalizedPath === item.href;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.href}>
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
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
