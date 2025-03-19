// @unocss-include
import { tv } from 'tailwind-variants';
import { dialogVariants } from './dialog';

export const drawerVariants = tv({
  slots: {
    ...dialogVariants.slots,
    content: `fixed inset-x-0 bottom-0 z-50 mt-24 rounded-t-[10px] border bg-background`,
    contentBody: `flex h-auto flex-col px-5 py-4`,
    knob: `mx-auto shrink-0 cursor-grab active:cursor-grabbing mt-4 h-2 w-[100px] rounded-full bg-muted`,
    footer: `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end`
  }
});

export type DrawerSlots = keyof typeof drawerVariants.slots;
