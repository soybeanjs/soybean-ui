// @unocss-include
import { tv } from 'tailwind-variants';

export const tagsInputVariants = tv({
  slots: {
    root: [
      `flex flex-wrap gap-2 items-center rounded-md border border-input bg-background`,
      `focus-within:(ring-2 ring-offset-2 ring-offset-background ring-primary) disabled:(cursor-not-allowed opacity-50)`
    ],
    input: `focus:outline-none flex-1 bg-transparent`,
    item: `flex items-center rounded-md bg-accent data-[state=active]:(ring-2 ring-offset-2 ring-offset-background ring-accent-foreground/20) ring-offset-background`,
    itemText: `rounded bg-transparent`,
    itemDelete: `flex rounded bg-transparent mr-1 text-foreground hover:text-foreground/80`,
    itemDeleteIcon: `cursor-pointer`
  },
  variants: {
    size: {
      xs: {
        root: 'px-1.5 py-0.75 text-xs',
        input: 'min-h-4 px-1.5 text-xs',
        item: 'h-4',
        itemText: 'py-0.75 px-1.5 text-xs',
        itemDelete: 'mr-1.5',
        itemDeleteIcon: 'size-3'
      },
      sm: {
        root: 'px-2 py-0.75 text-sm',
        input: 'min-h-5 px-2 text-sm',
        item: 'h-5',
        itemText: 'py-0.75 px-2 text-sm',
        itemDelete: 'mr-2',
        itemDeleteIcon: 'size-3.5'
      },
      md: {
        root: 'px-2.5 py-1 text-sm',
        input: 'min-h-5.5 px-2.5 text-sm',
        item: 'h-5.5',
        itemText: 'py-1 px-2.5 text-sm',
        itemDelete: 'mr-2.5',
        itemDeleteIcon: 'size-4'
      },
      lg: {
        root: 'px-3 py-1.25 text-base',
        input: 'min-h-6 px-3 text-base',
        item: 'h-6',
        itemText: 'py-1.25 px-3 text-base',
        itemDelete: 'mr-3',
        itemDeleteIcon: 'size-4.5'
      },
      xl: {
        root: 'px-3.5 py-1.5 text-base',
        input: 'min-h-6.5 px-3.5 text-base',
        item: 'h-6.5',
        itemText: 'py-1.5 px-3.5 text-base',
        itemDelete: 'mr-3.5',
        itemDeleteIcon: 'size-5'
      },
      xxl: {
        root: 'px-4 py-1.75 text-lg',
        input: 'min-h-8 px-4 text-lg',
        item: 'h-8',
        itemText: 'py-1.75 px-4 text-lg',
        itemDelete: 'mr-4',
        itemDeleteIcon: 'size-5.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type TagsInputSlots = keyof typeof tagsInputVariants.slots;
