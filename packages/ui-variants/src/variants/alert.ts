// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const alertVariants = tv({
  slots: {
    root: 'relative flex w-full rounded-lg border',
    wrapper: 'flex-1 flex flex-col',
    icon: 'shrink-0',
    title: 'font-medium tracking-tight',
    description: '[&_p]:leading-relaxed',
    action: 'shrink-0',
    close: 'shrink-0'
  },
  variants: {
    color: {
      primary: {
        root: 'border-primary text-primary',
        icon: 'text-primary'
      },
      destructive: {
        root: 'border-destructive text-destructive',
        icon: 'text-destructive'
      },
      success: {
        root: 'border-success text-success',
        icon: 'text-success'
      },
      warning: {
        root: 'border-warning text-warning',
        icon: 'text-warning'
      },
      info: {
        root: 'border-info text-info',
        icon: 'text-info'
      },
      carbon: {
        root: 'border-carbon text-carbon',
        icon: 'text-carbon'
      },
      secondary: {
        root: 'border-secondary-foreground/50 text-secondary-foreground',
        icon: 'text-secondary-foreground'
      },
      accent: {
        root: 'border-accent-foreground/50 text-accent-foreground',
        icon: 'text-accent-foreground'
      }
    },
    variant: {
      solid: {
        root: ''
      },
      pure: {
        root: 'bg-background text-foreground border-border'
      },
      outline: {
        root: 'bg-background'
      },
      soft: {
        root: 'border-0'
      },
      ghost: {
        root: ''
      }
    },
    size: {
      xs: {
        root: 'gap-2 px-2 py-1.75',
        wrapper: 'space-y-0.75',
        icon: 'text-xs',
        title: 'text-sm leading-15px',
        description: 'text-xs',
        close: 'text-xs'
      },
      sm: {
        root: 'gap-2.5 px-3 py-2.5',
        wrapper: 'space-y-1',
        icon: 'text-xs',
        title: 'text-sm leading-15px',
        description: 'text-xs',
        close: 'text-xs'
      },
      md: {
        root: 'gap-3 px-4 py-3',
        wrapper: 'space-y-1',
        icon: 'text-sm',
        title: 'text-base leading-17.5px',
        description: 'text-sm',
        close: 'text-sm'
      },
      lg: {
        root: 'gap-3.5 px-5 py-3.5',
        wrapper: 'space-y-1.25',
        icon: 'text-sm',
        title: 'text-base leading-17.5px',
        description: 'text-sm',
        close: 'text-sm'
      },
      xl: {
        root: 'gap-4 px-6 py-4',
        wrapper: 'space-y-1.5',
        icon: 'text-base',
        title: 'text-lg leading-20px',
        description: 'text-base',
        close: 'text-base'
      },
      xxl: {
        root: 'gap-4.5 px-7 py-4.5',
        wrapper: 'space-y-2',
        icon: 'text-lg',
        title: 'text-xl leading-22.5px',
        description: 'text-lg',
        close: 'text-lg'
      }
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'solid',
      class: {
        root: 'bg-primary text-primary-foreground',
        icon: 'text-primary-foreground',
        close: 'text-primary-foreground'
      }
    },
    {
      color: 'destructive',
      variant: 'solid',
      class: {
        root: 'bg-destructive text-destructive-foreground',
        icon: 'text-destructive-foreground',
        close: 'text-destructive-foreground'
      }
    },
    {
      color: 'success',
      variant: 'solid',
      class: {
        root: 'bg-success text-success-foreground',
        icon: 'text-success-foreground',
        close: 'text-success-foreground'
      }
    },
    {
      color: 'warning',
      variant: 'solid',
      class: {
        root: 'bg-warning text-warning-foreground',
        icon: 'text-warning-foreground',
        close: 'text-warning-foreground'
      }
    },
    {
      color: 'info',
      variant: 'solid',
      class: {
        root: 'bg-info text-info-foreground',
        icon: 'text-info-foreground',
        close: 'text-info-foreground'
      }
    },
    {
      color: 'carbon',
      variant: 'solid',
      class: {
        root: 'bg-carbon text-carbon-foreground',
        icon: 'text-carbon-foreground',
        close: 'text-carbon-foreground'
      }
    },
    {
      color: 'secondary',
      variant: 'solid',
      class: {
        root: 'bg-secondary text-secondary-foreground',
        icon: 'text-secondary-foreground',
        close: 'text-secondary-foreground'
      }
    },
    {
      color: 'accent',
      variant: 'solid',
      class: {
        root: 'bg-accent text-accent-foreground',
        icon: 'text-accent-foreground',
        close: 'text-accent-foreground'
      }
    },
    {
      color: 'primary',
      variant: ['soft', 'ghost'],
      class: {
        root: 'bg-primary/10'
      }
    },
    {
      color: 'destructive',
      variant: ['soft', 'ghost'],
      class: {
        root: 'bg-destructive/10'
      }
    },
    {
      color: 'success',
      variant: ['soft', 'ghost'],
      class: {
        root: 'bg-success/10'
      }
    },
    {
      color: 'warning',
      variant: ['soft', 'ghost'],
      class: {
        root: 'bg-warning/10'
      }
    },
    {
      color: 'info',
      variant: ['soft', 'ghost'],
      class: {
        root: 'bg-info/10'
      }
    },
    {
      color: 'carbon',
      variant: ['soft', 'ghost'],
      class: {
        root: 'bg-carbon/10'
      }
    },
    {
      color: 'secondary',
      variant: ['soft', 'ghost'],
      class: {
        root: 'bg-secondary-foreground/5'
      }
    },
    {
      color: 'accent',
      variant: ['soft', 'ghost'],
      class: {
        root: 'bg-accent-foreground/5'
      }
    }
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'ghost',
    size: 'md'
  }
});

type AlertVariants = VariantProps<typeof alertVariants>;

export type AlertVariant = NonNullable<AlertVariants['variant']>;

export type AlertSlots = keyof typeof alertVariants.slots;
