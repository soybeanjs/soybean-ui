// @unocss-include
import { tv } from 'tailwind-variants';

export const numberFieldVariants = tv({
  slots: {
    root: 'flex items-center w-full rounded-md border border-input bg-background focus-within:(border-input ring-2 ring-offset-2 ring-offset-background ring-primary) disabled:(cursor-not-allowed opacity-50)',
    decrement: `flex h-full shrink-0 items-center justify-center bg-transparent outline-none disabled:(cursor-not-allowed opacity-20)`,
    decrementIcon: '',
    increment: `flex h-full shrink-0 items-center justify-center bg-transparent outline-none disabled:(cursor-not-allowed opacity-20)`,
    incrementIcon: '',
    input: [
      `h-full w-full grow bg-transparent`,
      `placeholder:text-muted-foreground outline-none disabled:(cursor-not-allowed opacity-50)`
    ]
  },
  variants: {
    size: {
      xs: {
        decrement: 'p-1',
        decrementIcon: 'text-xs',
        increment: 'p-1',
        incrementIcon: 'text-xs',
        input: 'h-6 text-xs'
      },
      sm: {
        decrement: 'p-1.25',
        decrementIcon: 'text-sm',
        increment: 'p-1.25',
        incrementIcon: 'text-sm',
        input: 'h-7 text-sm'
      },
      md: {
        decrement: 'p-1.25',
        decrementIcon: 'text-sm',
        increment: 'p-1.25',
        incrementIcon: 'text-sm',
        input: 'h-8 text-sm'
      },
      lg: {
        decrement: 'p-1.5',
        decrementIcon: 'text-base',
        increment: 'p-1.5',
        incrementIcon: 'text-base',
        input: 'h-9 text-base'
      },
      xl: {
        decrement: 'p-1.5',
        decrementIcon: 'text-lg',
        increment: 'p-1.5',
        incrementIcon: 'text-lg',
        input: 'h-10 text-base'
      },
      xxl: {
        decrement: 'p-2',
        decrementIcon: 'text-xl',
        increment: 'p-2',
        incrementIcon: 'text-xl',
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
      size: 'xxl',
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

export type NumberFieldSlots = keyof typeof numberFieldVariants.slots;
