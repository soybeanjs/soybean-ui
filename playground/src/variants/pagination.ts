// @unocss-include
import { tv } from 'tailwind-variants';

export const paginationVariants = tv({
  slots: {
    root: '',
    list: `flex items-center`,
    ellipsis: `flex justify-center items-center`,
    button: [
      `inline-flex items-center justify-center flex-shrink-0 font-medium rounded-md`,
      `hover:(bg-accent text-accent-foreground)`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`,
      `disabled:(pointer-events-none opacity-50)`
    ]
  },
  variants: {
    size: {
      xs: {
        list: 'gap-0.75 text-2xs',
        ellipsis: 'size-6',
        button: 'size-6'
      },
      sm: {
        list: 'gap-1 text-xs',
        ellipsis: 'size-7',
        button: 'size-7'
      },
      md: {
        list: 'gap-1.25 text-sm',
        ellipsis: 'size-8',
        button: 'size-8'
      },
      lg: {
        list: 'gap-1.5 text-base',
        ellipsis: 'size-9',
        button: 'size-9'
      },
      xl: {
        list: 'gap-1.75 text-lg',
        ellipsis: 'size-10',
        button: 'size-10'
      },
      '2xl': {
        list: 'gap-2 text-xl',
        ellipsis: 'size-12',
        button: 'size-12'
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
