// @unocss-include
import { tv } from 'tailwind-variants';

export const labelVariants = tv({
  base: 'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
  variants: {
    size: {
      xs: 'text-2xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
      '2xl': 'text-xl'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
