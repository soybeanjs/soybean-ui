// @unocss-include
import { tv } from 'tailwind-variants';

export const tooltipVariants = tv({
  slots: {
    content: [
      `w-auto px-3 py-1.5 text-sm rounded-md border bg-popover  text-popover-foreground shadow-md outline-none z-50`,
      `animate-in fade-in-0 zoom-in-95 data-[state=closed]:(animate-out fade-out-0 zoom-out-95)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    arrow: 'absolute size-8px rotate-45 border-b border-r border-border bg-popover -top-4px rounded-1px'
  }
});
