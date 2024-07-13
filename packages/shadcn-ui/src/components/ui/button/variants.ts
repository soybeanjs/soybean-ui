// @unocss-include

import { type VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium focus-visible:(outline outline-2 outline-offset-2) disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      color: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary',
        destructive: `bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:outline-destructive`,
        success: 'bg-success text-success-foreground hover:bg-success/90 focus-visible:outline-success',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90 focus-visible:outline-warning',
        info: 'bg-info text-info-foreground hover:bg-info/90 focus-visible:outline-info',
        secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-secondary-foreground`
      },
      variant: {
        outline: 'border bg-background hover:bg-background',
        ghost: 'bg-transparent hover:bg-accent text-accent-foreground',
        link: 'bg-transparent hover:bg-transparent underline-offset-4 hover:underline'
      },
      size: {
        xs: 'h-6 px-1.5 text-xs',
        sm: 'h-7 px-2',
        md: 'h-8 px-4 py-2',
        lg: 'h-10 px-6',
        icon: 'h-8 w-8'
      }
    },
    defaultVariants: {
      color: 'primary',
      size: 'md'
    },
    compoundVariants: [
      {
        color: 'primary',
        variant: ['outline', 'ghost', 'link'],
        class: 'text-primary'
      },
      {
        color: 'secondary',
        variant: ['outline', 'ghost', 'link'],
        class: 'text-secondary-foreground'
      },
      {
        color: 'destructive',
        variant: ['outline', 'ghost', 'link'],
        class: 'text-destructive'
      },
      {
        color: 'success',
        variant: ['outline', 'ghost', 'link'],
        class: 'text-success'
      },
      {
        color: 'warning',
        variant: ['outline', 'ghost', 'link'],
        class: 'text-warning'
      },
      {
        color: 'info',
        variant: ['outline', 'ghost', 'link'],
        class: 'text-info'
      },
      {
        color: 'primary',
        variant: 'outline',
        class: 'border-primary'
      },
      {
        color: 'secondary',
        variant: 'outline',
        class: 'border-secondary-foreground'
      },
      {
        color: 'destructive',
        variant: 'outline',
        class: 'border-destructive'
      },
      {
        color: 'success',
        variant: 'outline',
        class: 'border-success'
      },
      {
        color: 'warning',
        variant: 'outline',
        class: 'border-warning'
      },
      {
        color: 'info',
        variant: 'outline',
        class: 'border-info'
      }
    ]
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonColor = NonNullable<ButtonVariants['color']>;

export type ButtonSize = NonNullable<ButtonVariants['size']>;

export type ButtonVariant = NonNullable<ButtonVariants['variant']>;
