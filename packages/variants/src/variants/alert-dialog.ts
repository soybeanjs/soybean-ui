// @unocss-include
import { tv } from 'tailwind-variants';
import { dialogVariants } from './dialog';

export const alertDialogVariants = tv({
  slots: {
    ...dialogVariants.slots,
    title: `flex items-center gap-x-2 text-lg font-semibold leading-none tracking-tight`
  }
});
