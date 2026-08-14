// @unocss-include
import { scv } from '@soybeanjs/cva';

export const actionsVariants = scv({
  slots: {
    root: 'flex w-full items-center gap-1',
    item: 'inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
  }
});
