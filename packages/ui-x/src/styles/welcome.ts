// @unocss-include
import { scv } from '@soybeanjs/cva';

export const welcomeVariants = scv({
  slots: {
    root: 'flex w-full flex-col items-center justify-center gap-4 p-8 text-center',
    title: 'text-2xl font-semibold',
    description: 'max-w-md text-sm text-muted-foreground'
  }
});
