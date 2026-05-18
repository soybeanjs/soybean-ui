// @unocss-include
import { scv } from '@soybeanjs/cva';

export const splitterVariants = scv({
  slots: {
    root: 'flex h-full w-full data-[orientation=vertical]:flex-col',
    panel: 'min-h-0 min-w-0',
    resizeHandle: [
      'bg-border focus-visible:ring-ring relative flex w-px cursor-col-resize items-center justify-center transition-colors duration-200 after:absolute after:inset-y-0',
      'after:start-1/2 after:-translate-x-1/2 outline-none focus-visible:ring-1 focus-visible:ring-offset-1',
      'data-[state=hover]:bg-accent data-[state=drag]:bg-accent',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60',
      'data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full',
      'data-[orientation=vertical]:cursor-row-resize',
      'data-[orientation=vertical]:after:start-0 data-[orientation=vertical]:after:w-full',
      'data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0'
    ]
  },
  variants: {
    size: {
      xs: {
        resizeHandle: 'after:w-0.5 data-[orientation=vertical]:after:h-0.5'
      },
      sm: {
        resizeHandle: 'after:w-0.75 data-[orientation=vertical]:after:h-0.75'
      },
      md: {
        resizeHandle: 'after:w-1 data-[orientation=vertical]:after:h-1'
      },
      lg: {
        resizeHandle: 'after:w-1.25 data-[orientation=vertical]:after:h-1.25'
      },
      xl: {
        resizeHandle: 'after:w-1.5 data-[orientation=vertical]:after:h-1.5'
      },
      '2xl': {
        resizeHandle: 'after:w-2 data-[orientation=vertical]:after:h-2'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
