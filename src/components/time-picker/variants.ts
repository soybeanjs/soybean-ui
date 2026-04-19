// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const timePickerVariants = tv({
  slots: {
    root: 'relative inline-flex w-full flex-col gap-2',
    trigger: [
      'inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 transition-all-150',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-background focus-visible:ring-primary/30',
      'data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60',
      'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground'
    ],
    popup: 'z-50 w-64 rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-lg',
    list: 'max-h-72 flex flex-col gap-1 overflow-y-auto',
    cellTrigger: [
      'inline-flex min-h-8 items-center rounded-md px-3 text-start text-sm font-medium transition-colors',
      'hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
      'data-[selected]:bg-primary data-[selected]:text-primary-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
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

type TimePickerVariants = VariantProps<typeof timePickerVariants>;

export type TimePickerVariantProps = TimePickerVariants;
