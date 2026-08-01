// @unocss-include
import { cv } from '@soybeanjs/cva';
import type { VariantProps } from '@soybeanjs/cva';

export const ratingVariants = cv({
  base: [
    'inline-flex items-center outline-none',
    'focus-visible:ring-3 focus-visible:ring-primary/30',
    'data-[orientation=vertical]:flex-col',
    'data-[disabled]:opacity-50 data-[readonly]:cursor-default'
  ],
  variants: {
    size: {
      xs: 'gap-0.5',
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
      xl: 'gap-2.5',
      '2xl': 'gap-3'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export const ratingItemVariants = cv({
  base: [
    'relative inline-flex shrink-0 cursor-pointer transition-colors-150',
    'data-[disabled]:cursor-not-allowed data-[readonly]:cursor-default'
  ],
  variants: {
    color: {
      primary: 'data-[state=full]:text-primary data-[state=half]:text-primary',
      destructive: 'data-[state=full]:text-destructive data-[state=half]:text-destructive',
      success: 'data-[state=full]:text-success data-[state=half]:text-success',
      warning: 'data-[state=full]:text-warning data-[state=half]:text-warning',
      info: 'data-[state=full]:text-info data-[state=half]:text-info',
      carbon: 'data-[state=full]:text-carbon data-[state=half]:text-carbon',
      secondary: 'data-[state=full]:text-secondary-foreground data-[state=half]:text-secondary-foreground',
      accent: 'data-[state=full]:text-accent-foreground data-[state=half]:text-accent-foreground'
    },
    variant: {
      filled: 'text-muted-foreground/40',
      outline: 'text-muted-foreground/40'
    },
    size: {
      xs: 'h-3 w-3',
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-4.5 w-4.5',
      xl: 'h-5 w-5',
      '2xl': 'h-6 w-6'
    }
  },
  defaultVariants: {
    color: 'warning',
    variant: 'filled',
    size: 'md'
  }
});

type RatingItemVariants = VariantProps<typeof ratingItemVariants>;

export type RatingVariant = NonNullable<RatingItemVariants['variant']>;
