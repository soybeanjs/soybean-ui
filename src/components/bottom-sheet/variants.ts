// @unocss-include
import { tv } from 'tailwind-variants';

export const bottomSheetVariants = tv({
  slots: {
    handle: `mx-auto shrink-0 cursor-grab active:cursor-grabbing rounded-full bg-muted`
  },
  variants: {
    size: {
      xs: {
        handle: 'mt-0.625 h-1.5 w-20'
      },
      sm: {
        handle: 'mt-0.75 h-1.75 w-22'
      },
      md: {
        handle: 'mt-1 h-2 w-25'
      },
      lg: {
        handle: 'mt-1.25 h-2.5 w-30'
      },
      xl: {
        handle: 'mt-1.5 h-3 w-35'
      },
      '2xl': {
        handle: 'mt-1.75 h-3.5 w-40'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
