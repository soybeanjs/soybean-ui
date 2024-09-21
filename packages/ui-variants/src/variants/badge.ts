// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const badgeVariants = tv({
  base: 'inline-flex items-center gap-1 border px-3 py-1 text-xs font-semibold',
  variants: {
    color: {
      primary: '',
      destructive: '',
      success: '',
      warning: '',
      info: '',
      secondary: '',
      accent: ''
    },
    variant: {
      solid: 'bg-primary text-primary-foreground',
      plain: 'border border-border bg-background text-foreground',
      outline: 'border bg-background'
    },
    shape: {
      auto: 'rounded-md',
      rounded: 'rounded-full'
    }
  },
  compoundVariants: [
    {
      color: 'destructive',
      variant: 'solid',
      class: `bg-destructive text-destructive-foreground`
    },
    {
      color: 'success',
      variant: 'solid',
      class: `bg-success text-success-foreground`
    },
    {
      color: 'warning',
      variant: 'solid',
      class: `bg-warning text-warning-foreground`
    },
    {
      color: 'info',
      variant: 'solid',
      class: `bg-info text-info-foreground`
    },
    {
      color: 'secondary',
      variant: 'solid',
      class: `bg-secondary text-secondary-foreground`
    },
    {
      color: 'accent',
      variant: 'solid',
      class: `bg-accent text-accent-foreground`
    },
    {
      color: 'primary',
      variant: 'outline',
      class: 'text-primary'
    },
    {
      color: 'destructive',
      variant: 'outline',
      class: 'text-destructive'
    },
    {
      color: 'success',
      variant: 'outline',
      class: 'text-success'
    },
    {
      color: 'warning',
      variant: 'outline',
      class: 'text-warning'
    },
    {
      color: 'info',
      variant: 'outline',
      class: 'text-info'
    },
    {
      color: 'secondary',
      variant: 'outline',
      class: 'text-secondary-foreground'
    },
    {
      color: 'accent',
      variant: 'outline',
      class: 'text-accent-foreground'
    },
    {
      color: 'primary',
      variant: 'outline',
      class: 'border-primary bg-primary/10'
    },
    {
      color: 'destructive',
      variant: 'outline',
      class: 'border-destructive bg-destructive/10'
    },
    {
      color: 'success',
      variant: 'outline',
      class: 'border-success bg-success/10'
    },
    {
      color: 'warning',
      variant: 'outline',
      class: 'border-warning bg-warning/10'
    },
    {
      color: 'info',
      variant: 'outline',
      class: 'border-info bg-info/10'
    },
    {
      color: 'secondary',
      variant: 'outline',
      class: 'border-secondary-foreground bg-secondary-foreground/10'
    },
    {
      color: 'accent',
      variant: 'outline',
      class: 'border-accent-foreground bg-accent-foreground/10'
    }
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    shape: 'rounded'
  }
});

type BadgeVariants = VariantProps<typeof badgeVariants>;

export type BadgeVariant = NonNullable<BadgeVariants['variant']>;
