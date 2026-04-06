// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const toggleGroupVariants = tv({
  slots: {
    root: [
      'w-fit [&>*]:relative focus-visible:[&>*]:z-2',
      '[&>*:not(:first-child):not(:last-child)]:!rounded-none',
      '[&>*:not(:first-child):not(:last-child)>*]:!rounded-none',
      'data-[orientation=vertical]:items-stretch'
    ],
    item: [
      'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all-150',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/30 focus-visible:ring-offset-background',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'
    ]
  },
  variants: {
    color: {
      primary: {
        item: 'focus-visible:ring-primary/30'
      },
      destructive: {
        item: 'focus-visible:ring-destructive/30'
      },
      success: {
        item: 'focus-visible:ring-success/30'
      },
      warning: {
        item: 'focus-visible:ring-warning/30'
      },
      info: {
        item: 'focus-visible:ring-info/30'
      },
      carbon: {
        item: 'focus-visible:ring-carbon/30'
      },
      secondary: {
        item: 'focus-visible:ring-secondary-foreground/20'
      },
      accent: {
        item: 'focus-visible:ring-accent-foreground/20'
      }
    },
    orientation: {
      horizontal: {
        root: [
          'inline-flex flex-row rtl:flex-row-reverse',
          '[&>*:not(:last-child)]:border-r-0 [&>*:not(:last-child)>*]:border-r-0',
          'focus-visible:[&>*]:border-r focus-visible:[&>*>*]:border-r',
          '[&>*:first-child]:!rounded-r-none [&>*:first-child>*]:!rounded-r-none',
          '[&>*:last-child]:!rounded-l-none [&>*:last-child>*]:!rounded-l-none'
        ]
      },
      vertical: {
        root: [
          'flex flex-col',
          '[&>*:not(:last-child)]:border-b-0 [&>*:not(:last-child)>*]:border-b-0',
          'focus-visible:[&>*]:border-b focus-visible:[&>*>*]:border-b',
          '[&>*:first-child]:!rounded-b-none [&>*:first-child>*]:!rounded-b-none',
          '[&>*:last-child]:!rounded-t-none [&>*:last-child>*]:!rounded-t-none'
        ]
      }
    },
    variant: {
      outline: {
        item: [
          'border border-border bg-background text-foreground',
          'data-[state=off]:hover:bg-accent data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
        ]
      },
      soft: {
        item: ['bg-accent text-foreground', 'data-[state=off]:hover:bg-accent']
      },
      ghost: {
        item: ['bg-transparent text-foreground', 'data-[state=off]:hover:bg-accent']
      }
    },
    size: {
      xs: {
        item: 'h-6 gap-1 px-1.5 text-2xs'
      },
      sm: {
        item: 'h-7 gap-2 px-2 text-xs'
      },
      md: {
        item: 'h-8 gap-3 px-4 text-sm'
      },
      lg: {
        item: 'h-9 gap-4 px-6 text-base'
      },
      xl: {
        item: 'h-10 gap-5 px-8 text-lg'
      },
      '2xl': {
        item: 'h-12 gap-6 px-10 text-xl'
      }
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: ['soft', 'ghost'],
      class: {
        item: 'data-[state=on]:bg-primary/20 data-[state=on]:text-primary'
      }
    },
    {
      color: 'destructive',
      variant: ['soft', 'ghost'],
      class: {
        item: 'data-[state=on]:bg-destructive/20 data-[state=on]:text-destructive'
      }
    },
    {
      color: 'success',
      variant: ['soft', 'ghost'],
      class: {
        item: 'data-[state=on]:bg-success/20 data-[state=on]:text-success'
      }
    },
    {
      color: 'warning',
      variant: ['soft', 'ghost'],
      class: {
        item: 'data-[state=on]:bg-warning/20 data-[state=on]:text-warning'
      }
    },
    {
      color: 'info',
      variant: ['soft', 'ghost'],
      class: {
        item: 'data-[state=on]:bg-info/20 data-[state=on]:text-info'
      }
    },
    {
      color: 'carbon',
      variant: ['soft', 'ghost'],
      class: {
        item: 'data-[state=on]:bg-carbon/20 data-[state=on]:text-carbon'
      }
    },
    {
      color: 'secondary',
      variant: ['soft', 'ghost'],
      class: {
        item: 'data-[state=on]:bg-secondary-foreground/10 data-[state=on]:text-secondary-foreground'
      }
    },
    {
      color: 'accent',
      variant: ['soft', 'ghost'],
      class: {
        item: 'data-[state=on]:bg-accent-foreground/10 data-[state=on]:text-accent-foreground'
      }
    }
  ],
  defaultVariants: {
    color: 'accent',
    orientation: 'horizontal',
    variant: 'ghost',
    size: 'md'
  }
});

type ToggleGroupVariants = VariantProps<typeof toggleGroupVariants>;

export type ToggleGroupVariant = NonNullable<ToggleGroupVariants['variant']>;
