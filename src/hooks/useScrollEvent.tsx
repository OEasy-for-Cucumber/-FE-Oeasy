import { useEffect } from "react";

export const useScrollEvent = (onScroll: () => void) => {
  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
};
