// @unocss-include
import { scv } from '@soybeanjs/cva';
import type { VariantProps } from '@soybeanjs/cva';

export const separatorVariants = scv({
  slots: {
    root: `relative shrink-0 border-border`,
    label: `absolute top-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-muted-foreground bg-background`
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
        root: 'h-full border-s',
        label: 'w-1px'
      },
      horizontal: {
        root: 'w-full border-t',
        label: 'h-1px'
      }
    },
    align: {
      start: {
        label: 'start-1/16 lt-sm:start-1/8 lt-md:start-1/10 lt-lg:start-1/12'
      },
      center: {
        label: 'start-1/2'
      },
      end: {
        label: 'start-15/16 lt-sm:start-7/8 lt-md:start-9/10 lt-lg:start-11/12'
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

type SeparatorVariants = VariantProps<typeof separatorVariants>;

export type SeparatorBorder = NonNullable<SeparatorVariants['border']>;
