// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const skeletonVariants = tv({
  base: 'block shrink-0 bg-muted',
  variants: {
    size: {
      xs: 'h-3 w-16',
      sm: 'h-4 w-24',
      md: 'h-5 w-32',
      lg: 'h-6 w-40',
      xl: 'h-8 w-48',
      '2xl': 'h-10 w-56'
    },
    animated: {
      true: 'animate-pulse',
      false: ''
    },
    shape: {
      rounded: 'rounded-md',
      pill: 'rounded-full',
      square: 'rounded-none'
    }
  },
  defaultVariants: {
    size: 'md',
    animated: true,
    shape: 'rounded'
  }
});

type SkeletonVariants = VariantProps<typeof skeletonVariants>;

export type SkeletonShape = NonNullable<SkeletonVariants['shape']>;
