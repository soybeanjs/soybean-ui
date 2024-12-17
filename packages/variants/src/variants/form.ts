// @unocss-include
import { tv } from 'tailwind-variants';

export const formVariants = tv({
  slots: {
    item: `form-item space-y-2`,
    label: '',
    message: `text-sm font-medium text-destructive`,
    description: `text-sm text-muted-foreground`
  },
  variants: {
    error: {
      true: {
        message: `text-destructive`
      }
    }
  },
  defaultVariants: {
    error: false
  }
});
