// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const toggleVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-2 rounded-md whitespace-nowrap font-medium transition-all-150',
    'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent-foreground/20 focus-visible:ring-offset-background',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'
  ],
  variants: {
    variant: {
      default: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
    },
    size: {
      sm: 'h-8 min-w-8 px-1.5 text-xs',
      md: 'h-9 min-w-9 px-2 text-sm',
      lg: 'h-10 min-w-10 px-2.5 text-base'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
});

type ToggleVariants = VariantProps<typeof toggleVariants>;

export type ToggleVariant = NonNullable<ToggleVariants['variant']>;

export type ToggleSize = NonNullable<ToggleVariants['size']>;
