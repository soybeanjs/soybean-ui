// @unocss-include
import { tv } from 'tailwind-variants';

export const progressVariants = tv({
  slots: {
    root: 'relative w-full overflow-hidden rounded-full',
    indicator: 'flex-1 size-full transition-all-200'
  },
  variants: {
    color: {
      primary: {
        root: 'bg-primary/20',
        indicator: 'bg-primary'
      },
      destructive: {
        root: 'bg-destructive/20',
        indicator: 'bg-destructive'
      },
      success: {
        root: 'bg-success/20',
        indicator: 'bg-success'
      },
      warning: {
        root: 'bg-warning/20',
        indicator: 'bg-warning'
      },
      info: {
        root: 'bg-info/20',
        indicator: 'bg-info'
      },
      carbon: {
        root: 'bg-carbon/20',
        indicator: 'bg-carbon'
      },
      secondary: {
        root: 'bg-secondary-foreground/20',
        indicator: 'bg-secondary-foreground'
      },
      accent: {
        root: 'bg-accent-foreground/20',
        indicator: 'bg-accent-foreground'
      }
    },
    size: {
      xs: {
        root: 'h-1.75'
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

export type ProgressSlots = keyof typeof progressVariants.slots;
