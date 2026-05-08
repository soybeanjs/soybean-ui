// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const dateRangePickerVariants = tv({
  slots: {
    root: '',
    input: '',
    startRoot: '',
    endRoot: '',
    separator: '',
    trigger: 'ml-auto data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground',
    positioner: 'w-max',
    popup: [
      `w-auto rounded-md border bg-popover text-popover-foreground outline-none z-50 will-change-transform`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ]
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
