// @unocss-include
import { tv } from 'tailwind-variants';

export const cardVariants = tv({
  slots: {
    root: 'flex flex-col items-stretch rounded-md border bg-card text-card-foreground shadow-sm',
    header: 'flex items-center justify-between',
    titleRoot: 'flex items-center',
    title: 'font-semibold tracking-tight',
    content: 'flex-grow',
    footer: 'flex items-center justify-between'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        header: 'px-2 py-1.5',
        titleRoot: 'gap-1.5',
        title: 'text-xs',
        content: 'px-2 py-1.5',
        footer: 'px-2 py-1.5'
      },
      sm: {
        root: 'text-xs',
        header: 'px-3 py-2',
        titleRoot: 'gap-1.75',
        title: 'text-sm',
        content: 'px-3 py-2',
        footer: 'px-3 py-2'
      },
      md: {
        root: 'text-sm',
        header: 'px-4 py-3',
        titleRoot: 'gap-2',
        title: 'text-base',
        content: 'px-4 py-3',
        footer: 'px-4 py-3'
      },
      lg: {
        root: 'text-base',
        header: 'px-5 py-4',
        titleRoot: 'gap-2.5',
        title: 'text-lg',
        content: 'px-5 py-4',
        footer: 'px-5 py-5'
      },
      xl: {
        root: 'text-base',
        header: 'px-6 py-5',
        titleRoot: 'gap-3',
        title: 'text-lg',
        content: 'px-6 py-5',
        footer: 'px-6 py-6'
      },
      '2xl': {
        root: 'text-lg',
        header: 'px-7 py-6',
        titleRoot: 'gap-3.5',
        title: 'text-xl',
        content: 'px-7 py-6',
        footer: 'px-7 py-6'
      }
    },
    split: {
      true: {
        root: 'divide-y divide-border'
      }
    },
    flexHeight: {
      true: {
        content: 'overflow-hidden'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    flexHeight: false
  }
});

export type CardSlots = keyof typeof cardVariants.slots;
