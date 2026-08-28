// @unocss-include
import { scv } from '@soybeanjs/cva';
import { overlayArrow, overlayPopup } from './_overlay';

export const hoverCardVariants = scv({
  slots: {
    positioner: 'w-max',
    popup: ['w-64', ...overlayPopup],
    arrow: overlayArrow
  },
  variants: {
    size: {
      xs: {
        popup: 'w-48 p-3 text-2xs',
        arrow: 'text-3xs'
      },
      sm: {
        popup: 'w-56 p-3.5 text-xs',
        arrow: 'text-2xs'
      },
      md: {
        popup: 'w-64 p-4 text-sm',
        arrow: 'text-xs'
      },
      lg: {
        popup: 'w-72 p-4.5 text-base',
        arrow: 'text-sm'
      },
      xl: {
        popup: 'w-80 p-5 text-lg',
        arrow: 'text-base'
      },
      '2xl': {
        popup: 'w-96 p-5.5 text-xl',
        arrow: 'text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
