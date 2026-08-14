// @unocss-include
import { scv } from '@soybeanjs/cva';

export const conversationsVariants = scv({
  slots: {
    root: 'flex w-full flex-col gap-1 overflow-y-auto',
    groupTitle: 'px-2 py-1 text-xs font-medium text-muted-foreground',
    item: 'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
    itemActive: 'bg-accent text-accent-foreground'
  }
});
