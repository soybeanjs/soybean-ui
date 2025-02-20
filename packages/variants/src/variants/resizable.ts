// @unocss-include
import { tv } from 'tailwind-variants';

export const resizableVariants = tv({
  slots: {
    handle: [
      'relative flex w-px items-center justify-center bg-border',
      'after:(absolute inset-y-0 left-1/2 w-1 -translate-x-1/2)',
      'focus-visible:(outline-solid outline-1 outline-offset-1 outline-primary)',
      '[&[data-orientation=vertical]]:(h-px w-full) [&[data-orientation=vertical]]:after:(left-0 h-1 w-full -translate-y-1 translate-x-0) [&[data-orientation=vertical]>div]:rotate-90'
    ],
    handleIconRoot: 'z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border',
    handleIcon: 'size-2.5',
    panelGroup: 'flex h-full w-full data-[panel-group-direction=vertical]:flex-col'
  }
});

export type ResizableSlots = keyof typeof resizableVariants.slots;
