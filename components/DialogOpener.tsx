"use client";

import { useEffect } from "react";

/**
 * Opens <dialog id="…"> for any element with data-open="…", and closes a dialog
 * when its backdrop is clicked. Close buttons use <form method="dialog">,
 * so closing works without JavaScript.
 */
export function DialogOpener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const opener = target.closest<HTMLElement>("[data-open]");
      if (opener) {
        const dialog = document.getElementById(opener.dataset.open ?? "");
        if (dialog instanceof HTMLDialogElement && !dialog.open) dialog.showModal();
        return;
      }
      if (target instanceof HTMLDialogElement && target.open) target.close();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
