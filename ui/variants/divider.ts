// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const dividerVariants = tv({
  slots: {
    root: `relative shrink-0 border-border`,
    label: `absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-muted-foreground bg-background`
  },
  variants: {
    size: {
      xs: {
        label: 'text-2xs'
      },
      sm: {
        label: 'text-xs'
      },
      md: {
        label: 'text-sm'
      },
      lg: {
        label: 'text-base'
      },
      xl: {
        label: 'text-lg'
      },
      '2xl': {
        label: 'text-2xl'
      }
    },
    orientation: {
      vertical: {
        root: 'h-full border-l',
        label: 'w-1px'
      },
      horizontal: {
        root: 'w-full border-t',
        label: 'h-1px'
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
  compoundVariants: [
    {
      size: 'xs',
      orientation: 'vertical',
      class: {
        label: 'px-0.75 py-1.5'
      }
    },
    {
      size: 'xs',
      orientation: 'horizontal',
      class: {
        label: 'px-1.5 py-0.75'
      }
    },
    {
      size: 'sm',
      orientation: 'vertical',
      class: {
        label: 'px-0.875 py-1.75'
      }
    },
    {
      size: 'sm',
      orientation: 'horizontal',
      class: {
        label: 'px-1.75 py-0.875'
      }
    },
    {
      size: 'md',
      orientation: 'vertical',
      class: {
        label: 'px-1 py-2'
      }
    },
    {
      size: 'md',
      orientation: 'horizontal',
      class: {
        label: 'px-2 py-1'
      }
    },
    {
      size: 'lg',
      orientation: 'vertical',
      class: {
        label: 'px-1.125 py-2.25'
      }
    },
    {
      size: 'lg',
      orientation: 'horizontal',
      class: {
        label: 'px-2.25 py-1.125'
      }
    },
    {
      size: 'xl',
      orientation: 'vertical',
      class: {
        label: 'px-1.25 py-2.5'
      }
    },
    {
      size: 'xl',
      orientation: 'horizontal',
      class: {
        label: 'px-2.5 py-1.25'
      }
    },
    {
      size: '2xl',
      orientation: 'vertical',
      class: {
        label: 'px-1.5 py-3'
      }
    },
    {
      size: '2xl',
      orientation: 'horizontal',
      class: {
        label: 'px-3 py-1.5'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
    align: 'center',
    border: 'solid'
  }
});

type DividerVariants = VariantProps<typeof dividerVariants>;

export type DividerBorder = NonNullable<DividerVariants['border']>;
