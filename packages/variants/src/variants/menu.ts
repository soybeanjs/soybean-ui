// @unocss-include
import { tv } from 'tailwind-variants';

export const menuVariants = tv({
  slots: {
    arrow: 'fill-popover stroke-border',
    label: 'font-semibold',
    content: [
      `z-50 min-w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md will-change-transform`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[state=closed]:(fade-out-0 zoom-out-95)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    subContent: [
      `z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg will-change-transform`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[state=closed]:(animate-out fade-out-0 zoom-out-95)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    item: [
      `relative flex items-center gap-3 rounded-sm outline-none transition-colors cursor-default select-none`,
      `focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemIcon: `text-muted-foreground`,
    itemLink: [
      `relative flex items-center gap-3 rounded-sm outline-none transition-colors cursor-pointer select-none`,
      `focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemLinkIcon: `self-start -ml-3 text-muted-foreground`,
    subTrigger: `flex items-center gap-3 rounded-sm outline-none cursor-default select-none focus:bg-accent data-[state=open]:bg-accent`,
    subTriggerIcon: `ml-auto text-muted-foreground`,
    shortcut: `ml-auto tracking-widest opacity-60`,
    separator: `-mx-1 my-1 h-px bg-border`,
    checkboxItem: [
      `relative flex items-center gap-3 rounded-sm outline-none outline-offset-2 transition-colors cursor-pointer select-none`,
      `focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemIndicator: `absolute flex items-center justify-center text-primary`,
    radioItem: [
      `relative flex items-center gap-3 rounded-sm outline-none transition-colors cursor-pointer select-none`,
      `focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    radioIndicatorIconRoot: `size-1.25em flex items-center justify-center`,
    radioIndicatorIcon: `size-1/2 rounded-full bg-primary`
  },
  variants: {
    size: {
      xs: {
        label: 'py-1 px-1 text-xs',
        item: 'py-1 px-1 text-xs',
        itemLink: 'py-1 px-1 text-xs',
        itemLinkIcon: 'size-2',
        subTrigger: 'py-1 px-1 text-xs',
        shortcut: 'text-xs',
        checkboxItem: 'py-1 pl-6 pr-1 text-xs',
        itemIndicator: 'left-1',
        radioItem: 'py-1 pl-6 pr-1 text-xs'
      },
      sm: {
        label: 'py-1 px-1.5 text-sm',
        item: 'py-1 px-1.5 text-sm',
        itemLink: 'py-1 px-1.5 text-sm',
        itemLinkIcon: 'size-2.5',
        subTrigger: 'py-1 px-1.5 text-sm',
        shortcut: 'text-xs',
        checkboxItem: 'py-1 pl-7 pr-1.5 text-sm',
        itemIndicator: 'left-1.5',
        radioItem: 'py-1 pl-7 pr-1.5 text-sm'
      },
      md: {
        label: 'py-1.5 px-2 text-sm',
        item: 'py-1.5 px-2 text-sm',
        itemLink: 'py-1.5 px-2 text-sm',
        itemLinkIcon: 'size-3',
        subTrigger: 'py-1.5 px-2 text-sm',
        shortcut: 'text-xs',
        checkboxItem: 'py-1.5 pl-8 pr-2 text-sm',
        itemIndicator: 'left-2',
        radioItem: 'py-1.5 pl-8 pr-2 text-sm'
      },
      lg: {
        label: 'py-1.5 px-2.5 text-base',
        item: 'py-1.5 px-2.5 text-base',
        itemLink: 'py-1.5 px-2.5 text-base',
        itemLinkIcon: 'size-3.5',
        subTrigger: 'py-1.5 px-2.5 text-base',
        shortcut: 'text-sm',
        checkboxItem: 'py-1.5 pl-9 pr-2.5 text-base',
        itemIndicator: 'left-2.5',
        radioItem: 'py-1.5 pl-9 pr-2.5 text-base'
      },
      xl: {
        label: 'py-2 px-3 text-base',
        item: 'py-2 px-3 text-base',
        itemLink: 'py-2 px-3 text-base',
        itemLinkIcon: 'size-4',
        subTrigger: 'py-2 px-3 text-base',
        shortcut: 'text-sm',
        checkboxItem: 'py-2 pl-10 pr-3 text-base',
        itemIndicator: 'left-3',
        radioItem: 'py-2 pl-10 pr-3 text-base'
      },
      xxl: {
        label: 'py-2.5 px-3.5 text-lg',
        item: 'py-2.5 px-3.5 text-lg',
        itemLink: 'py-2.5 px-3.5 text-lg',
        itemLinkIcon: 'size-4.5',
        subTrigger: 'py-2.5 px-3.5 text-lg',
        shortcut: 'text-base',
        checkboxItem: 'py-2.5 pl-12 pr-3.5 text-lg',
        itemIndicator: 'left-3.5',
        radioItem: 'py-2.5 pl-12 pr-3.5 text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
