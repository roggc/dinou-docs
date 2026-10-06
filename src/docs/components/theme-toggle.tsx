"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/docs/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const isDark =
      resolvedTheme === "dark" ||
      (typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark"));
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative h-8 w-8 px-0 cursor-pointer"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      <Moon className="h-4 w-4 transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Sun className="absolute h-4 w-4 transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeToggle;
