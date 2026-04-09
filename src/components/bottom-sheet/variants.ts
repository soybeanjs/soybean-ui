// @unocss-include
import { tv } from 'tailwind-variants';

export const bottomSheetVariants = tv({
  slots: {
    overlay: [
      'fixed inset-0 z-50 bg-black/80',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
    ],
    content: [
      'fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col border bg-background shadow-lg outline-none rounded-t-2xl',
      'sm:left-[50%] sm:right-auto sm:w-full sm:max-w-lg sm:translate-x-[-50%]',
      'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom',
      'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom'
    ],
    header: 'flex flex-col gap-1.5 text-center sm:text-left',
    title: 'm-0 font-semibold leading-none tracking-tight',
    description: 'm-0 text-muted-foreground',
    footer: 'mt-auto flex flex-col gap-2',
    handle: 'flex justify-center pt-4 pb-2 touch-pan-y',
    handleIndicator: 'bg-muted h-1.5 w-12 shrink-0 rounded-full',
    main: 'flex-1 overflow-y-auto'
  },
  variants: {
    size: {
      xs: {
        content: 'gap-y-2 px-3 text-xs',
        header: 'pb-1',
        title: 'text-sm',
        description: 'text-xs',
        footer: 'pt-2 pb-3',
        main: 'pb-3'
      },
      sm: {
        content: 'gap-y-2.5 px-4 text-sm',
        header: 'pb-1.5',
        title: 'text-base',
        description: 'text-sm',
        footer: 'pt-2.5 pb-4',
        main: 'pb-4'
      },
      md: {
        content: 'gap-y-3 px-4 text-sm',
        header: 'pb-2',
        title: 'text-lg',
        description: 'text-sm',
        footer: 'pt-3 pb-4',
        main: 'pb-4'
      },
      lg: {
        content: 'gap-y-3.5 px-5 text-base',
        header: 'pb-2.5',
        title: 'text-xl',
        description: 'text-base',
        footer: 'pt-3.5 pb-5',
        main: 'pb-5'
      },
      xl: {
        content: 'gap-y-4 px-6 text-lg',
        header: 'pb-3',
        title: 'text-2xl',
        description: 'text-lg',
        footer: 'pt-4 pb-6',
        main: 'pb-6'
      },
      '2xl': {
        content: 'gap-y-4.5 px-7 text-xl',
        header: 'pb-3.5',
        title: 'text-3xl',
        description: 'text-xl',
        footer: 'pt-4.5 pb-7',
        main: 'pb-7'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
