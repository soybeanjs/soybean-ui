// @unocss-include
import { tv } from 'tailwind-variants';

export const tooltipVariants = tv({
  slots: {
    content: [
      `w-auto rounded-md border bg-popover  text-popover-foreground shadow-md outline-none z-50 will-change-transform`,
      `animate-in fade-in-0 zoom-in-95`,
      `data-[state=closed]:(animate-out fade-out-0 zoom-out-95)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    arrow: 'w-1em h-0.5em fill-popover stroke-border'
  },
  variants: {
    size: {
      xs: {
        content: 'px-2 py-1 text-2xs',
        arrow: 'text-3xs'
      },
      sm: {
        content: 'px-2.5 py-1.25 text-xs',
        arrow: 'text-2xs'
      },
      md: {
        content: 'px-3 py-1.5 text-sm',
        arrow: 'text-xs'
      },
      lg: {
        content: 'px-3.5 py-1.75 text-base',
        arrow: 'text-sm'
      },
      xl: {
        content: 'px-4 py-2 text-lg',
        arrow: 'text-base'
      },
      '2xl': {
        content: 'px-4.5 py-2.5 text-xl',
        arrow: 'text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
