// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const toggleVariants = tv({
  base: [
    `flex-center rounded-md font-medium transition-colors`,
    `hover:(bg-muted text-muted-foreground)`,
    `focus-visible:(outline outline-2 outline-offset-2)`,
    `disabled:(pointer-events-none opacity-50)`,
    `data-[state=on]:bg-accent data-[state=on]:hover:(bg-accent text-accent-foreground)`
  ],
  variants: {
    variant: {
      ghost: `bg-transparent`,
      outline: `border border-input bg-transparent shadow-sm hover(bg-accent text-accent-foreground)`
    },
    size: {
      xs: `h-6 px-1.5 text-xs`,
      sm: `h-7 px-2 text-sm`,
      md: `h-8 px-4 text-sm`,
      lg: `h-9 px-6 text-base`,
      xl: `h-10 px-8 text-base`,
      xxl: `h-12 px-10 text-lg`
    }
  },
  compoundVariants: [],
  defaultVariants: {
    variant: 'ghost',
    size: 'md'
  }
});

type ToggleVariants = VariantProps<typeof toggleVariants>;

export type ToggleVariant = NonNullable<ToggleVariants['variant']>;

export type ToggleSize = NonNullable<ToggleVariants['size']>;
