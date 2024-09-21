// @unocss-include
import { tv } from 'tailwind-variants';

export const radioVariants = tv({
  slots: {
    root: 'flex items-center gap-2',
    control: [
      'peer flex justify-center items-center size-4 shrink-0 rounded-full border shadow',
      'focus-visible:(outline outline-2 outline-offset-2) disabled:(cursor-not-allowed opacity-50)'
    ],
    indicator: 'size-2 rounded-full',
    group: 'flex gap-2'
  },
  variants: {
    color: {
      primary: {
        control: `border-primary focus-visible:outline-primary`,
        indicator: `bg-primary`
      },
      destructive: {
        control: `border-destructive focus-visible:outline-destructive`,
        indicator: `bg-destructive`
      },
      success: {
        control: `border-success focus-visible:outline-success`,
        indicator: `bg-success`
      },
      warning: {
        control: `border-warning focus-visible:outline-warning`,
        indicator: `bg-warning`
      },
      info: {
        control: `border-info focus-visible:outline-info`,
        indicator: `bg-info`
      },
      secondary: {
        control: `border-secondary-foreground focus-visible:outline-secondary-foreground/20`,
        indicator: `bg-secondary-foreground/60`
      },
      accent: {
        control: `border-accent-foreground focus-visible:outline-accent-foreground/20`,
        indicator: `bg-accent-foreground/60`
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
    orientation: 'horizontal'
  }
});
