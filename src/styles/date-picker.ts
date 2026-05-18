// @unocss-include
import { scv } from '@soybeanjs/cva';
import { dateFieldVariants } from './date-field';

export const datePickerVariants = scv({
  extend: [dateFieldVariants],
  slots: {
    trigger: 'ms-auto data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground',
    positioner: 'w-max',
    popup: [
      `w-auto rounded-md border bg-popover text-popover-foreground outline-none z-50 will-change-transform`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ]
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
