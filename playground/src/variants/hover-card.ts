// @unocss-include
import { tv } from 'tailwind-variants';

export const hoverCardVariants = tv({
  slots: {
    content: [
      `w-auto p-4 rounded-md border bg-popover  text-popover-foreground shadow-md outline-none z-50 will-change-transform`,
      `data-[state=open]:(zoom-in-95 fade-in-0  animate-in)`,
      `data-[state=closed]:(zoom-out-95 fade-out-0  animate-out)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    arrow: 'fill-popover stroke-border'
  }
});

export type HoverCardSlots = keyof typeof hoverCardVariants.slots;
