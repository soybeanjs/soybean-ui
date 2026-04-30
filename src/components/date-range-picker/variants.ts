// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const dateRangePickerVariants = tv({
  slots: {
    root: 'inline-flex w-full flex-col gap-2',
    trigger: [
      'inline-flex w-full items-center justify-start gap-2 rounded-md border border-input bg-background px-3 py-0 text-start font-normal shadow-xs transition-[background-color,color,box-shadow]',
      'hover:bg-accent/50 hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-background focus-visible:ring-primary/30',
      'data-[disabled]:opacity-60 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none',
      'data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground'
    ],
    popup: [
      'z-50 overflow-hidden rounded-lg border border-border bg-popover p-0 text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
    ],
    input: [
      'inline-flex min-w-5 items-center justify-center rounded-sm px-0.5 text-center outline-none',
      'tabular-nums leading-none',
      'data-[segment=literal]:min-w-0 data-[segment=literal]:px-0 data-[segment=literal]:text-muted-foreground',
      'data-[segment=timeZoneName]:min-w-fit data-[segment=timeZoneName]:px-1 data-[segment=timeZoneName]:text-muted-foreground',
      'data-[placeholder]:text-muted-foreground',
      'focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary/20',
      'data-[disabled]:cursor-not-allowed data-[readonly]:cursor-default'
    ],
    calendar: ''
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        trigger: 'h-6 px-2 text-2xs',
        input: 'min-h-4.5 min-w-4.5'
      },
      sm: {
        root: 'text-xs',
        trigger: 'h-7 px-2.5 text-xs',
        input: 'min-h-5 min-w-5'
      },
      md: {
        root: 'text-sm',
        trigger: 'h-8 px-3 text-sm',
        input: 'min-h-5.5 min-w-5.5'
      },
      lg: {
        root: 'text-base',
        trigger: 'h-9 px-3.5 text-base',
        input: 'min-h-6 min-w-6'
      },
      xl: {
        root: 'text-lg',
        trigger: 'h-10 px-4 text-lg',
        input: 'min-h-6.5 min-w-6.5'
      },
      '2xl': {
        root: 'text-xl',
        trigger: 'h-12 px-5 text-xl',
        input: 'min-h-8 min-w-8'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

type DateRangePickerVariants = VariantProps<typeof dateRangePickerVariants>;

export type DateRangePickerVariantProps = DateRangePickerVariants;
