import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Route,
  Server,
  Database,
  Settings,
  Zap,
  ImageIcon,
  Palette,
  Boxes,
  Plug,
  Rocket,
  ClipboardList,
  BookMarked,
  Cpu,
  Compass,
  Atom,
  RefreshCw,
  Fingerprint,
  Globe,
  Brain,
  Package,
  Sparkles,
  FolderTree,
  Copyright,
  Hexagon,
  AtSign,
  DraftingCompass,
  Shredder,
  ShieldCheck,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  badge?: string;
  external?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const docsNavigation: NavSection[] = [
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
        title: "Routing",
        href: "/docs/routing",
        icon: Route,
      },
      {
        title: "Navigation",
        href: "/docs/navigation",
        icon: Compass,
      },
      {
        title: "Type-Safe Routing",
        href: "/docs/type-safe-routing",
        icon: ShieldCheck,
      },
      {
        title: "Component Architecture",
        href: "/docs/server-client-components",
        icon: Server,
      },
      {
        title: "Page & Layout Functions",
        href: "/docs/page-functions",
        icon: DraftingCompass,
      },
      {
        title: "Static & Dynamic Rendering",
        href: "/docs/rendering",
        icon: Shredder,
      },
      {
        title: "Server Functions",
        href: "/docs/server-functions",
        icon: Zap,
      },
      {
        title: "On-Demand Revalidation",
        href: "/docs/revalidation",
        icon: RefreshCw,
      },
      {
        title: "Data Fetching",
        href: "/docs/data-fetching",
        icon: Database,
      },
      {
        title: "The Dinou Pattern",
        href: "/docs/pattern",
        icon: Brain,
      },
      {
        title: "React Compiler",
        href: "/docs/compiler",
        icon: Atom,
      },
      {
        title: "Public Directory",
        href: "/docs/public",
        icon: FolderTree,
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
        title: "Bundlers",
        href: "/docs/bundlers",
        icon: Boxes,
      },
      {
        title: "Deployment",
        href: "/docs/deployment",
        icon: Rocket,
      },
      {
        title: "Eject",
        href: "/docs/eject",
        icon: Plug,
      },
    ],
  },
  {
    title: "Reference",
    items: [
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
    title: "Guides",
    items: [
      {
        title: "Internationalization (i18n)",
        href: "/docs/i18n",
        icon: Globe,
      },
      {
        title: "Clerk Authentication",
        href: "/docs/clerk",
        icon: Fingerprint,
      },
    ],
  },
  {
    title: "Upgrade Guides",
    items: [
      {
        title: "Overview",
        href: "/docs/migration",
        icon: Compass,
      },
      {
        title: "Migration from v6 to v7",
        href: "/docs/migration/v6-to-v7",
        icon: Sparkles,
      },
      {
        title: "Migration from v5 to v6",
        href: "/docs/migration/v5-to-v6",
        icon: RefreshCw,
      },
      {
        title: "Migration from v4 to v5",
        href: "/docs/migration/v4-to-v5",
        icon: RefreshCw,
      },
    ],
  },
];
