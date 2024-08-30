// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const radioVariants = tv({
  slots: {
    root: 'flex items-center gap-2',
    control: [
      'peer flex justify-center items-center size-4 shrink-0 rounded-full border shadow',
      'focus-visible:(outline outline-2 outline-offset-2) disabled:(cursor-not-allowed opacity-50)'
    ],
    indicator: 'size-2.5 rounded-full',
    group: 'flex gap-2'
  },
  variants: {
    color: {
      primary: {
        control: `border-primary`,
        indicator: `bg-primary`
      },
      destructive: {
        control: `border-destructive`,
        indicator: `bg-destructive`
      },
      success: {
        control: `border-success`,
        indicator: `bg-success`
      },
      warning: {
        control: `border-warning`,
        indicator: `bg-warning`
      },
      info: {
        control: `border-info`,
        indicator: `bg-info`
      },
      secondary: {
        control: `border-secondary-foreground`,
        indicator: `bg-secondary-foreground`
      },
      accent: {
        control: `border-accent-foreground`,
        indicator: `bg-accent-foreground`
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
