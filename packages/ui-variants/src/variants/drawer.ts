// @unocss-include
import { tv } from 'tailwind-variants';

export const drawerVariants = tv({
  slots: {
    overlay: `fixed inset-0 z-50 bg-black/80`,
    content: `fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background`,
    knob: `mx-auto shrink-0 cursor-grab active:cursor-grabbing mt-4 h-2 w-[100px] rounded-full bg-muted`,
    card: `border-none`,
    cardFooter: `justify-end gap-3`,
    close: `absolute right-4 top-3`
  }
});
