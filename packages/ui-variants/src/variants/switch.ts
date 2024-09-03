// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const switchVariants = tv({
  base: [],
  slots: {
    root: 'peer inline-flex shrink-0  items-center  border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50  data-[state=unchecked]:bg-input',
    thumb:
      'pointer-events-none block    shadow-lg ring-0 transition-transform  data-[state=unchecked]:translate-x-0 bg-white flex items-center justify-center ',
    loading: 'absolute top-0 left-0'
  },
  variants: {
    color: {
      primary: {
        root: `data-[state=checked]:bg-primary`,
        loading: `text-primary`
      },
      destructive: {
        root: `data-[state=checked]:bg-destructive`,
        loading: `text-destructive`
      },
      success: {
        root: `data-[state=checked]:bg-success`,
        loading: `text-success`
      },
      warning: {
        root: `data-[state=checked]:bg-warning`,
        loading: `text-warning`
      },
      info: {
        root: `data-[state=checked]:bg-info`,
        loading: `text-info`
      },
      secondary: {
        root: `data-[state=checked]:bg-secondary-foreground`,
        loading: `text-secondary-foreground`
      },
      accent: {
        root: `data-[state=checked]:bg-accent-foreground`,
        loading: `text-accent-foreground`
      }
    },
    size: {
      xs: {
        root: 'h-4 w-8',
        thumb: 'size-3.5 data-[state=checked]:translate-x-3.5 text-xs'
      },
      sm: {
        root: 'h-5 w-9',
        thumb: 'size-4 data-[state=checked]:translate-x-4 text-sm'
      },
      md: {
        root: 'h-6 w-11',
        thumb: 'size-5 data-[state=checked]:translate-x-5 text-md'
      },
      lg: {
        root: 'h-7 w-13',
        thumb: 'size-6 data-[state=checked]:translate-x-6 text-lg'
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
