// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const textareaVariants = tv({
  base: [
    `flex w-full rounded-md border border-textarea bg-background`,
    `focus-visible:(outline outline-2 outline-primary outline-offset-2)`,
    `disabled:(cursor-not-allowed opacity-50)`
  ],
  variants: {
    size: {
      xs: 'h-16 px-1.5 text-xs',
      sm: 'h-18 px-2 text-sm',
      md: 'h-20 px-2.5 text-sm',
      lg: 'h-24 px-3 text-base',
      xl: 'h-26 px-3.5 text-base',
      xxl: 'h-28 px-4 text-lg'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

type TextareaVariants = VariantProps<typeof textareaVariants>;

export type TextareaSize = NonNullable<TextareaVariants['size']>;
