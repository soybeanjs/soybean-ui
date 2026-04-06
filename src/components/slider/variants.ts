// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const sliderVariants = tv({
  slots: {
    root: [
      'relative flex w-full touch-none select-none items-center',
      'data-[disabled]:opacity-50 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col'
    ],
    track:
      'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    range: 'absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
    thumb: [
      'absolute block shrink-0 rounded-full border bg-background shadow-sm transition-[color,box-shadow]',
      'hover:ring-4 focus-visible:outline-none focus-visible:ring-4 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
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
        thumb:
          'border-secondary-foreground/40 focus-visible:ring-secondary-foreground/20 hover:ring-secondary-foreground/20'
      },
      accent: {
        range: 'bg-accent-foreground/30',
        thumb: 'border-accent-foreground/40 focus-visible:ring-accent-foreground/20 hover:ring-accent-foreground/20'
      }
    },
    size: {
      xs: {
        root: 'h-3 data-[orientation=vertical]:h-32 data-[orientation=vertical]:w-3',
        track: 'data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1',
        thumb: 'size-3'
      },
      sm: {
        root: 'h-3.5 data-[orientation=vertical]:h-36 data-[orientation=vertical]:w-3.5',
        track: 'data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5',
        thumb: 'size-3.5'
      },
      md: {
        root: 'h-4 data-[orientation=vertical]:h-44 data-[orientation=vertical]:w-4',
        track: 'data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5',
        thumb: 'size-4'
      },
      lg: {
        root: 'h-4.5 data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-4.5',
        track: 'data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2',
        thumb: 'size-4.5'
      },
      xl: {
        root: 'h-5 data-[orientation=vertical]:h-56 data-[orientation=vertical]:w-5',
        track: 'data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5',
        thumb: 'size-5'
      },
      '2xl': {
        root: 'h-6 data-[orientation=vertical]:h-64 data-[orientation=vertical]:w-6',
        track: 'data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3',
        thumb: 'size-6'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});

type SliderVariants = VariantProps<typeof sliderVariants>;

export type SliderVariantProps = SliderVariants;
