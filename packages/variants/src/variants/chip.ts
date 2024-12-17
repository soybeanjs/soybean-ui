// @unocss-include
import { type VariantProps, tv } from 'tailwind-variants';

export const chipVariants = tv({
  slots: {
    root: 'relative',
    content: `absolute flex justify-center items-center whitespace-nowrap text-xs leading-none rounded-full transform`
  },
  variants: {
    position: {
      'top-right': {
        content: 'right-0 top-0 -translate-y-1/2 translate-x-1/2'
      },
      'bottom-right': {
        content: 'right-0 bottom-0 -translate-x-1/2 translate-y-1/2'
      },
      'top-left': {
        content: 'left-0 top-0 -translate-x-1/2 -translate-y-1/2'
      },
      'bottom-left': {
        content: 'left-0 bottom-0 -translate-x-1/2 translate-y-1/2'
      }
    },
    color: {
      primary: {
        content: 'bg-primary text-primary-foreground'
      },
      destructive: {
        content: 'bg-destructive text-destructive-foreground'
      },
      success: {
        content: 'bg-success text-success-foreground'
      },
      warning: {
        content: 'bg-warning text-warning-foreground'
      },
      info: {
        content: 'bg-info text-info-foreground'
      },
      secondary: {
        content: 'bg-secondary text-secondary-foreground'
      },
      accent: {
        content: 'bg-accent text-accent-foreground'
      }
    },
    size: {
      xs: {
        content: `p-0.75`
      },
      sm: {
        content: `p-1`
      },
      md: {
        content: `p-1.25`
      },
      lg: {
        content: `p-1.5`
      },
      xl: {
        content: `p-1.75`
      },
      xxl: {
        content: `p-2`
      }
    }
  },
  defaultVariants: {
    size: 'md',
    position: 'top-right',
    color: 'primary'
  }
});

type ChipVariants = VariantProps<typeof chipVariants>;

export type ChipPosition = NonNullable<ChipVariants['position']>;
