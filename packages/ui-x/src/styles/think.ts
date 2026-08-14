// @unocss-include
import { scv } from '@soybeanjs/cva';

export const thinkVariants = scv({
  slots: {
    root: 'w-full rounded-lg border border-border bg-muted/40',
    trigger: 'flex w-full items-center gap-2 px-3 py-2 text-sm font-medium',
    content: 'border-t border-border px-3 py-2 text-sm text-muted-foreground'
  }
});
