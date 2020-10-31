import { useRef, useEffect } from "react";

export function useHorizontalScroll() {
  const elementRef = useRef();
  useEffect(() => {
    const element = elementRef.current;
    console.log(elementRef.current);
    if (element) {
      const onWheel = (e) => {
        e.preventDefault();
        element.scrollTo({
          left: element.scrollLeft + e.deltaY * 200,
          behavior: "smooth",
        });
      };
      element.addEventListener("wheel", onWheel);
      return () => element.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elementRef;
}
