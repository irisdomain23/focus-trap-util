# focus-trap-util

Trap keyboard focus inside a container — for dialogs, menus, and any overlay
that should keep Tab from escaping.

## Usage

```ts
import { trapFocus } from "focus-trap-util";

const dialog = document.querySelector("dialog");
const cleanup = trapFocus(dialog);
// Tab and Shift+Tab cycle within the dialog's focusable elements.
// Focus moves to the first element on mount.

// When the dialog closes:
cleanup();
```

## Why

Focus management is not optional for modals. If Tab leaves the dialog, a
keyboard user is lost behind an overlay. This is the smallest correct
implementation I could write — it handles Tab and Shift+Tab, skips disabled
and hidden elements, and returns a cleanup function so you can restore
normal tab order when the overlay closes.

The focusable element list covers links, buttons, inputs, selects,
textareas, elements with `tabindex`, contenteditable, and `<details>`
summaries. If a role exists in the DOM, it should be reachable by keyboard.

## License

MIT
