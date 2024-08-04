// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const cardVariants = tv({
  slots: {
    root: 'flex-col-stretch rounded-md border bg-card text-card-foreground shadow-sm',
    header: 'flex-y-center justify-between',
    titleRoot: 'flex-1-hidden flex-col',
    title: 'font-semibold leading-none tracking-tight',
    description: 'text-muted-foreground',
    content: 'flex-grow overflow-hidden',
    footer: 'flex-y-center justify-between'
  },
  variants: {
    size: {
      xs: {
        header: 'px-3 py-1',
        titleRoot: 'gap-y-1',
        title: 'text-sm',
        description: 'text-xs',
        content: 'px-3 py-1',
        footer: 'px-3 py-1'
      },
      sm: {
        header: 'px-4 py-2',
        titleRoot: 'gap-y-1.5',
        title: 'text-sm',
        description: 'text-sm',
        content: 'px-4 py-2',
        footer: 'px-4 py-2'
      },
      md: {
        header: 'px-6 py-3',
        titleRoot: 'gap-y-1.5',
        title: 'text-base',
        description: 'text-sm',
        content: 'px-6 py-3',
        footer: 'px-6 py-3'
      },
      lg: {
        header: 'px-6 py-5',
        titleRoot: 'gap-y-2',
        title: 'text-lg',
        description: 'text-sm',
        content: 'px-6 py-5',
        footer: 'px-6 py-5'
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

type CardVariantProps = VariantProps<typeof cardVariants>;

export type CardSize = NonNullable<CardVariantProps['size']>;

export type CardSplit = NonNullable<CardVariantProps['split']>;
