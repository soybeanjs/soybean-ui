// @unocss-include
import { scv } from '@soybeanjs/cva';
import { miniButtonIconVariants } from './button';

export const tagsInputVariants = scv({
  extendBase: props => ({
    itemDelete: miniButtonIconVariants({ size: props.size, shape: 'circle' }),
    clear: miniButtonIconVariants({ size: props.size })
  }),
  slots: {
    root: [
      'group relative flex w-full flex-wrap items-center rounded-md border border-input bg-background shadow-sm transition-all-150',
      `outline-none focus-within:ring-3 focus-within:ring-offset-background focus-within:ring-primary/30`,
      'data-[invalid]:focus-within:ring-destructive/30',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    item: [
      'inline-flex items-center rounded-md bg-accent ring-offset-background transition-[box-shadow,background-color]',
      'data-[state=active]:ring-2 data-[state=active]:ring-primary/30 data-[state=active]:ring-offset-2',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    itemText: 'rounded bg-transparent',
    itemDelete: '',
    control: [
      'grow min-w-0 bg-transparent text-foreground outline-none',
      'placeholder:text-muted-foreground disabled:cursor-not-allowed'
    ],
    clear: 'absolute opacity-0 transition-opacity group-data-[has-value]:opacity-100'
  },
  variants: {
    size: {
      xs: {
        root: 'gap-1 px-1.5 py-1 text-2xs',
        item: 'min-h-4 gap-0.5',
        itemText: 'px-1.5 py-0.5',
        itemDelete: 'me-0.5',
        input: 'min-h-5 px-0.5',
        clear: 'end-0.5 top-0.5'
      },
      sm: {
        root: 'gap-1.5 px-2 py-1 text-xs',
        item: 'min-h-4.5 gap-0.75',
        itemText: 'px-1.5 py-0.5',
        itemDelete: 'me-0.5',
        input: 'min-h-5 px-0.75',
        clear: 'end-0.75 top-0.75'
      },
      md: {
        root: 'gap-2 px-2 py-1 text-sm',
        item: 'min-h-5 gap-1',
        itemText: 'px-2 py-0.5',
        itemDelete: 'me-1',
        input: 'min-h-5 px-1',
        clear: 'end-1 top-1'
      },
      lg: {
        root: 'gap-2 px-2.5 py-1.5 text-base',
        item: 'min-h-6 gap-1',
        itemText: 'px-2 py-0.5',
        itemDelete: 'me-1',
        input: 'min-h-6 px-1.25',
        clear: 'end-1.25 top-1.25'
      },
      xl: {
        root: 'gap-2.5 px-3 py-2 text-lg',
        item: 'min-h-7 gap-1.5',
        itemText: 'px-2.5 py-1',
        itemDelete: 'me-1',
        input: 'min-h-7 px-1.5',
        clear: 'end-1.5 top-1.5'
      },
      '2xl': {
        root: 'gap-3 px-3.5 py-2.5 text-xl',
        item: 'min-h-8 gap-1.5',
        itemText: 'px-3 py-1',
        itemDelete: 'me-1.5',
        input: 'min-h-8 px-2',
        clear: 'end-2 top-2'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
