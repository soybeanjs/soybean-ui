// @unocss-include
import { scv } from '@soybeanjs/cva';

export const promptsVariants = scv({
  slots: {
    root: 'flex w-full flex-wrap gap-2',
    item: 'inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground'
  }
});
