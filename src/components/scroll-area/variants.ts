// @unocss-include
import { tv } from 'tailwind-variants';

export const scrollAreaVariants = tv({
  slots: {
    root: 'relative overflow-hidden',
    viewport:
      'size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:outline-1 focus-visible:ring-3 focus-visible:ring-ring/50',
    scrollbar: [
      'absolute flex touch-none select-none p-px transition-opacity duration-200 ease-out',
      'data-[state=hidden]:pointer-events-none data-[state=hidden]:opacity-0',
      'data-[orientation=vertical]:inset-y-0 data-[orientation=vertical]:right-0 data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-l data-[orientation=vertical]:border-l-transparent',
      'rtl:data-[orientation=vertical]:right-auto rtl:data-[orientation=vertical]:left-0',
      'data-[orientation=horizontal]:inset-x-0 data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent'
    ],
    thumb: 'relative flex-1 rounded-full bg-border',
    corner: 'absolute bottom-0 right-0 bg-border/50 rtl:right-auto rtl:left-0'
  }
});
