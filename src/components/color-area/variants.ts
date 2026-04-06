// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const colorAreaVariants = tv({
  slots: {
    root: 'relative select-none',
    area: [
      'relative overflow-hidden min-w-25 min-h-25 w-full h-full rounded-xl border border-input shadow-inner outline-none',
      'focus-visible:ring-3 focus-visible:ring-primary/20 data-[disabled]:opacity-60'
    ],
    thumb: [
      'absolute block rounded-full border-2 border-white bg-transparent shadow-lg',
      'ring-1 ring-black/20 transition-[transform,box-shadow] duration-150',
      'hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25'
    ]
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        thumb: 'size-3'
      },
      sm: {
        root: 'text-xs',
        thumb: 'size-3.5'
      },
      md: {
        root: 'text-sm',
        thumb: 'size-4'
      },
      lg: {
        root: 'text-base',
        thumb: 'size-4.5'
      },
      xl: {
        root: 'text-lg',
        thumb: 'size-5'
      },
      '2xl': {
        root: 'text-xl',
        thumb: 'size-6'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

type ColorAreaVariants = VariantProps<typeof colorAreaVariants>;

export type ColorAreaVariantProps = ColorAreaVariants;
