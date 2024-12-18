// @unocss-include
import { tv } from 'tailwind-variants';

export const navigationMenuVariants = tv({
  slots: {
    root: `relative z-1 w-full flex justify-center`,
    viewportRoot: `perspective-2000px absolute top-full left-0 flex w-full justify-center`,
    viewport: [
      `origin-top-center relative w-full mt-2.5 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg`,
      `h-[var(--soybean-navigation-menu-viewport-height)] md:w-[var(--soybean-navigation-menu-viewport-width)]`,
      `data-[state=open]:(animate-in zoom-in-90) data-[state=closed]:(animate-out zoom-out-95)`
    ],
    list: `group flex flex-1 list-none items-center justify-center space-x-1`,
    item: ``,
    trigger: [
      `group inline-flex h-10 w-max items-center justify-center gap-1.5 rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors`,
      `hover:(bg-accent text-accent-foreground)`,
      `focus:(bg-accent text-accent-foreground outline-none)`,
      `disabled:(pointer-events-none opacity-50)`,
      `data-[active]:bg-accent/50`,
      `data-[state=open]:bg-accent/50`
    ],
    triggerIcon: `relative top-px size-5 transition duration-200 group-data-[state=open]:rotate-180`,
    indicator: [
      `absolute top-full z-1 flex mt-1px w-[--soybean-navigation-menu-indicator-size] h-2.5 items-end justify-center overflow-hidden transition-transform duration-200 ease-out translate-x-[--soybean-navigation-menu-indicator-position]`,
      `data-[state=visible]:(animate-in fade-in-0)`,
      `data-[state=hidden]:(animate-out fade-out-0)`
    ],
    arrow: 'relative top-70% size-3 rotate-45 border border-border bg-background rounded-2px',
    content: [
      `left-0 top-0 w-full md:(absolute w-auto)`,
      `data-[motion^=from-]:(animate-in fade-in)`,
      `data-[motion^=to-]:(animate-out fade-out)`,
      `data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52`
    ],
    link: [
      `group relative w-full h-10 flex items-center rounded-md px-4 py-2 gap-1.5 font-medium text-sm outline-none cursor-pointer`,
      `focus:(bg-accent text-accent-foreground) hover:(bg-accent text-accent-foreground)`
    ],
    childList: `grid grid-cols-[auto_auto] gap-2 p-2`,
    childListItem: ``,
    childLink: [
      `block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors space-y-1 cursor-pointer`,
      `focus:(bg-accent text-accent-foreground) hover:(bg-accent text-accent-foreground)`
    ],
    childLinkLabel: `text-sm font-medium leading-none`,
    childLinkDescription: `line-clamp-2 text-sm text-muted-foreground leading-snug`
  }
});
