// @unocss-include
import { tv } from 'tailwind-variants';

export const menuVariants = tv({
  slots: {
    positioner: '',
    popup: [
      `z-50 min-w-max rounded-md border bg-popover text-popover-foreground shadow-md will-change-transform outline-none`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    arrow: 'w-1em h-0.5em fill-popover stroke-border',
    subPositioner: '',
    subPopup: [
      `z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg will-change-transform outline-none`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    group: '',
    groupLabel: 'flex items-center font-medium text-muted-foreground',
    checkboxGroup: '',
    radioGroup: '',
    item: [
      `relative flex items-center rounded-sm outline-none transition-colors-200 cursor-pointer select-none`,
      `focus:bg-accent focus:text-accent-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`,
      `data-[active=true]:bg-primary/10 data-[active=true]:text-primary`,
      `data-[active=false]:hover:bg-accent data-[active=false]:focus:bg-accent`
    ],
    itemIcon: `shrink-0 text-muted-foreground`,
    itemLink: [
      `relative flex items-center rounded-sm outline-none transition-colors-200 cursor-pointer select-none decoration-none`,
      `focus:bg-accent focus:text-accent-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    itemLinkIcon: `shrink-0 self-start text-muted-foreground`,
    subTrigger: `group/trigger flex items-center rounded-sm outline-none cursor-pointer select-none focus:bg-accent data-[state=open]:bg-accent data-[child-active]:text-primary`,
    subTriggerIcon: `ms-auto text-muted-foreground group-data-[child-active]/trigger:text-primary`,
    shortcut: `ms-auto tracking-widest opacity-60`,
    separator: `h-px bg-border`,
    checkboxItem: [
      `relative flex items-center rounded-sm outline-none transition-colors-200 cursor-pointer select-none`,
      `focus:bg-accent focus:text-accent-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    itemIndicator: `absolute flex items-center justify-center text-primary`,
    radioItem: [
      `relative flex items-center rounded-sm outline-none transition-colors-200 cursor-pointer select-none`,
      `focus:bg-accent focus:text-accent-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ]
  },
  variants: {
    size: {
      xs: {
        popup: 'text-2xs p-0.75',
        groupLabel: 'gap-1 p-1 text-3xs',
        item: 'gap-1 px-1 py-1',
        itemLink: 'gap-1 px-1 py-1',
        itemLinkIcon: 'size-2 -ms-1',
        separator: '-mx-0.75 my-0.75',
        subTrigger: 'gap-1 px-1 py-1',
        subPopup: 'text-2xs p-0.75',
        checkboxItem: 'gap-1 py-1',
        radioItem: 'gap-1 py-1'
      },
      sm: {
        popup: 'text-xs p-0.875',
        groupLabel: 'gap-1.25 p-1.25 text-2xs',
        item: 'gap-1.5 px-1.5 py-1',
        itemLink: 'gap-1.5 px-1.5 py-1',
        itemLinkIcon: 'size-2.5 -ms-1.5',
        separator: '-mx-0.875 my-0.875',
        subTrigger: 'gap-1.5 px-1.5 py-1',
        subPopup: 'text-xs p-0.875',
        checkboxItem: 'gap-1.5 py-1',
        radioItem: 'gap-1.5 py-1'
      },
      md: {
        popup: 'text-sm p-1',
        groupLabel: 'gap-1.75 p-1.75 text-xs',
        item: 'gap-2 px-2 py-1.5',
        itemLink: 'gap-2 px-2 py-1.5',
        itemLinkIcon: 'size-3 -ms-2',
        separator: '-mx-1 my-1',
        subTrigger: 'gap-2 px-2 py-1.5',
        subPopup: 'text-sm p-1',
        checkboxItem: 'gap-2 py-1.5',
        radioItem: 'gap-2 py-1.5'
      },
      lg: {
        popup: 'text-base p-1.25',
        groupLabel: 'gap-2 p-2 text-sm',
        item: 'gap-2.5 px-2.5 py-1.5',
        itemLink: 'gap-2.5 px-2.5 py-1.5',
        itemLinkIcon: 'size-3.5 -ms-2.5',
        separator: '-mx-1.25 my-1.25',
        subTrigger: 'gap-2.5 px-2.5 py-1.5',
        subPopup: 'text-base p-1.25',
        checkboxItem: 'gap-2.5 py-1.5',
        radioItem: 'gap-2.5 py-1.5'
      },
      xl: {
        popup: 'text-lg p-1.5',
        groupLabel: 'gap-2.5 p-2.5 text-base',
        item: 'gap-3 px-3 py-2',
        itemLink: 'gap-3 px-3 py-2',
        itemLinkIcon: 'size-4 -ms-3',
        separator: '-mx-1.5 my-1.5',
        subTrigger: 'gap-3 px-3 py-2',
        subPopup: 'text-lg p-1.5',
        checkboxItem: 'gap-3 py-2',
        radioItem: 'gap-3 py-2'
      },
      '2xl': {
        popup: 'text-xl p-1.75',
        groupLabel: 'gap-3 p-3 text-lg',
        item: 'gap-3.5 px-3.5 py-2.5',
        itemLink: 'gap-3.5 px-3.5 py-2.5',
        itemLinkIcon: 'size-4.5 -ms-3.5',
        separator: '-mx-1.75 my-1.75',
        subTrigger: 'gap-3.5 px-3.5 py-2.5',
        subPopup: 'text-xl p-1.75',
        checkboxItem: 'gap-3.5 py-2.5',
        radioItem: 'gap-3.5 py-2.5'
      }
    },
    indicatorPosition: {
      start: {
        itemIndicator: 'start-2',
        checkboxItem: 'ps-8 pe-2',
        radioItem: 'ps-8 pe-2'
      },
      end: {
        itemIndicator: 'end-2',
        checkboxItem: 'ps-2 pe-8',
        radioItem: 'ps-2 pe-8'
      }
    }
  },
  compoundVariants: [
    {
      indicatorPosition: 'start',
      size: 'xs',
      class: {
        itemIndicator: 'start-1',
        checkboxItem: 'ps-6 pe-1',
        radioItem: 'ps-6 pe-1'
      }
    },
    {
      indicatorPosition: 'end',
      size: 'xs',
      class: {
        itemIndicator: 'end-1',
        checkboxItem: 'ps-1 pe-6',
        radioItem: 'ps-1 pe-6'
      }
    },
    {
      indicatorPosition: 'start',
      size: 'sm',
      class: {
        itemIndicator: 'start-1.5',
        checkboxItem: 'ps-7 pe-1.5',
        radioItem: 'ps-7 pe-1.5'
      }
    },
    {
      indicatorPosition: 'end',
      size: 'sm',
      class: {
        itemIndicator: 'end-1.5',
        checkboxItem: 'ps-1.5 pe-7',
        radioItem: 'ps-1.5 pe-7'
      }
    },
    {
      indicatorPosition: 'start',
      size: 'lg',
      class: {
        itemIndicator: 'start-2.5',
        checkboxItem: 'ps-9 pe-2.5',
        radioItem: 'ps-9 pe-2.5'
      }
    },
    {
      indicatorPosition: 'end',
      size: 'lg',
      class: {
        itemIndicator: 'end-2.5',
        checkboxItem: 'ps-2.5 pe-9',
        radioItem: 'ps-2.5 pe-9'
      }
    },
    {
      indicatorPosition: 'start',
      size: 'xl',
      class: {
        itemIndicator: 'start-3',
        checkboxItem: 'ps-10 pe-3',
        radioItem: 'ps-10 pe-3'
      }
    },
    {
      indicatorPosition: 'end',
      size: 'xl',
      class: {
        itemIndicator: 'end-3',
        checkboxItem: 'ps-3 pe-10',
        radioItem: 'ps-3 pe-10'
      }
    },
    {
      indicatorPosition: 'start',
      size: '2xl',
      class: {
        itemIndicator: 'start-3.5',
        checkboxItem: 'ps-12 pe-3.5',
        radioItem: 'ps-12 pe-3.5'
      }
    },
    {
      indicatorPosition: 'end',
      size: '2xl',
      class: {
        itemIndicator: 'end-3.5',
        checkboxItem: 'ps-3.5 pe-12',
        radioItem: 'ps-3.5 pe-12'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    indicatorPosition: 'start'
  }
});
