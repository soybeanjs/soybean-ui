// @unocss-include
import { scv } from '@soybeanjs/cva';
import { fieldChrome, fieldDisabled, fieldSize } from './_field';

export const colorFieldVariants = scv({
  slots: {
    root: ['group flex items-center min-w-0', ...fieldChrome, ...fieldDisabled, 'data-[readonly]:bg-muted/40'],
    input: [
      'flex-1 min-w-0 bg-transparent outline-none',
      'placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed'
    ]
  },
  variants: {
    size: {
      xs: {
        root: fieldSize.xs
      },
      sm: {
        root: fieldSize.sm
      },
      md: {
        root: fieldSize.md
      },
      lg: {
        root: fieldSize.lg
      },
      xl: {
        root: fieldSize.xl
      },
      '2xl': {
        root: fieldSize['2xl']
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
