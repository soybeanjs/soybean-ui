// @unocss-include
import { tv } from 'tailwind-variants';

export const breadcrumbVariants = tv({
  slots: {
    root: '',
    list: 'flex flex-wrap items-center my-0 break-words text-muted-foreground',
    item: 'inline-flex items-center list-none',
    page: 'font-normal text-foreground',
    separator: 'text-muted-foreground flex-shrink-0 list-none',
    ellipsis: 'flex items-center justify-center',
    link: 'hover:text-foreground transition-colors-200 rounded-sm focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        list: 'gap-2',
        item: 'gap-1.5'
      },
      sm: {
        root: 'text-xs',
        list: 'gap-2.5',
        item: 'gap-1.75'
      },
      md: {
        root: 'text-sm',
        list: 'gap-3',
        item: 'gap-2'
      },
      lg: {
        root: 'text-base',
        list: 'gap-3.5',
        item: 'gap-2.5'
      },
      xl: {
        root: 'text-lg',
        list: 'gap-4',
        item: 'gap-3'
      },
      '2xl': {
        root: 'text-xl',
        list: 'gap-4.5',
        item: 'gap-3.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
