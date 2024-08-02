// @unocss-include
import { cva } from 'class-variance-authority';
import type { ThemeColor } from '../types/theme';

export type AlertColor = ThemeColor;

export type AlertVariant = 'clean' | 'ghost' | 'pure';

type Variants = {
  color: Record<AlertColor, string>;
  variant: Record<AlertVariant, string>;
};

export const alertVariants = cva<Variants>(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      color: {
        primary: 'border-primary text-primary [&>svg]:text-primary',
        destructive: 'border-destructive text-destructive [&>svg]:text-destructive',
        success: 'border-success text-success [&>svg]:text-success',
        warning: 'border-warning text-warning [&>svg]:text-warning',
        info: 'border-info text-info dark:border-info [&>svg]:text-info',
        secondary: 'border-secondary-foreground text-secondary-foreground [&>svg]:text-secondary',
        accent: 'border-accent-foreground text-accent-foreground [&>svg]:text-accent'
      },
      variant: {
        clean: 'bg-background',
        ghost: 'text-foreground',
        pure: 'bg-background text-foreground border-border'
      }
    },
    compoundVariants: [
      {
        color: 'primary',
        variant: 'ghost',
        class: 'bg-primary/10'
      },
      {
        color: 'destructive',
        variant: 'ghost',
        class: 'bg-destructive/10'
      },
      {
        color: 'success',
        variant: 'ghost',
        class: 'bg-success/10'
      },
      {
        color: 'warning',
        variant: 'ghost',
        class: 'bg-warning/10'
      },
      {
        color: 'info',
        variant: 'ghost',
        class: 'bg-info/10'
      },
      {
        color: 'secondary',
        variant: 'ghost',
        class: 'bg-secondary-foreground/10'
      }
    ],
    defaultVariants: {
      color: 'primary',
      variant: 'ghost'
    }
  }
);
