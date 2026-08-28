// @unocss-include
import { scv } from '@soybeanjs/cva';
import { overlayLayer, overlayMotion, overlaySurface } from './_overlay';
import { dateFieldVariants } from './date-field';

export const datePickerVariants = scv({
  extend: [dateFieldVariants],
  slots: {
    trigger: 'ms-auto data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground',
    positioner: 'w-max',
    popup: ['w-auto', overlaySurface, overlayLayer, ...overlayMotion]
  },
  variants: {
    size: {
      xs: {
        popup: 'text-2xs'
      },
      sm: {
        popup: 'text-xs'
      },
      md: {
        popup: 'text-sm'
      },
      lg: {
        popup: 'text-base'
      },
      xl: {
        popup: 'text-lg'
      },
      '2xl': {
        popup: 'text-xl'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
