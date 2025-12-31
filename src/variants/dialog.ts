// @unocss-include
import { tv } from 'tailwind-variants';

export const dialogVariants = tv({
  slots: {
    overlay: [
      `fixed inset-0 z-50 bg-black/80`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0`
    ],
    content: [
      `fixed left-[50%] top-[50%] z-50 flex flex-col w-full border bg-background shadow-lg outline-none translate-x-[-50%] translate-y-[-50%] md:w-full duration-200 sm:rounded-lg`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2`
    ],
    header: `flex flex-col text-center sm:text-left`,
    title: `flex items-center font-semibold leading-none tracking-tight m-0`,
    description: `text-muted-foreground m-0`,
    closable: `absolute`,
    footer: `flex flex-col-reverse sm:flex-row sm:justify-end`
  },
  variants: {
    size: {
      xs: {
        content: `gap-y-1.5 max-w-md px-2 py-1.5 text-2xs`,
        header: 'gap-y-1.5',
        title: 'gap-x-1.5 text-xs',
        description: 'text-2xs',
        closable: 'right-1.5 top-1.5',
        footer: 'gap-1.5'
      },
      sm: {
        content: `gap-y-2 max-w-md px-3 py-2 text-xs`,
        header: 'gap-y-2',
        title: 'gap-x-1.75 text-sm',
        description: 'text-xs',
        closable: 'right-1.75 top-1.75',
        footer: 'gap-2'
      },
      md: {
        content: `gap-y-3 max-w-lg px-4 py-3 text-sm`,
        header: 'gap-y-3',
        title: 'gap-x-2 text-base',
        description: 'text-sm',
        closable: 'right-2 top-2',
        footer: 'gap-3'
      },
      lg: {
        content: `gap-y-4 max-w-xl px-5 py-4 text-base`,
        header: 'gap-y-4',
        title: 'gap-x-2.5 text-lg',
        description: 'text-base',
        closable: 'right-2.5 top-2.5',
        footer: 'gap-4'
      },
      xl: {
        content: `gap-y-5 max-w-2xl px-6 py-5 text-lg`,
        header: 'gap-y-5',
        title: 'gap-x-3 text-xl',
        description: 'text-lg',
        closable: 'right-3 top-3',
        footer: 'gap-5'
      },
      '2xl': {
        content: `gap-y-6 max-w-3xl px-7 py-6 text-xl`,
        header: 'gap-y-6',
        title: 'gap-x-3.5 text-2xl',
        description: 'text-xl',
        closable: 'right-4 top-4',
        footer: 'gap-6'
      }
    },
    pure: {
      true: {
        content: 'p-0 gap-0 border-none'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
