// @unocss-include
import { tv } from 'tailwind-variants';

export const radioVariants = tv({
  slots: {
    root: 'flex items-center gap-2',
    control: [
      'peer flex justify-center items-center shrink-0 rounded-full border shadow',
      'focus-visible:(outline-none ring-2 ring-offset-2) disabled:(cursor-not-allowed opacity-50)'
    ],
    indicator: 'size-1/2 rounded-full',
    group: 'flex gap-2'
  },
  variants: {
    color: {
      primary: {
        control: `border-primary focus-visible:ring-primary`,
        indicator: `bg-primary`
      },
      destructive: {
        control: `border-destructive focus-visible:ring-destructive`,
        indicator: `bg-destructive`
      },
      success: {
        control: `border-success focus-visible:ring-success`,
        indicator: `bg-success`
      },
      warning: {
        control: `border-warning focus-visible:ring-warning`,
        indicator: `bg-warning`
      },
      info: {
        control: `border-info focus-visible:ring-info`,
        indicator: `bg-info`
      },
      carbon: {
        control: `border-carbon focus-visible:ring-carbon`,
        indicator: `bg-carbon`
      },
      secondary: {
        control: `border-secondary-foreground focus-visible:ring-secondary-foreground/20`,
        indicator: `bg-secondary-foreground/60`
      },
      accent: {
        control: `border-accent-foreground focus-visible:ring-accent-foreground/20`,
        indicator: `bg-accent-foreground/60`
      }
    },
    size: {
      xs: {
        control: 'size-3'
      },
      sm: {
        control: 'size-3.5'
      },
      md: {
        control: 'size-4'
      },
      lg: {
        control: 'size-4.5'
      },
      xl: {
        control: 'size-5'
      },
      xxl: {
        control: 'size-6'
      }
    },
    orientation: {
      horizontal: {
        group: 'items-center'
      },
      vertical: {
        group: 'flex-col'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    orientation: 'horizontal'
  }
});

export type RadioSlots = keyof typeof radioVariants.slots;
