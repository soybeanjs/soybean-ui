// @unocss-include
import { tv } from 'tailwind-variants';

export const tabsVariants = tv({
  slots: {
    root: `flex items-stretch`,
    list: 'relative inline-flex justify-center items-center p-1 rounded-md bg-muted text-muted-foreground',
    trigger: [
      `relative z-2 inline-flex items-center justify-center flex-1 whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all-200`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`,
      `disabled:(pointer-events-none opacity-50)`
    ],
    indicatorRoot: `absolute top-0 left-0 z-1 transition-[width,height,transform] duration-300`,
    indicator: `size-full rounded-md bg-background shadow`,
    content: `flex-grow overflow-hidden focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`
  },
  variants: {
    orientation: {
      horizontal: {
        root: `flex-col`,
        indicatorRoot: `h-full w-[--soybean-tabs-indicator-size] py-1 translate-x-[--soybean-tabs-indicator-position]`,
        content: `mt-2`
      },
      vertical: {
        list: `flex-col`,
        indicatorRoot: `w-full h-[--soybean-tabs-indicator-size] px-1 translate-y-[--soybean-tabs-indicator-position]`,
        content: `ml-2`
      }
    },
    enableIndicator: {
      false: {
        trigger: `data-[state=active]:(bg-background text-foreground shadow)`
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    enableIndicator: true
  }
});

export type TabsSlots = keyof typeof tabsVariants.slots;
