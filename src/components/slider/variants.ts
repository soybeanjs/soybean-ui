// @unocss-include
import { tv } from 'tailwind-variants';

export const sliderVariants = tv({
  slots: {
    root: [
      'relative flex w-full touch-none select-none items-center',
      'data-[disabled]:opacity-50 data-[orientation=vertical]:flex-col data-[orientation=vertical]:min-h-20'
    ],
    track: [
      'relative grow overflow-hidden rounded-full bg-muted',
      'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full'
    ],
    range: 'absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
    thumb: [
      'absolute block shrink-0 rounded-full bg-background shadow-sm transition-[color,box-shadow]',
      'hover:ring-3 outline-none focus-visible:ring-3 data-[disabled]:cursor-not-allowed'
    ]
  },
  variants: {
    color: {
      primary: {
        range: 'bg-primary',
        thumb: 'border-primary focus-visible:ring-primary/30 hover:ring-primary/20'
      },
      destructive: {
        range: 'bg-destructive',
        thumb: 'border-destructive focus-visible:ring-destructive/30 hover:ring-destructive/20'
      },
      success: {
        range: 'bg-success',
        thumb: 'border-success focus-visible:ring-success/30 hover:ring-success/20'
      },
      warning: {
        range: 'bg-warning',
        thumb: 'border-warning focus-visible:ring-warning/30 hover:ring-warning/20'
      },
      info: {
        range: 'bg-info',
        thumb: 'border-info focus-visible:ring-info/30 hover:ring-info/20'
      },
      carbon: {
        range: 'bg-carbon',
        thumb: 'border-carbon focus-visible:ring-carbon/30 hover:ring-carbon/20'
      },
      secondary: {
        range: 'bg-secondary-foreground/30',
        thumb: `border-secondary-foreground/40 focus-visible:ring-secondary-foreground/20 hover:ring-secondary-foreground/20`
      },
      accent: {
        range: 'bg-accent-foreground/30',
        thumb: 'border-accent-foreground/40 focus-visible:ring-accent-foreground/20 hover:ring-accent-foreground/20'
      }
    },
    size: {
      xs: {
        root: 'h-3 data-[orientation=vertical]:w-3',
        track: 'data-[orientation=horizontal]:h-1.25 data-[orientation=vertical]:w-1.25',
        thumb: 'size-3 border'
      },
      sm: {
        root: 'h-3.5 data-[orientation=vertical]:w-3.5',
        track: 'data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5',
        thumb: 'size-3.5 border'
      },
      md: {
        root: 'h-4 data-[orientation=vertical]:w-4',
        track: 'data-[orientation=horizontal]:h-1.75 data-[orientation=vertical]:w-1.75',
        thumb: 'size-4 border-2'
      },
      lg: {
        root: 'h-4.5 data-[orientation=vertical]:w-4.5',
        track: 'data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2',
        thumb: 'size-4.5 border-2'
      },
      xl: {
        root: 'h-5 data-[orientation=vertical]:w-5',
        track: 'data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5',
        thumb: 'size-5 border-3'
      },
      '2xl': {
        root: 'h-6 data-[orientation=vertical]:w-6',
        track: 'data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3',
        thumb: 'size-6 border-3'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});
