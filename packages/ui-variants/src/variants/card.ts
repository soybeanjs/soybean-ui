// @unocss-include
import { tv } from 'tailwind-variants';

export const cardVariants = tv({
  slots: {
    root: 'flex flex-col items-stretch rounded-md border bg-card text-card-foreground shadow-sm',
    header: 'flex items-center justify-between',
    titleRoot: 'flex items-center gap-2',
    title: 'font-semibold leading-none tracking-tight',
    body: 'flex-grow',
    footer: 'flex items-center justify-between'
  },
  variants: {
    size: {
      xs: {
        root: 'text-xs',
        header: 'px-2 py-1.5',
        title: 'text-sm',
        body: 'px-2 py-1.5',
        footer: 'px-2 py-1.5'
      },
      sm: {
        root: 'text-sm',
        header: 'px-3 py-2',
        title: 'text-base',
        body: 'px-3 py-2',
        footer: 'px-3 py-2'
      },
      md: {
        root: 'text-sm',
        header: 'px-4 py-3',
        title: 'text-base',
        body: 'px-4 py-3',
        footer: 'px-4 py-3'
      },
      lg: {
        root: 'text-base',
        header: 'px-5 py-4',
        title: 'text-lg',
        body: 'px-5 py-4',
        footer: 'px-5 py-5'
      },
      xl: {
        root: 'text-base',
        header: 'px-6 py-5',
        title: 'text-lg',
        body: 'px-6 py-5',
        footer: 'px-6 py-6'
      },
      xxl: {
        root: 'text-lg',
        header: 'px-7 py-6',
        title: 'text-xl',
        body: 'px-7 py-6',
        footer: 'px-7 py-6'
      }
    },
    split: {
      true: {
        root: 'divide-y divide-border'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type CardSlots = keyof typeof cardVariants.slots;
