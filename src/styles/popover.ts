// @unocss-include
import { scv } from '@soybeanjs/cva';
import { miniButtonIconVariants } from './button';

export const popoverVariants = scv({
  extendBase: props => ({
    close: miniButtonIconVariants({ size: props.size })
  }),
  slots: {
    positioner: 'w-max',
    popup: [
      `w-auto rounded-md border bg-popover text-popover-foreground shadow-md outline-none z-50 will-change-transform`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    arrow: 'w-1em h-0.5em fill-popover stroke-border',
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
