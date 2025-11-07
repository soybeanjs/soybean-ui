// @unocss-include
import { tv } from 'tailwind-variants';

export const sliderVariants = tv({
  slots: {
    root: [`relative flex w-full touch-none select-none items-center`, `data-[orientation=vertical]:(flex-col h-full)`],
    track: `relative w-full grow overflow-hidden rounded-full`,
    range: `absolute h-full data-[orientation=vertical]:w-full`,
    thumb: [
      `block rounded-full bg-background transition-colors-200`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background)`,
      `disabled:(pointer-events-none opacity-50)`
    ]
  },
  variants: {
    color: {
      primary: {
        track: 'bg-primary/20',
        range: 'bg-primary',
        thumb: 'border-primary focus-visible:ring-primary'
      },
      destructive: {
        track: 'bg-destructive/20',
        range: 'bg-destructive',
        thumb: 'border-destructive focus-visible:ring-destructive'
      },
      success: {
        track: 'bg-success/20',
        range: 'bg-success',
        thumb: 'border-success focus-visible:ring-success'
      },
      warning: {
        track: 'bg-warning/20',
        range: 'bg-warning',
        thumb: 'border-warning focus-visible:ring-warning'
      },
      info: {
        track: 'bg-info/20',
        range: 'bg-info',
        thumb: 'border-info focus-visible:ring-info'
      },
      carbon: {
        track: 'bg-carbon/20',
        range: 'bg-carbon',
        thumb: 'border-carbon focus-visible:ring-carbon'
      },
      secondary: {
        track: 'bg-secondary-foreground/20',
        range: 'bg-secondary-foreground',
        thumb: 'border-secondary-foreground focus-visible:ring-secondary-foreground'
      },
      accent: {
        track: 'bg-accent-foreground/20',
        range: 'bg-accent-foreground',
        thumb: 'border-accent-foreground focus-visible:ring-accent-foreground'
      }
    },
    size: {
      xs: {
        root: 'data-[orientation=vertical]:w-1.25',
        track: 'h-1.25 data-[orientation=vertical]:w-1.25',
        thumb: 'size-4 border-1.5'
      },
      sm: {
        root: 'data-[orientation=vertical]:w-1.5',
        track: 'h-1.5 data-[orientation=vertical]:w-1.5',
        thumb: 'size-4.5 border-1.75'
      },
      md: {
        root: 'data-[orientation=vertical]:w-2',
        track: 'h-2 data-[orientation=vertical]:w-2',
        thumb: 'size-5 border-2'
      },
      lg: {
        root: 'data-[orientation=vertical]:w-2.5',
        track: 'h-2.5 data-[orientation=vertical]:w-2.5',
        thumb: 'size-5.5 border-2.5'
      },
      xl: {
        root: 'data-[orientation=vertical]:w-3',
        track: 'h-3 data-[orientation=vertical]:w-3',
        thumb: 'size-6 border-3'
      },
      '2xl': {
        root: 'data-[orientation=vertical]:w-3.5',
        track: 'h-3.5 data-[orientation=vertical]:w-3.5',
        thumb: 'size-7 border-3.5'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});
