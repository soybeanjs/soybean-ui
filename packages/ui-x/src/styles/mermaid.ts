// @unocss-include
import { scv } from '@soybeanjs/cva';

export const mermaidVariants = scv({
  slots: {
    root: 'w-full overflow-x-auto rounded-lg border border-border bg-card p-3',
    toolbar: 'mb-2 flex items-center justify-end gap-1',
    toggle:
      'inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
    diagram: 'flex justify-center',
    code: 'font-mono text-sm leading-relaxed',
    fallback: 'text-sm text-muted-foreground'
  }
});
