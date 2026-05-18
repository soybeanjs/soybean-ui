// @unocss-include
import { scv } from '@soybeanjs/cva';
import { miniButtonIconVariants } from './button';

export const inputNumberVariants = scv({
  extendBase: props => ({
    decrement: miniButtonIconVariants({ size: props.size }),
    increment: miniButtonIconVariants({ size: props.size }),
    clear: miniButtonIconVariants({ size: props.size, shape: 'circle' })
  }),
  slots: {
    root: 'group flex items-center w-full rounded-md border border-input bg-background transition-all-150 focus-within:border-input focus-within:ring-3  focus-within:ring-offset-background focus-within:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50',
    decrement: `shrink-0`,
    increment: `shrink-0`,
    control: [
      `grow min-w-0 h-full bg-transparent outline-none`,
      `placeholder:text-muted-foreground`,
      'disabled:cursor-not-allowed disabled:opacity-50'
    ],
    clear: [
      'hidden shrink-0 opacity-50',
      'group-hover:inline-flex group-focus-within:inline-flex hover:opacity-100 focus-visible:opacity-100'
    ]
  },
  variants: {
    size: {
      xs: {
        root: 'h-6 px-1.5 text-2xs gap-1'
      },
      sm: {
        root: 'h-7 px-2 text-xs gap-1.5'
      },
      md: {
        root: 'h-8 px-2.5 text-sm gap-2'
      },
      lg: {
        root: 'h-9 px-3 text-base gap-2.5'
      },
      xl: {
        root: 'h-10 px-3.5 text-lg gap-3'
      },
      '2xl': {
        root: 'h-12 px-4 text-xl gap-3.5'
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
