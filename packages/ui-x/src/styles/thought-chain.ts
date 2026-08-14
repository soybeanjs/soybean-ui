// @unocss-include
import { scv } from '@soybeanjs/cva';

export const thoughtChainVariants = scv({
  slots: {
    root: 'flex w-full flex-col gap-1',
    item: 'rounded-lg border border-border bg-muted/40',
    header: 'flex w-full items-center gap-2 px-3 py-2 text-sm font-medium',
    content: 'border-t border-border px-3 py-2 text-sm text-muted-foreground',
    status: 'inline-flex h-4 w-4 items-center justify-center text-xs'
  }
});
