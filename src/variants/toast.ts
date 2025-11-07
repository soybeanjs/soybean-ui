// @unocss-include
import { tv } from 'tailwind-variants';

export const toastVariants = tv({
  slots: {
    viewport: [
      `fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse`,
      `focus-visible:outline-none`,
      `sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-105`
    ],
    root: [
      `group pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-md border shadow-lg transition-all-200`,
      `data-[swipe=cancel]:translate-x-0`,
      `data-[swipe=end]:translate-x-[var(--soybean-toast-swipe-end-x)] data-[swipe=end]:animate-out`,
      `data-[swipe=move]:translate-x-[var(--soybean-toast-swipe-move-x)] data-[swipe=move]:transition-none`,
      `data-[state=open]:slide-in-from-top-full sm:slide-in-from-bottom-full data-[state=open]:animate-in`,
      `data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=closed]:animate-out`
    ],
    title: `flex items-center font-semibold`,
    description: `opacity-90`,
    close: `absolute opacity-0 transition-opacity-200 group-hover:opacity-100`,
    action: ''
  },
  variants: {
    size: {
      xs: {
        viewport: `p-3`,
        root: `gap-x-1.5 p-3 pr-6 text-2xs`,
        title: `gap-1.5`,
        close: `right-1 top-1`
      },
      sm: {
        viewport: `p-3.5`,
        root: `gap-x-1.75 p-3.5 pr-7 text-xs`,
        title: `gap-1.75`,
        close: `right-1.25 top-1.25`
      },
      md: {
        viewport: `p-4`,
        root: `gap-x-2 p-4 pr-8 text-sm`,
        title: `gap-2`,
        close: `right-1.5 top-1.5`
      },
      lg: {
        viewport: `p-4.5`,
        root: `gap-x-2.5 p-4.5 pr-9 text-base`,
        title: `gap-2.5`,
        close: `right-1.75 top-1.75`
      },
      xl: {
        viewport: `p-5`,
        root: `gap-x-3 p-5 pr-10 text-lg`,
        title: `gap-3`,
        close: `right-2 top-2`
      },
      '2xl': {
        viewport: `p-6`,
        root: `gap-x-4 p-6 pr-12 text-xl`,
        title: `gap-4`,
        close: `right-2.5 top-2.5`
      }
    },
    richColor: {
      default: {
        root: 'bg-background'
      },
      primary: {
        root: 'border-primary bg-primary-100 text-primary'
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
        root: 'border-secondary bg-secondary text-secondary'
      },
      accent: {
        root: 'border-accent bg-accent text-accent-foreground'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    richColor: 'default'
  }
});
