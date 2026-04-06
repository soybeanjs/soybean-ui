// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const colorSwatchVariants = tv({
  slots: {
    root: [
      'relative isolate inline-flex shrink-0 overflow-hidden border border-input bg-background shadow-sm',
      'data-[no-color]:bg-muted/40'
    ],
    checker: `absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.08)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.08)_75%),linear-gradient(45deg,rgba(0,0,0,0.08)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.08)_75%)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]`,
    fill: 'absolute inset-0 bg-[var(--soybean-color-swatch-color)]'
  },
  variants: {
    size: {
      xs: {
        root: 'size-6 text-2xs'
      },
      sm: {
        root: 'size-7 text-xs'
      },
      md: {
        root: 'size-8 text-sm'
      },
      lg: {
        root: 'size-9 text-base'
      },
      xl: {
        root: 'size-10 text-lg'
      },
      '2xl': {
        root: 'size-12 text-xl'
      }
    },
    shape: {
      square: {
        root: 'rounded-md'
      },
      circle: {
        root: 'rounded-full'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    shape: 'square'
  }
});

type ColorSwatchVariants = VariantProps<typeof colorSwatchVariants>;

export type ColorSwatchShape = NonNullable<ColorSwatchVariants['shape']>;
