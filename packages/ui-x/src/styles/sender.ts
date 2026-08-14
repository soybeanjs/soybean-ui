// @unocss-include
import { scv } from '@soybeanjs/cva';

export const senderVariants = scv({
  slots: {
    root: 'relative flex w-full flex-col gap-2 rounded-lg border border-border bg-card p-3',
    input: 'w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground',
    actions: 'flex items-center justify-between',
    actionList: 'flex items-center gap-1',
    submit:
      'inline-flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity disabled:opacity-50',
    suggestions:
      'absolute bottom-full left-0 z-20 mb-2 max-h-64 w-64 overflow-y-auto rounded-lg border border-border bg-popover p-1 shadow-md',
    suggestionItem:
      'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground'
  }
});
