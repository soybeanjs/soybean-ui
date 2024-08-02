// @unocss-include
import { cva } from 'class-variance-authority';
import type { ThemeColor, ThemeSize } from '../types/theme';

export type ButtonColor = ThemeColor;

export type ButtonVariant = 'solid' | 'plain' | 'outline' | 'dashed' | 'soft' | 'ghost' | 'link';

export type ButtonSize = ThemeSize;

export type ButtonShape = 'auto' | 'rounded' | 'circle' | 'square';

type Variants = {
  color: Record<ButtonColor, string>;
  variant: Record<ButtonVariant, string>;
  size: Record<ButtonSize, string>;
  shape: Record<ButtonShape, string>;
};

export const buttonVariants = cva<Variants>(
  'inline-flex items-center justify-center text-sm font-medium focus-visible:(outline outline-2 outline-offset-2) disabled:(pointer-events-none opacity-50)',
  {
    variants: {
      color: {
        primary: `focus-visible:outline-primary`,
        destructive: `focus-visible:outline-destructive`,
        success: `focus-visible:outline-success`,
        warning: `focus-visible:outline-warning`,
        info: `focus-visible:outline-info`,
        secondary: `focus-visible:outline-secondary-foreground`,
        accent: `focus-visible:outline-accent-foreground`
      },
      variant: {
        solid: 'bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary-600',
        plain: 'border border-border bg-background text-foreground',
        outline: 'border bg-background',
        dashed: 'border border-dashed bg-background',
        soft: 'bg-primary/10 hover:bg-primary/10 active:bg-primary/20',
        ghost: 'bg-transparent',
        link: 'bg-transparent underline-offset-4 hover:underline'
      },
      size: {
        xs: 'h-6 px-1.5 text-xs gap-1',
        sm: 'h-7 px-2 gap-2',
        md: 'h-8 px-4 gap-3',
        lg: 'h-9 px-6 gap-4',
        xl: 'h-10 px-8 gap-5',
        xxl: 'h-12 px-10 gap-6'
      },
      shape: {
        auto: 'rd-md',
        rounded: 'rd-full',
        square: 'h-8 w-8 p-0 gap-0 rd-md',
        circle: 'h-8 w-8 p-0 gap-0 rd-full'
      }
    },
    compoundVariants: [
      {
        color: 'destructive',
        variant: 'solid',
        class: `bg-destructive text-destructive-foreground hover:bg-destructive/80 active:bg-destructive-600`
      },
      {
        color: 'success',
        variant: 'solid',
        class: `bg-success text-success-foreground hover:bg-success/80 active:bg-success-600`
      },
      {
        color: 'warning',
        variant: 'solid',
        class: `bg-warning text-warning-foreground hover:bg-warning/80 active:bg-warning-600`
      },
      {
        color: 'info',
        variant: 'solid',
        class: `bg-info text-info-foreground hover:bg-info/80 active:bg-info-600`
      },
      {
        color: 'secondary',
        variant: 'solid',
        class: `bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary-foreground/20`
      },
      {
        color: 'accent',
        variant: 'solid',
        class: `bg-accent text-accent-foreground hover:bg-accent/80 active:bg-accent-foreground/20`
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
        color: 'secondary',
        variant: ['outline', 'dashed', 'soft', 'ghost', 'link'],
        class: 'text-secondary-foreground'
      },
      {
        color: 'accent',
        variant: ['outline', 'dashed', 'soft', 'ghost', 'link'],
        class: 'text-accent-foreground'
      },
      {
        color: 'primary',
        variant: ['plain', 'outline', 'dashed', 'ghost'],
        class: 'hover:bg-primary/10 active:bg-primary/20'
      },
      {
        color: 'destructive',
        variant: ['plain', 'outline', 'dashed', 'ghost'],
        class: 'hover:bg-destructive/10 active:bg-destructive/20'
      },
      {
        color: 'success',
        variant: ['plain', 'outline', 'dashed', 'ghost'],
        class: 'hover:bg-success/10 active:bg-success/20'
      },
      {
        color: 'warning',
        variant: ['plain', 'outline', 'dashed', 'ghost'],
        class: 'hover:bg-warning/10 active:bg-warning/20'
      },
      {
        color: 'info',
        variant: ['plain', 'outline', 'dashed', 'ghost'],
        class: 'hover:bg-info/10 active:bg-info/20'
      },
      {
        color: 'secondary',
        variant: ['plain', 'outline', 'dashed', 'ghost'],
        class: 'hover:bg-secondary-foreground/10 active:bg-secondary-foreground/20'
      },
      {
        color: 'accent',
        variant: ['plain', 'outline', 'dashed', 'ghost'],
        class: 'hover:bg-accent-foreground/10 active:bg-accent-foreground/20'
      },
      {
        color: 'primary',
        variant: 'plain',
        class: 'hover:border-primary hover:text-primary'
      },
      {
        color: 'destructive',
        variant: 'plain',
        class: 'hover:border-destructive hover:text-destructive'
      },
      {
        color: 'success',
        variant: 'plain',
        class: 'hover:border-success hover:text-success'
      },
      {
        color: 'warning',
        variant: 'plain',
        class: 'hover:border-warning hover:text-warning'
      },
      {
        color: 'info',
        variant: 'plain',
        class: 'hover:border-info hover:text-info'
      },
      {
        color: 'secondary',
        variant: 'plain',
        class: 'hover:border-secondary-foreground hover:text-secondary-foreground'
      },
      {
        color: 'accent',
        variant: 'plain',
        class: 'hover:border-accent-foreground hover:text-accent-foreground'
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
        color: 'secondary',
        variant: ['outline', 'dashed'],
        class: 'border-secondary-foreground'
      },
      {
        color: 'accent',
        variant: ['outline', 'dashed'],
        class: 'border-accent-foreground'
      },
      {
        color: 'destructive',
        variant: 'soft',
        class: 'bg-destructive/10 hover:bg-destructive/10 active:bg-destructive/20'
      },
      {
        color: 'success',
        variant: 'soft',
        class: 'bg-success/10 hover:bg-success/10 active:bg-success/20'
      },
      {
        color: 'warning',
        variant: 'soft',
        class: 'bg-warning/10 hover:bg-warning/10 active:bg-warning/20'
      },
      {
        color: 'info',
        variant: 'soft',
        class: 'bg-info/10 hover:bg-info/10 active:bg-info/20'
      },
      {
        color: 'secondary',
        variant: 'soft',
        class: 'bg-secondary-foreground/10 hover:bg-secondary-foreground/10 active:bg-secondary-foreground/20'
      },
      {
        color: 'accent',
        variant: 'soft',
        class: 'bg-accent-foreground/10 hover:bg-accent-foreground/10 active:bg-accent-foreground/20'
      },
      {
        size: 'xs',
        shape: ['square', 'circle'],
        class: 'h-6 w-6'
      },
      {
        size: 'sm',
        shape: ['square', 'circle'],
        class: 'h-7 w-7'
      },
      {
        size: 'lg',
        shape: ['square', 'circle'],
        class: 'h-9 w-9'
      },
      {
        size: 'xl',
        shape: ['square', 'circle'],
        class: 'h-10 w-10'
      },
      {
        size: 'xxl',
        shape: ['square', 'circle'],
        class: 'h-12 w-12'
      }
    ],
    defaultVariants: {
      color: 'primary',
      variant: 'solid',
      size: 'md',
      shape: 'auto'
    }
  }
);
