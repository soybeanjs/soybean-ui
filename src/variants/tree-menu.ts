// @unocss-include
import { tv } from 'tailwind-variants';

export const treeMenuVariants = tv({
  slots: {
    root: 'group flex-1 size-full overflow-auto data-[state=collapsed]:w-[--soybean-tree-menu-collapsed-width] transition-[width,height]-200 ease-out data-[state=collapsed]:space-y-0',
    groupLabel: `flex items-center text-foreground/70 list-none group-data-[state=collapsed]:size-0 group-data-[state=collapsed]:p-0 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:overflow-hidden transition-[height,padding,opacity]-200`,
    item: [
      `relative rounded-sm outline-none cursor-pointer select-none outline-none`,
      `data-[selected]:bg-primary/10 data-[selected]:text-primary`,
      `[&:not([data-selected])]:hover:bg-accent [&:not([data-selected])]:hover:text-accent-foreground`,
      `[&:not([data-selected])]:focus:bg-accent [&:not([data-selected])]:focus:text-accent-foreground`,
      `data-[contains-selected]:text-primary data-[contains-selected]:hover:text-primary data-[contains-selected]:focus:text-primary`,
      `data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`,
      `group-data-[state=collapsed]:overflow-hidden`
    ],
    itemContent: `flex items-center w-full outline-none data-[link]:decoration-none`,
    itemAbsolute: `absolute top-0 left-0 w-full h-full z-1`,
    itemLabel: 'truncate',
    itemLinkIcon: `shrink-0 self-start text-muted-foreground`,
    itemBadge: ``,
    itemTag: `shrink-0 ml-auto`,
    itemAction: `absolute -translate-y-1/2 top-1/2`,
    collapsibleIcon: `shrink-0 ml-auto text-muted-foreground transition-transform-200 data-[expanded]:rotate-90`
  },
  variants: {
    size: {
      xs: {
        root: 'space-y-0.75 p-1.5 text-2xs',
        groupLabel: 'h-6 gap-1 px-1.5 py-1 text-3xs',
        item: 'h-6 px-1.5 py-1 group-data-[state=collapsed]:w-6 text-2xs ml-[calc(var(--soybean-tree-menu-indent)*0.75rem)]',
        itemContent: 'gap-1.5',
        itemLinkIcon: 'size-2 -ml-1',
        itemAction: 'right-1.5'
      },
      sm: {
        root: 'space-y-0.875 p-1.75 text-xs',
        groupLabel: 'h-7 gap-1.5 px-1.75 py-1 text-2xs',
        item: 'h-7 px-1.75 py-1 group-data-[state=collapsed]:w-7 text-xs ml-[calc(var(--soybean-tree-menu-indent)*0.875rem)]',
        itemContent: 'gap-1.75',
        itemLinkIcon: 'size-2.5 -ml-1.5',
        itemAction: 'right-1.75'
      },
      md: {
        root: 'space-y-1 p-2 text-sm',
        groupLabel: 'h-8 gap-2 px-2 py-1.5 text-xs',
        item: 'h-8 px-2 py-1.5 group-data-[state=collapsed]:w-8 text-sm ml-[calc(var(--soybean-tree-menu-indent)*1rem)]',
        itemContent: 'gap-2',
        itemLinkIcon: 'size-3 -ml-2',
        itemAction: 'right-2'
      },
      lg: {
        root: 'space-y-1.25 p-2.25 text-base',
        groupLabel: 'h-9 gap-2.5 px-2.25 py-1.5 text-sm',
        item: 'h-9 px-2.25 py-1.5 group-data-[state=collapsed]:w-9 text-base ml-[calc(var(--soybean-tree-menu-indent)*1.125rem)]',
        itemContent: 'gap-2.25',
        itemLinkIcon: 'size-3.5 -ml-2.5',
        itemAction: 'right-2.25'
      },
      xl: {
        root: 'space-y-1.5 p-2.5 text-lg',
        groupLabel: 'h-10 gap-3 px-2.5 py-1.5 text-base',
        item: 'h-10 px-2.5 py-2 group-data-[state=collapsed]:w-10 text-lg ml-[calc(var(--soybean-tree-menu-indent)*1.25rem)]',
        itemContent: 'gap-2.5',
        itemLinkIcon: 'size-4 -ml-3',
        itemAction: 'right-2.5'
      },
      '2xl': {
        root: 'space-y-2 p-3 text-xl',
        groupLabel: 'h-12 gap-3.5 px-3 py-2.5 text-lg',
        item: 'h-12 px-3 py-2.5 group-data-[state=collapsed]:w-12 text-xl ml-[calc(var(--soybean-tree-menu-indent)*1.5rem)]',
        itemContent: 'gap-3',
        itemLinkIcon: 'size-5 -ml-4',
        itemAction: 'right-3'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
