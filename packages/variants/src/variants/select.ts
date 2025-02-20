// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const selectVariants = tv({
  slots: {
    trigger: [
      `flex items-center justify-between w-full rounded-md border border-input bg-background [&_span]:truncate`,
      `outline-none focus-visible:(ring-2 ring-offset-2 ring-primary) focus:(ring-2 ring-offset-2 ring-primary) disabled:(pointer-events-none opacity-50)`,
      `placeholder:text-muted-foreground data-[placeholder]:text-muted-foreground`
    ],
    selectedValue: '',
    triggerIcon: `shrink-0 text-muted-foreground opacity-70`,
    content: [
      `relative z-50 min-w-32 max-h-96 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95)`,
      `data-[state=closed]:(animate-out fade-out-0 zoom-out-95)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    viewport: 'p-1',
    group: '',
    groupLabel: `font-semibold`,
    item: [
      `relative flex items-center w-full rounded-sm outline-none cursor-pointer select-none`,
      `focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemText: '',
    itemIndicator: `absolute`,
    separator: `-mx-1 my-1 h-px bg-muted`,
    scrollUpButton: `flex items-center justify-center cursor-default`,
    scrollDownButton: `flex items-center justify-center cursor-default`
  },
  variants: {
    position: {
      popper: {
        content: `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
        viewport: `h-[--soybean-select-trigger-height] w-full min-w-[--soybean-select-trigger-width]`
      },
      'item-aligned': ''
    },
    size: {
      xs: {
        trigger: 'h-6 px-1.5 text-xs',
        icon: 'text-xs',
        item: 'py-1 pl-1 pr-6 text-xs',
        itemIndicator: 'text-xs right-1',
        groupLabel: 'py-1 px-1 text-xs',
        scrollUpButton: 'py-0.75 text-xs',
        scrollDownButton: 'py-0.75 text-xs'
      },
      sm: {
        trigger: 'h-7 px-2 text-sm',
        icon: 'text-xs',
        item: 'py-1 pl-1.5 pr-7 text-sm',
        itemIndicator: 'text-sm right-1.5',
        groupLabel: 'py-1 px-1.5 text-sm',
        scrollUpButton: 'py-0.75 text-sm',
        scrollDownButton: 'py-0.75 text-sm'
      },
      md: {
        trigger: 'h-8 px-3 text-sm',
        icon: 'text-xs',
        item: 'py-1.5 pl-2 pr-8 text-sm',
        itemIndicator: 'text-sm right-2',
        groupLabel: 'py-1.5 px-2 text-sm',
        scrollUpButton: 'py-1 text-sm',
        scrollDownButton: 'py-1 text-sm'
      },
      lg: {
        trigger: 'h-9 px-3.5 text-base',
        icon: 'text-sm',
        item: 'py-1.5 pl-2.5 pr-9 text-base',
        itemIndicator: 'text-base right-2.5',
        groupLabel: 'py-1.5 px-2.5 text-base',
        scrollUpButton: 'py-1 text-base',
        scrollDownButton: 'py-1 text-base'
      },
      xl: {
        trigger: 'h-10 px-4 text-base',
        icon: 'text-sm',
        item: 'py-2 pl-3 pr-10 text-base',
        itemIndicator: 'text-base right-3',
        groupLabel: 'py-2 px-3 text-base',
        scrollUpButton: 'py-1.25 text-base',
        scrollDownButton: 'py-1.25 text-base'
      },
      xxl: {
        trigger: 'h-12 px-4.5 text-lg',
        icon: 'text-base',
        item: 'py-2.5 pl-3.5 pr-12 text-lg',
        itemIndicator: 'text-lg right-3.5',
        groupLabel: 'py-2.5 px-3.5 text-lg',
        scrollUpButton: 'py-1.25 text-lg',
        scrollDownButton: 'py-1.25 text-lg'
      }
    }
  },
  defaultVariants: {
    position: 'popper',
    size: 'md'
  }
});

type SelectVariants = VariantProps<typeof selectVariants>;

export type SelectPosition = NonNullable<SelectVariants['position']>;

export type SelectSlots = keyof typeof selectVariants.slots;
