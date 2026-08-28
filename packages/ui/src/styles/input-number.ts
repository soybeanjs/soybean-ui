// @unocss-include
import { scv } from '@soybeanjs/cva';
import { fieldChrome, fieldClearReveal, fieldDisabled, fieldNestedAction, fieldSize } from './_field';
import { miniButtonIconVariants } from './button';

export const inputNumberVariants = scv({
  extendBase: props => ({
    decrement: miniButtonIconVariants({ size: props.size }),
    increment: miniButtonIconVariants({ size: props.size }),
    clear: miniButtonIconVariants({ size: props.size, shape: 'circle' })
  }),
  slots: {
    root: ['group flex items-center w-full', ...fieldChrome, ...fieldDisabled],
    decrement: ['shrink-0', fieldNestedAction],
    increment: ['shrink-0', fieldNestedAction],
    control: [
      'grow min-w-0 h-full bg-transparent outline-none',
      'placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed'
    ],
    clear: fieldClearReveal
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
    },
    center: {
      true: {
        decrement: '-order-1',
        control: 'text-center'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    center: false
  }
});
