// @unocss-include
import { scv } from '@soybeanjs/cva';

/**
 * the theme customizer shell.
 *
 * The panel owns a **stable box**: a fixed width plus a fixed height whose
 * content region scrolls, and `scrollbar-gutter: stable` reserves the scrollbar
 * track in both directions. Without that, switching between the Theme and Custom
 * panels resized the host popover on every tab change (the scrollbar appeared
 * and the content was taller or shorter).
 * `ui.root` is the escape hatch for a host that wants a different box.
 *
 * The viewport cap keeps the fixed width from overflowing a phone-sized popover;
 * a host that already constrains the surface drops it along with the width by
 * overriding `ui.root`.
 */
export const themeCustomizerVariants = scv({
  slots: {
    root: 'flex flex-col gap-3 w-96 max-w-[calc(100vw-2rem)] h-[70vh]',
    tabs: 'grow min-h-0',
    content: 'min-h-0 overflow-auto [scrollbar-gutter:stable]',
    panel: 'space-y-4 p-2',
    actions: 'shrink-0 space-y-3 border-t pt-4'
  }
});
