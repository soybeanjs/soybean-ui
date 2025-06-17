// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const checkboxVariants = tv({
  slots: {
    groupRoot: 'flex',
    root: 'inline-flex items-center',
    control: [
      'peer shrink-0 border shadow',
      'focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background) disabled:(cursor-not-allowed opacity-50)'
    ],
    indicator: 'size-full flex items-center justify-center text-current',
    label: ''
  },
  variants: {
    color: {
      primary: {
        control: `border-primary focus-visible:ring-primary data-[state=checked]:(bg-primary text-primary-foreground) data-[state=indeterminate]:(bg-primary text-primary-foreground)`
      },
      destructive: {
        control: `border-destructive focus-visible:ring-destructive data-[state=checked]:(bg-destructive text-destructive-foreground) data-[state=indeterminate]:(bg-destructive text-destructive-foreground)`
      },
      success: {
        control: `border-success focus-visible:ring-success data-[state=checked]:(bg-success text-success-foreground) data-[state=indeterminate]:(bg-success text-success-foreground)`
      },
      warning: {
        control: `border-warning focus-visible:ring-warning data-[state=checked]:(bg-warning text-warning-foreground) data-[state=indeterminate]:(bg-warning text-warning-foreground)`
      },
      info: {
        control: `border-info focus-visible:ring-info data-[state=checked]:(bg-info text-info-foreground) data-[state=indeterminate]:(bg-info text-info-foreground)`
      },
      carbon: {
        control: `border-carbon focus-visible:ring-carbon data-[state=checked]:(bg-carbon text-carbon-foreground) data-[state=indeterminate]:(bg-carbon text-carbon-foreground)`
      },
      secondary: {
        control: `border-secondary-foreground/50 focus-visible:ring-secondary-foreground/20 data-[state=checked]:(bg-secondary-foreground/5 text-secondary-foreground) data-[state=indeterminate]:(bg-secondary-foreground/5 text-secondary-foreground)`
      },
      accent: {
        control: `border-accent-foreground/50 focus-visible:ring-accent-foreground/20 data-[state=checked]:(bg-accent-foreground/5 text-accent-foreground) data-[state=indeterminate]:(bg-accent-foreground/5 text-accent-foreground)`
      }
    },
    size: {
      xs: {
        groupRoot: 'gap-x-2 gap-y-1.5',
        root: 'gap-1.5',
        control: 'size-3'
      },
      sm: {
        groupRoot: 'gap-x-2.5 gap-y-1.75',
        root: 'gap-1.75',
        control: 'size-3.5'
      },
      md: {
        groupRoot: 'gap-x-3 gap-y-2',
        root: 'gap-2',
        control: 'size-4'
      },
      lg: {
        groupRoot: 'gap-x-3.5 gap-y-2.5',
        root: 'gap-2.5',
        control: 'size-4.5'
      },
      xl: {
        groupRoot: 'gap-x-4 gap-y-3',
        root: 'gap-3',
        control: 'size-5'
      },
      '2xl': {
        groupRoot: 'gap-x-4.5 gap-y-3.5',
        root: 'gap-3.5',
        control: 'size-6'
      }
    },
    orientation: {
      horizontal: {
        groupRoot: 'items-center'
      },
      vertical: {
        groupRoot: 'flex-col'
      }
    },
    shape: {
      square: {
        control: 'rounded-sm'
      },
      rounded: {
        control: 'rounded-full'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    orientation: 'horizontal',
    shape: 'square'
  }
});

export const checkboxCardVariants = tv({
  slots: {
    groupRoot: 'flex',
    root: 'relative inline-flex border border-solid border-border rounded-md',
    content: 'flex items-center grow',
    textContent: 'flex flex-col',
    icon: 'shrink-0',
    label: 'font-medium',
    description: 'text-muted-foreground',
    control: [
      'peer shrink-0 border shadow',
      'focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background) disabled:(cursor-not-allowed opacity-50)',
      'order-1 after:absolute after:inset-0 after:content-empty'
    ],
    indicator: 'size-full flex items-center justify-center text-current'
  },
  variants: {
    color: {
      primary: {
        root: 'data-[checked]:(border-primary)',
        control: `border-primary focus-visible:ring-primary data-[state=checked]:(bg-primary text-primary-foreground) data-[state=indeterminate]:(bg-primary text-primary-foreground)`
      },
      destructive: {
        root: 'data-[checked]:(border-destructive)',
        control: `border-destructive focus-visible:ring-destructive data-[state=checked]:(bg-destructive text-destructive-foreground) data-[state=indeterminate]:(bg-destructive text-destructive-foreground)`
      },
      success: {
        root: 'data-[checked]:(border-success)',
        control: `border-success focus-visible:ring-success data-[state=checked]:(bg-success text-success-foreground) data-[state=indeterminate]:(bg-success text-success-foreground)`
      },
      warning: {
        root: 'data-[checked]:(border-warning)',
        control: `border-warning focus-visible:ring-warning data-[state=checked]:(bg-warning text-warning-foreground) data-[state=indeterminate]:(bg-warning text-warning-foreground)`
      },
      info: {
        root: 'data-[checked]:(border-info)',
        control: `border-info focus-visible:ring-info data-[state=checked]:(bg-info text-info-foreground) data-[state=indeterminate]:(bg-info text-info-foreground)`
      },
      carbon: {
        root: 'data-[checked]:(border-carbon)',
        control: `border-carbon focus-visible:ring-carbon data-[state=checked]:(bg-carbon text-carbon-foreground) data-[state=indeterminate]:(bg-carbon text-carbon-foreground)`
      },
      secondary: {
        root: 'data-[checked]:(border-secondary-foreground/50)',
        control: `border-secondary-foreground/50 focus-visible:ring-secondary-foreground/20 data-[state=checked]:(bg-secondary-foreground/5 text-secondary-foreground) data-[state=indeterminate]:(bg-secondary-foreground/5 text-secondary-foreground)`
      },
      accent: {
        root: 'data-[checked]:(border-accent-foreground/50)',
        control: `border-accent-foreground/50 focus-visible:ring-accent-foreground/20 data-[state=checked]:(bg-accent-foreground/5 text-accent-foreground) data-[state=indeterminate]:(bg-accent-foreground/5 text-accent-foreground)`
      }
    },
    size: {
      xs: {
        groupRoot: 'gap-x-2 gap-y-1.5',
        root: 'gap-2 text-2xs p-2',
        content: 'gap-2',
        textContent: 'gap-0.5',
        icon: 'text-3',
        description: 'text-3xs',
        control: 'size-3'
      },
      sm: {
        groupRoot: 'gap-x-2.5 gap-y-1.75',
        root: 'gap-2.5 text-xs p-2.5',
        content: 'gap-2.5',
        textContent: 'gap-0.75',
        icon: 'text-4',
        description: 'text-2xs',
        control: 'size-3.5'
      },
      md: {
        groupRoot: 'gap-x-3 gap-y-2',
        root: 'gap-3 text-sm p-3',
        content: 'gap-3',
        textContent: 'gap-1',
        icon: 'text-5',
        description: 'text-xs',
        control: 'size-4'
      },
      lg: {
        groupRoot: 'gap-x-3.5 gap-y-2.5',
        root: 'gap-4 text-base p-4',
        content: 'gap-4',
        textContent: 'gap-1.5',
        icon: 'text-6',
        description: 'text-sm',
        control: 'size-4.5'
      },
      xl: {
        groupRoot: 'gap-x-4 gap-y-3',
        root: 'gap-5 text-lg p-5',
        content: 'gap-5',
        textContent: 'gap-2',
        icon: 'text-7',
        description: 'text-base',
        control: 'size-5'
      },
      '2xl': {
        groupRoot: 'gap-x-4.5 gap-y-3.5',
        root: 'gap-6 text-xl p-6',
        content: 'gap-6',
        textContent: 'gap-2.5',
        icon: 'text-8',
        description: 'text-lg',
        control: 'size-6'
      }
    },
    shape: {
      square: {
        control: 'rounded-sm'
      },
      rounded: {
        control: 'rounded-full'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    shape: 'square'
  }
});

type CheckboxProps = VariantProps<typeof checkboxVariants>;

export type CheckboxShape = NonNullable<CheckboxProps['shape']>;
