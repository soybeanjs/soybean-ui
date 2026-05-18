// @unocss-include
import { scv } from '@soybeanjs/cva';

export const affixVariants = scv({
  slots: {
    root: '',
    placeholder: '',
    content: 'data-[state=fixed]:z-50'
  }
});
