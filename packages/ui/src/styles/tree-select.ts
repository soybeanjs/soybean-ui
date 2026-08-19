// @unocss-include
import { scv } from '@soybeanjs/cva';

export const treeSelectVariants = scv({
  slots: {
    root: '',
    trigger: [
      'inline-flex w-full items-center justify-between gap-2 rounded-md border border-border bg-background text-foreground shadow-sm outline-none transition-colors-150',
      'placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/30',
      'data-[state=open]:border-primary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    value: 'min-w-0 truncate text-start',
    placeholder: 'text-muted-foreground',
    triggerIcon: 'shrink-0 text-muted-foreground',
    popup: 'z-50 min-w-40 rounded-md border border-border bg-popover text-popover-foreground shadow-md outline-none',
    panel: 'max-h-64 overflow-y-auto p-1',
    node: [
      'flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
      'hover:bg-secondary/60 data-[selected]:bg-primary/15 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    nodeLabel: 'min-w-0 flex-1 truncate',
    nodeCheck: 'flex size-4 shrink-0 items-center justify-center rounded-sm border border-border text-primary',
    arrow: 'z-50 size-2 rotate-45 rounded-sm border border-border bg-popover'
  },
  variants: {
    size: {
      xs: { trigger: 'h-7 px-2 text-xs' },
      sm: { trigger: 'h-8 px-2.5 text-xs' },
      md: { trigger: 'h-9 px-3 text-sm' },
      lg: { trigger: 'h-10 px-3.5 text-sm' },
      xl: { trigger: 'h-11 px-4 text-base' },
      '2xl': { trigger: 'h-12 px-4 text-base' }
    },
    color: {
      primary: { trigger: 'data-[state=open]:border-primary' },
      destructive: { trigger: 'data-[state=open]:border-destructive' },
      success: { trigger: 'data-[state=open]:border-success' },
      warning: { trigger: 'data-[state=open]:border-warning' },
      info: { trigger: 'data-[state=open]:border-info' },
      carbon: { trigger: 'data-[state=open]:border-carbon' },
      secondary: { trigger: 'data-[state=open]:border-secondary' },
      accent: { trigger: 'data-[state=open]:border-accent' }
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'primary'
  }
});
