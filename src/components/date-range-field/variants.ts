// @unocss-include
import { tv } from 'tailwind-variants';

export const dateRangeFieldVariants = tv({
  slots: {
    startRoot: 'inline-flex items-center',
    endRoot: 'inline-flex items-center',
    separator: ['inline-flex items-center justify-center text-muted-foreground', 'select-none']
  },
  variants: {
    size: {
      xs: {
        separator: 'px-0.5'
      },
      sm: {
        separator: 'px-0.75'
      },
      md: {
        separator: 'px-1'
      },
      lg: {
        separator: 'px-1.25'
      },
      xl: {
        separator: 'px-1.5'
      },
      '2xl': {
        separator: 'px-2'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
