// @unocss-include
import { scv } from '@soybeanjs/cva';

export const splitNavVariants = scv({
  slots: {
    root: 'flex h-full w-full min-h-0 min-w-0',
    verticalPane: 'flex h-full min-h-0 min-w-0 flex-1',
    firstLevel: [
      'flex outline-none',
      'data-[orientation=vertical]:h-full data-[orientation=vertical]:shrink-0 data-[orientation=vertical]:flex-col',
      'data-[orientation=horizontal]:h-fit data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center'
    ],
    firstLevelItem: [
      'flex cursor-pointer select-none items-center rounded-sm outline-none',
      'data-[state=active]:bg-primary/10 data-[state=active]:text-primary',
      'data-[state=inactive]:hover:bg-accent data-[state=inactive]:focus:bg-accent',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    ],
    firstLevelItemIcon: 'shrink-0',
    firstLevelItemLabel: 'truncate',
    subVertical: 'flex min-h-0 min-w-0 flex-1 flex-col overflow-auto',
    subHorizontal: 'flex h-fit w-full min-w-0 items-center',
    item: [
      'flex w-full cursor-pointer select-none items-center rounded-sm outline-none',
      'data-[active=true]:bg-primary/10 data-[active=true]:text-primary',
      'data-[active=false]:hover:bg-accent data-[active=false]:focus:bg-accent',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    ],
    itemIcon: 'shrink-0',
    itemLabel: 'truncate',
    itemLeading: 'shrink-0',
    itemTrailing: 'ms-auto shrink-0',
    itemLinkIcon: 'shrink-0 text-muted-foreground rtl:rotate-270',
    collapsibleIcon: 'shrink-0 text-muted-foreground transition-transform-200',
    group: 'flex flex-col',
    groupLabel: 'px-2 text-xs text-muted-foreground',
    sub: 'flex flex-col',
    trigger: [
      'flex cursor-pointer select-none items-center rounded-sm outline-none',
      'data-[active=true]:bg-primary/10 data-[active=true]:text-primary',
      'data-[active=false]:hover:bg-accent data-[active=false]:focus:bg-accent',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    ],
    triggerIcon: 'shrink-0 text-muted-foreground',
    shortcut: 'ms-auto text-xs text-muted-foreground',
    separator: 'my-1 h-px bg-border'
  },
  variants: {
    mode: {
      'dual-vertical': {
        root: 'flex-row'
      },
      'vertical-horizontal': {
        root: 'flex-row'
      },
      'horizontal-vertical': {
        root: 'flex-col'
      },
      'horizontal-dual-vertical': {
        root: 'flex-col'
      }
    },
    size: {
      xs: {
        firstLevel: 'gap-0.875 p-1.5 text-2xs',
        firstLevelItem: 'h-6 gap-1.5 px-1.5',
        firstLevelItemIcon: 'size-3.5',
        item: 'h-6 gap-1.5 px-1.5 text-2xs',
        trigger: 'h-6 gap-1.5 px-1.5 text-2xs',
        itemIcon: 'size-3.5',
        triggerIcon: 'size-3.5',
        collapsibleIcon: 'size-3.5'
      },
      sm: {
        firstLevel: 'gap-1 p-1.75 text-xs',
        firstLevelItem: 'h-7 gap-1.75 px-1.75',
        firstLevelItemIcon: 'size-4',
        item: 'h-7 gap-1.75 px-1.75 text-xs',
        trigger: 'h-7 gap-1.75 px-1.75 text-xs',
        itemIcon: 'size-4',
        triggerIcon: 'size-4',
        collapsibleIcon: 'size-4'
      },
      md: {
        firstLevel: 'gap-1 p-2 text-sm',
        firstLevelItem: 'h-8 gap-2 px-2',
        firstLevelItemIcon: 'size-4.5',
        item: 'h-8 gap-2 px-2 text-sm',
        trigger: 'h-8 gap-2 px-2 text-sm',
        itemIcon: 'size-4.5',
        triggerIcon: 'size-4.5',
        collapsibleIcon: 'size-4.5'
      },
      lg: {
        firstLevel: 'gap-1.25 p-2.25 text-base',
        firstLevelItem: 'h-9 gap-2.25 px-2.25',
        firstLevelItemIcon: 'size-5',
        item: 'h-9 gap-2.25 px-2.25 text-base',
        trigger: 'h-9 gap-2.25 px-2.25 text-base',
        itemIcon: 'size-5',
        triggerIcon: 'size-5',
        collapsibleIcon: 'size-5'
      },
      xl: {
        firstLevel: 'gap-1.5 p-2.5 text-lg',
        firstLevelItem: 'h-10 gap-2.5 px-2.5',
        firstLevelItemIcon: 'size-5.5',
        item: 'h-10 gap-2.5 px-2.5 text-lg',
        trigger: 'h-10 gap-2.5 px-2.5 text-lg',
        itemIcon: 'size-5.5',
        triggerIcon: 'size-5.5',
        collapsibleIcon: 'size-5.5'
      },
      '2xl': {
        firstLevel: 'gap-2 p-3 text-xl',
        firstLevelItem: 'h-12 gap-3 px-3',
        firstLevelItemIcon: 'size-6.5',
        item: 'h-12 gap-3 px-3 text-xl',
        trigger: 'h-12 gap-3 px-3 text-xl',
        itemIcon: 'size-6.5',
        triggerIcon: 'size-6.5',
        collapsibleIcon: 'size-6.5'
      }
    }
  },
  defaultVariants: {
    mode: 'dual-vertical',
    size: 'md'
  }
});
