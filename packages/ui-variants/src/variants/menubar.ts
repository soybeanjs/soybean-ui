// @unocss-include
import { tv } from 'tailwind-variants';

export const menubarVariants = tv({
  slots: {
    root: `flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm`,
    trigger: [
      `flex cursor-default select-none items-center gap-3 rounded-sm px-3 py-1 text-sm font-medium outline-none`,
      `focus:(bg-accent text-accent-foreground)`,
      `data-[state=open]:(bg-accent text-accent-foreground)`
    ],
    triggerLink: [
      `flex cursor-pointer select-none items-center gap-3 rounded-sm px-3 py-1 text-sm font-medium outline-none`,
      `focus:(bg-accent text-accent-foreground)`,
      `data-[state=open]:(bg-accent text-accent-foreground)`
    ]
  }
});

export type MenubarSlots = keyof typeof menubarVariants.slots;
