// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const tagVariants = tv({
  base: 'inline-flex items-center border font-semibold',
  variants: {
    color: {
      primary: 'border-primary text-primary',
      destructive: 'border-destructive text-destructive',
      success: 'border-success text-success',
      warning: 'border-warning text-warning',
      info: 'border-info text-info',
      carbon: 'border-carbon text-carbon',
      secondary: 'border-secondary-foreground/50 text-secondary-foreground',
      accent: 'border-accent-foreground/50 text-accent-foreground'
    },
    variant: {
      solid: '',
      pure: 'bg-background text-foreground border-border',
      outline: 'bg-background',
      soft: 'border-0',
      ghost: '',
      raw: 'bg-transparent border-0'
    },
    size: {
      xs: 'gap-0.5 h-3.5 px-1 text-4xs',
      sm: 'gap-0.75 h-4 px-1.5 text-3xs',
      md: 'gap-1 h-4.5 px-2 text-2xs',
      lg: 'gap-1.25 h-5 px-2.5 text-xs',
      xl: 'gap-1.5 h-6 px-3 text-sm',
      '2xl': 'gap-2 h-7 px-4 text-base'
    },
    shape: {
      auto: 'rounded-md',
      rounded: 'rounded-full'
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'solid',
      class: `bg-primary text-primary-foreground`
    },
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
      color: 'carbon',
      variant: 'solid',
      class: `bg-carbon text-carbon-foreground`
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
      variant: ['soft', 'ghost'],
      class: 'bg-primary/10'
    },
    {
      color: 'destructive',
      variant: ['soft', 'ghost'],
      class: 'bg-destructive/10'
    },
    {
      color: 'success',
      variant: ['soft', 'ghost'],
      class: 'bg-success/10'
    },
    {
      color: 'warning',
      variant: ['soft', 'ghost'],
      class: 'bg-warning/10'
    },
    {
      color: 'info',
      variant: ['soft', 'ghost'],
      class: 'bg-info/10'
    },
    {
      color: 'carbon',
      variant: ['soft', 'ghost'],
      class: 'bg-carbon/10'
    },
    {
      color: 'secondary',
      variant: ['soft', 'ghost'],
      class: 'bg-secondary-foreground/5'
    },
    {
      color: 'accent',
      variant: ['soft', 'ghost'],
      class: 'bg-accent-foreground/5'
    }
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    shape: 'auto'
  }
});

type TagVariants = VariantProps<typeof tagVariants>;

export type TagVariant = NonNullable<TagVariants['variant']>;

export type TagShape = NonNullable<TagVariants['shape']>;
