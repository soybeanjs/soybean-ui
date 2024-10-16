// @unocss-include
import { tv } from 'tailwind-variants';

export const sonnerVariants = tv({
  base: [
    'pointer-events-auto',
    `[&_[data-sonner-toast]]:(flex items-center gap-1.5 w-[var(--width)] p-4 border border-border rounded-md bg-card text-card-foreground shadow-md)`,
    `[&_[data-button]]:(inline-flex items-center justify-center h-7 px-2 gap-2 text-sm rounded-md font-medium whitespace-nowrap)`,
    `focus-visible:[&_[data-button]]:(shadow-none outline outline-2 outline-offset-2 outline-primary)`,
    `disabled:[&_[data-button]]:(pointer-events-none opacity-50)`,
    '[&_[data-action]]:(bg-primary text-primary-foreground)',
    `hover:[&_[data-action]]:(bg-primary/80)`,
    `active:[&_[data-action]]:(bg-primary-600)`,
    `[&_[data-cancel]]:(border border-border bg-background text-foreground)`,
    `hover:[&_[data-cancel]]:(border-primary text-primary)`,
    `active:[&_[data-cancel]]:(shadow-md)`
  ]
});
