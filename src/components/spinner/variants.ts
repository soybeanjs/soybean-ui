// @unocss-include
import { tv } from 'tailwind-variants';

export const spinnerVariants = tv({
  variants: {
    color: {
      current: 'text-current',
      primary: 'text-primary',
      destructive: 'text-destructive',
      success: 'text-success',
      warning: 'text-warning',
      info: 'text-info',
      carbon: 'text-carbon',
      secondary: 'text-secondary-foreground',
      accent: 'text-accent-foreground'
    },
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-8',
      '2xl': 'size-10'
    }
  },
  defaultVariants: {
    color: 'current',
    size: 'md'
  }
});
