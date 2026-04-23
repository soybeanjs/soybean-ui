// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const tagsInputVariants = tv({
  slots: {
    root: [
      'flex w-full flex-wrap items-center rounded-md border border-input bg-background shadow-xs transition-[color,box-shadow]',
      'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
      'data-[invalid]:border-destructive data-[invalid]:ring-3 data-[invalid]:ring-destructive/20',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    item: [
      'inline-flex items-center rounded-md bg-secondary ring-offset-background transition-[box-shadow,background-color]',
      'data-[state=active]:ring-2 data-[state=active]:ring-ring data-[state=active]:ring-offset-2',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    itemText: 'rounded bg-transparent',
    itemDelete: [
      'inline-flex items-center justify-center rounded bg-transparent text-muted-foreground transition-colors',
      'hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
    ],
    input: [
      'min-w-24 flex-1 bg-transparent text-foreground outline-none',
      'placeholder:text-muted-foreground disabled:cursor-not-allowed'
    ],
    clear: [
      'inline-flex items-center justify-center rounded-md text-muted-foreground transition-colors',
      'hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ]
  },
  variants: {
    size: {
      xs: {
        root: 'gap-1 px-1.5 py-1 text-2xs',
        item: 'min-h-5 gap-0.5',
        itemText: 'px-1.5 py-0.5 text-2xs',
        itemDelete: 'me-0.5 size-4',
        input: 'min-h-5 px-1 text-2xs',
        clear: 'size-4 text-xs'
      },
      sm: {
        root: 'gap-1.5 px-2 py-1 text-xs',
        item: 'min-h-5 gap-0.75',
        itemText: 'px-1.5 py-0.5 text-xs',
        itemDelete: 'me-0.5 size-4',
        input: 'min-h-5 px-1 text-xs',
        clear: 'size-4 text-xs'
      },
      md: {
        root: 'gap-2 px-2 py-1 text-sm',
        item: 'min-h-5 gap-1',
        itemText: 'px-2 py-0.5 text-sm',
        itemDelete: 'me-1 size-4',
        input: 'min-h-5 px-1 text-sm',
        clear: 'size-4 text-sm'
      },
      lg: {
        root: 'gap-2 px-2.5 py-1.5 text-base',
        item: 'min-h-6 gap-1',
        itemText: 'px-2 py-0.5 text-base',
        itemDelete: 'me-1 size-4.5',
        input: 'min-h-6 px-1 text-base',
        clear: 'size-4.5 text-base'
      },
      xl: {
        root: 'gap-2.5 px-3 py-2 text-lg',
        item: 'min-h-7 gap-1.5',
        itemText: 'px-2.5 py-1 text-lg',
        itemDelete: 'me-1 size-5',
        input: 'min-h-7 px-1.5 text-lg',
        clear: 'size-5 text-lg'
      },
      '2xl': {
        root: 'gap-3 px-3.5 py-2.5 text-xl',
        item: 'min-h-8 gap-1.5',
        itemText: 'px-3 py-1 text-xl',
        itemDelete: 'me-1.5 size-5.5',
        input: 'min-h-8 px-1.5 text-xl',
        clear: 'size-5.5 text-xl'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type TagsInputVariantProps = VariantProps<typeof tagsInputVariants>;
