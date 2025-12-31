// @unocss-include
import { tv } from 'tailwind-variants';

export const menuVariants = tv({
  slots: {
    positioner: '',
    popup: [
      `z-50 min-w-max rounded-md border bg-popover text-popover-foreground shadow-md will-change-transform`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    arrow: 'w-1em h-0.5em fill-popover stroke-border',
    subPositioner: '',
    subPopup: [
      `z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg will-change-transform`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    group: '',
    groupLabel: 'flex items-center font-medium text-muted-foreground',
    checkboxGroup: '',
    radioGroup: '',
    item: [
      `relative flex items-center rounded-sm outline-none transition-colors-200 cursor-default select-none`,
      `focus:bg-accent focus:text-accent-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    itemIcon: `shrink-0 text-muted-foreground`,
    itemLink: [
      `relative flex items-center rounded-sm outline-none transition-colors-200 cursor-pointer select-none decoration-none`,
      `focus:bg-accent focus:text-accent-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    itemLinkIcon: `shrink-0 self-start text-muted-foreground`,
    subTrigger: `flex items-center rounded-sm outline-none cursor-default select-none focus:bg-accent data-[state=open]:bg-accent`,
    subTriggerIcon: `ml-auto text-muted-foreground`,
    shortcut: `ml-auto tracking-widest opacity-60`,
    separator: `h-px bg-border`,
    checkboxItem: [
      `relative flex items-center rounded-sm outline-none transition-colors-200 cursor-pointer select-none`,
      `focus:bg-accent focus:text-accent-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    itemIndicator: `absolute flex items-center justify-center text-primary`,
    radioItem: [
      `relative flex items-center rounded-sm outline-none transition-colors-200 cursor-pointer select-none`,
      `focus:bg-accent focus:text-accent-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    radioIndicatorIcon: `shrink-0 fill-current`
  },
  variants: {
    size: {
      xs: {
        popup: 'text-2xs p-0.75',
        groupLabel: 'gap-1 p-1 text-3xs',
        item: 'gap-1 px-1 py-1',
        itemLink: 'gap-1 px-1 py-1',
        itemLinkIcon: 'size-2 -ml-1',
        separator: '-mx-0.75 my-0.75',
        subTrigger: 'gap-1 px-1 py-1',
        subPopup: 'text-2xs p-0.75',
        checkboxItem: 'gap-1 pl-6 pr-1 py-1',
        itemIndicator: 'left-1',
        radioItem: 'gap-1 pl-6 pr-1 py-1'
      },
      sm: {
        popup: 'text-xs p-0.875',
        groupLabel: 'gap-1.25 p-1.25 text-2xs',
        item: 'gap-1.5 px-1.5 py-1',
        itemLink: 'gap-1.5 px-1.5 py-1',
        itemLinkIcon: 'size-2.5 -ml-1.5',
        separator: '-mx-0.875 my-0.875',
        subTrigger: 'gap-1.5 px-1.5 py-1',
        subPopup: 'text-xs p-0.875',
        checkboxItem: 'gap-1.5 pl-7 pr-1.5 py-1',
        itemIndicator: 'left-1.5',
        radioItem: 'gap-1.5 pl-7 pr-1.5 py-1'
      },
      md: {
        popup: 'text-sm p-1',
        groupLabel: 'gap-1.75 p-1.75 text-xs',
        item: 'gap-2 px-2 py-1.5',
        itemLink: 'gap-2 px-2 py-1.5',
        itemLinkIcon: 'size-3 -ml-2',
        separator: '-mx-1 my-1',
        subTrigger: 'gap-2 px-2 py-1.5',
        subPopup: 'text-sm p-1',
        checkboxItem: 'gap-2 pl-8 pr-2 py-1.5',
        itemIndicator: 'left-2',
        radioItem: 'gap-2 pl-8 pr-2 py-1.5'
      },
      lg: {
        popup: 'text-base p-1.25',
        groupLabel: 'gap-2 p-2 text-sm',
        item: 'gap-2.5 px-2.5 py-1.5',
        itemLink: 'gap-2.5 px-2.5 py-1.5',
        itemLinkIcon: 'size-3.5 -ml-2.5',
        separator: '-mx-1.25 my-1.25',
        subTrigger: 'gap-2.5 px-2.5 py-1.5',
        subPopup: 'text-base p-1.25',
        checkboxItem: 'gap-2.5 pl-9 pr-2.5 py-1.5',
        itemIndicator: 'left-2.5',
        radioItem: 'gap-2.5 pl-9 pr-2.5 py-1.5'
      },
      xl: {
        popup: 'text-lg p-1.5',
        groupLabel: 'gap-2.5 p-2.5 text-base',
        item: 'gap-3 px-3 py-2',
        itemLink: 'gap-3 px-3 py-2',
        itemLinkIcon: 'size-4 -ml-3',
        separator: '-mx-1.5 my-1.5',
        subTrigger: 'gap-3 px-3 py-2',
        subPopup: 'text-lg p-1.5',
        checkboxItem: 'gap-3 pl-10 pr-3 py-2',
        itemIndicator: 'left-3',
        radioItem: 'gap-3 pl-10 pr-3 py-2'
      },
      '2xl': {
        popup: 'text-xl p-1.75',
        groupLabel: 'gap-3 p-3 text-lg',
        item: 'gap-3.5 px-3.5 py-2.5',
        itemLink: 'gap-3.5 px-3.5 py-2.5',
        itemLinkIcon: 'size-4.5 -ml-3.5',
        separator: '-mx-1.75 my-1.75',
        subTrigger: 'gap-3.5 px-3.5 py-2.5',
        subPopup: 'text-xl p-1.75',
        checkboxItem: 'gap-3.5 pl-12 pr-3.5 py-2.5',
        itemIndicator: 'left-3.5',
        radioItem: 'gap-3.5 pl-12 pr-3.5 py-2.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
