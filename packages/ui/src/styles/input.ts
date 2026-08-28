// @unocss-include
import { scv } from '@soybeanjs/cva';
import { miniButtonIconVariants } from './button';
import { fieldChrome, fieldClearReveal, fieldDisabled, fieldNestedAction, fieldSize } from './field';

export const inputVariants = scv({
  extendBase: props => ({
    clear: miniButtonIconVariants({ size: props.size, shape: 'circle' })
  }),
  slots: {
    root: ['group flex items-center w-full', ...fieldChrome, ...fieldDisabled],
    control: [
      'grow min-w-0 h-full bg-transparent outline-none',
      'placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed',
      'file:border-0 file:bg-transparent file:font-medium'
    ],
    clear: fieldClearReveal,
    visible: ['shrink-0 cursor-pointer', fieldNestedAction]
  },
  variants: {
    size: {
      xs: {
        root: fieldSize.xs,
        control: 'file:py-1.25'
      },
      sm: {
        root: fieldSize.sm,
        control: 'file:py-1.25'
      },
      md: {
        root: fieldSize.md,
        control: 'file:py-1.25'
      },
      lg: {
        root: fieldSize.lg,
        control: 'file:py-1.25'
      },
      xl: {
        root: fieldSize.xl,
        control: 'file:py-1.25'
      },
      '2xl': {
        root: fieldSize['2xl'],
        control: 'file:py-2'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
