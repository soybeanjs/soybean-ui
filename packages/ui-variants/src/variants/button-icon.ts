// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const buttonIconVariants = tv({
  base: `[&>button]:relative focus-visible:[&>button]:z-2 not-first:not-last:[&>button]:rd-0`,
  variants: {
    fitContent: {
      true: `size-fit`
    },
    size: {
      xs: 'p-0.75',
      sm: 'p-1',
      md: 'p-1',
      lg: 'p-1.25',
      xl: 'p-1.5',
      xxl: 'p-1.75'
    }
  },
  defaultVariants: {
    fitContent: false,
    size: 'md'
  }
});

type ButtonIconVariants = VariantProps<typeof buttonIconVariants>;

export type ButtonIconFitContent = NonNullable<ButtonIconVariants['fitContent']>;

export type ButtonIconSize = NonNullable<ButtonIconVariants['size']>;
