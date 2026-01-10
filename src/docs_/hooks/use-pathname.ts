// hooks/usePathname.ts
import { useState, useEffect } from "react";

export function usePathname(): string {
  const [pathname, setPathname] = useState<string>("");

  useEffect(() => {
    setPathname(window.location.pathname);

    const handleRouteChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return pathname;
}
