// @unocss-include
import { tv } from 'tailwind-variants';

export const sliderVariants = tv({
  slots: {
    root: [
      `relative flex w-full touch-none select-none items-center`,
      `data-[orientation=vertical]:(flex-col w-2 h-full)`
    ],
    track: `relative h-2 w-full data-[orientation=vertical]:w-2 grow overflow-hidden rounded-full`,
    range: `absolute h-full data-[orientation=vertical]:w-full`,
    thumb: [
      `block h-5 w-5 rounded-full border-2 bg-background transition-colors`,
      `outline-none focus-visible:(ring-2 ring-offset-2)`,
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
        track: 'bg-secondary/20',
        range: 'bg-secondary',
        thumb: 'border-secondary focus-visible:ring-secondary'
      },
      accent: {
        track: 'bg-accent/20',
        range: 'bg-accent',
        thumb: 'border-accent focus-visible:ring-accent'
      }
    }
  },
  defaultVariants: {
    color: 'primary'
  }
});

export type SliderSlots = keyof typeof sliderVariants.slots;
