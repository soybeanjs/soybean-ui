// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const toggleVariants = tv({
  slots: {
    toggle: [
      `inline-flex items-center justify-center rounded-md font-medium transition-colors`,
      `hover:(bg-muted text-muted-foreground) focus-visible:(outline-solid outline-2 outline-offset-2) disabled:(pointer-events-none opacity-50)`,
      `data-[state=on]:bg-accent data-[state=on]:hover:(bg-accent text-accent-foreground)`
    ],
    groupRoot: `flex justify-center items-center`
  },
  variants: {
    variant: {
      ghost: {
        toggle: `bg-transparent`
      },
      outline: {
        toggle: `border border-input bg-transparent shadow-sm hover(bg-accent text-accent-foreground)`
      }
    },
    size: {
      xs: {
        toggle: `h-6 px-1.5 text-xs`,
        groupRoot: `gap-1`
      },
      sm: {
        toggle: `h-7 px-2 text-sm`,
        groupRoot: `gap-1`
      },
      md: {
        toggle: `h-8 px-4 text-sm`,
        groupRoot: `gap-1`
      },
      lg: {
        toggle: `h-9 px-6 text-base`,
        groupRoot: `gap-1.5`
      },
      xl: {
        toggle: `h-10 px-8 text-base`,
        groupRoot: `gap-1.5`
      },
      xxl: {
        toggle: `h-12 px-10 text-lg`,
        groupRoot: `gap-1.5`
      }
    }
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'md'
  }
});

type ToggleVariants = VariantProps<typeof toggleVariants>;

export type ToggleVariant = NonNullable<ToggleVariants['variant']>;

export type ToggleSlots = keyof typeof toggleVariants.slots;
