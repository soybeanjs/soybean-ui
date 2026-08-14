// @unocss-include
import { scv } from '@soybeanjs/cva';

export const codeBlockVariants = scv({
  slots: {
    root: 'w-full overflow-hidden rounded-lg border border-border bg-muted',
    header: 'flex items-center justify-between border-b border-border bg-muted/60 px-3 py-2',
    language: 'text-xs font-medium text-muted-foreground',
    actions: 'flex items-center gap-1',
    body: 'overflow-x-auto p-3',
    pre: 'm-0 text-sm leading-relaxed',
    code: 'font-mono'
  }
});
