// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const progressVariants = tv({
  slots: {
    root: 'relative w-full overflow-hidden rounded-full bg-primary/20',
    indicator: 'h-full w-full flex-1 transition-all'
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
      secondary: {
        indicator: 'bg-secondary'
      },
      accent: {
        indicator: 'bg-accent'
      }
    },
    size: {
      xs: {
        root: 'h-1'
      },
      sm: {
        root: 'h-2'
      },
      md: {
        root: 'h-3'
      },
      lg: {
        root: 'h-4'
      },
      xl: {
        root: 'h-5'
      },
      xxl: {
        root: 'h-6'
      }
    }
  },
  compoundVariants: [],
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});

type ProgressVariants = VariantProps<typeof progressVariants>;

export type ProgressColor = NonNullable<ProgressVariants['color']>;

export type ProgressSize = NonNullable<ProgressVariants['size']>;
