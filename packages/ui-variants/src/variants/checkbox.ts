// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const checkboxVariants = tv({
  slots: {
    root: 'flex items-center gap-2',
    control: [
      'peer size-4.5 shrink-0 rounded-sm border shadow',
      'focus-visible:(outline outline-2 outline-offset-2) disabled:(cursor-not-allowed opacity-50)',
      'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground'
    ],
    indicator: 'size-full flex items-center justify-center text-current',
    group: 'flex gap-2'
  },
  variants: {
    color: {
      primary: {
        control: `border-primary data-[state=checked]:(bg-primary text-primary-foreground) data-[state=indeterminate]:(bg-primary text-primary-foreground)`
      },
      destructive: {
        control: `border-destructive data-[state=checked]:(bg-destructive text-destructive-foreground) data-[state=indeterminate]:(bg-destructive text-destructive-foreground)`
      },
      success: {
        control: `border-success data-[state=checked]:(bg-success text-success-foreground) data-[state=indeterminate]:(bg-success text-success-foreground)`
      },
      warning: {
        control: `border-warning data-[state=checked]:(bg-warning text-warning-foreground) data-[state=indeterminate]:(bg-warning text-warning-foreground)`
      },
      info: {
        control: `border-info data-[state=checked]:(bg-info text-info-foreground) data-[state=indeterminate]:(bg-info text-info-foreground)`
      },
      secondary: {
        control: `border-secondary-foreground/20 data-[state=checked]:(bg-secondary-foreground/20 text-secondary-foreground) data-[state=indeterminate]:(bg-secondary-foreground/20 text-secondary-foreground)`
      },
      accent: {
        control: `border-accent-foreground/20 data-[state=checked]:(bg-accent-foreground/20 text-accent-foreground) data-[state=indeterminate]:(bg-accent-foreground/20 text-accent-foreground)`
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

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

export type CheckboxColor = NonNullable<CheckboxVariants['color']>;

export type CheckboxOrientation = NonNullable<CheckboxVariants['orientation']>;
