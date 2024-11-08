import { useEffect } from "react";

export const useScrollEvent = (onScroll: (this: Window, ev: Event) => void) => {
  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
};
