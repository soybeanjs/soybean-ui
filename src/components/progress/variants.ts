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

export const circleProgressVariants = tv({
  slots: {
    root: 'relative inline-flex shrink-0 items-center justify-center rounded-full',
    indicator: 'fill-none stroke-current transition-[stroke-dasharray,stroke-dashoffset] duration-300 ease-in-out'
  },
  variants: {
    color: {
      primary: {
        indicator: 'text-primary'
      },
      destructive: {
        indicator: 'text-destructive'
      },
      success: {
        indicator: 'text-success'
      },
      warning: {
        indicator: 'text-warning'
      },
      info: {
        indicator: 'text-info'
      },
      carbon: {
        indicator: 'text-carbon'
      },
      secondary: {
        indicator: 'text-secondary-foreground/40'
      },
      accent: {
        indicator: 'text-accent-foreground/40'
      }
    },
    size: {
      xs: {
        root: 'h-8 w-8 text-[10px]'
      },
      sm: {
        root: 'h-10 w-10 text-xs'
      },
      md: {
        root: 'h-12 w-12 text-sm'
      },
      lg: {
        root: 'h-16 w-16 text-base'
      },
      xl: {
        root: 'h-20 w-20 text-lg'
      },
      '2xl': {
        root: 'h-24 w-24 text-xl'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});
