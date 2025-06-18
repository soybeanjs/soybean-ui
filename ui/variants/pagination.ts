// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const paginationVariants = tv({
  slots: {
    root: '',
    list: `flex items-center`,
    ellipsis: `flex justify-center items-center`,
    button: [
      `inline-flex items-center justify-center flex-shrink-0 font-medium`,
      `hover:(bg-accent text-accent-foreground)`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`,
      `disabled:(cursor-not-allowed opacity-50)`
    ],
    navigationButton: [
      `inline-flex items-center justify-center flex-shrink-0 font-medium`,
      `hover:(bg-accent text-accent-foreground)`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`,
      `disabled:(cursor-not-allowed opacity-50)`
    ]
  },
  variants: {
    size: {
      xs: {
        list: 'gap-0.75 text-2xs',
        ellipsis: 'size-6',
        button: 'size-6',
        navigationButton: 'h-6 px-1 gap-0.75'
      },
      sm: {
        list: 'gap-1 text-xs',
        ellipsis: 'size-7',
        button: 'size-7',
        navigationButton: 'h-7 px-1.5 gap-1'
      },
      md: {
        list: 'gap-1.25 text-sm',
        ellipsis: 'size-8',
        button: 'size-8',
        navigationButton: 'h-8 px-1.875 gap-1.5'
      },
      lg: {
        list: 'gap-1.5 text-base',
        ellipsis: 'size-9',
        button: 'size-9',
        navigationButton: 'h-9 px-2 gap-2'
      },
      xl: {
        list: 'gap-1.75 text-lg',
        ellipsis: 'size-10',
        button: 'size-10',
        navigationButton: 'h-10 px-2.25 gap-2.5'
      },
      '2xl': {
        list: 'gap-2 text-xl',
        ellipsis: 'size-12',
        button: 'size-12',
        navigationButton: 'h-12 px-2.875 gap-3'
      }
    },
    variant: {
      pure: {
        button: `data-[selected]:(border border-border bg-background text-accent-foreground hover:bg-accent/60 active:bg-accent)`
      },
      solid: {
        button: `data-[selected]:(border-transparent bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground active:bg-primary-600)`
      },
      outline: {
        button: `data-[selected]:(border border-primary bg-background text-primary hover:bg-transparent)`
      },
      soft: {
        button: `data-[selected]:(bg-primary/10 hover:bg-primary/10 active:bg-primary/20)`
      }
    },
    shape: {
      rounded: {
        button: `rounded-full`,
        navigationButton: `rounded-full`
      },
      square: {
        button: `rounded-md`,
        navigationButton: `rounded-md`
      }
    },
    actionAsSelected: {
      true: {
        navigationButton: ''
      }
    }
  },
  compoundVariants: [
    {
      variant: 'pure',
      actionAsSelected: true,
      class: {
        navigationButton: `data-[selected]:(border border-border bg-background text-accent-foreground hover:bg-accent/60 active:bg-accent)`
      }
    },
    {
      variant: 'solid',
      actionAsSelected: true,
      class: {
        navigationButton: `data-[selected]:(border-transparent bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground active:bg-primary-600)`
      }
    },
    {
      variant: 'outline',
      actionAsSelected: true,
      class: {
        navigationButton: `data-[selected]:(border border-primary bg-background text-primary hover:bg-transparent)`
      }
    },
    {
      variant: 'soft',
      actionAsSelected: true,
      class: {
        navigationButton: `data-[selected]:(bg-primary/10 hover:bg-primary/10 active:bg-primary/20)`
      }
    }
  ],
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
