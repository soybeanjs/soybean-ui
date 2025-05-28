// @unocss-include
import { tv } from 'tailwind-variants';

export const inputVariants = tv({
  base: [
    `flex w-full rounded-md border border-solid border-input bg-background`,
    `file:(border-0 bg-transparent font-medium)`,
    `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`,
    `disabled:(cursor-not-allowed opacity-50)`
  ],
  variants: {
    size: {
      xs: 'h-6 px-1.5 text-2xs file:py-1.25',
      sm: 'h-7 px-2 text-xs file:py-1.25',
      md: 'h-8 px-2.5 text-sm file:py-1.25',
      lg: 'h-9 px-3 text-base file:py-1.25',
      xl: 'h-10 px-3.5 text-lg file:py-1.25',
      '2xl': 'h-12 px-4 text-xl file:py-2'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
