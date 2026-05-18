// @unocss-include
import { scv, alias } from '@soybeanjs/cva';
import type { VariantProps } from '@soybeanjs/cva';
import { colorSwatchVariants } from './color-swatch';

export const colorSwatchPickerVariants = scv({
  extend: [
    alias(colorSwatchVariants, {
      root: 'swatchRoot',
      checker: 'swatchChecker',
      fill: 'swatchFill'
    })
  ],
  slots: {
    root: 'grid',
    item: [
      'relative inline-flex items-center justify-center rounded-full outline-none transition-[transform,box-shadow] duration-150',
      'hover:scale-110 data-[highlighted]:scale-105 data-[disabled]:opacity-50'
    ],
    itemIndicator: `pointer-events-none absolute inset-0 flex justify-center items-center text-muted`,
    swatchRoot: '',
    swatchChecker: '',
    swatchFill: ''
  },
  variants: {
    size: {
      xs: {
        root: 'grid-cols-[repeat(auto-fill,minmax(1.25rem,1fr))] gap-1.5 text-2xs',
        item: 'size-5',
        itemIndicator: 'text-4xs'
      },
      sm: {
        root: 'grid-cols-[repeat(auto-fill,minmax(1.375rem,1fr))] gap-1.75 text-xs',
        item: 'size-5.5',
        itemIndicator: 'text-3xs'
      },
      md: {
        root: 'grid-cols-[repeat(auto-fill,minmax(1.5rem,1fr))] gap-2 text-sm',
        item: 'size-6',
        itemIndicator: 'text-2xs'
      },
      lg: {
        root: 'grid-cols-[repeat(auto-fill,minmax(1.625rem,1fr))] gap-2.5 text-base',
        item: 'size-6.5',
        itemIndicator: 'text-xs'
      },
      xl: {
        root: 'grid-cols-[repeat(auto-fill,minmax(1.75rem,1fr))] gap-3 text-lg',
        item: 'size-7',
        itemIndicator: 'text-sm'
      },
      '2xl': {
        root: 'grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] gap-4 text-xl',
        item: 'size-8',
        itemIndicator: 'text-base'
      }
    },
    shape: {
      square: {
        item: 'rounded-md'
      },
      circle: {
        item: 'rounded-full'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    shape: 'square'
  }
});

type ColorSwatchPickerVariants = VariantProps<typeof colorSwatchPickerVariants>;

export type ColorSwatchPickerShape = NonNullable<ColorSwatchPickerVariants['shape']>;
