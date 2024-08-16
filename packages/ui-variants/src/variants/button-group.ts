// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const buttonGroupVariants = tv({
  base: `[&>button]:relative focus-visible:[&>button]:z-2 not-first:not-last:[&>button]:rd-0`,
  variants: {
    orientation: {
      horizontal: `flex not-last:[&>button]:border-r-0 first:[&>button]:rd-r-0 last:[&>button]:rd-l-0`,
      vertical: `flex-col not-last:[&>button]:border-b-0 first:[&>button]:rd-b-0 last:[&>button]:rd-t-0`
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});

type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;

export type ButtonGroupOrientation = NonNullable<ButtonGroupVariants['orientation']>;
