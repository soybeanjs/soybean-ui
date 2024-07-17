// @unocss-include
import { cva } from 'class-variance-authority';
import type { ThemeColor } from '../types/theme';

export type AlertColor = 'none' | ThemeColor;

type Variants = {
  color: Record<AlertColor, string>;
};

export const alertVariants = cva<Variants>(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      color: {
        none: 'bg-background text-foreground',
        primary: 'border-primary/50 text-primary dark:border-primary [&>svg]:text-primary',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-success/50 text-success dark:border-success [&>svg]:text-success',
        warning: 'border-warning/50 text-warning dark:border-warning [&>svg]:text-warning',
        info: 'border-info/50 text-info dark:border-info [&>svg]:text-info',
        secondary: 'border-secondary/50 text-secondary dark:border-secondary [&>svg]:text-secondary'
      }
    },
    defaultVariants: {
      color: 'none'
    }
  }
);
