// @unocss-include
import { tv } from 'tailwind-variants';

export const collapsibleVariants = tv({
  base: 'overflow-hidden transition will-change-auto data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'
});
