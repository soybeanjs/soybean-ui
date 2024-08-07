// @unocss-include
import { tv } from 'tailwind-variants';

export const buttonGroupVariants = tv({
  base: `flex [&>button]:relative focus-visible:[&>button]:z-2 not-last:[&>button]:border-r-0 first:[&>button]:rd-r-0 last:[&>button]:rd-l-0 not-first:not-last:[&>button]:rd-0`
});
