// @unocss-include
import { tv } from 'tailwind-variants';

export const pinInputVariants = tv({
  slots: {
    inputRoot: `flex items-center`,
    input: [
      `relative flex items-center justify-center text-center border-y border-r border-input bg-background transition-all`,
      `focus-visible:(outline-solid outline-2 outline-primary z-10) disabled:(cursor-not-allowed opacity-50)`
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
        inputRoot: `[&>:first-child]:(rounded-l-md border-l) [&>:last-child]:(rounded-r-md)`
      }
    },
    size: {
      xs: {
        input: `h-6 w-6 text-xs`,
        separator: `text-xs`
      },
      sm: {
        input: `h-7 w-7 text-sm`,
        separator: `text-sm`
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
        input: `h-10 w-10 text-base`,
        separator: `text-base`
      },
      xxl: {
        input: `h-12 w-12 text-lg`,
        separator: `text-lg`
      }
    }
  },
  defaultVariants: {
    size: 'md',
    separate: false
  }
});

export type PinInputSlots = keyof typeof pinInputVariants.slots;
