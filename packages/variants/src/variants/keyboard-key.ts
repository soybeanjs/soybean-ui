// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const keyboardKeyVariants = tv({
  slots: {
    item: `inline-flex items-center justify-center font-medium border border-border  rounded-sm`,
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
      subtle: {
        item: ' border-border bg-muted text-muted-foreground'
      }
    },
    size: {
      xs: {
        item: 'h-4 min-w-4 px-0.75 gap-0.75 text-xs',
        group: 'gap-0.75'
      },
      sm: {
        item: 'h-4.5 min-w-4.5 px-0.75 gap-1 text-xs',
        group: 'gap-1'
      },
      md: {
        item: 'h-5 min-w-5 px-1 gap-1.5 text-xs',
        group: 'gap-1.5'
      },
      lg: {
        item: 'h-5.5 min-w-5.5 px-1.25 gap-2 text-sm',
        group: 'gap-2'
      },
      xl: {
        item: 'h-6 min-w-6 px-1.5 gap-2.5 text-sm',
        group: 'gap-2.5'
      },
      xxl: {
        item: 'h-6.5 min-w-6.5 px-1.5 gap-3 text-sm',
        group: 'gap-3'
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
