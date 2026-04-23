// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const toggleVariants = tv({
  base: [
    'inline-flex items-center justify-center rounded-md whitespace-nowrap font-medium transition-all-150',
    'outline-none focus-visible:ring-3 focus-visible:ring-offset-background',
    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'
  ],
  variants: {
    color: {
      primary: `focus-visible:ring-primary/30`,
      destructive: `focus-visible:ring-destructive/30`,
      success: `focus-visible:ring-success/30`,
      warning: `focus-visible:ring-warning/30`,
      info: `focus-visible:ring-info/30`,
      carbon: `focus-visible:ring-carbon/30`,
      secondary: `focus-visible:ring-secondary-foreground/20`,
      accent: `focus-visible:ring-accent-foreground/20`
    },
    variant: {
      outline: `border border-border bg-background text-foreground hover:bg-accent data-[state=on]:bg-accent`,
      soft: 'bg-accent data-[state=off]:hover:bg-accent',
      ghost: 'bg-transparent data-[state=off]:hover:bg-accent'
    },
    size: {
      xs: 'gap-1 h-6 px-1.5 text-2xs',
      sm: 'gap-2 h-7 px-2 text-xs',
      md: 'gap-3 h-8 px-4 text-sm',
      lg: 'gap-4 h-9 px-6 text-base',
      xl: 'gap-5 h-10 px-8 text-lg',
      '2xl': 'gap-6 h-12 px-10 text-xl'
    },
    shape: {
      auto: 'rounded-md',
      rounded: 'rounded-full',
      square: 'h-8 w-8 p-0 gap-0 rounded-md',
      circle: 'h-8 w-8 p-0 gap-0 rounded-full'
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'soft',
      class: 'data-[state=on]:bg-primary/20 data-[state=on]:text-primary'
    },
    {
      color: 'destructive',
      variant: 'soft',
      class: 'data-[state=on]:bg-destructive/20 data-[state=on]:text-destructive'
    },
    {
      color: 'success',
      variant: 'soft',
      class: 'data-[state=on]:bg-success/20 data-[state=on]:text-success'
    },
    {
      color: 'warning',
      variant: 'soft',
      class: 'data-[state=on]:bg-warning/20 data-[state=on]:text-warning'
    },
    {
      color: 'info',
      variant: 'soft',
      class: 'data-[state=on]:bg-info/20 data-[state=on]:text-info'
    },
    {
      color: 'carbon',
      variant: 'soft',
      class: 'data-[state=on]:bg-carbon/20 data-[state=on]:text-carbon'
    },
    {
      color: 'secondary',
      variant: 'soft',
      class: 'data-[state=on]:bg-secondary-foreground/10 data-[state=on]:text-secondary-foreground'
    },
    {
      color: 'accent',
      variant: 'soft',
      class: 'data-[state=on]:bg-accent-foreground/10 data-[state=on]:text-accent-foreground'
    },
    {
      color: 'primary',
      variant: 'ghost',
      class: 'data-[state=on]:bg-primary/20 data-[state=on]:text-primary'
    },
    {
      color: 'destructive',
      variant: 'ghost',
      class: 'data-[state=on]:bg-destructive/20 data-[state=on]:text-destructive'
    },
    {
      color: 'success',
      variant: 'ghost',
      class: 'data-[state=on]:bg-success/20 data-[state=on]:text-success'
    },
    {
      color: 'warning',
      variant: 'ghost',
      class: 'data-[state=on]:bg-warning/20 data-[state=on]:text-warning'
    },
    {
      color: 'info',
      variant: 'ghost',
      class: 'data-[state=on]:bg-info/20 data-[state=on]:text-info'
    },
    {
      color: 'carbon',
      variant: 'ghost',
      class: 'data-[state=on]:bg-carbon/20 data-[state=on]:text-carbon'
    },
    {
      color: 'secondary',
      variant: 'ghost',
      class: 'data-[state=on]:bg-secondary-foreground/10 data-[state=on]:text-secondary-foreground'
    },
    {
      color: 'accent',
      variant: 'ghost',
      class: 'data-[state=on]:bg-accent-foreground/10 data-[state=on]:text-accent-foreground'
    },
    {
      size: 'xs',
      shape: ['square', 'circle'],
      class: 'w-6'
    },
    {
      size: 'sm',
      shape: ['square', 'circle'],
      class: 'w-7'
    },
    {
      size: 'md',
      shape: ['square', 'circle'],
      class: 'w-8'
    },
    {
      size: 'lg',
      shape: ['square', 'circle'],
      class: 'w-9'
    },
    {
      size: 'xl',
      shape: ['square', 'circle'],
      class: 'w-10'
    },
    {
      size: '2xl',
      shape: ['square', 'circle'],
      class: 'w-12'
    }
  ],
  defaultVariants: {
    color: 'accent',
    variant: 'ghost',
    size: 'md',
    shape: 'auto'
  }
});

type ToggleVariants = VariantProps<typeof toggleVariants>;

export type ToggleVariant = NonNullable<ToggleVariants['variant']>;

export type ToggleShape = NonNullable<ToggleVariants['shape']>;
