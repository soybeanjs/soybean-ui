// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const sonnerVariants = tv({
  base: [
    'fixed z-100 flex w-full max-w-sm list-none flex-col p-0 outline-none',
    'pointer-events-none transition-transform duration-400 ease-out'
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
      'group pointer-events-auto box-border overflow-hidden outline-none overflow-wrap-anywhere',
      'relative flex w-sm max-w-sm items-start rounded-lg border shadow-lg',
      'bg-background text-foreground',
      'data-[mounted=false]:opacity-0 data-[mounted=true]:opacity-100',
      'data-[visible=false]:opacity-0 data-[visible=false]:pointer-events-none',
      'data-[expanded=false][data-front=false]:shadow-md',
      'focus-visible:ring-2 focus-visible:ring-ring/40'
    ],
    title: 'text-sm font-medium leading-5 text-inherit',
    description: 'text-sm leading-5 opacity-90 text-inherit',
    icon: 'mt-0.5 shrink-0 size-4',
    close: [
      'absolute right-2 top-2 flex size-5 items-center justify-center rounded-full',
      'border border-border/60 bg-background text-foreground/60 transition-all duration-200',
      'opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-muted/60'
    ],
    action: [
      'inline-flex h-6 items-center justify-center rounded-md px-2.5 text-xs font-medium',
      'bg-foreground text-background transition-opacity duration-200 hover:opacity-90'
    ],
    cancel: [
      'inline-flex h-6 items-center justify-center rounded-md px-2.5 text-xs font-medium',
      'bg-muted text-muted-foreground transition-opacity duration-200 hover:opacity-90'
    ]
  },
  variants: {
    type: {
      default: {
        toast: 'border-border bg-background text-foreground'
      },
      success: {
        toast: 'border-success/30 bg-success-50 text-success-900 dark:bg-success-950 dark:text-success-100',
        icon: 'text-success'
      },
      info: {
        toast: 'border-info/30 bg-info-50 text-info-900 dark:bg-info-950 dark:text-info-100',
        icon: 'text-info'
      },
      warning: {
        toast: 'border-warning/30 bg-warning-50 text-warning-900 dark:bg-warning-950 dark:text-warning-100',
        icon: 'text-warning'
      },
      error: {
        toast: 'border-destructive/30 bg-destructive-50 text-destructive-900 dark:bg-destructive-950 dark:text-destructive-100',
        icon: 'text-destructive'
      },
      loading: {
        toast: 'border-border bg-background text-foreground',
        icon: 'text-muted-foreground'
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
