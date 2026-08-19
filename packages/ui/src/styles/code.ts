// @unocss-include
import { scv } from '@soybeanjs/cva';

export const codeVariants = scv({
  slots: {
    root: 'relative flex overflow-hidden rounded-md border border-border bg-secondary/50 font-mono text-sm',
    code: 'block min-w-full whitespace-pre p-3 text-foreground',
    lineNumbers:
      'flex shrink-0 select-none flex-col border-e border-border bg-secondary/60 px-2 py-3 text-right text-muted-foreground/70',
    copyButton:
      'absolute end-2 top-2 inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-colors-150 hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/30 data-[copied]:text-success'
  },
  variants: {
    variant: {
      block: {},
      inline: {
        root: 'inline-flex rounded-sm border-0 bg-secondary/70 px-1.5 py-0.5 align-middle',
        code: 'p-0'
      }
    }
  },
  defaultVariants: {
    variant: 'block'
  }
});
