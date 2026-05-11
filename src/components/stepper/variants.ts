// @unocss-include
import { tv } from 'tailwind-variants';

export const stepperVariants = tv({
  slots: {
    root: 'flex w-full',
    item: 'group flex min-w-0 flex-1',
    trigger: [
      'inline-flex rounded-md transition-colors',
      'outline-none focus-visible:ring-3 focus-visible:ring-offset-background focus-visible:ring-primary/30',
      'data-[orientation=horizontal]:mt-0.25 data-[orientation=vertical]:ms-0.25 group-data-[disabled]:pointer-events-none'
    ],
    indicator: [
      'inline-flex shrink-0 items-center justify-center rounded-full border bg-background font-medium transition-colors',
      'group-data-[disabled]:opacity-50'
    ],
    separator: 'shrink-0 bg-muted transition-colors group-data-[disabled]:opacity-50',
    title: 'font-semibold whitespace-nowrap transition-colors',
    description: 'text-muted-foreground transition-colors',
    itemContent: 'flex min-w-0 flex-col',
    indicatorIcon: ''
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        trigger: 'gap-1 data-[orientation=vertical]:gap-2',
        indicator: 'size-6 text-2xs',
        itemContent: 'gap-1',
        title: 'text-2xs',
        description: 'text-4xs',
        separator: 'data-[orientation=horizontal]:mt-3 data-[orientation=vertical]:ms-3'
      },
      sm: {
        root: 'text-xs',
        trigger: 'gap-1.5 data-[orientation=vertical]:gap-3',
        indicator: 'size-7 text-xs',
        itemContent: 'gap-1.5',
        title: 'text-xs',
        description: 'text-3xs',
        separator: 'data-[orientation=horizontal]:mt-3.5 data-[orientation=vertical]:ms-3.5'
      },
      md: {
        root: 'text-sm',
        trigger: 'gap-2 data-[orientation=vertical]:gap-4',
        indicator: 'size-8',
        itemContent: 'gap-2',
        title: 'text-sm',
        description: 'text-xs',
        separator: 'data-[orientation=horizontal]:mt-4 data-[orientation=vertical]:ms-4'
      },
      lg: {
        root: 'text-base',
        trigger: 'gap-2.5 data-[orientation=vertical]:gap-5',
        indicator: 'size-9 text-base',
        itemContent: 'gap-2.5',
        title: 'text-base',
        description: 'text-sm',
        separator: 'data-[orientation=horizontal]:mt-4.5 data-[orientation=vertical]:ms-4.5'
      },
      xl: {
        root: 'text-lg',
        trigger: 'gap-3 data-[orientation=vertical]:gap-6',
        indicator: 'size-10 text-lg',
        itemContent: 'gap-3',
        title: 'text-lg',
        description: 'text-base',
        separator: 'data-[orientation=horizontal]:mt-5 data-[orientation=vertical]:ms-5'
      },
      '2xl': {
        root: 'text-xl',
        trigger: 'gap-3.5 data-[orientation=vertical]:gap-7',
        indicator: 'size-12 text-xl',
        itemContent: 'gap-3.5',
        title: 'text-xl',
        description: 'text-lg',
        separator: 'data-[orientation=horizontal]:mt-6 data-[orientation=vertical]:ms-6'
      }
    },
    orientation: {
      horizontal: {
        root: 'items-start',
        trigger: 'flex-col items-center text-center',
        itemContent: 'items-center text-center',
        separator: 'h-0.5 flex-1'
      },
      vertical: {
        root: 'flex-col',
        item: 'flex-none flex-col items-start',
        trigger: 'w-full flex-row items-start text-start',
        itemContent: 'flex-1 items-start text-start',
        separator: 'w-0.5 min-h-7'
      }
    },
    color: {
      primary: {
        indicator: [
          'group-data-[state=active]:border-primary group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground',
          'group-data-[state=completed]:border-primary/25 group-data-[state=completed]:bg-primary/15 group-data-[state=completed]:text-primary'
        ],
        separator: 'group-data-[state=completed]:bg-primary',
        title: 'group-data-[state=active]:text-primary group-data-[state=completed]:text-primary',
        description: 'group-data-[state=active]:text-primary/80 group-data-[state=completed]:text-primary/80'
      },
      destructive: {
        indicator: [
          'group-data-[state=active]:border-destructive group-data-[state=active]:bg-destructive group-data-[state=active]:text-destructive-foreground',
          'group-data-[state=completed]:border-destructive/25 group-data-[state=completed]:bg-destructive/15 group-data-[state=completed]:text-destructive'
        ],
        separator: 'group-data-[state=completed]:bg-destructive',
        title: 'group-data-[state=active]:text-destructive group-data-[state=completed]:text-destructive',
        description: 'group-data-[state=active]:text-destructive/80 group-data-[state=completed]:text-destructive/80'
      },
      success: {
        indicator: [
          'group-data-[state=active]:border-success group-data-[state=active]:bg-success group-data-[state=active]:text-success-foreground',
          'group-data-[state=completed]:border-success/25 group-data-[state=completed]:bg-success/15 group-data-[state=completed]:text-success'
        ],
        separator: 'group-data-[state=completed]:bg-success',
        title: 'group-data-[state=active]:text-success group-data-[state=completed]:text-success',
        description: 'group-data-[state=active]:text-success/80 group-data-[state=completed]:text-success/80'
      },
      warning: {
        indicator: [
          'group-data-[state=active]:border-warning group-data-[state=active]:bg-warning group-data-[state=active]:text-warning-foreground',
          'group-data-[state=completed]:border-warning/25 group-data-[state=completed]:bg-warning/15 group-data-[state=completed]:text-warning'
        ],
        separator: 'group-data-[state=completed]:bg-warning',
        title: 'group-data-[state=active]:text-warning group-data-[state=completed]:text-warning',
        description: 'group-data-[state=active]:text-warning/80 group-data-[state=completed]:text-warning/80'
      },
      info: {
        indicator: [
          'group-data-[state=active]:border-info group-data-[state=active]:bg-info group-data-[state=active]:text-info-foreground',
          'group-data-[state=completed]:border-info/25 group-data-[state=completed]:bg-info/15 group-data-[state=completed]:text-info'
        ],
        separator: 'group-data-[state=completed]:bg-info',
        title: 'group-data-[state=active]:text-info group-data-[state=completed]:text-info',
        description: 'group-data-[state=active]:text-info/80 group-data-[state=completed]:text-info/80'
      },
      carbon: {
        indicator: [
          'group-data-[state=active]:border-carbon group-data-[state=active]:bg-carbon group-data-[state=active]:text-carbon-foreground',
          'group-data-[state=completed]:border-carbon/25 group-data-[state=completed]:bg-carbon/15 group-data-[state=completed]:text-carbon'
        ],
        separator: 'group-data-[state=completed]:bg-carbon',
        title: 'group-data-[state=active]:text-carbon group-data-[state=completed]:text-carbon',
        description: 'group-data-[state=active]:text-carbon/80 group-data-[state=completed]:text-carbon/80'
      },
      secondary: {
        indicator: [
          'group-data-[state=active]:border-secondary group-data-[state=active]:bg-secondary group-data-[state=active]:text-secondary-foreground',
          'group-data-[state=completed]:border-secondary/25 group-data-[state=completed]:bg-secondary/15 group-data-[state=completed]:text-secondary'
        ],
        separator: 'group-data-[state=completed]:bg-secondary',
        title: 'group-data-[state=active]:text-secondary group-data-[state=completed]:text-secondary',
        description: 'group-data-[state=active]:text-secondary/80 group-data-[state=completed]:text-secondary/80'
      },
      accent: {
        indicator: [
          'group-data-[state=active]:border-accent group-data-[state=active]:bg-accent group-data-[state=active]:text-accent-foreground',
          'group-data-[state=completed]:border-accent/25 group-data-[state=completed]:bg-accent/15 group-data-[state=completed]:text-accent'
        ],
        separator: 'group-data-[state=completed]:bg-accent',
        title: 'group-data-[state=active]:text-accent group-data-[state=completed]:text-accent',
        description: 'group-data-[state=active]:text-accent/80 group-data-[state=completed]:text-accent/80'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
    color: 'primary'
  }
});
