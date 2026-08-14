// @unocss-include
import { scv } from '@soybeanjs/cva';

export const sourcesVariants = scv({
  slots: {
    root: 'flex w-full flex-col gap-2',
    item: 'flex items-center gap-2 text-sm',
    link: 'truncate text-primary underline-offset-2 hover:underline'
  }
});
