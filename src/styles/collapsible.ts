// @unocss-include
import { scv } from '@soybeanjs/cva';

export const collapsibleVariants = scv({
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
