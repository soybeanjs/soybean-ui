// @unocss-include
import { scv } from '@soybeanjs/cva';

export const folderVariants = scv({
  slots: {
    root: 'w-full rounded-lg border border-border bg-card',
    header: 'flex w-full items-center gap-2 px-3 py-2 text-sm font-medium',
    icon: 'text-muted-foreground',
    name: 'flex-1 truncate text-left',
    badge: 'rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground',
    content: 'border-t border-border px-3 py-2'
  }
});
