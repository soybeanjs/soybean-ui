// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const radioVariants = tv({
  slots: {
    root: 'flex items-center gap-2',
    control: [
      'peer size-4 shrink-0 rounded-full border shadow',
      'focus-visible:(outline outline-2 outline-offset-2) disabled:(cursor-not-allowed opacity-50)'
    ],
    indicator: 'flex justify-center items-center size-full',
    group: 'flex gap-2',
    icon: 'size-2.5 fill-current'
  },
  variants: {
    color: {
      primary: {
        control: `border-primary text-primary`
      },
      destructive: {
        control: `border-destructive text-destructive`
      },
      success: {
        control: `border-success text-success`
      },
      warning: {
        control: `border-warning text-warning`
      },
      info: {
        control: `border-info text-info`
      },
      secondary: {
        control: `border-secondary-foreground text-secondary-foreground`
      },
      accent: {
        control: `border-accent-foreground text-accent-foreground`
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

type RadioVariants = VariantProps<typeof radioVariants>;

export type RadioColor = NonNullable<RadioVariants['color']>;

export type RadioOrientation = NonNullable<RadioVariants['orientation']>;
