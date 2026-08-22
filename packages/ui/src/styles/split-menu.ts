// @unocss-include
import { scv } from '@soybeanjs/cva';

export const splitMenuVariants = scv({
  slots: {
    root: 'flex h-full w-full flex-col',
    panelRow: 'flex min-h-0 flex-1',
    panel: 'flex min-h-0 min-w-0',
    panelVertical: 'flex w-full flex-col gap-1 overflow-auto p-2',
    panelHorizontal: 'flex h-fit w-full items-center gap-1 border-b bg-background px-2',
    item: [
      `flex w-full cursor-pointer select-none items-center gap-2 rounded-sm outline-none`,
      `data-[active=true]:bg-primary/10 data-[active=true]:text-primary`,
      `data-[active=false]:hover:bg-accent data-[active=false]:focus:bg-accent`,
      `data-[disabled]:pointer-events-none data-[disabled]:opacity-50`
    ],
    itemIcon: 'shrink-0',
    itemLabel: 'truncate',
    itemLeading: 'shrink-0',
    itemTrailing: 'ms-auto shrink-0',
    itemLinkIcon: 'shrink-0 text-muted-foreground rtl:rotate-270',
    trigger: [
      `flex cursor-pointer select-none items-center gap-2 rounded-sm outline-none`,
      `data-[active=true]:bg-primary/10 data-[active=true]:text-primary`,
      `data-[active=false]:hover:bg-accent data-[active=false]:focus:bg-accent`,
      `data-[disabled]:pointer-events-none data-[disabled]:opacity-50`
    ],
    triggerIcon: 'shrink-0 text-muted-foreground transition-transform-200',
    collapsibleIcon: 'shrink-0 text-muted-foreground transition-transform-200',
    group: 'flex flex-col gap-1',
    groupLabel: 'px-2 text-xs text-muted-foreground',
    sub: 'flex flex-col',
    shortcut: 'ms-auto text-xs text-muted-foreground',
    separator: 'my-1 h-px bg-border'
  },
  variants: {
    size: {
      xs: {
        item: 'h-6 gap-1.5 px-1.5 text-2xs',
        trigger: 'h-6 gap-1.5 px-1.5 text-2xs',
        itemIcon: 'size-3.5',
        triggerIcon: 'size-3.5',
        collapsibleIcon: 'size-3.5'
      },
      sm: {
        item: 'h-7 gap-1.75 px-1.75 text-xs',
        trigger: 'h-7 gap-1.75 px-1.75 text-xs',
        itemIcon: 'size-4',
        triggerIcon: 'size-4',
        collapsibleIcon: 'size-4'
      },
      md: {
        item: 'h-8 gap-2 px-2 text-sm',
        trigger: 'h-8 gap-2 px-2 text-sm',
        itemIcon: 'size-4.5',
        triggerIcon: 'size-4.5',
        collapsibleIcon: 'size-4.5'
      },
      lg: {
        item: 'h-9 gap-2.25 px-2.25 text-base',
        trigger: 'h-9 gap-2.25 px-2.25 text-base',
        itemIcon: 'size-5',
        triggerIcon: 'size-5',
        collapsibleIcon: 'size-5'
      },
      xl: {
        item: 'h-10 gap-2.5 px-2.5 text-lg',
        trigger: 'h-10 gap-2.5 px-2.5 text-lg',
        itemIcon: 'size-5.5',
        triggerIcon: 'size-5.5',
        collapsibleIcon: 'size-5.5'
      },
      '2xl': {
        item: 'h-12 gap-3 px-3 text-xl',
        trigger: 'h-12 gap-3 px-3 text-xl',
        itemIcon: 'size-6.5',
        triggerIcon: 'size-6.5',
        collapsibleIcon: 'size-6.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
