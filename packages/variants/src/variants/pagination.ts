// @unocss-include
import { tv } from 'tailwind-variants';

export const paginationVariants = tv({
  slots: {
    list: `flex items-center`,
    ellipsis: `flex justify-center items-center`,
    button: [
      `inline-flex items-center justify-center flex-shrink-0 font-medium rounded-md`,
      `hover:(bg-accent text-accent-foreground)`,
      `focus-visible:(outline outline-2 outline-offset-2 outline-primary)`,
      `disabled:(pointer-events-none opacity-50)`
    ]
  },
  variants: {
    size: {
      xs: {
        list: 'gap-0.75',
        ellipsis: 'size-6 text-xs',
        button: 'size-6 text-xs'
      },
      sm: {
        list: 'gap-1',
        ellipsis: 'size-6 text-sm',
        button: 'size-6 text-sm'
      },
      md: {
        list: 'gap-1.25',
        ellipsis: 'size-8 text-sm',
        button: 'size-8 text-sm'
      },
      lg: {
        list: 'gap-1.5',
        ellipsis: 'size-9 text-base',
        button: 'size-9 text-base'
      },
      xl: {
        list: 'gap-1.75',
        ellipsis: 'size-10 text-base',
        button: 'size-10 text-base'
      },
      xxl: {
        list: 'gap-2',
        ellipsis: 'size-12 text-lg',
        button: 'size-12 text-lg'
      }
    },
    variant: {
      plain: {
        button: [
          'border border-border bg-background text-foreground',
          `data-[selected=true]:(border-transparent bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground active:bg-primary-600)`
        ]
      },
      ghost: {
        button: `data-[selected=true]:(border border-primary text-primary hover:bg-transparent hover:text-primary)`
      }
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'plain'
  }
});

export type PaginationSlots = keyof typeof paginationVariants.slots;
