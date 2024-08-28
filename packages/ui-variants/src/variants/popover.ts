// @unocss-include
import { tv } from 'tailwind-variants';

export const popoverVariants = tv({
  slots: {
    content: [
      'w-auto p-4 rounded-md border bg-popover  text-accent-foreground shadow-md outline-none z-50',
      `data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    arrow: 'absolute size-8px rotate-45 border-b border-r border-border bg-popover -top-4px rounded-1px'
  }
});
