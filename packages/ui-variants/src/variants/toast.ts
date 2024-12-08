// @unocss-include
import { tv } from 'tailwind-variants';

export const toastVariants = tv({
  slots: {
    root: [
      `group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all`,
      `data-[swipe=cancel]:translate-x-0`,
      `data-[swipe=end]:(translate-x-[var(--radix-toast-swipe-end-x)] animate-out)`,
      `data-[swipe=move]:(translate-x-[var(--radix-toast-swipe-move-x)] transition-none)`,
      `data-[state=open]:(slide-in-from-top-full sm:slide-in-from-bottom-full animate-in)`,
      `data-[state=closed]:(fade-out-80 slide-out-to-right-full animate-out)`
    ],
    viewport: [
      `fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4`,
      `sm:(bottom-0 right-0 top-auto flex-col) md:max-w-420px`
    ],
    title: `text-sm font-semibold [&+div]:text-xs`,
    description: `text-sm opacity-90`,
    close: [
      `absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity`,
      `hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1`,
      `group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600`
    ],
    action: `inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive`
  },
  variants: {
    color: {
      primary: {
        root: 'border-primary bg-primary/10 text-primary'
      },
      destructive: {
        root: 'border-destructive bg-destructive/10 text-destructive'
      },
      success: {
        root: 'border-success bg-success/10 text-success'
      },
      info: {
        root: 'border-info bg-info/10 text-info'
      },
      warning: {
        root: 'border-warning bg-warning/10 text-warning'
      },
      secondary: {
        root: 'border-secondary bg-secondary/10 text-secondary'
      },
      accent: {
        root: 'border-accent bg-accent/10 text-accent'
      }
    }
  }
});
