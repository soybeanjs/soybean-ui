// @unocss-include
import { cv } from '@soybeanjs/cva';

export const actionsFeedbackVariants = cv({
  base: 'inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[selected=true]:text-primary'
});
