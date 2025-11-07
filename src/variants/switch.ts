// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const switchVariants = tv({
  base: [],
  slots: {
    root: 'inline-flex',
    control: [
      `peer shrink-0 inline-flex items-center rounded-full border-0 shadow-sm transition-colors-200`,
      `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input`
    ],
    thumb: `flex justify-center items-center rounded-full shadow-lg transition-transform-200 bg-background pointer-events-none data-[state=unchecked]:translate-x-0.5`
  },
  variants: {
    color: {
      primary: {
        control: `data-[state=checked]:bg-primary focus-visible:ring-primary`
      },
      destructive: {
        control: `data-[state=checked]:bg-destructive focus-visible:ring-destructive`
      },
      success: {
        control: `data-[state=checked]:bg-success focus-visible:ring-success`
      },
      warning: {
        control: `data-[state=checked]:bg-warning focus-visible:ring-warning`
      },
      info: {
        control: `data-[state=checked]:bg-info focus-visible:ring-info`
      },
      carbon: {
        control: `data-[state=checked]:bg-carbon focus-visible:ring-carbon`
      },
      secondary: {
        control: `data-[state=checked]:bg-secondary-foreground/20 focus-visible:ring-secondary-foreground/20`
      },
      accent: {
        control: `data-[state=checked]:bg-accent-foreground/20 focus-visible:ring-accent-foreground/20`
      }
    },
    size: {
      xs: {
        control: 'h-4 w-7',
        thumb: 'size-3 data-[state=checked]:translate-x-3.5'
      },
      sm: {
        control: 'h-4.5 w-8',
        thumb: 'size-3.5 data-[state=checked]:translate-x-4'
      },
      md: {
        control: 'h-5 w-9',
        thumb: 'size-4 data-[state=checked]:translate-x-4.5'
      },
      lg: {
        control: 'h-5.5 w-10',
        thumb: 'size-4.5 data-[state=checked]:translate-x-5'
      },
      xl: {
        control: 'h-6 w-11',
        thumb: 'size-5 data-[state=checked]:translate-x-5.5'
      },
      '2xl': {
        control: 'h-7 w-13',
        thumb: 'size-6 data-[state=checked]:translate-x-6.5'
      }
    },
    shape: {
      rounded: {
        control: 'rounded-full',
        thumb: 'rounded-full'
      },
      square: {
        control: 'rounded-md',
        thumb: 'rounded-sm'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    shape: 'rounded'
  }
});

type SwitchVariants = VariantProps<typeof switchVariants>;

export type SwitchShape = NonNullable<SwitchVariants['shape']>;
