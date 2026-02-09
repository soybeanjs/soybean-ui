// @unocss-include
import { tv } from 'tailwind-variants';

export const popoverVariants = tv({
  slots: {
    positioner: 'w-max',
    popup: [
      `w-auto rounded-md border bg-popover  text-popover-foreground shadow-md outline-none z-50 will-change-transform`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    arrow: 'w-1em h-0.5em fill-popover stroke-border'
  },
  variants: {
    size: {
      xs: {
        popup: 'p-3 text-2xs',
        arrow: 'text-3xs'
      },
      sm: {
        popup: 'p-3.5 text-xs',
        arrow: 'text-2xs'
      },
      md: {
        popup: 'p-4 text-sm',
        arrow: 'text-xs'
      },
      lg: {
        popup: 'p-4.5 text-base',
        arrow: 'text-sm'
      },
      xl: {
        popup: 'p-5 text-lg',
        arrow: 'text-base'
      },
      '2xl': {
        popup: 'p-5.5 text-xl',
        arrow: 'text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
