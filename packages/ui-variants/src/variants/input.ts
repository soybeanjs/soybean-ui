// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const inputVariants = tv({
  base: [
    `flex w-full rounded-md border border-input bg-background`,
    `file:(border-0 bg-transparent font-medium)`,
    `focus-visible:(outline outline-2 outline-primary outline-offset-2)`,
    `disabled:(cursor-not-allowed opacity-50)`
  ],
  variants: {
    size: {
      xs: 'h-6 px-1.5 text-xs file:py-0.75',
      sm: 'h-7 px-2 text-sm file:py-0.75',
      md: 'h-8 px-2.5 text-sm file:py-1.25',
      lg: 'h-9 px-3 text-base file:py-1.25',
      xl: 'h-10 px-3.5 text-base file:py-1.75',
      xxl: 'h-12 px-4 text-lg file:py-2.25'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

type InputVariants = VariantProps<typeof inputVariants>;

export type InputSize = NonNullable<InputVariants['size']>;
