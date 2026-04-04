// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const sonnerVariants = tv({
  base: [
    'fixed z-100 w-full md:max-w-sm pointer-events-none',
    'flex flex-col gap-0'
  ],
  variants: {
    position: {
      'top-left': 'top-0 left-0 items-start',
      'top-center': 'top-0 left-1/2 -translate-x-1/2 items-center',
      'top-right': 'top-0 right-0 items-end',
      'bottom-left': 'bottom-0 left-0 items-start',
      'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
      'bottom-right': 'bottom-0 right-0 items-end'
    }
  },
  defaultVariants: {
    position: 'bottom-right'
  }
});

export const sonnerToastVariants = tv({
  slots: {
    toast: [
      'group pointer-events-auto relative w-sm max-w-sm overflow-hidden',
      'rounded-lg border shadow-lg bg-background text-foreground',
      'transition-all duration-300 ease-in-out',
      'data-[mounted=false]:opacity-0',
      'data-[mounted=true]:opacity-100'
    ],
    title: 'text-sm font-semibold leading-5',
    description: 'mt-0.5 text-sm opacity-90',
    icon: 'shrink-0 size-4',
    close: [
      'absolute top-1.5 right-1.5 size-5 rounded-md opacity-0 transition-opacity',
      'hover:opacity-100 group-hover:opacity-100',
      'flex items-center justify-center',
      'text-foreground/50 hover:text-foreground'
    ],
    action: [
      'inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-medium',
      'bg-foreground text-background hover:opacity-90 transition-opacity'
    ],
    cancel: [
      'inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-medium',
      'bg-muted text-muted-foreground hover:opacity-90 transition-opacity'
    ]
  },
  variants: {
    type: {
      default: {},
      success: {
        toast: 'border-success/30 bg-success-50 dark:bg-success-950',
        icon: 'text-success',
        title: 'text-success-900 dark:text-success-100'
      },
      info: {
        toast: 'border-info/30 bg-info-50 dark:bg-info-950',
        icon: 'text-info',
        title: 'text-info-900 dark:text-info-100'
      },
      warning: {
        toast: 'border-warning/30 bg-warning-50 dark:bg-warning-950',
        icon: 'text-warning',
        title: 'text-warning-900 dark:text-warning-100'
      },
      error: {
        toast: 'border-destructive/30 bg-destructive-50 dark:bg-destructive-950',
        icon: 'text-destructive',
        title: 'text-destructive-900 dark:text-destructive-100'
      },
      loading: {
        toast: '',
        icon: 'text-muted-foreground animate-spin'
      }
    },
    richColors: {
      true: {}
    }
  },
  defaultVariants: {
    type: 'default'
  }
});

type SonnerVariants = VariantProps<typeof sonnerVariants>;
export type SonnerPositionVariant = NonNullable<SonnerVariants['position']>;
