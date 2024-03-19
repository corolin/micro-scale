import { useLayoutEffect } from "react";

export default function useLockBodyScroll(isActive: boolean = true) {
  useLayoutEffect(() => {
    if (isActive) {
      const originalStyle = window.getComputedStyle(document.body).overflow;

      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isActive]);
}
