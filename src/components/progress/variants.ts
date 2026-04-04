// @unocss-include
import { tv } from 'tailwind-variants';

export const progressVariants = tv({
  slots: {
    root: 'relative w-full overflow-hidden rounded-full bg-muted',
    indicator: `h-full w-full flex-1 rounded-full transition-[transform,width] duration-300 data-[state=indeterminate]:w-2/5 data-[state=indeterminate]:opacity-80`
  },
  variants: {
    color: {
      primary: {
        indicator: 'bg-primary'
      },
      destructive: {
        indicator: 'bg-destructive'
      },
      success: {
        indicator: 'bg-success'
      },
      warning: {
        indicator: 'bg-warning'
      },
      info: {
        indicator: 'bg-info'
      },
      carbon: {
        indicator: 'bg-carbon'
      },
      secondary: {
        indicator: 'bg-secondary-foreground/20'
      },
      accent: {
        indicator: 'bg-accent-foreground/20'
      }
    },
    size: {
      xs: {
        root: 'h-1.5'
      },
      sm: {
        root: 'h-2'
      },
      md: {
        root: 'h-2.5'
      },
      lg: {
        root: 'h-3'
      },
      xl: {
        root: 'h-3.5'
      },
      '2xl': {
        root: 'h-4'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});
