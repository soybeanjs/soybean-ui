// @unocss-include
import { scv } from '@soybeanjs/cva';

export const fileCardVariants = scv({
  slots: {
    root: 'flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3',
    icon: 'flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground',
    body: 'flex min-w-0 flex-1 flex-col gap-0.5',
    name: 'truncate text-sm font-medium',
    meta: 'truncate text-xs text-muted-foreground'
  }
});
