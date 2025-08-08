// @unocss-include
import { tv } from 'tailwind-variants';

export const collapsibleVariants = tv({
  slots: {
    root: '',
    trigger: '',
    content: [
      'overflow-hidden transition will-change-auto',
      'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'
    ]
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs'
      },
      sm: {
        root: 'text-xs'
      },
      md: {
        root: 'text-sm'
      },
      lg: {
        root: 'text-base'
      },
      xl: {
        root: 'text-lg'
      },
      '2xl': {
        root: 'text-xl'
      }
    }
  }
});
