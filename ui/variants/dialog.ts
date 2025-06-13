// @unocss-include
import { tv } from 'tailwind-variants';

export const dialogVariants = tv({
  slots: {
    overlay: [
      `fixed inset-0 z-50 bg-black/80`,
      `data-[state=open]:(animate-in fade-in-0)`,
      `data-[state=closed]:(animate-out fade-out-0)`
    ],
    content: [
      `fixed left-[50%] top-[50%] z-50 flex flex-col w-full border bg-background shadow-lg outline-none translate-x-[-50%] translate-y-[-50%] md:w-full duration-200 sm:rounded-lg`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%])`,
      `data-[state=closed]:(animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%])`
    ],
    header: `flex flex-col text-center sm:text-left`,
    title: `flex items-center font-semibold leading-none tracking-tight`,
    description: `text-muted-foreground`,
    closeIcon: `absolute`,
    footer: `flex flex-col-reverse sm:flex-row sm:justify-end`
  },
  variants: {
    size: {
      xs: {
        content: `gap-y-1.5 max-w-md px-2 py-1.5 text-2xs`,
        header: 'gap-y-1.5',
        title: 'gap-x-1.5 text-xs',
        description: 'text-2xs',
        closeIcon: 'right-1.5 top-1.5',
        footer: 'gap-1.5'
      },
      sm: {
        content: `gap-y-2 max-w-md px-3 py-2 text-xs`,
        header: 'gap-y-2',
        title: 'gap-x-1.75 text-sm',
        description: 'text-xs',
        closeIcon: 'right-1.75 top-1.75',
        footer: 'gap-2'
      },
      md: {
        content: `gap-y-3 max-w-lg px-4 py-3 text-sm`,
        header: 'gap-y-3',
        title: 'gap-x-2 text-base',
        description: 'text-sm',
        closeIcon: 'right-2 top-2',
        footer: 'gap-3'
      },
      lg: {
        content: `gap-y-4 max-w-xl px-5 py-4 text-base`,
        header: 'gap-y-4',
        title: 'gap-x-2.5 text-lg',
        description: 'text-base',
        closeIcon: 'right-2.5 top-2.5',
        footer: 'gap-4'
      },
      xl: {
        content: `gap-y-5 max-w-2xl px-6 py-5 text-lg`,
        header: 'gap-y-5',
        title: 'gap-x-3 text-xl',
        description: 'text-lg',
        closeIcon: 'right-3 top-3',
        footer: 'gap-5'
      },
      '2xl': {
        content: `gap-y-6 max-w-3xl px-7 py-6 text-xl`,
        header: 'gap-y-6',
        title: 'gap-x-3.5 text-2xl',
        description: 'text-xl',
        closeIcon: 'right-4 top-4',
        footer: 'gap-6'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type DialogSlots = keyof typeof dialogVariants.slots;
