import { useEffect } from "react";

export const useScrollEvent = (onScroll: () => void, scrollRef?: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const throttledOnScroll = () => {
      onScroll();
    };

    const target = scrollRef?.current || window;

    target.addEventListener("scroll", throttledOnScroll);

    return () => {
      target.removeEventListener("scroll", throttledOnScroll);
    };
  }, [onScroll, scrollRef]);
};
