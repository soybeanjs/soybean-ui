// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const toastVariants = tv({
  slots: {
    root: [
      `group pointer-events-auto relative flex flex-col w-full overflow-hidden rounded-md border shadow-lg transition-all-200 dark:bg-background`,
      `data-[swipe=cancel]:translate-x-0`,
      `data-[swipe=end]:translate-x-[var(--soybean-toast-swipe-end-x)] data-[swipe=end]:animate-out`,
      `data-[swipe=move]:translate-x-[var(--soybean-toast-swipe-move-x)] data-[swipe=move]:transition-none`,
      `data-[state=open]:slide-in-from-top-full sm:slide-in-from-bottom-full data-[state=open]:animate-in`,
      `data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=closed]:animate-out`
    ],
    title: `flex items-center font-medium tracking-tight`,
    description: '[&_p]:leading-relaxed',
    close: `absolute`,
    action: ''
  },
  variants: {
    size: {
      xs: {
        root: `gap-0.75 px-2 py-1.75 text-2xs`,
        title: `gap-1.5 leading-3.125`,
        close: `right-1 top-1`
      },
      sm: {
        root: `gap-1 px-3 py-2.5 text-xs`,
        title: `gap-1.75 leading-3.75`,
        close: `right-1.25 top-1.25`
      },
      md: {
        root: `gap-1 px-4 py-3 text-sm`,
        title: `gap-2 leading-4.375`,
        close: `right-1.5 top-1.5`
      },
      lg: {
        root: `gap-1.25 px-5 py-3.5 text-base`,
        title: `gap-2.5 leading-5`,
        close: `right-1.75 top-1.75`
      },
      xl: {
        root: `gap-1.5 px-6 py-4 text-lg`,
        title: `gap-3 leading-5.625`,
        close: `right-2 top-2`
      },
      '2xl': {
        root: `gap-2 px-7 py-4.5 text-xl`,
        title: `gap-4 leading-6.25`,
        close: `right-2.5 top-2.5`
      }
    },
    color: {
      default: {
        root: 'bg-background'
      },
      primary: {
        root: 'border-primary bg-primary-100  text-primary'
      },
      destructive: {
        root: 'border-destructive bg-destructive-100 text-destructive'
      },
      success: {
        root: 'border-success bg-success-100 text-success'
      },
      info: {
        root: 'border-info bg-info-100 text-info'
      },
      warning: {
        root: 'border-warning bg-warning-100 text-warning'
      },
      carbon: {
        root: 'border-carbon bg-carbon-100 text-carbon'
      },
      secondary: {
        root: 'border-secondary bg-secondary text-secondary-foreground'
      },
      accent: {
        root: 'border-accent bg-accent text-accent-foreground'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'default'
  }
});

export const toastViewportVariants = tv({
  base: [
    `fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse pointer-events-none`,
    `focus-visible:outline-none md:max-w-105`
  ],
  variants: {
    size: {
      xs: 'gap-1 p-3',
      sm: 'gap-1.5 p-3.5',
      md: 'gap-2 p-4',
      lg: 'gap-2.5 p-4.5',
      xl: 'gap-3 p-5',
      '2xl': 'gap-4 p-6'
    },
    position: {
      'top-left': 'top-0 left-0',
      top: 'top-0 left-1/2 -translate-x-1/2',
      'top-right': 'top-0 right-0',
      bottom: 'bottom-0 left-1/2 -translate-x-1/2',
      'bottom-left': 'bottom-0 left-0',
      'bottom-right': 'bottom-0 right-0'
    }
  },
  defaultVariants: {
    size: 'md',
    position: 'top-right'
  }
});

type ToastViewportVariants = VariantProps<typeof toastViewportVariants>;

export type ToastPosition = NonNullable<ToastViewportVariants['position']>;
