// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const timeRangePickerVariants = tv({
  slots: {
    root: 'inline-flex w-full flex-col gap-2',
    trigger: [
      'inline-flex w-full items-center justify-start gap-2 rounded-md border border-input bg-background px-3 py-0 text-start font-normal shadow-xs transition-[background-color,color,box-shadow]',
      'hover:bg-accent/50 hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-background focus-visible:ring-primary/30',
      'data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60',
      'data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground'
    ],
    popup: [
      'z-50 w-72 overflow-hidden rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
    ],
    list: 'max-h-72 flex flex-col gap-1 overflow-y-auto',
    cellTrigger: [
      'inline-flex min-h-8 w-full cursor-pointer items-center rounded-md px-3 text-start text-sm font-normal transition-colors',
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
      xs: { root: 'text-2xs', trigger: 'h-6 px-2 text-2xs', cellTrigger: 'min-h-7 px-2 text-2xs' },
      sm: { root: 'text-xs', trigger: 'h-7 px-2.5 text-xs', cellTrigger: 'min-h-8 px-2.5 text-xs' },
      md: { root: 'text-sm', trigger: 'h-8 px-3 text-sm', cellTrigger: 'min-h-9 px-3 text-sm' },
      lg: { root: 'text-base', trigger: 'h-9 px-3.5 text-base', cellTrigger: 'min-h-10 px-3.5 text-base' },
      xl: { root: 'text-lg', trigger: 'h-10 px-4 text-lg', cellTrigger: 'min-h-11 px-4 text-lg' },
      '2xl': { root: 'text-xl', trigger: 'h-12 px-5 text-xl', cellTrigger: 'min-h-12 px-5 text-xl' }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

type TimeRangePickerVariants = VariantProps<typeof timeRangePickerVariants>;

export type TimeRangePickerVariantProps = TimeRangePickerVariants;
