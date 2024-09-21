// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const cardVariants = tv({
  slots: {
    root: 'flex-col-stretch rounded-md border bg-card text-card-foreground shadow-sm',
    header: 'flex-y-center justify-between',
    title: 'font-semibold leading-none tracking-tight',
    titleRoot: 'flex-y-center gap-2',
    content: 'flex-grow overflow-hidden',
    footer: 'flex-y-center justify-between'
  },
  variants: {
    size: {
      xs: {
        root: 'text-xs',
        header: 'px-2 py-1.5',
        title: 'text-sm',
        content: 'px-2 py-1.5',
        footer: 'px-2 py-1.5'
      },
      sm: {
        root: 'text-sm',
        header: 'px-3 py-2',
        title: 'text-base',
        content: 'px-3 py-2',
        footer: 'px-3 py-2'
      },
      md: {
        root: 'text-sm',
        header: 'px-4 py-3',
        title: 'text-base',
        content: 'px-4 py-3',
        footer: 'px-4 py-3'
      },
      lg: {
        root: 'text-base',
        header: 'px-5 py-4',
        title: 'text-lg',
        content: 'px-5 py-4',
        footer: 'px-5 py-5'
      },
      xl: {
        root: 'text-base',
        header: 'px-6 py-5',
        title: 'text-lg',
        content: 'px-6 py-5',
        footer: 'px-6 py-6'
      },
      xxl: {
        root: 'text-lg',
        header: 'px-7 py-6',
        title: 'text-xl',
        content: 'px-7 py-6',
        footer: 'px-7 py-6'
      }
    },
    split: {
      header: {
        header: 'border-b border-border',
        content: 'pb-0'
      },
      footer: {
        footer: 'border-t border-border',
        content: 'pt-0'
      },
      all: {
        header: 'border-b border-border',
        footer: 'border-t border-border',
        content: ''
      },
      none: {
        content: 'py-0'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    split: 'none'
  }
});

type CardVariants = VariantProps<typeof cardVariants>;

export type CardSize = NonNullable<CardVariants['size']>;

export type CardSplit = NonNullable<CardVariants['split']>;
