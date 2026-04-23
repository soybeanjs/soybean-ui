// @unocss-include
import { tv } from 'tailwind-variants';

export const carouselVariants = tv({
  slots: {
    root: 'relative',
    content: 'overflow-hidden',
    container: 'flex -ml-4 rtl:ml-0 rtl:-mr-4',
    item: 'min-w-0 shrink-0 grow-0 basis-full pl-4 rtl:pl-0 rtl:pr-4',
    previous: [
      'absolute z-1 size-8 inline-flex items-center justify-center rounded-full border bg-background shadow-sm transition-colors',
      'outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'top-1/2 -left-12 -translate-y-1/2 rtl:left-auto rtl:-right-12'
    ],
    next: [
      'absolute z-1 size-8 inline-flex items-center justify-center rounded-full border bg-background shadow-sm transition-colors',
      'outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'top-1/2 -right-12 -translate-y-1/2 rtl:right-auto rtl:-left-12'
    ]
  },
  variants: {
    orientation: {
      horizontal: {},
      vertical: {
        container: '-mt-4 h-full flex-col ml-0 rtl:mr-0 rtl:ml-0',
        item: 'pt-4 pl-0 rtl:pr-0 rtl:pl-0',
        previous: '-top-12 left-1/2 right-auto -translate-x-1/2 translate-y-0 rtl:left-1/2 rtl:right-auto',
        next: 'top-auto -bottom-12 left-1/2 right-auto -translate-x-1/2 translate-y-0 rtl:left-1/2 rtl:right-auto'
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});
