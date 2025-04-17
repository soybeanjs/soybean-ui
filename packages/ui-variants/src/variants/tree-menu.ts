// @unocss-include
import { tv } from 'tailwind-variants';

export const treeMenuVariants = tv({
  slots: {
    root: '',
    groupLabel: 'flex items-center w-full text-foreground/70',
    label: 'flex items-center w-full font-semibold',
    group: '',
    childGroup: '',
    item: [
      `relative flex items-center w-full rounded-sm outline-none transition-colors-200 cursor-default select-none`,
      `hover:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemIcon: `shrink-0 text-muted-foreground`,
    itemLink: [
      `relative flex items-center w-full rounded-sm outline-none transition-colors-200 cursor-pointer select-none decoration-none`,
      `hover:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemLinkIcon: `shrink-0 self-start text-muted-foreground`,
    collapsibleIcon: `shrink-0 ml-auto text-muted-foreground transition-transform-200 data-[open]:rotate-90`
  },
  variants: {
    size: {
      xs: {
        root: 'p-1 text-2xs',
        group: 'pb-1.5',
        groupLabel: 'gap-1 px-1 py-1 text-3xs',
        childGroup: 'pl-3',
        label: 'gap-1 px-1 py-1',
        item: 'gap-1 px-1 py-1',
        itemLink: 'gap-1 px-1 py-1',
        itemLinkIcon: 'size-2 -ml-1'
      },
      sm: {
        root: 'p-1.5 text-xs',
        group: 'pb-1.75',
        groupLabel: 'gap-1.5 px-1.5 py-1 text-2xs',
        childGroup: 'pl-3.5',
        label: 'gap-1.5 px-1.5 py-1',
        item: 'gap-1.5 px-1.5 py-1',
        itemLink: 'gap-1.5 px-1.5 py-1',
        itemLinkIcon: 'size-2.5 -ml-1.5'
      },
      md: {
        root: 'p-2 text-sm',
        group: 'pb-2',
        groupLabel: 'gap-2 px-2 py-1.5 text-xs',
        childGroup: 'pl-4',
        label: 'gap-2 px-2 py-1.5',
        item: 'gap-2 px-2 py-1.5',
        itemLink: 'gap-2 px-2 py-1.5',
        itemLinkIcon: 'size-3 -ml-2'
      },
      lg: {
        root: 'p-2.5 text-base',
        group: 'pb-2.5',
        groupLabel: 'gap-2.5 px-2.5 py-1.5 text-sm',
        childGroup: 'pl-5.5',
        label: 'gap-2.5 px-2.5 py-1.5',
        item: 'gap-2.5 px-2.5 py-1.5',
        itemLink: 'gap-2.5 px-2.5 py-1.5',
        itemLinkIcon: 'size-3.5 -ml-2.5'
      },
      xl: {
        root: 'p-3 text-lg',
        group: 'pb-3',
        groupLabel: 'gap-3 px-3 py-2 text-base',
        childGroup: 'pl-6',
        label: 'gap-3 px-3 py-2',
        item: 'gap-3 px-3 py-2',
        itemLink: 'gap-3 px-3 py-2',
        itemLinkIcon: 'size-4 -ml-3'
      },
      '2xl': {
        root: 'p-3.5 text-xl',
        group: 'pb-3.5',
        groupLabel: 'gap-3.5 px-3.5 py-2.5 text-lg',
        childGroup: 'pl-6.5',
        label: 'gap-3.5 px-3.5 py-2.5',
        item: 'gap-3.5 px-3.5 py-2.5',
        itemLink: 'gap-3.5 px-3.5 py-2.5',
        itemLinkIcon: 'size-4.5 -ml-3.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type TreeMenuSlots = keyof typeof treeMenuVariants.slots;
