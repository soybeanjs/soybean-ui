// @unocss-include
import { tv } from 'tailwind-variants';

export const pinInputVariants = tv({
  slots: {
    root: '',
    inputRoot: `flex items-center`,
    input: [
      `relative flex items-center justify-center text-center border-y border-r border-solid border-input bg-background transition-all-200`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary z-10) disabled:(cursor-not-allowed opacity-50)`
    ],
    separator: `text-muted-foreground`
  },
  variants: {
    separate: {
      true: {
        inputRoot: `gap-1`,
        input: `rounded-md border`
      },
      false: {
        input: `first:(rounded-l-md border-l) last:rounded-r-md`
      }
    },
    size: {
      xs: {
        input: `h-6 w-6 text-2xs`,
        separator: `text-2xs`
      },
      sm: {
        input: `h-7 w-7 text-xs`,
        separator: `text-xs`
      },
      md: {
        input: `h-8 w-8 text-sm`,
        separator: `text-sm`
      },
      lg: {
        input: `h-9 w-9 text-base`,
        separator: `text-base`
      },
      xl: {
        input: `h-10 w-10 text-lg`,
        separator: `text-lg`
      },
      '2xl': {
        input: `h-12 w-12 text-xl`,
        separator: `text-xl`
      }
    }
  },
  compoundVariants: [
    {
      size: 'xs',
      separate: true,
      class: {
        inputRoot: 'gap-0.75'
      }
    },
    {
      size: 'sm',
      separate: true,
      class: {
        inputRoot: 'gap-875'
      }
    },
    {
      size: 'lg',
      separate: true,
      class: {
        inputRoot: 'gap-1.25'
      }
    },
    {
      size: 'xl',
      separate: true,
      class: {
        inputRoot: 'gap-1.5'
      }
    },
    {
      size: '2xl',
      separate: true,
      class: {
        inputRoot: 'gap-1.75'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    separate: false
  }
});

export type PinInputSlots = keyof typeof pinInputVariants.slots;
