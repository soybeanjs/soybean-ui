// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const dateRangeFieldVariants = tv({
  slots: {
    root: [
      'group inline-flex w-full flex-wrap items-center rounded-md border border-input bg-background px-2.5 transition-all-150 gap-1.5',
      'focus-within:outline-none focus-within:ring-3 focus-within:ring-offset-background focus-within:ring-primary/30',
      'data-[disabled]:opacity-60 data-[readonly]:bg-muted/40',
      'data-[invalid]:border-destructive data-[invalid]:ring-3 data-[invalid]:ring-destructive/20'
    ],
    input: [
      'inline-flex min-w-5 items-center justify-center rounded-sm px-0.5 text-center outline-none',
      'tabular-nums leading-none',
      'data-[segment=literal]:min-w-0 data-[segment=literal]:px-0 data-[segment=literal]:text-muted-foreground',
      'data-[segment=timeZoneName]:min-w-fit data-[segment=timeZoneName]:px-1 data-[segment=timeZoneName]:text-muted-foreground',
      'data-[placeholder]:text-muted-foreground',
      'focus-visible:bg-accent/60 focus-visible:ring-2 focus-visible:ring-primary/20',
      'data-[disabled]:cursor-not-allowed data-[readonly]:cursor-default'
    ],
    separator: [
      'inline-flex items-center justify-center px-1 text-muted-foreground',
      'select-none'
    ]
  },
  variants: {
    size: {
      xs: {
        root: 'min-h-6 px-1.5 text-2xs',
        input: 'min-h-4.5 min-w-4.5',
        separator: 'text-2xs'
      },
      sm: {
        root: 'min-h-7 px-2 text-xs',
        input: 'min-h-5 min-w-5',
        separator: 'text-xs'
      },
      md: {
        root: 'min-h-8 px-2.5 text-sm',
        input: 'min-h-5.5 min-w-5.5',
        separator: 'text-sm'
      },
      lg: {
        root: 'min-h-9 px-3 text-base',
        input: 'min-h-6 min-w-6',
        separator: 'text-base'
      },
      xl: {
        root: 'min-h-10 px-3.5 text-lg',
        input: 'min-h-6.5 min-w-6.5',
        separator: 'text-lg'
      },
      '2xl': {
        root: 'min-h-12 px-4 text-xl',
        input: 'min-h-8 min-w-8',
        separator: 'text-xl'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

type DateRangeFieldVariants = VariantProps<typeof dateRangeFieldVariants>;

export type DateRangeFieldVariantProps = DateRangeFieldVariants;
