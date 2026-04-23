// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const colorFieldVariants = tv({
  slots: {
    root: [
      'group flex items-center rounded-md border border-input bg-background transition-all-150',
      'outline-none focus-within:ring-3 focus-within:ring-offset-background focus-within:ring-primary/30',
      'data-[disabled]:opacity-60 data-[readonly]:bg-muted/40'
    ],
    input: [
      'flex-1 min-w-0 bg-transparent outline-none',
      'placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed disabled:opacity-50'
    ]
  },
  variants: {
    size: {
      xs: {
        root: 'h-6 px-1.5 text-2xs gap-1'
      },
      sm: {
        root: 'h-7 px-2 text-xs gap-1.5'
      },
      md: {
        root: 'h-8 px-2.5 text-sm gap-2'
      },
      lg: {
        root: 'h-9 px-3 text-base gap-2.5'
      },
      xl: {
        root: 'h-10 px-3.5 text-lg gap-3'
      },
      '2xl': {
        root: 'h-12 px-4 text-xl gap-3.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

type ColorFieldVariants = VariantProps<typeof colorFieldVariants>;

export type ColorFieldVariantProps = ColorFieldVariants;
