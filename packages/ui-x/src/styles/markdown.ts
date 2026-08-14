// @unocss-include
import { scv } from '@soybeanjs/cva';

export const markdownVariants = scv({
  slots: {
    root: 'w-full text-sm leading-relaxed [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-3'
  }
});
