// @unocss-include
import { tv } from 'tailwind-variants';

export const breadcrumbVariants = tv({
  slots: {
    root: '',
    list: 'flex flex-wrap items-center gap-1.5 break-words text-muted-foreground',
    item: 'inline-flex items-center gap-1.5 list-none',
    page: 'font-normal text-foreground',
    separator: 'text-muted-foreground flex-shrink-0 list-none',
    ellipsis: 'flex items-center justify-center',
    link: 'hover:text-foreground transition-colors rounded-sm focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)'
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

export type BreadcrumbSlots = keyof typeof breadcrumbVariants.slots;
