// @unocss-include
import { tv } from 'tailwind-variants';

export const scrollAreaVariants = tv({
  slots: {
    root: 'relative overflow-hidden',
    viewport: 'size-full rounded-inherit',
    scrollbar: 'flex touch-none select-none transition-colors-200',
    thumb: 'relative flex-1 rounded-full bg-border'
  },
  variants: {
    orientation: {
      horizontal: {
        scrollbar: 'flex-col h-2.5 p-px border-t border-t-transparent'
      },
      vertical: {
        scrollbar: 'w-2.5 h-full p-px border-l border-l-transparent'
      }
    }
  },
  defaultVariants: {
    orientation: 'vertical'
  }
});

export type ScrollAreaSlots = keyof typeof scrollAreaVariants.slots;
