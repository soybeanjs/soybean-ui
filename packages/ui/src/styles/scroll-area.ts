// @unocss-include
import { scv } from '@soybeanjs/cva';

export const scrollAreaVariants = scv({
  slots: {
    root: 'relative overflow-hidden',
    viewport:
      'size-full rounded-[inherit] outline-none focus-visible:outline-1 focus-visible:ring-3 focus-visible:ring-ring/50',
    scrollbar: [
      'absolute flex touch-none select-none p-px transition-opacity duration-200 ease-out',
      'data-[state=hidden]:pointer-events-none data-[state=hidden]:opacity-0',
      'data-[orientation=vertical]:inset-y-0 data-[orientation=vertical]:end-0 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent',
      'rtl:data-[orientation=vertical]:end-auto rtl:data-[orientation=vertical]:start-0',
      'data-[orientation=horizontal]:inset-x-0 data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent'
    ],
    thumb: 'relative flex-1 rounded-full bg-border',
    corner: 'absolute bottom-0 end-0 bg-border/50 rtl:end-auto rtl:start-0'
  },
  variants: {
    size: {
      xs: {
        scrollbar: 'data-[orientation=vertical]:w-1.75 data-[orientation=horizontal]:h-1.75'
      },
      sm: {
        scrollbar: 'data-[orientation=vertical]:w-2 data-[orientation=horizontal]:h-2'
      },
      md: {
        scrollbar: 'data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:h-2.5'
      },
      lg: {
        scrollbar: 'data-[orientation=vertical]:w-3 data-[orientation=horizontal]:h-3'
      },
      xl: {
        scrollbar: 'data-[orientation=vertical]:w-3.5 data-[orientation=horizontal]:h-3.5'
      },
      '2xl': {
        scrollbar: 'data-[orientation=vertical]:w-4 data-[orientation=horizontal]:h-4'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
