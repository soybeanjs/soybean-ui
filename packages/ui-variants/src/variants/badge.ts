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
      solid: '',
      plain: 'border border-border bg-background text-foreground',
      outline: 'border'
    },
    shape: {
      auto: 'rounded-lg',
      rounded: 'rounded-full'
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'solid',
      class: `bg-primary border-primary text-primary-foreground`
    },
    {
      color: 'destructive',
      variant: 'solid',
      class: `bg-destructive border-destructive text-destructive-foreground`
    },
    {
      color: 'success',
      variant: 'solid',
      class: `bg-success border-success text-success-foreground`
    },
    {
      color: 'warning',
      variant: 'solid',
      class: `bg-warning border-warning text-warning-foreground`
    },
    {
      color: 'info',
      variant: 'solid',
      class: `bg-info border-info text-info-foreground`
    },
    {
      color: 'secondary',
      variant: 'solid',
      class: `bg-secondary border-secondary text-secondary-foreground`
    },
    {
      color: 'accent',
      variant: 'solid',
      class: `bg-accent border-accent text-accent-foreground`
    },
    {
      color: 'primary',
      variant: 'outline',
      class: 'border-primary bg-primary/10 text-primary'
    },
    {
      color: 'destructive',
      variant: 'outline',
      class: 'border-destructive bg-destructive/10 text-destructive'
    },
    {
      color: 'success',
      variant: 'outline',
      class: 'border-success bg-success/10 text-success'
    },
    {
      color: 'warning',
      variant: 'outline',
      class: 'border-warning bg-warning/10 text-warning'
    },
    {
      color: 'info',
      variant: 'outline',
      class: 'border-info bg-info/10 text-info'
    },
    {
      color: 'secondary',
      variant: 'outline',
      class: 'border-secondary-foreground/20 bg-secondary-foreground/5'
    },
    {
      color: 'accent',
      variant: 'outline',
      class: 'border-accent-foreground/20 bg-accent-foreground/5'
    }
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    shape: 'auto'
  }
});

type BadgeVariants = VariantProps<typeof badgeVariants>;

export type BadgeVariant = NonNullable<BadgeVariants['variant']>;
