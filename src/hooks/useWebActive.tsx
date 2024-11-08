import { useState, useEffect } from "react";

function useWebActive() {
  const [webActive, setWebActive] = useState(false);

  useEffect(() => {
    const handleActive = () => {
      setWebActive(window.innerWidth >= 991);
    };

    handleActive();
    window.addEventListener("resize", handleActive);

    return () => window.removeEventListener("resize", handleActive);
  }, []);

  return webActive;
}

export default useWebActive;
