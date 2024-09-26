// @unocss-include
import { tv } from 'tailwind-variants';

export const tabsVariants = tv({
  slots: {
    root: `flex flex-col items-stretch`,
    list: 'relative inline-flex justify-center items-center p-1 rounded-md bg-muted text-muted-foreground',
    trigger: [
      `relative z-2 inline-flex items-center justify-center flex-1 whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all`,
      `focus-visible:(outline outline-2 outline-primary outline-offset-2)`,
      `disabled:(pointer-events-none opacity-50)`
    ],
    indicator: `absolute bottom-0 left-0 z-1 h-full w-[--radix-tabs-indicator-size] py-1 translate-x-[--radix-tabs-indicator-position] transition-[width,transform] duration-300`,
    indicatorSlot: `size-full rounded-md bg-background shadow`,
    content: `flex-grow overflow-hidden mt-2 focus-visible:(outline outline-2 outline-primary outline-offset-2)`
  },
  variants: {
    enableIndicator: {
      false: {
        trigger: `data-[state=active]:(bg-background text-foreground shadow)`
      }
    }
  },
  defaultVariants: {
    enableIndicator: true
  }
});
