// @unocss-include
import { tv } from 'tailwind-variants';

export const popconfirmVariants = tv({
  slots: {
    positioner: 'w-max',
    popup: [
      `flex flex-col w-auto rounded-md border bg-popover text-popover-foreground shadow-md outline-none z-50 will-change-transform`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    arrow: 'w-1em h-0.5em fill-popover stroke-border',
    header: `flex flex-col text-center sm:text-left`,
    title: `flex items-center font-semibold leading-none tracking-tight m-0`,
    description: `text-muted-foreground m-0`,
    content: '',
    footer: `flex flex-col-reverse sm:flex-row sm:justify-end`
  },
  variants: {
    size: {
      xs: {
        popup: 'gap-y-2 p-2 text-2xs',
        arrow: 'text-3xs',
        header: 'gap-y-1.5',
        title: 'gap-x-1.5',
        footer: 'gap-1.5'
      },
      sm: {
        popup: 'gap-y-2.5 p-2.5 text-xs',
        arrow: 'text-2xs',
        header: 'gap-y-1.75',
        title: 'gap-x-1.75',
        footer: 'gap-1.75'
      },
      md: {
        popup: 'gap-y-3 p-3 text-sm',
        arrow: 'text-xs',
        header: 'gap-y-2',
        title: 'gap-x-2',
        footer: 'gap-2'
      },
      lg: {
        popup: 'gap-y-3.5 p-3.5 text-base',
        arrow: 'text-sm',
        header: 'gap-y-2.5',
        title: 'gap-x-2.5',
        footer: 'gap-2.5'
      },
      xl: {
        popup: 'gap-y-4 p-4 text-lg',
        arrow: 'text-base',
        header: 'gap-y-3',
        title: 'gap-x-3',
        footer: 'gap-3'
      },
      '2xl': {
        popup: 'gap-y-4.5 p-4.5 text-xl',
        arrow: 'text-lg',
        header: 'gap-y-3.5',
        title: 'gap-x-3.5',
        footer: 'gap-3.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
