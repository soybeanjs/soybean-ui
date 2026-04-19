// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const monthRangePickerVariants = tv({
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
      'z-50 overflow-hidden rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
    ],
    header: 'mb-3 grid grid-cols-[auto_1fr_auto] items-center gap-1',
    heading: 'font-medium text-foreground text-center',
    prev: [
      'inline-flex size-8 items-center justify-center rounded-md border border-transparent bg-transparent transition-colors',
      'hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    ],
    next: [
      'inline-flex size-8 items-center justify-center rounded-md border border-transparent bg-transparent transition-colors',
      'hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    ],
    grid: 'grid grid-cols-3 gap-1',
    cellTrigger: [
      'inline-flex h-9 cursor-pointer items-center justify-center rounded-md border border-transparent bg-transparent px-3 text-sm font-normal transition-colors',
      'hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
      'data-[selected]:bg-accent data-[selected]:text-foreground',
      'data-[range-start]:bg-primary data-[range-start]:text-primary-foreground',
      'data-[range-end]:bg-primary data-[range-end]:text-primary-foreground',
      'data-[highlighted]:bg-accent/80 data-[highlighted]:text-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'data-[focused]:ring-2 data-[focused]:ring-primary/20'
    ]
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        trigger: 'h-6 px-2 text-2xs',
        prev: 'size-6 text-2xs',
        next: 'size-6 text-2xs',
        cellTrigger: 'h-7 px-2 text-2xs'
      },
      sm: {
        root: 'text-xs',
        trigger: 'h-7 px-2.5 text-xs',
        prev: 'size-7 text-xs',
        next: 'size-7 text-xs',
        cellTrigger: 'h-8 px-2.5 text-xs'
      },
      md: {
        root: 'text-sm',
        trigger: 'h-8 px-3 text-sm',
        prev: 'size-8 text-sm',
        next: 'size-8 text-sm',
        cellTrigger: 'h-9 px-3 text-sm'
      },
      lg: {
        root: 'text-base',
        trigger: 'h-9 px-3.5 text-base',
        prev: 'size-9 text-base',
        next: 'size-9 text-base',
        cellTrigger: 'h-10 px-3.5 text-base'
      },
      xl: {
        root: 'text-lg',
        trigger: 'h-10 px-4 text-lg',
        prev: 'size-10 text-lg',
        next: 'size-10 text-lg',
        cellTrigger: 'h-11 px-4 text-lg'
      },
      '2xl': {
        root: 'text-xl',
        trigger: 'h-12 px-5 text-xl',
        prev: 'size-12 text-xl',
        next: 'size-12 text-xl',
        cellTrigger: 'h-12 px-5 text-xl'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

type MonthRangePickerVariants = VariantProps<typeof monthRangePickerVariants>;

export type MonthRangePickerVariantProps = MonthRangePickerVariants;
