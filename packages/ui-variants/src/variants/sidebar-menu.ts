// @unocss-include
import { tv } from 'tailwind-variants';

export const sidebarMenuVariants = tv({
  slots: {
    root: 'group flex-1 size-full overflow-auto data-[state=collapsed]:w-[--sidebar-collapsed-menu-width] transition-[width,height]-200 ease-out',
    groupLabel: `flex items-center text-foreground/70  group-data-[state=collapsed]:(size-0 p-0 opacity-0 overflow-hidden) transition-[height,padding,opacity]-200`,
    group: 'flex flex-col items-stretch w-full group-data-[state=collapsed]:pb-0',
    collapsibleContent: 'data-[state=collapsed]:w-fit',
    childGroup: 'flex flex-col items-stretch border-l border-border border-solid',
    item: [
      `relative flex items-center w-full rounded-sm outline-none cursor-pointer select-none`,
      `data-[checked=true]:(bg-primary/10 text-primary)`,
      `data-[contains-checked=true]:text-primary`,
      `hover:data-[checked=false]:(bg-accent text-accent-foreground)`,
      `hover:data-[contains-checked=true]:text-primary`,
      `transition-[width,height,colors]-200 ease-linear`,
      `data-[disabled]:(pointer-events-none opacity-50)`,
      `group-data-[state=collapsed]:overflow-hidden`
    ],
    itemIcon: `shrink-0`,
    label: 'truncate',
    itemLink: [
      `relative flex items-center w-full rounded-sm outline-none cursor-pointer select-none decoration-none`,
      `data-[checked=true]:(bg-primary/10 text-primary)`,
      `hover:data-[checked=false]:(bg-accent text-accent-foreground)`,
      `transition-[width,height,colors]-200 ease-linear`,
      `data-[disabled]:(pointer-events-none opacity-50)`,
      `group-data-[state=collapsed]:overflow-hidden`
    ],
    itemLinkIcon: `shrink-0 self-start`,
    collapsibleIcon: `shrink-0 ml-auto text-muted-foreground transition-transform-200 data-[open]:rotate-90`,
    actionIcon: `shrink-0 ml-auto text-muted-foreground`,
    badge: `shrink-0 ml-auto`,
    chip: ``
  },
  variants: {
    size: {
      xs: {
        root: 'p-1.5 text-2xs',
        group: 'gap-0.75 pb-1.5 group-data-[state=collapsed]:pl-[calc(var(--sidebar-collapsed-menu-width)/2-1.125rem)]',
        groupLabel: 'h-6 gap-1 px-1.5 py-1 text-3xs',
        collapsibleContent: 'pl-3',
        childGroup: 'gap-0.75 pt-0.75 pl-1.5',
        item: 'h-6 gap-1.5 px-1.5 py-1 group-data-[state=collapsed]:w-6 text-2xs',
        itemLink: 'h-6 gap-1.5 px-1.5 py-1 group-data-[state=collapsed]:w-6 text-2xs',
        itemIcon: 'size-3',
        itemLinkIcon: 'size-2 -ml-1'
      },
      sm: {
        root: 'p-1.75 text-xs',
        group: `gap-0.875 pb-1.75 group-data-[state=collapsed]:pl-[calc(var(--sidebar-collapsed-menu-width)/2-1.3125rem)]`,
        groupLabel: 'h-7 gap-1.5 px-1.75 py-1 text-2xs',
        collapsibleContent: 'pl-3.5',
        childGroup: 'gap-0.875 pt-0.875 pl-1.75',
        item: 'h-7 gap-1.75 px-1.75 py-1 group-data-[state=collapsed]:w-7 text-xs',
        itemLink: 'h-7 gap-1.75 px-1.75 py-1 group-data-[state=collapsed]:w-7 text-xs',
        itemIcon: 'size-3.5',
        itemLinkIcon: 'size-2.5 -ml-1.5'
      },
      md: {
        root: 'p-2 text-sm',
        group: 'gap-1 pb-2 group-data-[state=collapsed]:pl-[calc(var(--sidebar-collapsed-menu-width)/2-1.5rem)]',
        groupLabel: 'h-8 gap-2 px-2 py-1.5 text-xs',
        collapsibleContent: 'pl-4',
        childGroup: 'gap-1 pt-1 pl-2',
        item: 'h-8 gap-2 px-2 py-1.5 group-data-[state=collapsed]:w-8 text-sm',
        itemLink: 'h-8 gap-2 px-2 py-1.5 group-data-[state=collapsed]:w-8',
        itemIcon: 'size-4',
        itemLinkIcon: 'size-3 -ml-2'
      },
      lg: {
        root: 'p-2.25 text-base',
        group: `gap-1.25 pb-2.25 group-data-[state=collapsed]:pl-[calc(var(--sidebar-collapsed-menu-width)/2-1.6875rem)]`,
        groupLabel: 'h-9 gap-2.5 px-2.25 py-1.5 text-sm',
        collapsibleContent: 'pl-4.5',
        childGroup: 'gap-1.25 pt-1.25 pl-2.25',
        item: 'h-9 gap-2.25 px-2.25 py-1.5 group-data-[state=collapsed]:w-9 text-base',
        itemLink: 'h-9 gap-2.25 px-2.25 py-1.5 group-data-[state=collapsed]:w-9 text-base',
        itemIcon: 'size-4.5',
        itemLinkIcon: 'size-3.5 -ml-2.5'
      },
      xl: {
        root: 'p-2.5 text-lg',
        group: 'gap-1.5 pb-2.5 group-data-[state=collapsed]:pl-[calc(var(--sidebar-collapsed-menu-width)/2-1.875rem)]',
        groupLabel: 'h-10 gap-3 px-2.5 py-1.5 text-base',
        collapsibleContent: 'pl-5',
        childGroup: 'gap-1.5 pt-1.5 pl-2.5',
        item: 'h-10 gap-2.5 px-2.5 py-2 group-data-[state=collapsed]:w-10 text-lg',
        itemLink: 'h-10 gap-2.5 px-2.5 py-2 group-data-[state=collapsed]:w-10 text-lg',
        itemIcon: 'size-5',
        itemLinkIcon: 'size-4 -ml-3'
      },
      '2xl': {
        root: 'p-3 text-xl',
        group: 'gap-2 pb-3 group-data-[state=collapsed]:pl-[calc(var(--sidebar-collapsed-menu-width)/2-2.25rem)]',
        groupLabel: 'h-12 gap-3.5 px-3 py-2.5 text-lg',
        collapsibleContent: 'pl-6',
        childGroup: 'gap-2 pt-2 pl-3',
        item: 'h-12 gap-3 px-3 py-2.5 group-data-[state=collapsed]:w-12 text-xl',
        itemLink: 'h-12 gap-3 px-3 py-2.5 group-data-[state=collapsed]:w-12 text-xl',
        itemIcon: 'size-6',
        itemLinkIcon: 'size-5 -ml-4'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type SidebarMenuSlots = keyof typeof sidebarMenuVariants.slots;
