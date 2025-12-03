import { useState, useEffect } from "react";

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => window.matchMedia("(max-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return isMobile;
};
