// @unocss-include
import { tv } from 'tailwind-variants';

export const switchVariants = tv({
  base: [],
  slots: {
    root: [
      `peer shrink-0 inline-flex items-center rounded-full border-0 shadow-sm transition-colors-200`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background) disabled:(cursor-not-allowed opacity-50) data-[state=unchecked]:bg-input`
    ],
    thumb: `flex justify-center items-center rounded-full shadow-lg transition-transform-200 bg-background pointer-events-none data-[state=unchecked]:translate-x-0.5`
  },
  variants: {
    color: {
      primary: {
        root: `data-[state=checked]:bg-primary focus-visible:ring-primary`
      },
      destructive: {
        root: `data-[state=checked]:bg-destructive focus-visible:ring-destructive`
      },
      success: {
        root: `data-[state=checked]:bg-success focus-visible:ring-success`
      },
      warning: {
        root: `data-[state=checked]:bg-warning focus-visible:ring-warning`
      },
      info: {
        root: `data-[state=checked]:bg-info focus-visible:ring-info`
      },
      carbon: {
        root: `data-[state=checked]:bg-carbon focus-visible:ring-carbon`
      },
      secondary: {
        root: `data-[state=checked]:bg-secondary-foreground/20 focus-visible:ring-secondary-foreground/20`
      },
      accent: {
        root: `data-[state=checked]:bg-accent-foreground/20 focus-visible:ring-accent-foreground/20`
      }
    },
    size: {
      xs: {
        root: 'h-4 w-7',
        thumb: 'size-3 data-[state=checked]:translate-x-3.5'
      },
      sm: {
        root: 'h-4.5 w-8',
        thumb: 'size-3.5 data-[state=checked]:translate-x-4'
      },
      md: {
        root: 'h-5 w-9',
        thumb: 'size-4 data-[state=checked]:translate-x-4.5'
      },
      lg: {
        root: 'h-5.5 w-10',
        thumb: 'size-4.5 data-[state=checked]:translate-x-5'
      },
      xl: {
        root: 'h-6 w-11',
        thumb: 'size-5 data-[state=checked]:translate-x-5.5'
      },
      '2xl': {
        root: 'h-7 w-13',
        thumb: 'size-6 data-[state=checked]:translate-x-6.5'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});

export type SwitchSlots = keyof typeof switchVariants.slots;
