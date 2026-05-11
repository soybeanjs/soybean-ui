// @unocss-include
import { tv } from 'tailwind-variants';

export const treeMenuVariants = tv({
  slots: {
    root: 'group flex-1 flex flex-col w-full h-full overflow-auto data-[state=collapsed]:w-[--soybean-tree-menu-collapsed-width] transition-[width,height]-200 ease-out',
    groupRoot: 'group-data-[state=collapsed]:mb-0',
    group: 'flex flex-col m-0 p-0 list-none',
    groupLabel: `flex items-center text-foreground/70 group-data-[state=collapsed]:size-0 group-data-[state=collapsed]:p-0 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:overflow-hidden transition-[height,padding,opacity]-200`,
    item: 'relative m-0 p-0 group-data-[state=collapsed]:hover:bg-sidebar-accent group-data-[state=collapsed]:hover:rounded-sm',
    button: [
      `group/button relative flex items-center w-full rounded-sm outline-none cursor-pointer select-none group-data-[state=collapsed]:overflow-hidden`,
      `data-[active=true]:bg-primary/10 data-[active=true]:text-primary`,
      `data-[active=false]:hover:bg-sidebar-accent data-[active=false]:focus:bg-sidebar-accent`,
      `data-[child-active]:text-primary`,
      `data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    collapsibleRoot: '',
    collapsibleTrigger: '',
    collapsibleContent: [
      'overflow-hidden transition will-change-auto',
      'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'
    ],
    collapsibleIcon: `shrink-0 ms-auto text-muted-foreground transition-transform-200 group-data-[state=open]/button:rotate-90 group-data-[child-active]/button:text-primary`,
    sub: 'flex flex-col m-0 list-none ms-[--soybean-tree-menu-indent] border-s border-sidebar-border border-solid',
    itemLabel: 'truncate',
    itemLinkIcon: `shrink-0 self-start text-muted-foreground rtl:rotate-270`,
    itemBadge: ``,
    itemTag: `shrink-0 ms-auto inline-flex items-center rounded-sm bg-accent/15 text-accent-foreground`,
    itemAction: [
      `absolute end-0 top-1/2 -translate-y-1/2 z-2 inline-flex items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors`,
      `focus-visible:bg-sidebar-accent focus-visible:text-foreground focus-visible:ring-3 focus-visible:ring-accent-foreground/20`,
      `disabled:pointer-events-none disabled:opacity-50`
    ],
    itemAbsolute: `absolute inset-0 z-1 cursor-pointer`
  },
  variants: {
    size: {
      xs: {
        root: 'gap-0.875 p-1.5 text-2xs',
        groupRoot: 'mb-0.875',
        groupLabel: 'h-6 gap-1 px-1.5 py-1 text-3xs',
        group: 'gap-0.875',
        button: 'gap-1.5 h-6 px-1.5 py-1 group-data-[state=collapsed]:w-6',
        sub: 'gap-0.875 ps-1.5 pt-0.875',
        subButton: 'gap-1.5 h-6 px-1.5 py-1 group-data-[state=collapsed]:w-6',
        itemLinkIcon: 'size-2 -ms-1',
        itemTag: 'min-h-3.5 px-1 text-4xs',
        itemAction: 'end-1 size-4 text-2xs'
      },
      sm: {
        root: 'gap-1 p-1.75 text-xs',
        groupRoot: 'mb-1',
        groupLabel: 'h-7 gap-1.5 px-1.75 py-1 text-2xs',
        group: 'gap-1',
        button: 'gap-1.75 h-7 px-1.75 py-1 group-data-[state=collapsed]:w-7',
        sub: 'gap-1 ps-1.75 pt-1',
        subButton: 'gap-1.75 h-7 px-1.75 py-1 group-data-[state=collapsed]:w-7',
        itemLinkIcon: 'size-2.5 -ms-1.5',
        itemTag: 'min-h-4 px-1.25 text-3xs',
        itemAction: 'end-1.25 size-4.5 text-xs'
      },
      md: {
        root: 'gap-1.25 p-2 text-sm',
        groupRoot: 'mb-1.25',
        groupLabel: 'h-8 gap-2 px-2 py-1.5 text-xs',
        group: 'gap-1.25',
        button: 'gap-2 h-8 px-2 py-1.5 group-data-[state=collapsed]:w-8',
        sub: 'gap-1.25 ps-2 pt-1.25',
        subButton: 'gap-2 h-8 px-2 py-1.5 group-data-[state=collapsed]:w-8',
        itemLinkIcon: 'size-3 -ms-2',
        itemTag: 'min-h-4.5 px-1.5 text-2xs',
        itemAction: 'end-1.5 size-5 text-sm'
      },
      lg: {
        root: 'gap-1.5 p-2.25 text-base',
        groupRoot: 'mb-1.5',
        groupLabel: 'h-9 gap-2.5 px-2.25 py-1.5 text-sm',
        group: 'gap-1.5',
        button: 'gap-2.25 h-9 px-2.25 py-1.5 group-data-[state=collapsed]:w-9',
        sub: 'gap-1.5 ps-2.25 pt-1.5',
        subButton: 'gap-2.25 h-9 px-2.25 py-1.5 group-data-[state=collapsed]:w-9',
        itemLinkIcon: 'size-3.5 -ms-2.5',
        itemTag: 'min-h-5 px-1.75 text-xs',
        itemAction: 'end-1.75 size-5.5 text-base'
      },
      xl: {
        root: 'gap-2 p-2.5 text-lg',
        groupRoot: 'mb-2',
        groupLabel: 'h-10 gap-3 px-2.5 py-2 text-base',
        group: 'gap-2',
        button: 'gap-2.5 h-10 px-2.5 py-2 group-data-[state=collapsed]:w-10',
        sub: 'gap-2 ps-2.5 pt-2',
        subButton: 'gap-2.5 h-10 px-2.5 py-2 group-data-[state=collapsed]:w-10',
        itemLinkIcon: 'size-4 -ms-3',
        itemTag: 'min-h-5.5 px-2 text-sm',
        itemAction: 'end-2 size-6 text-lg'
      },
      '2xl': {
        root: 'gap-2.5 p-3 text-xl',
        groupRoot: 'mb-2.5',
        groupLabel: 'h-12 gap-3.5 px-3 py-2.5 text-lg',
        group: 'gap-2.5',
        button: 'gap-3 h-12 px-3 py-2.5 group-data-[state=collapsed]:w-12',
        sub: 'gap-2.5 ps-3 pt-2.5',
        subButton: 'gap-3 h-12 px-3 py-2.5 group-data-[state=collapsed]:w-12',
        itemLinkIcon: 'size-5 -ms-4',
        itemTag: 'min-h-6 px-2.5 text-base',
        itemAction: 'end-2.5 size-7 text-xl'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
