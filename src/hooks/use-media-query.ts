"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook.
 *
 * `useSyncExternalStore` rather than useState+useEffect: a media query is
 * an external store, and this is the API React provides for reading one
 * without tearing during concurrent rendering. It also avoids the
 * set-state-in-effect pattern, which schedules an extra render pass.
 *
 * `getServerSnapshot` returns false, so the server and the first client
 * render agree and hydration never mismatches. Callers gating expensive
 * work (WebGL, scroll engines) therefore get the conservative answer
 * first and the true value on the very next commit.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
