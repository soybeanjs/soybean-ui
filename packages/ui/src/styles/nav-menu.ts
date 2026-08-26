// @unocss-include
import { scv } from '@soybeanjs/cva';

export const navMenuVariants = scv({
  slots: {
    root: `group`,
    viewport: [
      `z-50 rounded-md border bg-popover text-popover-foreground shadow-lg will-change-transform`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`
    ],
    content: `w-auto`,
    list: [
      `group grow flex items-center justify-center my-0 list-none`,
      `group-data-[orientation=vertical]:flex-col group-data-[orientation=vertical]:items-stretch`
    ],
    subList: `grid grid-cols-[auto_auto] list-none my-0`,
    item: `list-none m-0`,
    itemIcon: 'shrink-0 text-muted-foreground',
    trigger: [
      `group inline-flex items-center rounded-md bg-background font-medium transition-colors-200 decoration-none outline-none`,
      `hover:bg-accent hover:text-accent-foreground`,
      `focus:bg-accent focus:text-accent-foreground`,
      `disabled:pointer-events-none disabled:opacity-50`,
      `data-[active]:bg-accent/50`,
      `data-[state=open]:bg-accent/50`
    ],
    triggerIcon: `ms-auto transition duration-200 group-data-[state=open]:rotate-180`,
    link: [
      `group relative w-full flex items-center rounded-md font-medium outline-none cursor-pointer decoration-none`,
      `focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground`,
      `data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    subLink: [
      `flex items-start select-none rounded-md no-underline outline-none transition-colors-200 cursor-pointer decoration-none`,
      `focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground`,
      `data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    subTrigger: [
      `w-full flex items-start gap-2 select-none rounded-md text-left outline-none transition-colors-200 cursor-pointer decoration-none`,
      `focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground`,
      `data-[state=open]:bg-accent/50`,
      `data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    subTriggerIcon: 'ms-auto shrink-0 text-muted-foreground',
    subContent: [
      `z-50 min-w-8rem rounded-md border bg-popover text-popover-foreground shadow-lg will-change-transform`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`
    ],
    linkIcon: 'shrink-0 self-start text-muted-foreground rtl:rotate-270',
    subLinkContent: `grow flex flex-col items-start`,
    subLinkLabel: `font-medium leading-none`,
    subLinkDescription: `line-clamp-2 text-muted-foreground leading-snug m-0`,
    arrow: 'w-1em h-0.5em fill-popover stroke-border',
    positioner: 'data-[settled]:transition-transform-200'
  },
  variants: {
    size: {
      xs: {
        list: 'gap-1 text-2xs',
        subList: 'gap-1.5 p-1.5 text-2xs',
        trigger: 'gap-1.5 px-1.5 py-1',
        link: 'gap-1.5 px-1.5 py-1',
        subLink: 'gap-1.5 px-1.5 py-1',
        subTrigger: 'gap-1.5 px-1.5 py-1',
        subTriggerIcon: 'size-2',
        linkIcon: 'size-2 -ms-1.25',
        subLinkDescription: 'mt-1'
      },
      sm: {
        list: 'gap-1.25 text-xs',
        subList: 'gap-1.75 p-1.75 text-xs',
        trigger: 'gap-1.75 px-1.75 py-1.25',
        link: 'gap-1.75 px-1.75 py-1.25',
        subLink: 'gap-1.75 px-1.75 py-1.25',
        subTrigger: 'gap-1.75 px-1.75 py-1.25',
        subTriggerIcon: 'size-2.5',
        linkIcon: 'size-2.5 -ms-1.5',
        subLinkDescription: 'mt-1.25'
      },
      md: {
        list: 'gap-1.5 text-sm',
        subList: 'gap-2 p-2 text-sm',
        trigger: 'gap-2 px-2 py-1.5',
        link: 'gap-2 px-2 py-1.5',
        subLink: 'gap-2 px-2 py-1.5',
        subTrigger: 'gap-2 px-2 py-1.5',
        subTriggerIcon: 'size-3',
        linkIcon: 'size-3 -ms-2',
        subLinkDescription: 'mt-1.5'
      },
      lg: {
        list: 'gap-1.75 text-base',
        subList: 'gap-2.5 p-2.5 text-base',
        trigger: 'gap-2.5 px-2.5 py-1.75',
        link: 'gap-2.5 px-2.5 py-1.75',
        subLink: 'gap-2.5 px-2.5 py-1.75',
        subTrigger: 'gap-2.5 px-2.5 py-1.75',
        subTriggerIcon: 'size-3.5',
        linkIcon: 'size-3.5 -ms-2.5',
        subLinkDescription: 'mt-1.75'
      },
      xl: {
        list: 'gap-2 text-lg',
        subList: 'gap-3 p-3 text-lg',
        trigger: 'gap-3 px-3 py-2',
        link: 'gap-3 px-3 py-2',
        subLink: 'gap-3 px-3 py-2',
        subTrigger: 'gap-3 px-3 py-2',
        subTriggerIcon: 'size-4',
        linkIcon: 'size-4 -ms-3',
        subLinkDescription: 'mt-2'
      },
      '2xl': {
        list: 'gap-2.5 text-xl',
        subList: 'gap-3.5 p-3.5 text-xl',
        trigger: 'gap-3.5 px-3.5 py-2.5',
        link: 'gap-3.5 px-3.5 py-2.5',
        subLink: 'gap-3.5 px-3.5 py-2.5',
        subTrigger: 'gap-3.5 px-3.5 py-2.5',
        subTriggerIcon: 'size-4.5',
        linkIcon: 'size-4.5 -ms-3.5',
        subLinkDescription: 'mt-2.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
