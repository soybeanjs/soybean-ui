// @unocss-include
import { type VariantProps, tv } from 'tailwind-variants';

export const chipVariants = tv({
  slots: {
    root: 'relative inline-flex flex-shrink-0 items-center justify-center',
    content: `absolute flex items-center justify-center bg-primary whitespace-nowrap rounded-full font-medium text-foreground ring-[2px] ring-background`
  },
  variants: {
    position: {
      'top-right': {
        content: 'right-0 top-0'
      },
      'bottom-right': {
        content: 'right-0 bottom-0'
      },
      'top-left': {
        content: 'left-0 top-0'
      },
      'bottom-left': {
        content: 'left-0 bottom-0'
      }
    },
    color: {
      primary: {
        content: ''
      },
      destructive: {
        content: ''
      },
      success: {
        content: ''
      },
      warning: {
        content: ''
      },
      info: {
        content: ''
      },
      secondary: {
        content: ''
      },
      accent: {
        content: ''
      }
    },
    size: {
      xs: {
        content: `h-1.5 min-w-[0.375rem] p-px text-[6px]`
      },
      sm: {
        content: `h-2 min-w-[0.5rem] p-0.5 text-[7px]`
      },
      md: {
        content: `h-2.5 min-w-2.5 p-0.5 text-[8px]`
      },
      lg: {
        content: `h-3 min-w-[0.75rem] p-0.5 text-[10px]`
      },
      xl: {
        content: `h-3.5 min-w-[0.875rem] p-1 text-[11px]`
      },
      xxl: {
        content: `h-4 min-w-[1rem] p-1 text-[12px]`
      }
    }
  },
  compoundVariants: [
    {
      position: 'top-right',
      class: {
        content: `-translate-y-1/2 translate-x-1/2 transform`
      }
    },
    {
      position: 'bottom-right',
      class: {
        content: `-translate-x-1/2 translate-y-1/2 transform`
      }
    },
    {
      position: 'top-left',
      class: {
        content: `-translate-x-1/2 -translate-y-1/2 transform`
      }
    },
    {
      position: 'bottom-left',
      class: {
        content: `-translate-x-1/2 translate-y-1/2 transform`
      }
    },
    {
      color: 'primary',
      class: {
        content: `bg-primary text-primary-foreground`
      }
    },
    {
      color: 'destructive',
      class: {
        content: `bg-destructive text-destructive-foreground`
      }
    },
    {
      color: 'success',
      class: {
        content: `bg-success text-success-foreground`
      }
    },
    {
      color: 'warning',
      class: {
        content: `bg-warning text-warning-foreground`
      }
    },
    {
      color: 'info',
      class: {
        content: `bg-info text-info-foreground`
      }
    },
    {
      color: 'secondary',
      class: {
        content: `bg-secondary text-secondary-foreground`
      }
    },
    {
      color: 'accent',
      class: {
        content: `bg-accent text-accent-foreground`
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    position: 'top-right',
    color: 'primary'
  }
});

type ChipVariants = VariantProps<typeof chipVariants>;

export type ChipPosition = NonNullable<ChipVariants['position']>;
