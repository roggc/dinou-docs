"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Github, BookOpen } from "lucide-react";
import dinou from "@/images/dinou.png";
import ModeToggle from "@/components/mode-toggle";
import { RiNpmjsFill } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect, useRef } from "react";
import { Link } from "dinou";

const navItems = [
  { href: "#main", label: "Home" },
  { href: "#react-19", label: "RSC", title: "Pure React 19 Engine: RSC & Server Functions" },
  { href: "#deploy-everywhere", label: "Deploy", title: "Universal Multi-Runtime Deploy" },
  { href: "#routing", label: "Routing", title: "Intuitive File-Based Routing" },
  { href: "#type-safe", label: "Type-Safe", title: "Zero-Runtime Type-Safe Routing" },
  { href: "#ssg", label: "SSG", title: "Static by Default: SSG, ISR & ISG" },
  { href: "#segmentation", label: "Segmentation", title: "Two-Dimensional Layered Segmentation" },
  { href: "#middleware", label: "Middleware", title: "Universal Middleware & Webhooks (dinou.config.mjs)" },
  { href: "#dx", label: "DX", title: "Fast Developer Experience: Sub-5ms HMR" },
  { href: "#bundlers", label: "Bundlers", title: "Tri-Bundler Engine: esbuild, Rollup & Webpack" },
  { href: "#eject", label: "Eject", title: "Framework Sovereignty & Zero Lock-in" },
  { href: "#engine-comparison", label: "Evolution", title: "Not Just a Version Bump: Architectural Metamorphosis" },
  { href: "#ready", label: "Start" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>("#main");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const isClickScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearScrollLock = () => {
    isClickScrollingRef.current = false;
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = null;
    }
  };

  const lockScrollForClick = () => {
    isClickScrollingRef.current = true;
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }

    // Generous fallback safety timeout (4000ms) for very long scroll distances (e.g. Home to Start)
    scrollEndTimerRef.current = setTimeout(() => {
      clearScrollLock();
    }, 4000);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const mainEl = document.getElementById("main");
    if (mainEl) {
      e.preventDefault();
      setActiveSection("#main");
      if (window.scrollY > 10) {
        lockScrollForClick();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.slice(1);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      const top = targetEl.getBoundingClientRect().top + window.scrollY - 64;
      const currentScroll = window.scrollY;

      setActiveSection(href);

      if (Math.abs(top - currentScroll) > 10) {
        lockScrollForClick();
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      window.location.href = `/${href}`;
    }
  };

  // Scroll Spy: track visible section based on scroll position
  useEffect(() => {
    const updateActiveSection = () => {
      // 1. If at the top of the page
      if (window.scrollY < 120) {
        setActiveSection("#main");
        return;
      }

      // 2. If scrolled to the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveSection("#ready");
        return;
      }

      // 3. Find which section is currently centered in viewport
      const scrollPosition = window.scrollY + 200;
      let current = "#main";

      for (const item of navItems) {
        const id = item.href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollPosition) {
            current = `#${id}`;
          }
        }
      }

      setActiveSection(current);
    };

    const handleScroll = () => {
      // If we are currently in programmatic smooth scroll from a click:
      if (isClickScrollingRef.current) {
        // Reset the idle debounce timer on every scroll frame.
        // Once scrolling ceases for 120ms, the smooth travel has finished.
        if (scrollEndTimerRef.current) {
          clearTimeout(scrollEndTimerRef.current);
        }
        scrollEndTimerRef.current = setTimeout(() => {
          isClickScrollingRef.current = false;
          updateActiveSection();
        }, 120);

        return; // Do NOT let intermediate scroll frames overwrite activeSection!
      }

      updateActiveSection();
    };

    const handleScrollEnd = () => {
      if (isClickScrollingRef.current) {
        clearScrollLock();
        updateActiveSection();
      }
    };

    // Release programmatic lock if user manually scrolls with wheel or touch
    const handleUserInterrupt = () => {
      if (isClickScrollingRef.current) {
        clearScrollLock();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd, { passive: true });
    document.addEventListener("scrollend", handleScrollEnd, { passive: true });
    window.addEventListener("wheel", handleUserInterrupt, { passive: true });
    window.addEventListener("touchmove", handleUserInterrupt, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
      document.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("wheel", handleUserInterrupt);
      window.removeEventListener("touchmove", handleUserInterrupt);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, [navItems]);

  // Update sliding indicator position based on activeSection
  useEffect(() => {
    const updatePosition = () => {
      const el = linkRefs.current[activeSection];
      const nav = navRef.current;
      if (el && nav) {
        const navRect = nav.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setIndicatorStyle({
          left: elRect.left - navRect.left,
          width: elRect.width,
          opacity: 1,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updatePosition);
    }

    const timer = setTimeout(updatePosition, 150);
    return () => {
      window.removeEventListener("resize", updatePosition);
      clearTimeout(timer);
    };
  }, [activeSection]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-slate-200 dark:border-slate-800">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-2.5">
          <Link href="/" onClick={handleLogoClick} className="flex items-center transition-opacity hover:opacity-85 cursor-pointer">
            <img src={dinou} className="w-8 h-8 sm:w-9 sm:h-9" alt="Dinou" width={36} height={36} />
          </Link>
          <Badge variant="outline" className="inline-flex text-[11px] font-mono px-2 py-0.5 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5">
            v7
          </Badge>
        </div>

        <nav ref={navRef} className="hidden lg:flex items-center space-x-1.5 xl:space-x-2.5 2xl:space-x-3.5 relative py-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                ref={(el) => {
                  linkRefs.current[item.href] = el;
                }}
                href={item.href}
                title={item.title}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-xs xl:text-sm font-medium transition-colors py-1 relative z-10 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}

          {/* Sliding indicator underscore */}
          <span
            className="absolute -bottom-0.5 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 rounded-full transition-all duration-300 ease-out pointer-events-none shadow-sm shadow-blue-500/30"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
        </nav>

        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs sm:text-sm font-medium border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors shadow-none mr-1"
            asChild
          >
            <Link href="/docs" className="flex items-center">
              <BookOpen className="mr-1.5 h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Docs</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
            </Link>
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://www.npmjs.com/package/dinou" target="_blank">
                  <RiNpmjsFill className="h-4 w-4" />
                  <span className="sr-only">npm</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>npm</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/roggc/dinou" target="_blank">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>GitHub</p>
            </TooltipContent>
          </Tooltip>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
