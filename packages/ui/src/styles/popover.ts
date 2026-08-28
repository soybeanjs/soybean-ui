// @unocss-include
import { scv } from '@soybeanjs/cva';
import { overlayArrow, overlayPopup } from './_overlay';
import { miniButtonIconVariants } from './button';

export const popoverVariants = scv({
  extendBase: props => ({
    close: miniButtonIconVariants({ size: props.size })
  }),
  slots: {
    positioner: 'w-max',
    popup: ['w-auto', ...overlayPopup],
    arrow: overlayArrow,
    close: 'absolute'
  },
  variants: {
    size: {
      xs: {
        popup: 'p-3 text-2xs',
        arrow: 'text-3xs',
        close: 'top-0.5 end-0.5'
      },
      sm: {
        popup: 'p-3.5 text-xs',
        arrow: 'text-2xs',
        close: 'top-0.75 end-0.75'
      },
      md: {
        popup: 'p-4 text-sm',
        arrow: 'text-xs',
        close: 'top-1 end-1'
      },
      lg: {
        popup: 'p-4.5 text-base',
        arrow: 'text-sm',
        close: 'top-1.25 end-1.25'
      },
      xl: {
        popup: 'p-5 text-lg',
        arrow: 'text-base',
        close: 'top-1.5 end-1.5'
      },
      '2xl': {
        popup: 'p-5.5 text-xl',
        arrow: 'text-lg',
        close: 'top-2 end-2'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
