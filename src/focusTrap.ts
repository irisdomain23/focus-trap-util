/**
 * focus-trap-util — trap keyboard focus inside a container element.
 *
 * Tab and Shift+Tab cycle within the container's focusable elements.
 * Call the returned cleanup function to restore normal tab order.
 *
 * MIT License — Copyright (c) 2026 Iris Lin
 */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable='false'])",
  "details > summary:first-of-type",
].join(", ");

/**
 * Trap focus inside `container`. Returns a cleanup function.
 *
 * @example
 * const cleanup = trapFocus(dialogRef.current);
 * // ... dialog open ...
 * cleanup();
 */
export function trapFocus(container: HTMLElement): () => void {
  function getFocusable(): HTMLElement[] {
    return Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key !== "Tab") return;
    const focusable = getFocusable();
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement;

    if (e.shiftKey) {
      if (active === first || !container.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // Focus the first focusable element on mount
  const focusable = getFocusable();
  if (focusable.length > 0) {
    focusable[0].focus();
  }

  container.addEventListener("keydown", handleKeydown);

  return function cleanup(): void {
    container.removeEventListener("keydown", handleKeydown);
  };
}
