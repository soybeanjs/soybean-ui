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
        root: 'gap-1 p-0.5 text-2xs',
        trigger: 'gap-1 px-1 py-1',
        triggerLink: 'gap-1 px-1 py-1'
      },
      sm: {
        root: 'gap-1.25 p-0.625 text-xs',
        trigger: 'gap-1.5 px-1.5 py-1',
        triggerLink: 'gap-1.5 px-1.5 py-1'
      },
      md: {
        root: 'gap-1.5 p-0.75',
        trigger: 'gap-2 px-2 py-1.5',
        triggerLink: 'gap-2 px-2 py-1.5'
      },
      lg: {
        root: 'gap-1.75 p-0.875',
        trigger: 'gap-2.5 px-2.5 py-1.5',
        triggerLink: 'gap-2.5 px-2.5 py-1.5'
      },
      xl: {
        root: 'gap-2 p-1',
        trigger: 'gap-3 px-3 py-2',
        triggerLink: 'gap-3 px-3 py-2'
      },
      '2xl': {
        root: 'gap-2.5 p-1.25',
        trigger: 'gap-3.5 px-3.5 py-2.5',
        triggerLink: 'gap-3.5 px-3.5 py-2.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type MenubarSlots = keyof typeof menubarVariants.slots;
