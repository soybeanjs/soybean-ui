// @unocss-include
import { tv } from 'tailwind-variants';

export const carouselVariants = tv({
  slots: {
    root: 'relative',
    contentWrapper: 'overflow-hidden',
    content: 'flex',
    item: 'min-w-0 shrink-0 grow-0 basis-full',
    next: 'touch-manipulation absolute',
    previous: 'touch-manipulation absolute'
  },
  variants: {
    orientation: {
      horizontal: {
        content: '-ml-4',
        item: 'pl-4',
        next: '-right-12 top-1/2 -translate-y-1/2',
        previous: '-left-12 top-1/2 -translate-y-1/2'
      },
      vertical: {
        content: 'flex-col -mt-4',
        item: 'pt-4',
        next: '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        previous: '-top-12 left-1/2 -translate-x-1/2 rotate-90'
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});

export type CarouselSlots = keyof typeof carouselVariants.slots;
