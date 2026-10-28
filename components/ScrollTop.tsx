"use client";

import { useLayoutEffect } from "react";

/**
 * Case studies always open at the very top, whatever the scroll position was
 * on the page you came from. (Smooth scrolling is switched off for the jump.)
 */
export function ScrollTop() {
  useLayoutEffect(() => {
    if (window.location.hash) return;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, []);
  return null;
}
