// @unocss-include
import { tv } from 'tailwind-variants';

export const dropdownMenuVariants = tv({
  slots: {
    label: 'font-semibold',
    content: [
      `z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[state=closed]:(animate-out fade-out-0 zoom-out-95)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    subContent: [
      `z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[state=closed]:(animate-out fade-out-0 zoom-out-95)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    item: [
      `relative flex items-center gap-3 rounded-sm outline-none transition-colors cursor-default select-none`,
      `focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemIcon: `text-muted-foreground`,
    subTrigger: `flex items-center gap-3 rounded-sm outline-none cursor-default select-none focus:bg-accent data-[state=open]:bg-accent`,
    subTriggerIcon: `ml-auto text-muted-foreground`,
    shortcut: `ml-auto tracking-widest opacity-60`,
    separator: `-mx-1 my-1 h-px bg-border`,
    checkboxItem: [
      `relative flex items-center gap-3 rounded-sm outline-none outline-offset-2 transition-colors cursor-pointer select-none`,
      `focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    checkboxItemIndicator: `absolute flex items-center justify-center text-primary`,
    radioItem: [
      `relative flex items-center gap-3 rounded-sm outline-none transition-colors cursor-pointer select-none`,
      `focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    radioItemIndicator: `absolute flex items-center justify-center text-primary`,
    arrow: 'absolute size-8px rotate-45 border-b border-r border-border bg-popover -top-4px rounded-1px'
  },
  variants: {
    size: {
      xs: {
        label: 'py-1 px-1 text-xs',
        item: 'py-1 px-1 text-xs',
        subTrigger: 'py-1 px-1 text-xs',
        shortcut: 'text-xs',
        checkboxItem: 'py-1 pl-6 pr-1 text-xs',
        checkboxItemIndicator: 'left-1',
        radioItem: 'py-1 pl-6 pr-1 text-xs',
        radioItemIndicator: 'left-1'
      },
      sm: {
        label: 'py-1 px-1.5 text-sm',
        item: 'py-1 px-1.5 text-sm',
        subTrigger: 'py-1 px-1.5 text-sm',
        shortcut: 'text-xs',
        checkboxItem: 'py-1 pl-7 pr-1.5 text-sm',
        checkboxItemIndicator: 'left-1.5',
        radioItem: 'py-1 pl-7 pr-1.5 text-sm',
        radioItemIndicator: 'left-1.5'
      },
      md: {
        label: 'py-1.5 px-2 text-sm',
        item: 'py-1.5 px-2 text-sm',
        subTrigger: 'py-1.5 px-2 text-sm',
        shortcut: 'text-xs',
        checkboxItem: 'py-1.5 pl-8 pr-2 text-sm',
        checkboxItemIndicator: 'left-2',
        radioItem: 'py-1.5 pl-8 pr-2 text-sm',
        radioItemIndicator: 'left-2'
      },
      lg: {
        label: 'py-1.5 px-2.5 text-base',
        item: 'py-1.5 px-2.5 text-base',
        subTrigger: 'py-1.5 px-2.5 text-base',
        shortcut: 'text-sm',
        checkboxItem: 'py-1.5 pl-9 pr-2.5 text-base',
        checkboxItemIndicator: 'left-2.5',
        radioItem: 'py-1.5 pl-9 pr-2.5 text-base',
        radioItemIndicator: 'left-2.5'
      },
      xl: {
        label: 'py-2 px-3 text-base',
        item: 'py-2 px-3 text-base',
        subTrigger: 'py-2 px-3 text-base',
        shortcut: 'text-sm',
        checkboxItem: 'py-2 pl-10 pr-3 text-base',
        checkboxItemIndicator: 'left-3',
        radioItem: 'py-2 pl-10 pr-3 text-base',
        radioItemIndicator: 'left-3'
      },
      xxl: {
        label: 'py-2.5 px-3.5 text-lg',
        item: 'py-2.5 px-3.5 text-lg',
        subTrigger: 'py-2.5 px-3.5 text-lg',
        shortcut: 'text-base',
        checkboxItem: 'py-2.5 pl-12 pr-3.5 text-lg',
        checkboxItemIndicator: 'left-3.5',
        radioItem: 'py-2.5 pl-12 pr-3.5 text-lg',
        radioItemIndicator: 'left-3.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
