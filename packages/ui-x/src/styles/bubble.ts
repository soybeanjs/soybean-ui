// @unocss-include
import { scv } from '@soybeanjs/cva';

export const bubbleVariants = scv({
  slots: {
    root: 'flex w-full flex-col gap-1',
    content: 'rounded-xl bg-muted px-3 py-2 text-sm leading-relaxed',
    header: 'flex items-center gap-2 text-xs text-muted-foreground',
    footer: 'flex items-center gap-1 text-xs text-muted-foreground'
  },
  variants: {
    placement: {
      start: {
        root: 'items-start'
      },
      end: {
        root: 'items-end'
      }
    },
    variant: {
      filled: {
        content: 'bg-muted'
      },
      outlined: {
        content: 'border border-border bg-transparent'
      },
      shadow: {
        content: 'shadow-sm bg-muted'
      }
    }
  },
  defaultVariants: {
    placement: 'start',
    variant: 'filled'
  }
});
