// @unocss-include
import { scv } from '@soybeanjs/cva';

export const watermarkVariants = scv({
  slots: {
    root: 'relative',
    overlay: 'absolute inset-0 pointer-events-none bg-repeat'
  },
  variants: {
    fullscreen: {
      true: {
        root: 'static',
        overlay: 'fixed inset-0 z-9999 pointer-events-none bg-repeat'
      }
    }
  }
});
