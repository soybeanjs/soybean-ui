// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const kbdVariants = tv({
  base: `inline-flex items-center justify-center w-fit text-center font-medium border border-border rounded-sm`,
  variants: {
    variant: {
      solid: 'bg-muted-foreground text-muted',
      outline: 'border-border bg-background text-muted-foreground',
      ghost: 'border-border bg-muted text-muted-foreground'
    },
    size: {
      xs: 'h-4 min-w-4 px-0.5 text-3xs data-[tag=kbd]:text-2xs data-[group]:tracking-0.5',
      sm: 'h-4.5 min-w-4.5 px-0.625 text-2xs data-[tag=kbd]:text-xs data-[group]:tracking-0.625',
      md: 'h-5 min-w-5 px-0.75 text-xs data-[tag=kbd]:text-sm data-[group]:tracking-0.75',
      lg: 'h-6 min-w-6 px-1 text-sm data-[tag=kbd]:text-base data-[group]:tracking-1',
      xl: 'h-7 min-w-7 px-1.25 text-base data-[tag=kbd]:text-lg data-[group]:tracking-1.25',
      '2xl': 'h-8 min-w-8 px-1.5 text-xl data-[tag=kbd]:text-2xl data-[group]:tracking-1.5'
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline'
  }
});

type KbdVariants = VariantProps<typeof kbdVariants>;

export type KbdVariant = NonNullable<KbdVariants['variant']>;
