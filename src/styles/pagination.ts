// @unocss-include
import { scv, cv } from '@soybeanjs/cva';
import type { VariantProps } from '@soybeanjs/cva';

const paginationAction = cv({
  base: [
    `inline-flex items-center justify-center flex-shrink-0 font-medium transition-all-150 rtl:[&>svg]:rotate-180`,
    `hover:bg-accent hover:text-accent-foreground`,
    `outline-none focus-visible:ring-3  focus-visible:ring-offset-background focus-visible:ring-primary/30`,
    `disabled:cursor-not-allowed disabled:opacity-50`
  ],
  variants: {
    size: {
      xs: `h-6 px-1 gap-0.75`,
      sm: `h-7 px-1.5 gap-1`,
      md: `h-8 px-1.875 gap-1.5`,
      lg: `h-9 px-2 gap-2`,
      xl: `h-10 px-2.25 gap-2.5`,
      '2xl': `h-12 px-2.875 gap-3`
    },
    variant: {
      pure: `data-[soybean-pagination-action]:border data-[soybean-pagination-action]:border-border data-[soybean-pagination-action]:bg-background data-[soybean-pagination-action]:text-accent-foreground data-[soybean-pagination-action]:hover:bg-accent/60 data-[soybean-pagination-action]:active:bg-accent`,
      solid: `data-[soybean-pagination-action]:border-transparent data-[soybean-pagination-action]:bg-primary data-[soybean-pagination-action]:text-primary-foreground data-[soybean-pagination-action]:hover:bg-primary/80 data-[soybean-pagination-action]:hover:text-primary-foreground data-[soybean-pagination-action]:active:bg-primary-600`,
      outline: `data-[soybean-pagination-action]:border data-[soybean-pagination-action]:border-primary data-[soybean-pagination-action]:bg-background data-[soybean-pagination-action]:text-primary data-[soybean-pagination-action]:hover:bg-transparent`,
      soft: `data-[soybean-pagination-action]:bg-primary/10 data-[soybean-pagination-action]:hover:bg-primary/10 data-[soybean-pagination-action]:active:bg-primary/20`
    },
    shape: {
      rounded: `rounded-full`,
      square: `rounded-md`
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export const paginationVariants = scv({
  extendBase: props => {
    const { size, shape, actionAsSelected } = props;
    const variant = actionAsSelected ? props.variant : undefined;

    return {
      first: paginationAction({ size, variant, shape }),
      prev: paginationAction({ size, variant, shape }),
      next: paginationAction({ size, variant, shape }),
      last: paginationAction({ size, variant, shape })
    };
  },
  slots: {
    root: '',
    list: `flex items-center`,
    ellipsis: `flex justify-center items-center`,
    listItem: [
      `inline-flex items-center justify-center flex-shrink-0 font-medium transition-all-150`,
      `hover:bg-accent hover:text-accent-foreground`,
      `outline-none focus-visible:ring-3  focus-visible:ring-offset-background focus-visible:ring-primary/30`,
      `disabled:cursor-not-allowed disabled:opacity-50`
    ],
    first: '',
    prev: '',
    next: '',
    last: ''
  },
  variants: {
    size: {
      xs: {
        list: 'gap-0.75 text-2xs',
        ellipsis: 'size-6',
        listItem: 'size-6'
      },
      sm: {
        list: 'gap-1 text-xs',
        ellipsis: 'size-7',
        listItem: 'size-7'
      },
      md: {
        list: 'gap-1.25 text-sm',
        ellipsis: 'size-8',
        listItem: 'size-8'
      },
      lg: {
        list: 'gap-1.5 text-base',
        ellipsis: 'size-9',
        listItem: 'size-9'
      },
      xl: {
        list: 'gap-1.75 text-lg',
        ellipsis: 'size-10',
        listItem: 'size-10'
      },
      '2xl': {
        list: 'gap-2 text-xl',
        ellipsis: 'size-12',
        listItem: 'size-12'
      }
    },
    variant: {
      pure: {
        listItem: `data-[selected]:border data-[selected]:border-border data-[selected]:bg-background data-[selected]:text-accent-foreground data-[selected]:hover:bg-accent/60 data-[selected]:active:bg-accent`
      },
      solid: {
        listItem: `data-[selected]:border-transparent data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary/80 data-[selected]:hover:text-primary-foreground data-[selected]:active:bg-primary-600`
      },
      outline: {
        listItem: `data-[selected]:border data-[selected]:border-primary data-[selected]:bg-background data-[selected]:text-primary data-[selected]:hover:bg-transparent`
      },
      soft: {
        listItem: `data-[selected]:bg-primary/10 data-[selected]:hover:bg-primary/10 data-[selected]:active:bg-primary/20`
      }
    },
    shape: {
      rounded: {
        listItem: `rounded-full`
      },
      square: {
        listItem: `rounded-md`
      }
    },
    actionAsSelected: {
      true: {},
      false: {}
    }
  },

  defaultVariants: {
    size: 'md',
    variant: 'pure',
    shape: 'square',
    actionAsSelected: false
  }
});

type PaginationVariants = VariantProps<typeof paginationVariants>;

export type PaginationVariant = NonNullable<PaginationVariants['variant']>;

export type PaginationShape = NonNullable<PaginationVariants['shape']>;
