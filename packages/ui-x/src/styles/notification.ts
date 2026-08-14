// @unocss-include
import { scv } from '@soybeanjs/cva';

export const notificationVariants = scv({
  slots: {
    root: 'flex w-full items-start gap-3 rounded-lg border border-border bg-card p-3',
    icon: 'mt-0.5 shrink-0 text-base',
    body: 'flex min-w-0 flex-1 flex-col gap-0.5',
    title: 'text-sm font-medium',
    description: 'text-xs text-muted-foreground',
    close:
      'shrink-0 rounded-md px-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
  },
  variants: {
    type: {
      info: { icon: 'text-info' },
      success: { icon: 'text-success' },
      warning: { icon: 'text-warning' },
      error: { icon: 'text-destructive' }
    }
  },
  defaultVariants: {
    type: 'info'
  }
});
