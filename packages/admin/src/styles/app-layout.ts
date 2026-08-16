// @unocss-include
import { scv } from '@soybeanjs/cva';

export const appLayoutVariants = scv({
  slots: {
    root: 'relative h-full w-full overflow-hidden'
  },
  variants: {
    size: {
      xs: { root: 'text-2xs' },
      sm: { root: 'text-xs' },
      md: { root: 'text-sm' },
      lg: { root: 'text-base' },
      xl: { root: 'text-lg' },
      '2xl': { root: 'text-xl' }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
