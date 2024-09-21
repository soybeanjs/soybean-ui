// @unocss-include
import { tv } from 'tailwind-variants';

export const switchVariants = tv({
  base: [],
  slots: {
    root: [
      `peer shrink-0 inline-flex items-center border-2 rounded-full border-transparent shadow-sm transition-colors`,
      `focus-visible:(outline outline-2 outline-offset-2) disabled:(cursor-not-allowed opacity-50) data-[state=unchecked]:bg-input`
    ],
    thumb: `block rounded-full shadow-lg transition-transform bg-background pointer-events-none data-[state=unchecked]:translate-x-0`
  },
  variants: {
    color: {
      primary: {
        root: `data-[state=checked]:bg-primary focus-visible:outline-primary`
      },
      destructive: {
        root: `data-[state=checked]:bg-destructive focus-visible:outline-destructive`
      },
      success: {
        root: `data-[state=checked]:bg-success focus-visible:outline-success`
      },
      warning: {
        root: `data-[state=checked]:bg-warning focus-visible:outline-warning`
      },
      info: {
        root: `data-[state=checked]:bg-info focus-visible:outline-info`
      },
      secondary: {
        root: `data-[state=checked]:bg-secondary-foreground focus-visible:outline-secondary-foreground/20`
      },
      accent: {
        root: `data-[state=checked]:bg-accent-foreground focus-visible:outline-accent-foreground/20`
      }
    },
    size: {
      xs: {
        root: 'h-4 w-7',
        thumb: 'size-3 data-[state=checked]:translate-x-3 text-xs'
      },
      sm: {
        root: 'h-4.5 w-8',
        thumb: 'size-3.5 data-[state=checked]:translate-x-3.5 text-xs'
      },
      md: {
        root: 'h-5 w-9',
        thumb: 'size-4 data-[state=checked]:translate-x-4 text-sm'
      },
      lg: {
        root: 'h-5.5 w-10',
        thumb: 'size-4.5 data-[state=checked]:translate-x-4.5 text-sm'
      },
      xl: {
        root: 'h-6 w-11',
        thumb: 'size-5 data-[state=checked]:translate-x-5 text-base'
      },
      xxl: {
        root: 'h-7 w-13',
        thumb: 'size-6 data-[state=checked]:translate-x-6 text-base'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});
