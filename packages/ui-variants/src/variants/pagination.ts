// @unocss-include
import { tv } from 'tailwind-variants';

export const paginationVariants = tv({
  slots: {
    list: `flex items-center`,
    ellipsis: `flex justify-center items-center`,
    button: 'border-border'
  },
  variants: {
    size: {
      xs: {
        list: 'gap-0.75',
        ellipsis: 'size-6 text-xs'
      },
      sm: {
        list: 'gap-1',
        ellipsis: 'size-6 text-sm'
      },
      md: {
        list: 'gap-1.25',
        ellipsis: 'size-8 text-sm'
      },
      lg: {
        list: 'gap-1.5',
        ellipsis: 'size-9 text-base'
      },
      xl: {
        list: 'gap-1.75',
        ellipsis: 'size-10 text-base'
      },
      xxl: {
        list: 'gap-2',
        ellipsis: 'size-12 text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
