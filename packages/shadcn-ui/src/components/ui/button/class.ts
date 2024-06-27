// @unocss-include
import { type VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(
  `relative border i-flex-center bg-theme-color active:bg-theme-color-600 hover:bg-theme-color-400 touch-manipulation select-none whitespace-nowrap rd-md focus-visible:(outline-none ring-2 ring-theme-color ring-offset-1) disabled:(cursor-not-allowed opacity-50 ring-offset-background ring-offset-background)`,
  {
    variants: {
      color: {
        primary: 'theme-primary',
        info: 'theme-info',
        success: 'theme-success',
        warning: 'theme-warning',
        error: 'theme-error'
      },
      size: {
        sm: `px-10px py-4px text-xs`,
        md: `px-15px py-5px text-sm`,
        lg: `px-20px py-6px text-lg`
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
