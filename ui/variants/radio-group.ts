// @unocss-include
import { tv } from 'tailwind-variants';

export const radioGroupVariants = tv({
  slots: {
    root: 'flex',
    item: 'flex items-center',
    control: [
      'peer relative shrink-0 rounded-full border shadow',
      'focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background) disabled:(cursor-not-allowed opacity-50)'
    ],
    indicator: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-1/2 rounded-full',
    label: ''
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
        root: 'gap-x-2 gap-y-1.5',
        item: 'gap-1.5',
        control: 'size-3'
      },
      sm: {
        root: 'gap-x-2.5 gap-y-1.75',
        item: 'gap-1.75',
        control: 'size-3.5'
      },
      md: {
        root: 'gap-x-3 gap-y-2',
        item: 'gap-2',
        control: 'size-4'
      },
      lg: {
        root: 'gap-x-3.5 gap-y-2.5',
        item: 'gap-2.5',
        control: 'size-4.5'
      },
      xl: {
        root: 'gap-x-4 gap-y-3',
        item: 'gap-3',
        control: 'size-5'
      },
      '2xl': {
        root: 'gap-x-4.5 gap-y-3.5',
        item: 'gap-3.5',
        control: 'size-6'
      }
    },
    orientation: {
      horizontal: {
        root: 'items-center'
      },
      vertical: {
        root: 'flex-col'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    orientation: 'horizontal'
  }
});
