// @unocss-include
import { scv } from '@soybeanjs/cva';
import { overlayArrow, overlayLayer, overlayLeave, overlayShadow, overlaySide, overlaySurface } from './_overlay';

export const tooltipVariants = scv({
  slots: {
    positioner: 'w-max',
    popup: [
      'w-auto',
      overlaySurface,
      overlayShadow,
      overlayLayer,
      'animate-in fade-in-0 zoom-in-95',
      overlayLeave,
      overlaySide
    ],
    arrow: overlayArrow
  },
  variants: {
    size: {
      xs: {
        popup: 'px-2 py-1 text-2xs',
        arrow: 'text-3xs'
      },
      sm: {
        popup: 'px-2.5 py-1.25 text-xs',
        arrow: 'text-2xs'
      },
      md: {
        popup: 'px-3 py-1.5 text-sm',
        arrow: 'text-xs'
      },
      lg: {
        popup: 'px-3.5 py-1.75 text-base',
        arrow: 'text-sm'
      },
      xl: {
        popup: 'px-4 py-2 text-lg',
        arrow: 'text-base'
      },
      '2xl': {
        popup: 'px-4.5 py-2.5 text-xl',
        arrow: 'text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
