// @unocss-include
import { tv } from 'tailwind-variants';

export const tagsInputVariants = tv({
  slots: {
    root: [
      `flex flex-wrap gap-2 items-center rounded-md border border-input bg-background`,
      `focus-within:ring-3  focus-within:ring-offset-background focus-within:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50`
    ],
    input: `focus:outline-none flex-1 bg-transparent`,
    item: `flex items-center rounded-md bg-accent data-[state=active]:ring-3 data-[state=active]:ring-offset-background data-[state=active]:ring-accent-foreground/20 ring-offset-background`,
    itemText: `rounded bg-transparent`,
    itemDelete: `flex rounded bg-transparent text-muted-foreground hover:text-foreground cursor-pointer`
  },
  variants: {
    size: {
      xs: {
        root: 'px-1.5 py-0.75 text-2xs',
        input: 'min-h-4 px-1.5',
        item: 'h-4',
        itemText: 'py-0.75 px-1.5',
        itemDelete: 'mr-0.75'
      },
      sm: {
        root: 'px-2 py-0.875 text-xs',
        input: 'min-h-5 px-2',
        item: 'h-5',
        itemText: 'py-0.875 px-2',
        itemDelete: 'mr-0.875'
      },
      md: {
        root: 'px-2.5 py-1 text-sm',
        input: 'min-h-5.5 px-2.5',
        item: 'h-5.5',
        itemText: 'py-1 px-2.5',
        itemDelete: 'mr-1'
      },
      lg: {
        root: 'px-3 py-1.25 text-base',
        input: 'min-h-6 px-3',
        item: 'h-6',
        itemText: 'py-1.25 px-3',
        itemDelete: 'mr-1.25'
      },
      xl: {
        root: 'px-3.5 py-1.5 text-lg',
        input: 'min-h-6.5 px-3.5',
        item: 'h-6.5',
        itemText: 'py-1.5 px-3.5',
        itemDelete: 'mr-1.5'
      },
      '2xl': {
        root: 'px-4 py-1.75 text-xl',
        input: 'min-h-8 px-4',
        item: 'h-8',
        itemText: 'py-1.75 px-4',
        itemDelete: 'mr-1.75'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
