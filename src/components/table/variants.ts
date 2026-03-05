// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const tableVariants = tv({
  slots: {
    root: 'relative overflow-auto',
    content: 'w-full',
    header: 'sticky top-0 left-0 z-10 bg-accent',
    body: '',
    footer: 'bg-accent font-medium',
    row: 'data-[row]:hover:bg-accent transition-colors',
    head: 'text-foreground font-medium whitespace-nowrap',
    cell: 'whitespace-nowrap',
    selection: 'text-foreground',
    radioRoot: [
      'peer relative shrink-0 rounded-full border border-solid shadow cursor-pointer',
      'border-primary focus-visible:ring-primary/30',
      'focus-visible:outline-none focus-visible:ring-3  focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50'
    ],
    radioIndicator: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-1/2 bg-primary rounded-full'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        caption: 'py-2',
        head: 'h-8 px-1.5',
        cell: 'p-1.5',
        radioRoot: 'w-3 h-3'
      },
      sm: {
        root: 'text-xs',
        caption: 'py-2.5',
        head: 'h-9 px-1.75',
        cell: 'p-1.75',
        radioRoot: 'w-3.5 h-3.5'
      },
      md: {
        root: 'text-sm',
        caption: 'py-3',
        head: 'h-10 px-2',
        cell: 'p-2',
        radioRoot: 'w-4 h-4'
      },
      lg: {
        root: 'text-base',
        caption: 'py-3.5',
        head: 'h-12 px-2.5',
        cell: 'p-2.5',
        radioRoot: 'w-4.5 h-4.5'
      },
      xl: {
        root: 'text-lg',
        caption: 'py-4',
        head: 'h-14 px-3',
        cell: 'p-3',
        radioRoot: 'w-5 h-5'
      },
      '2xl': {
        root: 'text-xl',
        caption: 'py-4.5',
        head: 'h-16 px-3.5',
        cell: 'p-3.5',
        radioRoot: 'w-6 h-6'
      }
    },
    bordered: {
      all: {
        content: 'border border-border border-collapse',
        head: 'border border-border',
        cell: 'border border-border'
      },
      true: {
        header: '[&_tr]:border',
        body: '[&_tr]:border-x',
        footer: '[&>tr]:border-x border-t',
        row: 'border-b'
      },
      false: {
        header: '[&_tr]:border-b',
        body: '[&_tr:last-child]:border-0',
        footer: '[&>tr]:last:border-b-0 border-t',
        row: 'border-b'
      }
    },
    striped: {
      true: {
        row: 'data-[row]:even:bg-accent'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    bordered: false,
    striped: false
  }
});

export type TableVariantProps = VariantProps<typeof tableVariants>;
