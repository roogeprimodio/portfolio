import * as React from "react"

const MOBILE_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(mql.matches);
    };

    // Set the initial value on mount
    onChange();

    mql.addEventListener("change", onChange);

    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []);

  // `undefined` only exists for the first render pass, before the effect runs.
  // Callers want a boolean, and "not mobile" is the safe pre-measurement answer.
  return !!isMobile;
}
