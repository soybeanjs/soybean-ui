// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const separatorVariants = tv({
  slots: {
    root: `relative shrink-0 border-border`,
    label: `absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-xs text-muted-foreground bg-background`
  },
  variants: {
    orientation: {
      vertical: {
        root: 'h-full border-l',
        label: 'w-px px-1 py-2'
      },
      horizontal: {
        root: 'w-full border-t',
        label: 'h-1px px-2 py-1'
      }
    },
    align: {
      start: {
        label: 'left-1/16 lt-sm:left-1/8 lt-md:left-1/10 lt-lg:left-1/12'
      },
      center: {
        label: 'left-1/2'
      },
      end: {
        label: 'left-15/16 lt-sm:left-7/8 lt-md:left-9/10 lt-lg:left-11/12'
      }
    },
    border: {
      solid: {
        root: 'border-solid'
      },
      dashed: {
        root: 'border-dashed'
      },
      dotted: {
        root: 'border-dotted'
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    align: 'center',
    border: 'solid'
  }
});

type SeparatorVariants = VariantProps<typeof separatorVariants>;

export type SeparatorBorder = NonNullable<SeparatorVariants['border']>;
