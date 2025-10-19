// @unocss-include
import { tv } from 'tailwind-variants';

export const formVariants = tv({
  slots: {
    form: '',
    field: '',
    fieldArray: '',
    label: 'flex items-center',
    description: `text-muted-foreground`,
    error: `font-medium text-destructive`
  },
  variants: {
    size: {
      xs: {
        field: 'text-2xs space-y-1.5',
        fieldArray: 'text-2xs space-y-1.5',
        label: 'gap-1.5'
      },
      sm: {
        field: 'text-xs space-y-1.75',
        fieldArray: 'text-xs space-y-1.75',
        label: 'gap-1.75'
      },
      md: {
        field: 'text-sm space-y-2',
        fieldArray: 'text-sm space-y-2',
        label: 'gap-2'
      },
      lg: {
        field: 'text-base space-y-2.5',
        fieldArray: 'text-base space-y-2.5',
        label: 'gap-2.5'
      },
      xl: {
        field: 'text-lg space-y-3',
        fieldArray: 'text-lg space-y-3',
        label: 'gap-3'
      },
      '2xl': {
        field: 'text-xl space-y-3.5',
        fieldArray: 'text-xl space-y-3.5',
        label: 'gap-3.5'
      }
    },
    error: {
      true: {
        error: `text-destructive`
      }
    }
  },
  defaultVariants: {
    size: 'md',
    error: false
  }
});
