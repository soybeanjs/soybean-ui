// @unocss-include
import { scv } from '@soybeanjs/cva';

export const epVariants = scv({
  slots: {
    anchor: '',
    trigger: [
      'inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5',
      'text-sm text-foreground shadow-sm outline-none transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    positioner: 'w-max max-w-[min(24rem,calc(100vw-2rem))]',
    popup: [
      'relative z-50 min-w-48 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none will-change-transform',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
    ],
    arrow: 'h-2 w-4 fill-popover stroke-border',
    subTrigger: 'w-full justify-between'
  },
  variants: {
    size: {
      sm: {
        trigger: 'px-2.5 py-1 text-xs',
        popup: 'min-w-40 p-3 text-xs'
      },
      md: {
        trigger: 'px-3 py-1.5 text-sm',
        popup: 'min-w-48 p-4 text-sm'
      },
      lg: {
        trigger: 'px-4 py-2 text-base',
        popup: 'min-w-56 p-5 text-base'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
