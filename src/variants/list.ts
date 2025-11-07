// @unocss-include
import { tv } from 'tailwind-variants';

export const listVariants = tv({
  slots: {
    root: 'flex flex-col',
    item: 'flex list-none',
    content: 'grow flex flex-col',
    title: 'font-medium tracking-tight',
    description: '[&_p]:leading-relaxed text-muted-foreground'
  },
  variants: {
    size: {
      xs: {
        root: 'gap-2 text-2xs',
        item: 'gap-2',
        content: 'gap-0.75',
        title: 'text-xs leading-3.125'
      },
      sm: {
        root: 'gap-3 text-xs',
        item: 'gap-3',
        content: 'gap-1',
        title: 'text-sm leading-3.75'
      },
      md: {
        root: 'gap-4 text-sm',
        item: 'gap-4',
        content: 'gap-1',
        title: 'text-base leading-4.375'
      },
      lg: {
        root: 'gap-5 text-base',
        item: 'gap-5',
        content: 'gap-1.25',
        title: 'text-lg leading-5'
      },
      xl: {
        root: 'gap-6 text-lg',
        item: 'gap-6',
        content: 'gap-1.5',
        title: 'text-xl leading-5.625'
      },
      '2xl': {
        root: 'gap-7 text-xl',
        item: 'gap-7',
        content: 'gap-2',
        title: 'text-2xl leading-6.25'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
