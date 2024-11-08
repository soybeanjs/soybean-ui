// @unocss-include
import { tv } from 'tailwind-variants';

export const breadcrumbVariants = tv({
  slots: {
    root: '',
    list: 'flex flex-wrap items-center gap-1.5 break-words text-muted-foreground',
    item: 'inline-flex items-center gap-1.5',
    page: 'font-normal text-foreground',
    separator: 'text-muted-foreground flex-shrink-0',
    ellipsis: 'flex items-center justify-center',
    link: 'hover:text-foreground transition-colors'
  },
  variants: {
    size: {
      xs: {
        root: 'text-xs'
      },
      sm: {
        root: 'text-sm'
      },
      md: {
        root: 'text-sm'
      },
      lg: {
        root: 'text-base'
      },
      xl: {
        root: 'text-base'
      },
      xxl: {
        root: 'text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
