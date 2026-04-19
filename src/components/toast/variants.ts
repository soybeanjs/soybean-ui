// @unocss-include
import { tv } from 'tailwind-variants';

export const toastVariants = tv({
  slots: {
    toaster: [
      'fixed z-[--z-index] list-none outline-none transition-transform-400 ease',
      'data-[x-position=right]:end-[--offset-right] data-[x-position=left]:start-[--offset-left] data-[x-position=center]:left-1/2 data-[x-position=center]:-translate-x-1/2',
      'data-[y-position=top]:top-[--offset-top] data-[y-position=bottom]:bottom-[--offset-bottom]'
    ],
    toast: [
      'group absolute w-full rounded-md bg-popover text-popover-foreground border border-transparent opacity-0 outline-none touch-none',
      'data-[y-position=top]:top-0 data-[y-position=top]:[--y:translateY(-100%)]',
      'data-[y-position=bottom]:[--lift:-1] data-[y-position=bottom]:bottom-0',
      'data-[x-position=left]:start-0 data-[x-position=right]:end-0'
    ],
    wrapper: 'flex flex-col items-stretch',
    content: '',
    title: 'flex items-center font-semibold',
    description: 'text-muted-foreground',
    icon: [
      'group-data-[type=info]:text-info group-data-[type=success]:text-success group-data-[type=warning]:text-warning group-data-[type=error]:text-destructive'
    ],
    footer: 'flex justify-end items-center',
    action: '',
    cancel: '',
    close: 'absolute group-data-[inverted=true]:text-accent group-data-[inverted=true]:hover:bg-accent/15'
  },
  variants: {
    size: {
      xs: {
        toaster: 'w-80 text-2xs',
        toast: 'p-3',
        wrapper: 'gap-1',
        title: 'gap-1.25',
        footer: 'gap-1.25',
        close: 'top-1 end-1'
      },
      sm: {
        toaster: 'w-85 text-xs',
        toast: 'p-3.5',
        wrapper: 'gap-1.25',
        title: 'gap-1.5',
        footer: 'gap-1.5',
        close: 'top-1.25 end-1.25'
      },
      md: {
        toaster: 'w-90 text-sm',
        toast: 'p-4',
        wrapper: 'gap-1.5',
        title: 'gap-2',
        footer: 'gap-2',
        close: 'top-1.5 end-1.5'
      },
      lg: {
        toaster: 'w-95 text-base',
        toast: 'p-4.5',
        wrapper: 'gap-1.75',
        title: 'gap-2.5',
        footer: 'gap-2.5',
        close: 'top-1.75 end-1.75'
      },
      xl: {
        toaster: 'w-100 text-lg',
        toast: 'p-5',
        wrapper: 'gap-2',
        title: 'gap-3',
        footer: 'gap-3',
        close: 'top-2 end-2'
      },
      '2xl': {
        toaster: 'w-110 text-xl',
        toast: 'p-6',
        wrapper: 'gap-2.5',
        title: 'gap-4',
        footer: 'gap-4',
        close: 'top-2.5 end-2.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
