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
      `fixed left-[50%] top-[50%] z-50 w-full max-w-lg gap-4 border bg-background px-5 py-4 shadow-lg translate-x-[-50%] translate-y-[-50%] md:w-full duration-200 sm:rounded-lg`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%])`,
      `data-[state=closed]:(animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%])`
    ],
    header: `flex flex-col gap-y-1.5 text-center sm:text-left`,
    title: `text-lg font-semibold leading-none tracking-tight`,
    description: `text-sm text-muted-foreground`,
    close: `absolute right-2 top-2`,
    footer: `flex flex-col-reverse sm:flex-row sm:justify-end gap-2`
  }
});

export type DialogSlots = keyof typeof dialogVariants.slots;
