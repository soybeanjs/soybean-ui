// @unocss-include
import { tv } from 'tailwind-variants';

export const resizableVariants = tv({
  slots: {
    panelGroup: 'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
    handle: [
      'relative flex w-px items-center justify-center bg-border',
      'after:(absolute inset-y-0 left-1/2 w-1 -translate-x-1/2)',
      'focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)',
      '[&[data-orientation=vertical]]:(h-px w-full) [&[data-orientation=vertical]]:after:(left-0 h-1 w-full -translate-y-1 translate-x-0) [&[data-orientation=vertical]>div]:rotate-90'
    ],
    handleIconRoot: 'z-2 flex items-center justify-center rounded-sm border bg-border',
    handleIcon: ''
  },
  variants: {
    size: {
      xs: {
        panelGroup: 'text-2xs',
        handleIconRoot: 'w-2 h-2.625'
      },
      sm: {
        panelGroup: 'text-xs',
        handleIconRoot: 'w-2.5 h-3.25'
      },
      md: {
        panelGroup: 'text-sm',
        handleIconRoot: 'w-3 h-4'
      },
      lg: {
        panelGroup: 'text-base',
        handleIconRoot: 'w-3.5 h-4.5'
      },
      xl: {
        panelGroup: 'text-lg',
        handleIconRoot: 'w-4 h-5.25'
      },
      '2xl': {
        panelGroup: 'text-xl',
        handleIconRoot: 'w-4.5 h-6'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
