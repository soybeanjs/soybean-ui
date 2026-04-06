// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const colorSwatchPickerVariants = tv({
  slots: {
    root: 'flex flex-wrap gap-2',
    item: [
      'relative inline-flex items-center justify-center rounded-full outline-none transition-[transform,box-shadow] duration-150',
      'data-[highlighted]:scale-105 data-[disabled]:opacity-50'
    ],
    itemIndicator: `pointer-events-none absolute inset-0 flex justify-center items-center text-muted`,
    swatch: [
      'relative isolate inline-flex size-full overflow-hidden rounded-[inherit] border border-input bg-background shadow-sm',
      'data-[no-color]:bg-muted/40'
    ],
    checker: `absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.08)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.08)_75%),linear-gradient(45deg,rgba(0,0,0,0.08)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.08)_75%)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]`,
    fill: 'absolute inset-0 bg-[var(--soybean-color-swatch-color)]'
  },
  variants: {
    size: {
      xs: {
        root: 'gap-1.5 text-2xs',
        item: 'size-6',
        itemIndicator: 'text-4xs'
      },
      sm: {
        root: 'gap-1.75 text-xs',
        item: 'size-7',
        itemIndicator: 'text-3xs'
      },
      md: {
        root: 'gap-2 text-sm',
        item: 'size-8',
        itemIndicator: 'text-2xs'
      },
      lg: {
        root: 'gap-2.5 text-base',
        item: 'size-9',
        itemIndicator: 'text-xs'
      },
      xl: {
        root: 'gap-3 text-lg',
        item: 'size-10',
        itemIndicator: 'text-sm'
      },
      '2xl': {
        root: 'gap-4 text-xl',
        item: 'size-12',
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
