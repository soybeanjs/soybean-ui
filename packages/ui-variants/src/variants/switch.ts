// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const switchVariants = tv({
  base: [],
  slots: {
    root: `peer inline-flex shrink-0 items-center border-2 border-transparent shadow-sm transition-colors
    focus-visible:(outline outline-2 outline-offset-2) disabled:(cursor-not-allowed opacity-50) data-[state=unchecked]:bg-input`,
    thumb:
      'pointer-events-none block shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0 bg-white flex items-center justify-center',
    loading: 'size-auto  absolute'
  },
  variants: {
    color: {
      primary: {
        root: `data-[state=checked]:bg-primary focus-visible:outline-primary`,
        loading: `text-primary`
      },
      destructive: {
        root: `data-[state=checked]:bg-destructive focus-visible:outline-destructive`,
        loading: `text-destructive`
      },
      success: {
        root: `data-[state=checked]:bg-success focus-visible:outline-success`,
        loading: `text-success`
      },
      warning: {
        root: `data-[state=checked]:bg-warning focus-visible:outline-warning`,
        loading: `text-warning`
      },
      info: {
        root: `data-[state=checked]:bg-info focus-visible:outline-info`,
        loading: `text-info`
      },
      secondary: {
        root: `data-[state=checked]:bg-secondary-foreground/20 focus-visible:outline-secondary-foreground/20`,
        loading: `text-secondary-foreground`
      },
      accent: {
        root: `data-[state=checked]:bg-accent-foreground/20 focus-visible:outline-accent-foreground/20`,
        loading: `text-accent-foreground`
      }
    },
    size: {
      xs: {
        root: 'h-5 w-9',
        thumb: 'size-4 data-[state=checked]:translate-x-4 text-xs',
        loading: 'size-3.8'
      },
      sm: {
        root: 'h-6 w-11',
        thumb: 'size-5 data-[state=checked]:translate-x-5 text-xs',
        loading: 'size-4.8'
      },
      md: {
        root: 'h-7 w-13',
        thumb: 'size-6 data-[state=checked]:translate-x-6 text-sm',
        loading: 'size-5.8'
      },
      lg: {
        root: 'h-8 w-15',
        thumb: 'size-7 data-[state=checked]:translate-x-7 text-sm',
        loading: 'size-6.8'
      },
      xl: {
        root: 'h-9 w-17',
        thumb: 'size-8 data-[state=checked]:translate-x-8 text-base',
        loading: 'size-7.8'
      },
      xxl: {
        root: 'h-10 w-19',
        thumb: 'size-9 data-[state=checked]:translate-x-9 text-base',
        loading: 'size-8.8'
      }
    },
    round: {
      none: {
        root: 'rounded-0',
        thumb: 'rounded-0'
      },
      small: {
        root: 'rounded-1',
        thumb: 'rounded-1'
      },
      full: {
        root: 'rounded-full',
        thumb: 'rounded-full'
      }
    },
    status: {
      default: {
        root: 'cursor-pointer'
      },
      loading: {
        root: 'cursor-wait'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    round: 'full',
    status: 'default'
  }
});

type SwitchVariants = VariantProps<typeof switchVariants>;
export type SwitchColor = NonNullable<SwitchVariants['color']>;
export type SwitchSize = NonNullable<SwitchVariants['size']>;
export type SwitchRound = NonNullable<SwitchVariants['round']>;
