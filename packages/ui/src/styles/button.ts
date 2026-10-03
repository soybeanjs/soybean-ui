// @unocss-include
import { cv, defaults, derive } from '@soybeanjs/cva';
import type { VariantProps } from '@soybeanjs/cva';
import { miniSizeMap } from '@/theme';

export const buttonVariants = cv({
  base: [
    'inline-flex items-center justify-center font-medium transition-all-150',
    'outline-none focus-visible:ring-3 focus-visible:ring-offset-card',
    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
  ],
  variants: {
    color: {
      primary: `focus-visible:ring-primary/30`,
      destructive: `focus-visible:ring-destructive/30`,
      success: `focus-visible:ring-success/30`,
      warning: `focus-visible:ring-warning/30`,
      info: `focus-visible:ring-info/30`,
      carbon: `focus-visible:ring-carbon/30`,
      secondary: `focus-visible:ring-secondary-foreground/20 text-secondary-foreground`,
      accent: `focus-visible:ring-accent-foreground/10 text-accent-foreground`
    },
    variant: {
      solid: '',
      pure: 'border border-border bg-card text-accent-foreground data-[normal]:hover:bg-accent data-[normal]:active:bg-accent-foreground/10',
      plain: 'border border-border bg-card text-foreground',
      outline: 'border bg-card',
      dashed: 'border border-dashed bg-card',
      soft: '',
      ghost: 'bg-transparent',
      link: 'bg-transparent underline-offset-4 data-[normal]:hover:underline'
    },
    size: {
      xs: 'gap-1 text-2xs',
      sm: 'gap-2 text-xs',
      md: 'gap-3 text-sm',
      lg: 'gap-4 text-base',
      xl: 'gap-5 text-lg',
      '2xl': 'gap-6 text-xl'
    },
    shape: {
      auto: 'rounded-md',
      rounded: 'rounded-full',
      square: 'rounded-md',
      circle: 'rounded-full'
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg'
    },
    fitContent: {
      true: 'w-fit h-fit',
      false: ''
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'solid',
      class: `bg-primary text-primary-foreground data-[normal]:hover:bg-primary/80 data-[normal]:active:bg-primary-600`
    },
    {
      color: 'destructive',
      variant: 'solid',
      class: `bg-destructive text-destructive-foreground data-[normal]:hover:bg-destructive/80 data-[normal]:active:bg-destructive-600`
    },
    {
      color: 'success',
      variant: 'solid',
      class: `bg-success text-success-foreground data-[normal]:hover:bg-success/80 data-[normal]:active:bg-success-600`
    },
    {
      color: 'warning',
      variant: 'solid',
      class: `bg-warning text-warning-foreground data-[normal]:hover:bg-warning/80 data-[normal]:active:bg-warning-600`
    },
    {
      color: 'info',
      variant: 'solid',
      class: `bg-info text-info-foreground data-[normal]:hover:bg-info/80 data-[normal]:active:bg-info-600`
    },
    {
      color: 'carbon',
      variant: 'solid',
      class: `bg-carbon text-carbon-foreground data-[normal]:hover:bg-carbon/80 data-[normal]:active:bg-carbon`
    },
    {
      color: 'secondary',
      variant: ['solid', 'soft'],
      class: `bg-secondary`
    },
    {
      color: 'accent',
      variant: ['solid', 'soft'],
      class: `bg-accent`
    },
    {
      color: 'primary',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link'],
      class: 'text-primary'
    },
    {
      color: 'destructive',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link'],
      class: 'text-destructive'
    },
    {
      color: 'success',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link'],
      class: 'text-success'
    },
    {
      color: 'warning',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link'],
      class: 'text-warning'
    },
    {
      color: 'info',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link'],
      class: 'text-info'
    },
    {
      color: 'carbon',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link'],
      class: 'text-carbon'
    },
    {
      color: 'primary',
      variant: ['outline', 'dashed', 'ghost'],
      class: 'data-[normal]:hover:bg-primary/10 data-[normal]:active:bg-primary/20'
    },
    {
      color: 'destructive',
      variant: ['outline', 'dashed', 'ghost'],
      class: 'data-[normal]:hover:bg-destructive/10 data-[normal]:active:bg-destructive/20'
    },
    {
      color: 'success',
      variant: ['outline', 'dashed', 'ghost'],
      class: 'data-[normal]:hover:bg-success/10 data-[normal]:active:bg-success/20'
    },
    {
      color: 'warning',
      variant: ['outline', 'dashed', 'ghost'],
      class: 'data-[normal]:hover:bg-warning/10 data-[normal]:active:bg-warning/20'
    },
    {
      color: 'info',
      variant: ['outline', 'dashed', 'ghost'],
      class: 'data-[normal]:hover:bg-info/10 data-[normal]:active:bg-info/20'
    },
    {
      color: 'carbon',
      variant: ['outline', 'dashed', 'ghost'],
      class: 'data-[normal]:hover:bg-carbon/10 data-[normal]:active:bg-carbon/20'
    },
    {
      color: 'secondary',
      variant: ['solid', 'outline', 'dashed', 'soft', 'ghost'],
      class: 'data-[normal]:hover:bg-secondary data-[normal]:active:bg-secondary-foreground/20'
    },
    {
      color: 'accent',
      variant: ['solid', 'outline', 'dashed', 'soft', 'ghost'],
      class: 'data-[normal]:hover:bg-accent data-[normal]:active:bg-accent-foreground/10'
    },
    {
      color: 'primary',
      variant: 'plain',
      class: 'data-[normal]:hover:border-primary data-[normal]:hover:text-primary'
    },
    {
      color: 'destructive',
      variant: 'plain',
      class: 'data-[normal]:hover:border-destructive data-[normal]:hover:text-destructive'
    },
    {
      color: 'success',
      variant: 'plain',
      class: 'data-[normal]:hover:border-success data-[normal]:hover:text-success'
    },
    {
      color: 'warning',
      variant: 'plain',
      class: 'data-[normal]:hover:border-warning data-[normal]:hover:text-warning'
    },
    {
      color: 'info',
      variant: 'plain',
      class: 'data-[normal]:hover:border-info data-[normal]:hover:text-info'
    },
    {
      color: 'carbon',
      variant: 'plain',
      class: 'data-[normal]:hover:border-carbon data-[normal]:hover:text-carbon'
    },
    {
      color: 'secondary',
      variant: 'plain',
      class: 'data-[normal]:hover:border-secondary-foreground/20'
    },
    {
      color: 'accent',
      variant: 'plain',
      class: 'data-[normal]:hover:border-accent-foreground/10'
    },
    {
      color: 'primary',
      variant: ['outline', 'dashed'],
      class: 'border-primary'
    },
    {
      color: 'destructive',
      variant: ['outline', 'dashed'],
      class: 'border-destructive'
    },
    {
      color: 'success',
      variant: ['outline', 'dashed'],
      class: 'border-success'
    },
    {
      color: 'warning',
      variant: ['outline', 'dashed'],
      class: 'border-warning'
    },
    {
      color: 'info',
      variant: ['outline', 'dashed'],
      class: 'border-info'
    },
    {
      color: 'carbon',
      variant: ['outline', 'dashed'],
      class: 'border-carbon'
    },
    {
      color: 'secondary',
      variant: ['outline', 'dashed'],
      class: 'border-secondary-foreground/20'
    },
    {
      color: 'accent',
      variant: ['outline', 'dashed'],
      class: 'border-accent-foreground/10'
    },
    {
      color: 'primary',
      variant: 'soft',
      class: 'bg-primary/10 data-[normal]:hover:bg-primary/10 data-[normal]:active:bg-primary/20'
    },
    {
      color: 'destructive',
      variant: 'soft',
      class: 'bg-destructive/10 data-[normal]:hover:bg-destructive/10 data-[normal]:active:bg-destructive/20'
    },
    {
      color: 'success',
      variant: 'soft',
      class: 'bg-success/10 data-[normal]:hover:bg-success/10 data-[normal]:active:bg-success/20'
    },
    {
      color: 'warning',
      variant: 'soft',
      class: 'bg-warning/10 data-[normal]:hover:bg-warning/10 data-[normal]:active:bg-warning/20'
    },
    {
      color: 'info',
      variant: 'soft',
      class: 'bg-info/10 data-[normal]:hover:bg-info/10 data-[normal]:active:bg-info/20'
    },
    {
      color: 'carbon',
      variant: 'soft',
      class: 'bg-carbon/10 data-[normal]:hover:bg-carbon/10 data-[normal]:active:bg-carbon/20'
    },
    {
      size: 'xs',
      fitContent: true,
      class: 'p-0.75'
    },
    {
      size: 'sm',
      fitContent: true,
      class: 'p-0.875'
    },
    {
      size: 'md',
      fitContent: true,
      class: 'p-1'
    },
    {
      size: 'lg',
      fitContent: true,
      class: 'p-1.25'
    },
    {
      size: 'xl',
      fitContent: true,
      class: 'p-1.5'
    },
    {
      size: '2xl',
      fitContent: true,
      class: 'p-1.75'
    },
    {
      size: 'xs',
      fitContent: false,
      class: 'h-6 px-1.5'
    },
    {
      size: 'sm',
      fitContent: false,
      class: 'h-7 px-2'
    },
    {
      size: 'md',
      fitContent: false,
      class: 'h-8 px-4'
    },
    {
      size: 'lg',
      fitContent: false,
      class: 'h-9 px-6'
    },
    {
      size: 'xl',
      fitContent: false,
      class: 'h-10 px-8'
    },
    {
      size: '2xl',
      fitContent: false,
      class: 'h-12 px-10'
    },
    {
      shape: ['square', 'circle'],
      fitContent: false,
      class: 'p-0 gap-0'
    },
    {
      size: 'xs',
      fitContent: false,
      shape: ['square', 'circle'],
      class: 'w-6'
    },
    {
      size: 'sm',
      fitContent: false,
      shape: ['square', 'circle'],
      class: 'w-7'
    },
    {
      size: 'md',
      fitContent: false,
      shape: ['square', 'circle'],
      class: 'w-8'
    },
    {
      size: 'lg',
      fitContent: false,
      shape: ['square', 'circle'],
      class: 'w-9'
    },
    {
      size: 'xl',
      fitContent: false,
      shape: ['square', 'circle'],
      class: 'w-10'
    },
    {
      size: '2xl',
      fitContent: false,
      shape: ['square', 'circle'],
      class: 'w-12'
    },
    {
      variant: ['ghost', 'link'],
      shadow: ['sm', 'md', 'lg'],
      class: 'shadow-none'
    },
    {
      variant: 'plain',
      shadow: 'sm',
      class: 'active:shadow-md'
    },
    {
      variant: 'plain',
      shadow: 'md',
      class: 'active:shadow-lg'
    },
    {
      variant: 'plain',
      shadow: 'lg',
      class: 'active:shadow-xl'
    },
    {
      variant: 'pure',
      shadow: 'sm',
      class: 'active:shadow-sm'
    },
    {
      variant: 'pure',
      shadow: 'md',
      class: 'active:shadow-md'
    },
    {
      variant: 'pure',
      shadow: 'lg',
      class: 'active:shadow-lg'
    }
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    shape: 'auto',
    shadow: 'sm',
    fitContent: false
  }
});

export const buttonGroupVariants = cv({
  base: `[&>*]:relative focus-visible:[&>*]:z-2 not-first:not-last:[&>*]:rounded-0`,
  variants: {
    orientation: {
      horizontal: `inline-flex not-last:[&>*]:border-e-0 focus-visible:[&>*]:border-e first:[&>*]:rounded-e-0 last:[&>*]:rounded-s-0`,
      vertical: `flex flex-col not-last:[&>*]:border-b-0 focus-visible:[&>*]:border-b first:[&>*]:rounded-b-0 last:[&>*]:rounded-t-0`
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});

export const buttonIconVariants = defaults(buttonVariants, {
  size: 'md',
  color: 'accent',
  variant: 'ghost',
  shape: 'square',
  fitContent: true
});

export const miniButtonVariants = derive(buttonVariants, props => ({
  ...props,
  size: miniSizeMap[props.size ?? 'md']
}));

export const miniButtonIconVariants = derive(buttonIconVariants, props => ({
  ...props,
  size: miniSizeMap[props.size ?? 'md']
}));

type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonVariant = NonNullable<ButtonVariants['variant']>;

export type ButtonShape = NonNullable<ButtonVariants['shape']>;

export type ButtonShadow = NonNullable<ButtonVariants['shadow']>;
