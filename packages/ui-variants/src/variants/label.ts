// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const labelVariants = tv({
  base: 'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-base',
      xxl: 'text-lg'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

type LabelVariants = VariantProps<typeof labelVariants>;

export type LabelSize = NonNullable<LabelVariants['size']>;
