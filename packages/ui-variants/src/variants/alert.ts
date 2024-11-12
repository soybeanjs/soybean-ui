// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const alertVariants = tv({
  slots: {
    root: 'relative w-full rounded-lg border px-4 py-3 text-sm',
    header: 'flex-y-center justify-between',
    titleRoot: 'flex-y-center gap-2',
    title: 'font-medium leading-none tracking-tight',
    description: 'mt-1 text-sm [&_p]:leading-relaxed'
  },
  variants: {
    color: {
      primary: {
        root: 'border-primary text-primary',
        titleRoot: '[&>svg]:text-primary'
      },
      destructive: {
        root: 'border-destructive text-destructive',
        titleRoot: '[&>svg]:text-destructive'
      },
      success: {
        root: 'border-success text-success',
        titleRoot: '[&>svg]:text-success'
      },
      warning: {
        root: 'border-warning text-warning',
        titleRoot: '[&>svg]:text-warning'
      },
      info: {
        root: 'border-info text-info dark:border-info',
        titleRoot: '[&>svg]:text-info'
      },
      secondary: {
        root: 'border-secondary-foreground/50 text-secondary-foreground',
        titleRoot: '[&>svg]:text-secondary-foreground'
      },
      accent: {
        root: 'border-accent-foreground/50 text-accent-foreground',
        titleRoot: '[&>svg]:text-accent-foreground'
      }
    },
    variant: {
      outline: {
        root: 'bg-background'
      },
      plain: {
        root: 'bg-background text-foreground border-border'
      },
      soft: {
        root: 'text-foreground'
      }
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'soft',
      class: {
        root: 'bg-primary/10'
      }
    },
    {
      color: 'destructive',
      variant: 'soft',
      class: {
        root: 'bg-destructive/10'
      }
    },
    {
      color: 'success',
      variant: 'soft',
      class: {
        root: 'bg-success/10'
      }
    },
    {
      color: 'warning',
      variant: 'soft',
      class: {
        root: 'bg-warning/10'
      }
    },
    {
      color: 'info',
      variant: 'soft',
      class: {
        root: 'bg-info/10'
      }
    },
    {
      color: 'secondary',
      variant: 'soft',
      class: {
        root: 'bg-secondary-foreground/5'
      }
    },
    {
      color: 'accent',
      variant: 'soft',
      class: {
        root: 'bg-accent-foreground/5'
      }
    }
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'soft'
  }
});

type AlertVariants = VariantProps<typeof alertVariants>;

export type AlertVariant = NonNullable<AlertVariants['variant']>;
