"use client";

import { useEffect } from "react";

/** Opens the print dialog once fonts have settled, then drops the flag from the URL. */
export function PrintOnLoad() {
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        await document.fonts?.ready;
      } catch {
        // Fonts API unavailable: print anyway.
      }
      if (cancelled) return;
      history.replaceState(null, "", "/resume");
      window.print();
    };
    const timer = window.setTimeout(run, 150);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);
  return null;
}
