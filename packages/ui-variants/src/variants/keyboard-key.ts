// @unocss-include
import { tv } from 'tailwind-variants';

export const keyboardKeyVariants = tv({
  base: 'font-medium leading-none border border-border bg-muted rounded-sm inline-flex',
  variants: {
    size: {
      xs: 'text-xs px-1 py-0.5',
      sm: 'text-sm px-1.5 py-0.5',
      md: 'text-sm px-2 py-1',
      lg: 'text-base px-2.5 py-1.5',
      xl: 'text-xl px-3 py-2',
      xxl: 'text-2xl px-3.5 py-2.5'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
