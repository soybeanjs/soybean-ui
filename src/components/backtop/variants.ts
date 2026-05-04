// @unocss-include
import { tv } from 'tailwind-variants';

export const backtopVariants = tv({
  base: 'fixed z-50',
  variants: {
    size: {
      xs: 'bottom-4 end-4',
      sm: 'bottom-5 end-5',
      md: 'bottom-6 end-6',
      lg: 'bottom-7 end-7',
      xl: 'bottom-8 end-8',
      '2xl': 'bottom-10 end-10'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
