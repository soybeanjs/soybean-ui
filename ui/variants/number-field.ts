// @unocss-include
import { tv } from 'tailwind-variants';

export const numberFieldVariants = tv({
  slots: {
    root: 'flex items-center w-full rounded-md border border-input bg-background focus-within:(border-input ring-2 ring-offset-2 ring-offset-background ring-primary) disabled:(cursor-not-allowed opacity-50)',
    decrement: `flex h-full shrink-0 items-center justify-center text-muted-foreground bg-transparent outline-none disabled:(cursor-not-allowed opacity-20)`,
    increment: `flex h-full shrink-0 items-center justify-center text-muted-foreground bg-transparent outline-none disabled:(cursor-not-allowed opacity-20)`,
    input: [
      `h-full w-full grow bg-transparent`,
      `placeholder:text-muted-foreground outline-none disabled:(cursor-not-allowed opacity-50)`
    ]
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        decrement: 'p-0.75',
        increment: 'p-0.75',
        input: 'h-6 text-xs'
      },
      sm: {
        root: 'text-xs',
        decrement: 'p-1',
        increment: 'p-1',
        input: 'h-7 text-sm'
      },
      md: {
        root: 'text-sm',
        decrement: 'p-1.25',
        increment: 'p-1.25',
        input: 'h-8 text-sm'
      },
      lg: {
        root: 'text-base',
        decrement: 'p-1.5',
        increment: 'p-1.5',
        input: 'h-9 text-base'
      },
      xl: {
        root: 'text-lg',
        decrement: 'p-1.75',
        increment: 'p-1.75',
        input: 'h-10 text-base'
      },
      '2xl': {
        root: 'text-xl',
        decrement: 'p-2',
        increment: 'p-2',
        input: 'h-12 text-lg'
      }
    },
    center: {
      true: {
        decrement: 'order-1',
        input: 'text-center order-2',
        increment: 'order-3'
      }
    }
  },
  compoundVariants: [
    {
      size: 'xs',
      center: false,
      class: {
        input: 'pl-1.5'
      }
    },
    {
      size: 'sm',
      center: false,
      class: {
        input: 'pl-2'
      }
    },
    {
      size: 'md',
      center: false,
      class: {
        input: 'pl-2.5'
      }
    },
    {
      size: 'lg',
      center: false,
      class: {
        input: 'pl-3'
      }
    },
    {
      size: 'xl',
      center: false,
      class: {
        input: 'pl-3.5'
      }
    },
    {
      size: '2xl',
      center: false,
      class: {
        input: 'pl-4'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    center: false
  }
});
