import { useEffect } from "react";

export function useBodyLock(locked: boolean): void {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [locked]);
}
