// @unocss-include
import { tv } from 'tailwind-variants';

export const dialogVariants = tv({
  slots: {
    overlay: [
      `fixed inset-0 z-50 bg-black/80`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0`
    ],
    popup: [
      `group fixed start-1/2 top-1/2 z-50 flex flex-col w-max lt-sm:min-w-full lt-sm:max-w-full border bg-background shadow-lg outline-none translate-x-[-50%] translate-y-[-50%] duration-200 rounded-lg`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2`
    ],
    header: `flex flex-col text-center sm:text-start`,
    title: `flex items-center font-semibold leading-none tracking-tight m-0`,
    icon: 'group-data-[type=info]:text-info group-data-[type=success]:text-success group-data-[type=warning]:text-warning group-data-[type=error]:text-destructive',
    description: `text-muted-foreground m-0`,
    close: `absolute`,
    content: `grow overflow-auto`,
    footer: `flex flex-col-reverse sm:flex-row sm:justify-end`,
    cancel: '',
    confirm: ''
  },
  variants: {
    size: {
      xs: {
        popup: `gap-y-1.5 min-w-xs max-w-3xl px-2 py-1.5 text-2xs`,
        header: 'gap-y-1.5',
        title: 'gap-x-1.5 text-xs',
        description: 'text-2xs',
        close: 'end-1.5 top-1.5',
        footer: 'gap-1.5'
      },
      sm: {
        popup: `gap-y-2 min-w-sm max-w-4xl px-3 py-2 text-xs`,
        header: 'gap-y-2',
        title: 'gap-x-1.75 text-sm',
        description: 'text-xs',
        close: 'end-1.75 top-1.75',
        footer: 'gap-2'
      },
      md: {
        popup: `gap-y-3 min-w-md max-w-5xl px-4 py-3 text-sm`,
        header: 'gap-y-3',
        title: 'gap-x-2 text-base',
        description: 'text-sm',
        close: 'end-2 top-2',
        footer: 'gap-3'
      },
      lg: {
        popup: `gap-y-4 min-w-lg max-w-6xl px-5 py-4 text-base`,
        header: 'gap-y-4',
        title: 'gap-x-2.5 text-lg',
        description: 'text-base',
        close: 'end-2.5 top-2.5',
        footer: 'gap-4'
      },
      xl: {
        popup: `gap-y-5 min-w-xl max-w-7xl px-6 py-5 text-lg`,
        header: 'gap-y-5',
        title: 'gap-x-3 text-xl',
        description: 'text-lg',
        close: 'end-3 top-3',
        footer: 'gap-5'
      },
      '2xl': {
        popup: `gap-y-6 min-w-2xl max-w-7xl px-7 py-6 text-xl`,
        header: 'gap-y-6',
        title: 'gap-x-3.5 text-2xl',
        description: 'text-xl',
        close: 'end-4 top-4',
        footer: 'gap-6'
      }
    },
    pure: {
      true: {
        popup: 'p-0 gap-0 border-none'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
