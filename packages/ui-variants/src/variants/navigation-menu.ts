// @unocss-include
import { tv } from 'tailwind-variants';

export const navigationMenuVariants = tv({
  slots: {
    root: `relative z-1 w-full flex justify-center`,
    viewportRoot: `perspective-2000px absolute top-full left-0 flex w-full justify-center`,
    viewport: [
      `origin-top-center relative w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg`,
      `h-[var(--soybean-navigation-menu-viewport-height)] md:w-[var(--soybean-navigation-menu-viewport-width)]`,
      `data-[state=open]:(animate-in zoom-in-90) data-[state=closed]:(animate-out zoom-out-95)`
    ],
    content: [
      `left-0 top-0 w-full md:(absolute w-auto)`,
      `data-[motion^=from-]:(animate-in fade-in)`,
      `data-[motion^=to-]:(animate-out fade-out)`,
      `data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52`
    ],
    arrow: 'relative top-70% rotate-45 border border-border bg-background rounded-2px',
    list: `group flex flex-1 list-none items-center justify-center my-0`,
    item: `list-none`,
    trigger: [
      `group inline-flex w-max items-center justify-center rounded-md bg-background font-medium transition-colors-200`,
      `hover:(bg-accent text-accent-foreground)`,
      `focus:(bg-accent text-accent-foreground outline-none)`,
      `disabled:(pointer-events-none opacity-50)`,
      `data-[active]:bg-accent/50`,
      `data-[state=open]:bg-accent/50`
    ],
    triggerLeadingIcon: 'shrink-0',
    triggerIcon: `relative top-px transition duration-200 group-data-[state=open]:rotate-180`,
    indicator: [
      `absolute top-full z-1 flex mt-1px w-[--soybean-navigation-menu-indicator-size] items-end justify-center overflow-hidden transition-transform-200 ease-out translate-x-[--soybean-navigation-menu-indicator-position]`,
      `data-[state=visible]:(animate-in fade-in-0)`,
      `data-[state=hidden]:(animate-out fade-out-0)`
    ],
    link: [
      `group relative w-full flex items-center rounded-md font-medium outline-none cursor-pointer`,
      `focus:(bg-accent text-accent-foreground) hover:(bg-accent text-accent-foreground)`,
      `disabled:(pointer-events-none opacity-50)`
    ],
    linkLabel: 'truncate',
    linkLeadingIcon: 'shrink-0',
    linkIcon: 'self-start text-muted-foreground',
    childList: `grid grid-cols-[auto_auto] list-none my-0`,
    childListItem: `list-none`,
    childLink: [
      `flex items-start select-none rounded-md leading-none no-underline outline-none transition-colors-200 cursor-pointer`,
      `focus:(bg-accent text-accent-foreground) hover:(bg-accent text-accent-foreground)`
    ],
    childLinkIcon: 'shrink-0',
    childLinkContent: `flex flex-col items-start`,
    childLinkLabel: `font-medium leading-none`,
    childLinkDescription: `line-clamp-2 text-muted-foreground leading-snug`
  },
  variants: {
    size: {
      xs: {
        viewport: 'mt-1.75',
        list: 'space-x-1',
        trigger: 'gap-1.25 py-1.25 px-1.5 text-xs',
        indicator: 'h-1.75',
        arrow: 'size-2.25',
        link: 'gap-1.25 py-1.25 px-1.5 text-xs',
        linkIcon: 'size-2 -ml-1.5',
        childList: 'gap-1.5 p-1.5',
        childLink: 'gap-1.5 py-1.25 px-1.5 text-xs',
        childLinkDescription: 'mt-1.25'
      },
      sm: {
        viewport: 'mt-2',
        list: 'space-x-1.25',
        trigger: 'gap-1.25 py-1.25 px-1.75 text-sm',
        indicator: 'h-2',
        arrow: 'size-2.5',
        link: 'gap-1.25 py-1.25 px-1.75 text-sm',
        linkIcon: 'size-2.5 -ml-1.5',
        childList: 'gap-1.75 p-1.75',
        childLink: 'gap-1.75 py-1.25 px-1.75 text-sm',
        childLinkDescription: 'mt-1.25'
      },
      md: {
        viewport: 'mt-2.5',
        list: 'space-x-1.5',
        trigger: 'gap-1.5 py-1.5 px-2 text-sm',
        indicator: 'h-2.5',
        arrow: 'size-3',
        link: 'gap-1.5 py-1.5 px-2 text-sm',
        linkIcon: 'size-3 -ml-1.75',
        childList: 'gap-2 p-2',
        childLink: 'gap-2 py-1.5 px-2 text-sm',
        childLinkDescription: 'mt-1.5'
      },
      lg: {
        viewport: 'mt-3',
        list: 'space-x-1.75',
        trigger: 'gap-2 py-1.75 px-2.5 text-base',
        indicator: 'h-3',
        arrow: 'size-3.5',
        link: 'gap-2 py-1.75 px-2.5 text-base',
        linkIcon: 'size-3.5 -ml-2.25',
        childList: 'gap-2.5 p-2.5',
        childLink: 'gap-2.5 py-1.75 px-2.5 text-base',
        childLinkDescription: 'mt-1.75'
      },
      xl: {
        viewport: 'mt-3.5',
        list: 'space-x-2',
        trigger: 'gap-2.5 py-2 px-3 text-base',
        indicator: 'h-3.5',
        arrow: 'size-4',
        link: 'gap-2.5 py-2 px-3 text-base',
        linkIcon: 'size-4 -ml-2.75',
        childList: 'gap-3 p-3',
        childLink: 'gap-3 py-2 px-3 text-base',
        childLinkDescription: 'mt-2'
      },
      '2xl': {
        viewport: 'mt-4',
        list: 'space-x-2.5',
        trigger: 'gap-3 py-2.5 px-3.5 text-lg',
        indicator: 'h-4',
        arrow: 'size-4.5',
        link: 'gap-3 py-2.5 px-3.5 text-lg',
        linkIcon: 'size-4.5 -ml-3.25',
        childList: 'gap-3.5 p-3.5',
        childLink: 'gap-3 py-2.5 px-3.5 text-lg',
        childLinkDescription: 'mt-2.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type NavigationMenuSlots = keyof typeof navigationMenuVariants.slots;
