// hooks/usePathname.ts
import { useState, useEffect } from "react";

const IS_SERVER = typeof window === "undefined";

export function usePathname(): string {
  const [pathname, setPathname] = useState<string>(
    IS_SERVER ? "" : window.location.pathname
  );

  useEffect(() => {
    if (!IS_SERVER) {
      setPathname(window.location.pathname);

      const handleRouteChange = () => {
        setPathname(window.location.pathname);
      };

      window.addEventListener("popstate", handleRouteChange);

      return () => {
        window.removeEventListener("popstate", handleRouteChange);
      };
    }
  }, []);

  return pathname;
}
