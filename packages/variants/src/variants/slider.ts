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
      `focus-visible:(outline outline-2 outline-offset-2)`,
      `disabled:(pointer-events-none opacity-50)`
    ]
  },
  variants: {
    color: {
      primary: {
        track: 'bg-primary/20',
        range: 'bg-primary',
        thumb: 'border-primary focus-visible:outline-primary'
      },
      destructive: {
        track: 'bg-destructive/20',
        range: 'bg-destructive',
        thumb: 'border-destructive focus-visible:outline-destructive'
      },
      success: {
        track: 'bg-success/20',
        range: 'bg-success',
        thumb: 'border-success focus-visible:outline-success'
      },
      warning: {
        track: 'bg-warning/20',
        range: 'bg-warning',
        thumb: 'border-warning focus-visible:outline-warning'
      },
      info: {
        track: 'bg-info/20',
        range: 'bg-info',
        thumb: 'border-info focus-visible:outline-info'
      },
      secondary: {
        track: 'bg-secondary-foreground/20',
        range: 'bg-secondary-foreground',
        thumb: 'border-secondary-foreground focus-visible:outline-secondary-foreground'
      },
      accent: {
        track: 'bg-accent-foreground/20',
        range: 'bg-accent-foreground',
        thumb: 'border-accent-foreground focus-visible:outline-accent-foreground'
      }
    }
  },
  defaultVariants: {
    color: 'primary'
  }
});
