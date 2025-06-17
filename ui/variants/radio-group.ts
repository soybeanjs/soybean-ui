// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const radioGroupVariants = tv({
  slots: {
    root: 'flex',
    item: 'flex items-center',
    control: [
      'peer relative shrink-0 rounded-full border border-solid shadow',
      'focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background) disabled:(cursor-not-allowed opacity-50)'
    ],
    indicator: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-1/2 rounded-full',
    label: ''
  },
  variants: {
    color: {
      primary: {
        control: `border-primary focus-visible:ring-primary`,
        indicator: `bg-primary`
      },
      destructive: {
        control: `border-destructive focus-visible:ring-destructive`,
        indicator: `bg-destructive`
      },
      success: {
        control: `border-success focus-visible:ring-success`,
        indicator: `bg-success`
      },
      warning: {
        control: `border-warning focus-visible:ring-warning`,
        indicator: `bg-warning`
      },
      info: {
        control: `border-info focus-visible:ring-info`,
        indicator: `bg-info`
      },
      carbon: {
        control: `border-carbon focus-visible:ring-carbon`,
        indicator: `bg-carbon`
      },
      secondary: {
        control: `border-secondary-foreground focus-visible:ring-secondary-foreground/20`,
        indicator: `bg-secondary-foreground/60`
      },
      accent: {
        control: `border-accent-foreground focus-visible:ring-accent-foreground/20`,
        indicator: `bg-accent-foreground/60`
      }
    },
    size: {
      xs: {
        root: 'gap-x-2 gap-y-1.5',
        item: 'gap-1.5',
        control: 'size-3'
      },
      sm: {
        root: 'gap-x-2.5 gap-y-1.75',
        item: 'gap-1.75',
        control: 'size-3.5'
      },
      md: {
        root: 'gap-x-3 gap-y-2',
        item: 'gap-2',
        control: 'size-4'
      },
      lg: {
        root: 'gap-x-3.5 gap-y-2.5',
        item: 'gap-2.5',
        control: 'size-4.5'
      },
      xl: {
        root: 'gap-x-4 gap-y-3',
        item: 'gap-3',
        control: 'size-5'
      },
      '2xl': {
        root: 'gap-x-4.5 gap-y-3.5',
        item: 'gap-3.5',
        control: 'size-6'
      }
    },
    orientation: {
      horizontal: {
        root: 'items-center'
      },
      vertical: {
        root: 'flex-col'
      }
    },
    variant: {
      dot: {
        indicator: ''
      },
      outline: {
        control: ''
      }
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-primary',
        indicator: 'bg-background'
      }
    },
    {
      color: 'destructive',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-destructive',
        indicator: 'bg-background'
      }
    },
    {
      color: 'success',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-success',
        indicator: 'bg-background'
      }
    },
    {
      color: 'warning',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-warning',
        indicator: 'bg-background'
      }
    },
    {
      color: 'info',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-info',
        indicator: 'bg-background'
      }
    },
    {
      color: 'carbon',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-carbon',
        indicator: 'bg-background'
      }
    },
    {
      color: 'secondary',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-secondary-foreground',
        indicator: 'bg-background'
      }
    },
    {
      color: 'accent',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-accent-foreground',
        indicator: 'bg-background'
      }
    }
  ],
  defaultVariants: {
    variant: 'dot',
    color: 'primary',
    size: 'md',
    orientation: 'horizontal'
  }
});

export const radioCardGroupVariants = tv({
  slots: {
    root: 'flex',
    item: 'relative inline-flex border border-solid border-border rounded-md',
    content: 'flex items-center grow',
    textContent: 'flex flex-col',
    icon: 'shrink-0',
    label: 'font-medium',
    description: 'text-muted-foreground',
    control: [
      'peer shrink-0 inline-flex items-center justify-center rounded-full border border-solid shadow',
      'focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background) disabled:(cursor-not-allowed opacity-50)',
      'order-1 after:absolute after:inset-0 after:content-empty'
    ],
    indicator: 'size-1/2 rounded-full'
  },
  variants: {
    color: {
      primary: {
        item: 'data-[state=checked]:border-primary',
        control: `border-primary focus-visible:ring-primary`,
        indicator: `bg-primary`
      },
      destructive: {
        item: 'data-[state=checked]:border-destructive',
        control: `border-destructive focus-visible:ring-destructive`,
        indicator: `bg-destructive`
      },
      success: {
        item: 'data-[state=checked]:border-success',
        control: `border-success focus-visible:ring-success`,
        indicator: `bg-success`
      },
      warning: {
        item: 'data-[state=checked]:border-warning',
        control: `border-warning focus-visible:ring-warning`,
        indicator: `bg-warning`
      },
      info: {
        item: 'data-[state=checked]:border-info',
        control: `border-info focus-visible:ring-info`,
        indicator: `bg-info`
      },
      carbon: {
        item: 'data-[state=checked]:border-carbon',
        control: `border-carbon focus-visible:ring-carbon`,
        indicator: `bg-carbon`
      },
      secondary: {
        item: 'data-[state=checked]:border-secondary-foreground',
        control: `border-secondary-foreground focus-visible:ring-secondary-foreground/20`,
        indicator: `bg-secondary-foreground/60`
      },
      accent: {
        item: 'data-[state=checked]:border-accent-foreground',
        control: `border-accent-foreground focus-visible:ring-accent-foreground/20`,
        indicator: `bg-accent-foreground/60`
      }
    },
    size: {
      xs: {
        root: 'gap-x-2 gap-y-1.5',
        item: 'gap-2 text-2xs p-2',
        content: 'gap-2',
        textContent: 'gap-0.5',
        icon: 'text-3',
        description: 'text-3xs',
        control: 'size-3'
      },
      sm: {
        root: 'gap-x-2.5 gap-y-1.75',
        item: 'gap-2.5 text-xs p-2.5',
        content: 'gap-2.5',
        textContent: 'gap-0.75',
        icon: 'text-4',
        description: 'text-2xs',
        control: 'size-3.5'
      },
      md: {
        root: 'gap-x-3 gap-y-2',
        item: 'gap-3 text-sm p-3',
        content: 'gap-3',
        textContent: 'gap-1',
        icon: 'text-5',
        description: 'text-xs',
        control: 'size-4'
      },
      lg: {
        root: 'gap-x-3.5 gap-y-2.5',
        item: 'gap-4 text-base p-4',
        content: 'gap-4',
        textContent: 'gap-1.5',
        icon: 'text-6',
        description: 'text-sm',
        control: 'size-4.5'
      },
      xl: {
        root: 'gap-x-4 gap-y-3',
        item: 'gap-5 text-lg p-5',
        content: 'gap-5',
        textContent: 'gap-2',
        icon: 'text-7',
        description: 'text-base',
        control: 'size-5'
      },
      '2xl': {
        root: 'gap-x-4.5 gap-y-3.5',
        item: 'gap-6 text-xl p-6',
        content: 'gap-6',
        textContent: 'gap-2.5',
        icon: 'text-8',
        description: 'text-lg',
        control: 'size-6'
      }
    },
    variant: {
      dot: {
        indicator: ''
      },
      outline: {
        control: ''
      }
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-primary',
        indicator: 'bg-background'
      }
    },
    {
      color: 'destructive',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-destructive',
        indicator: 'bg-background'
      }
    },
    {
      color: 'success',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-success',
        indicator: 'bg-background'
      }
    },
    {
      color: 'warning',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-warning',
        indicator: 'bg-background'
      }
    },
    {
      color: 'info',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-info',
        indicator: 'bg-background'
      }
    },
    {
      color: 'carbon',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-carbon',
        indicator: 'bg-background'
      }
    },
    {
      color: 'secondary',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-secondary-foreground',
        indicator: 'bg-background'
      }
    },
    {
      color: 'accent',
      variant: 'outline',
      class: {
        control: 'data-[state=checked]:bg-accent-foreground',
        indicator: 'bg-background'
      }
    }
  ],
  defaultVariants: {
    variant: 'dot',
    color: 'primary',
    size: 'md'
  }
});

type RadioGroupProps = VariantProps<typeof radioGroupVariants>;

export type RadioGroupVariant = NonNullable<RadioGroupProps['variant']>;
