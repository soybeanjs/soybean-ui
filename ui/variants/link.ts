// @unocss-include
import { tv } from 'tailwind-variants';

export const linkVariants = tv({
  base: `w-fit outline-none cursor-pointer decoration-none focus:(bg-accent text-accent-foreground) hover:(bg-accent text-accent-foreground) disabled:(pointer-events-none opacity-50)`
});
