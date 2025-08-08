// @unocss-include
import { tv } from 'tailwind-variants';

export const formVariants = tv({
  slots: {
    item: `form-item`,
    label: 'flex items-center',
    message: `font-medium text-destructive`,
    description: `text-muted-foreground`
  },
  variants: {
    size: {
      xs: {
        item: 'text-2xs space-y-1.5',
        label: 'gap-1.5'
      },
      sm: {
        item: 'text-xs space-y-1.75',
        label: 'gap-1.75'
      },
      md: {
        item: 'text-sm space-y-2',
        label: 'gap-2'
      },
      lg: {
        item: 'text-base space-y-2.5',
        label: 'gap-2.5'
      },
      xl: {
        item: 'text-lg space-y-3',
        label: 'gap-3'
      },
      '2xl': {
        item: 'text-xl space-y-3.5',
        label: 'gap-3.5'
      }
    },
    error: {
      true: {
        message: `text-destructive`
      }
    }
  },
  defaultVariants: {
    size: 'md',
    error: false
  }
});
