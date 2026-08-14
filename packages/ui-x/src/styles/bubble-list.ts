// @unocss-include
import { scv } from '@soybeanjs/cva';

export const bubbleListVariants = scv({
  slots: {
    root: 'relative flex flex-col gap-3 overflow-y-auto',
    content: 'flex flex-col gap-3 p-4',
    backToBottom:
      'absolute bottom-4 right-4 z-10 flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-opacity'
  }
});
