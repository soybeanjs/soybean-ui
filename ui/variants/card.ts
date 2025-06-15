// @unocss-include
import { tv } from 'tailwind-variants';

export const cardVariants = tv({
  slots: {
    root: 'flex flex-col items-stretch rounded-md border bg-card text-card-foreground shadow-sm',
    header: 'flex items-center justify-between flex-wrap',
    content: 'flex-grow overflow-auto',
    footer: 'flex items-center justify-between',
    titleRoot: 'flex items-center',
    title: 'font-semibold tracking-tight',
    description: 'w-full text-muted-foreground'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        header: 'px-2 py-1.5',
        content: 'px-2 py-1.5',
        footer: 'px-2 py-1.5',
        titleRoot: 'gap-1.5',
        title: 'text-xs',
        description: 'text-2xs'
      },
      sm: {
        root: 'text-xs',
        header: 'px-3 py-2',
        content: 'px-3 py-2',
        footer: 'px-3 py-2',
        titleRoot: 'gap-1.75',
        title: 'text-sm',
        description: 'text-xs'
      },
      md: {
        root: 'text-sm',
        header: 'px-4 py-3',
        content: 'px-4 py-3',
        footer: 'px-4 py-3',
        titleRoot: 'gap-2',
        title: 'text-base',
        description: 'text-sm'
      },
      lg: {
        root: 'text-base',
        header: 'px-5 py-4',
        content: 'px-5 py-4',
        footer: 'px-5 py-5',
        titleRoot: 'gap-2.5',
        title: 'text-lg',
        description: 'text-base'
      },
      xl: {
        root: 'text-base',
        header: 'px-6 py-5',
        content: 'px-6 py-5',
        footer: 'px-6 py-6',
        titleRoot: 'gap-3',
        title: 'text-lg',
        description: 'text-lg'
      },
      '2xl': {
        root: 'text-lg',
        header: 'px-7 py-6',
        content: 'px-7 py-6',
        footer: 'px-7 py-6',
        titleRoot: 'gap-3.5',
        title: 'text-xl',
        description: 'text-xl'
      }
    },
    split: {
      true: {
        root: 'divide-y divide-border'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    split: false
  }
});

export type CardSlots = keyof typeof cardVariants.slots;
