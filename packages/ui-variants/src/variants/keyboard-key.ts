// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const keyboardKeyVariants = tv({
  slots: {
    item: `inline-flex items-center justify-center w-fit font-medium border border-border  rounded-sm`,
    group: 'flex items-center',
    separator: 'font-medium text-muted-foreground'
  },
  variants: {
    variant: {
      solid: {
        item: 'bg-muted-foreground text-muted'
      },
      outline: {
        item: 'border-border bg-background text-muted-foreground'
      },
      ghost: {
        item: ' border-border bg-muted text-muted-foreground'
      }
    },
    size: {
      xs: {
        item: 'gap-0.5 h-4 min-w-4 px-0.5 text-3xs',
        group: 'gap-0.75'
      },
      sm: {
        item: 'gap-0.625 h-4.5 min-w-4.5 px-0.625 text-2xs',
        group: 'gap-1'
      },
      md: {
        item: 'gap-0.75 h-5 min-w-5 px-0.75 text-xs',
        group: 'gap-1.25'
      },
      lg: {
        item: 'gap-1 h-6 min-w-6 px-1 text-sm',
        group: 'gap-1.5'
      },
      xl: {
        item: 'gap-1.25 h-7 min-w-7 px-1.25 text-base',
        group: 'gap-1.75'
      },
      '2xl': {
        item: 'gap-1.5 h-8 min-w-8 px-1.5 text-lg',
        group: 'gap-2'
      }
    }
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md'
  }
});

type KeyboardKeyVariants = VariantProps<typeof keyboardKeyVariants>;

export type KeyboardKeyVariant = NonNullable<KeyboardKeyVariants['variant']>;

export type KeyboardKeySlots = keyof typeof keyboardKeyVariants.slots;
