// @unocss-include
import { tv } from 'tailwind-variants';

export const resizableVariants = tv({
  slots: {
    panelGroup: 'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
    handle: [
      'relative flex w-px items-center justify-center bg-border',
      'after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2',
      'focus-visible:outline-none focus-visible:ring-3  focus-visible:ring-offset-background focus-visible:ring-primary/30',
      '[&[data-orientation=vertical]]:h-px [&[data-orientation=vertical]]:w-full [&[data-orientation=vertical]]:after:left-0 [&[data-orientation=vertical]]:after:h-1 [&[data-orientation=vertical]]:after:w-full [&[data-orientation=vertical]]:after:-translate-y-1 [&[data-orientation=vertical]]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90'
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
