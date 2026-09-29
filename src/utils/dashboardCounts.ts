"use client";

import { useEffect } from "react";

/**
 * The sidebar nav and the profile page each fetch their order/RFQ/address
 * counts once on mount, so a client-side action elsewhere (cancelling an
 * item, submitting a return, adding an address) never touched them — only a
 * hard reload remounted the component and re-fetched. Anything that changes
 * those counts should call `notifyDashboardCountsChanged()` right after it
 * succeeds; `useDashboardCountsListener` re-runs the caller's own fetch when
 * that happens, so the numbers update immediately, in the same tab, with no
 * reload.
 */
const EVENT_NAME = "tizaraa:dashboard-counts-changed";

export function notifyDashboardCountsChanged(): void {
 if (typeof window === "undefined") return;
 window.dispatchEvent(new Event(EVENT_NAME));
}

export function useDashboardCountsListener(onChange: () => void): void {
 useEffect(() => {
  window.addEventListener(EVENT_NAME, onChange);
  return () => window.removeEventListener(EVENT_NAME, onChange);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);
}
