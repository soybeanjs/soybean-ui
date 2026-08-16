// @unocss-include
import { scv } from '@soybeanjs/cva';

export const appPageHeaderVariants = scv({
  slots: {
    root: 'flex items-center justify-between gap-4 px-4 py-3',
    titleBlock: 'flex items-center gap-3 min-w-0',
    title: 'truncate text-lg font-semibold text-foreground',
    description: 'mt-0.5 truncate text-sm text-muted-foreground',
    actions: 'flex items-center gap-2 shrink-0'
  },
  variants: {
    sticky: {
      true: {
        root: 'sticky top-0 z-10 bg-background/90 backdrop-blur'
      },
      false: {}
    }
  },
  defaultVariants: {
    sticky: false
  }
});
