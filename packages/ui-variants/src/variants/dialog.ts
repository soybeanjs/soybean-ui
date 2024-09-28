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
      `fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] md:w-full duration-200`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%])`,
      `data-[state=closed]:(animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%])`
    ],
    cardFooter: `justify-end gap-3`
  }
});
