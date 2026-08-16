// @unocss-include
import { scv } from '@soybeanjs/cva';

export const appLogoVariants = scv({
  slots: {
    root: 'flex flex-shrink-0 items-center gap-2 h-14 px-4',
    logo: 'flex items-center justify-center',
    title: 'truncate font-semibold text-base whitespace-nowrap'
  },
  variants: {
    inverted: {
      true: {
        title: 'text-sidebar-foreground'
      },
      false: {
        title: 'text-foreground'
      }
    }
  },
  defaultVariants: {
    inverted: false
  }
});
