// @unocss-include
import { tv } from 'tailwind-variants';

export const menubarVariants = tv({
  slots: {
    root: `flex items-center rounded-md border bg-background shadow-sm`,
    trigger: [
      `flex cursor-default select-none items-center rounded-sm font-medium outline-none`,
      `focus:(bg-accent text-accent-foreground)`,
      `data-[state=open]:(bg-accent text-accent-foreground)`
    ],
    triggerLink: [
      `flex cursor-pointer select-none items-center rounded-sm font-medium outline-none`,
      `focus:(bg-accent text-accent-foreground)`,
      `data-[state=open]:(bg-accent text-accent-foreground)`
    ]
  },
  variants: {
    size: {
      xs: {
        root: 'p-0.75 space-x-1',
        trigger: 'gap-1.5 py-0.75 px-1 text-xs',
        triggerLink: 'gap-1.5 py-0.75 px-1 text-xs'
      },
      sm: {
        root: 'p-0.75 space-x-1.25',
        trigger: 'gap-1.75 py-0.75 px-1.75 text-sm',
        triggerLink: 'gap-1.75 py-0.75 px-1.75 text-sm'
      },
      md: {
        root: 'p-0.75 space-x-1.5',
        trigger: 'gap-2 py-1 px-2 text-sm',
        triggerLink: 'gap-2 py-1 px-2 text-sm'
      },
      lg: {
        root: 'p-1 space-x-1.75',
        trigger: 'gap-2.5 py-1.5 px-2.5 text-base',
        triggerLink: 'gap-2.5 py-1.5 px-2.5 text-base'
      },
      xl: {
        root: 'p-1.5 space-x-2',
        trigger: 'gap-3 py-2 px-3 text-base',
        triggerLink: 'gap-3 py-2 px-3 text-base'
      },
      '2xl': {
        root: 'p-2 space-x-2.5',
        trigger: 'gap-3.5 py-2.5 px-3.5 text-lg',
        triggerLink: 'gap-3.5 py-2.5 px-3.5 text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type MenubarSlots = keyof typeof menubarVariants.slots;
