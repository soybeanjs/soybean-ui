// @unocss-include
import { tv } from 'tailwind-variants';

export const treeMenuVariants = tv({
  slots: {
    root: 'group flex-1 flex flex-col w-full h-full overflow-auto data-[state=collapsed]:w-[--soybean-tree-menu-collapsed-width] transition-[width,height]-200 ease-out',
    groupRoot: '',
    group: 'flex flex-col m-0 p-0 list-none',
    groupLabel: `flex items-center text-foreground/70 group-data-[state=collapsed]:size-0 group-data-[state=collapsed]:p-0 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:overflow-hidden transition-[height,padding,opacity]-200`,
    item: 'relative m-0 p-0 group-data-[state=collapsed]:hover:bg-sidebar-accent group-data-[state=collapsed]:hover:rounded-sm',
    button: [
      `group/button relative flex items-center w-full rounded-sm outline-none cursor-pointer select-none group-data-[state=collapsed]:overflow-hidden`,
      `data-[active=true]:bg-primary/10 data-[active=true]:text-primary`,
      `data-[active=false]:hover:bg-sidebar-accent data-[active=false]:focus:bg-sidebar-accent`,
      `data-[child-active=true]:text-primary`,
      `data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    collapsibleIcon: `shrink-0 ml-auto text-muted-foreground transition-transform-200 group-data-[state=open]/button:rotate-90 group-data-[child-active=true]/button:text-primary`,
    collapsibleContent: [
      'overflow-hidden transition will-change-auto',
      'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'
    ],
    sub: 'flex flex-col m-0 list-none ml-[--soybean-tree-menu-indent] border-l border-sidebar-border border-solid',
    itemLabel: 'truncate',
    itemLinkIcon: `shrink-0 self-start text-muted-foreground`,
    itemBadge: ``,
    itemTag: `shrink-0 ml-auto`,
    itemAction: `absolute -translate-y-1/2 top-1/2`,
    itemAbsolute: `absolute top-0 left-0 w-full h-full z-1 cursor-pointer`
  },
  variants: {
    size: {
      xs: {
        root: 'gap-2 p-1.5 text-2xs data-[state=collapsed]:gap-0.75',
        groupLabel: 'h-6 gap-1 px-1.5 py-1 text-3xs',
        group: 'gap-0.75',
        button: 'gap-1.5 h-6 px-1.5 py-1 group-data-[state=collapsed]:w-6',
        sub: 'gap-0.75 px-1.5 pt-0.75',
        subButton: 'gap-1.5 h-6 px-1.5 py-1 group-data-[state=collapsed]:w-6',
        itemLinkIcon: 'size-2 -ml-1',
        itemAction: 'right-1.5'
      },
      sm: {
        root: 'gap-2.5 p-1.75 text-xs data-[state=collapsed]:gap-0.875',
        groupLabel: 'h-7 gap-1.5 px-1.75 py-1 text-2xs',
        group: 'gap-0.875',
        button: 'gap-1.75 h-7 px-1.75 py-1 group-data-[state=collapsed]:w-7',
        sub: 'gap-0.875 px-1.75 pt-0.875',
        subButton: 'gap-1.75 h-7 px-1.75 py-1 group-data-[state=collapsed]:w-7',
        itemLinkIcon: 'size-2.5 -ml-1.5',
        itemAction: 'right-1.75'
      },
      md: {
        root: 'gap-3 p-2 text-sm data-[state=collapsed]:gap-1',
        groupLabel: 'h-8 gap-2 px-2 py-1.5 text-xs',
        group: 'gap-1',
        button: 'gap-2 h-8 px-2 py-1.5 group-data-[state=collapsed]:w-8',
        sub: 'gap-1 px-2 pt-1',
        subButton: 'gap-2 h-8 px-2 py-1.5 group-data-[state=collapsed]:w-8',
        itemLinkIcon: 'size-3 -ml-2',
        itemAction: 'right-2'
      },
      lg: {
        root: 'gap-3.5 p-2.25 text-base data-[state=collapsed]:gap-1.25',
        groupLabel: 'h-9 gap-2.5 px-2.25 py-1.5 text-sm',
        group: 'gap-1.25',
        button: 'gap-2.25 h-9 px-2.25 py-1.5 group-data-[state=collapsed]:w-9',
        sub: 'gap-1.25 px-2.25 pt-1.25',
        subButton: 'gap-2.25 h-9 px-2.25 py-1.5 group-data-[state=collapsed]:w-9',
        itemLinkIcon: 'size-3.5 -ml-2.5',
        itemAction: 'right-2.25'
      },
      xl: {
        root: 'gap-4 p-2.5 text-lg data-[state=collapsed]:gap-1.5',
        groupLabel: 'h-10 gap-3 px-2.5 py-1.5 text-base',
        group: 'gap-1.5',
        button: 'gap-2.5 h-10 px-2.5 py-2 group-data-[state=collapsed]:w-10',
        sub: 'gap-1.5 px-2.5 pt-1.5',
        subButton: 'gap-2.5 h-10 px-2.5 py-2 group-data-[state=collapsed]:w-10',
        itemLinkIcon: 'size-4 -ml-3',
        itemAction: 'right-2.5'
      },
      '2xl': {
        root: 'gap-5 p-3 text-xl data-[state=collapsed]:gap-2',
        groupLabel: 'h-12 gap-3.5 px-3 py-2.5 text-lg',
        group: 'gap-2',
        button: 'gap-3 h-12 px-3 py-2.5 group-data-[state=collapsed]:w-12',
        sub: 'gap-2 px-3 pt-2',
        subButton: 'gap-3 h-12 px-3 py-2.5 group-data-[state=collapsed]:w-12',
        itemLinkIcon: 'size-5 -ml-4',
        itemAction: 'right-3'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
