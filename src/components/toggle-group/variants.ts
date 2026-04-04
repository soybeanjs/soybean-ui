// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const toggleGroupVariants = tv({
  slots: {
    root: 'inline-flex w-fit items-center gap-1',
    item: [
      'inline-flex min-w-0 shrink-0 items-center justify-center whitespace-nowrap rounded-md font-medium transition-all-150',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/30 focus-visible:ring-offset-background',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'hover:bg-accent hover:text-accent-foreground',
      'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
    ]
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex-row'
      },
      vertical: {
        root: 'flex-col items-stretch'
      }
    },
    variant: {
      default: {
        item: 'bg-transparent text-muted-foreground'
      },
      outline: {
        item: 'border border-input bg-background text-muted-foreground shadow-sm'
      }
    },
    size: {
      xs: {
        item: 'h-6 gap-1 px-1.5 text-2xs'
      },
      sm: {
        item: 'h-7 gap-1.5 px-2 text-xs'
      },
      md: {
        item: 'h-8 gap-2 px-3 text-sm'
      },
      lg: {
        item: 'h-9 gap-2.5 px-4 text-base'
      },
      xl: {
        item: 'h-10 gap-3 px-5 text-lg'
      },
      '2xl': {
        item: 'h-12 gap-4 px-6 text-xl'
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
    size: 'md'
  }
});

type ToggleGroupVariants = VariantProps<typeof toggleGroupVariants>;

export type ToggleGroupVariant = NonNullable<ToggleGroupVariants['variant']>;
