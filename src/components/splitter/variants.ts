// @unocss-include
import { tv } from 'tailwind-variants';

export const splitterVariants = tv({
  slots: {
    root: 'flex h-full w-full data-[orientation=vertical]:flex-col',
    panel: 'min-h-0 min-w-0',
    resizeHandle: [
      'bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0',
      'after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60',
      'data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full',
      'data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full',
      'data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0'
    ]
  }
});
