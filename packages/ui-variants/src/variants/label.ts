// @unocss-include
import { tv } from 'tailwind-variants';

export const labelVariants = tv({
  base: 'font-medium leading-none peer-disabled:(cursor-not-allowed opacity-70)',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-base',
      '2xl': 'text-lg'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
