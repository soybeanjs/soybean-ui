// @unocss-include
import { tv } from 'tailwind-variants';

export const numberInputVariants = tv({
  slots: {
    root: 'group flex items-center w-full rounded-md border border-input bg-background focus-within:(border-input ring-2 ring-offset-2 ring-offset-background ring-primary) disabled:(cursor-not-allowed opacity-50)',
    decrement: `flex h-full shrink-0 items-center justify-center text-muted-foreground bg-transparent outline-none cursor-pointer disabled:(cursor-not-allowed opacity-20)`,
    increment: `flex h-full shrink-0 items-center justify-center text-muted-foreground bg-transparent outline-none cursor-pointer disabled:(cursor-not-allowed opacity-20)`,
    control: [
      `h-full w-full grow bg-transparent outline-none`,
      `placeholder:text-muted-foreground`,
      'disabled:(cursor-not-allowed opacity-50)'
    ],
    clearable: 'hidden group-hover:block size-1em cursor-pointer opacity-50 hover:opacity-100'
  },
  variants: {
    size: {
      xs: {
        root: 'h-6 px-1.5 text-2xs gap-1',
        decrement: 'p-0.75',
        increment: 'p-0.75'
      },
      sm: {
        root: 'h-7 px-2 text-xs gap-1.5',
        decrement: 'p-1',
        increment: 'p-1'
      },
      md: {
        root: 'h-8 px-2.5 text-sm gap-2',
        decrement: 'p-1.25',
        increment: 'p-1.25'
      },
      lg: {
        root: 'h-9 px-3 text-base gap-2.5',
        decrement: 'p-1.5',
        increment: 'p-1.5'
      },
      xl: {
        root: 'h-10 px-3.5 text-lg gap-3',
        decrement: 'p-1.75',
        increment: 'p-1.75'
      },
      '2xl': {
        root: 'h-12 px-4 text-xl gap-3.5',
        decrement: 'p-2',
        increment: 'p-2'
      }
    },
    center: {
      true: {
        decrement: '-order-1',
        control: 'text-center'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    center: false
  }
});
