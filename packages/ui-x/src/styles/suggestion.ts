// @unocss-include
import { scv } from '@soybeanjs/cva';

export const suggestionVariants = scv({
  slots: {
    root: 'flex w-full flex-wrap gap-2',
    item: 'inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs transition-colors hover:bg-accent hover:text-accent-foreground'
  }
});
