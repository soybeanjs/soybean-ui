// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const selectVariants = tv({
  slots: {
    trigger: [
      `flex items-center justify-between w-full rounded-md border border-input bg-background`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary) focus:(ring-2 ring-offset-2 ring-offset-background ring-primary) disabled:(pointer-events-none opacity-50)`,
      `placeholder:text-muted-foreground data-[placeholder]:text-muted-foreground`
    ],
    triggerIcon: `shrink-0 text-muted-foreground opacity-70`,
    value: 'truncate',
    content: [
      `relative z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95)`,
      `data-[state=closed]:(animate-out fade-out-0 zoom-out-95)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    viewport: '',
    group: '',
    groupLabel: `font-medium text-muted-foreground`,
    item: [
      `relative flex items-center w-full rounded-sm outline-none cursor-pointer select-none`,
      `focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemText: '',
    itemIndicator: `ml-auto shrink-0 text-muted-foreground`,
    separator: `-mx-1 my-1 h-px bg-muted`,
    scrollUpButton: `flex items-center justify-center cursor-default`,
    scrollDownButton: `flex items-center justify-center cursor-default`,
    arrow: 'w-1em h-0.5em fill-popover stroke-border'
  },
  variants: {
    size: {
      xs: {
        content: 'max-h-70 text-2xs',
        trigger: 'h-6 px-1.5 text-2xs',
        viewport: 'p-0.75',
        item: 'gap-1 px-1 py-1',
        groupLabel: 'p-1 text-3xs',
        separator: '-mx-0.75 my-0.375',
        scrollUpButton: 'py-0.75',
        scrollDownButton: 'py-0.75',
        arrow: 'text-3xs'
      },
      sm: {
        content: 'max-h-75 text-xs',
        trigger: 'h-7 px-2 text-xs',
        viewport: 'p-0.875',
        item: 'gap-1.5 px-1.5 py-1',
        separator: '-mx-0.875 my-0.4375',
        groupLabel: 'p-1.25 text-2xs',
        scrollUpButton: 'py-0.875',
        scrollDownButton: 'py-0.875',
        arrow: 'text-2xs'
      },
      md: {
        content: 'max-h-80 text-sm',
        trigger: 'h-8 px-2.5 text-sm',
        viewport: 'p-1',
        item: 'gap-2 px-2 py-1.5',
        separator: '-mx-1 my-0.5',
        groupLabel: 'p-1.75 text-xs',
        scrollUpButton: 'py-1',
        scrollDownButton: 'py-1',
        arrow: 'text-xs'
      },
      lg: {
        content: 'max-h-90 text-base',
        trigger: 'h-9 px-3 text-base',
        viewport: 'p-1.25',
        item: 'gap-2.5 px-2.5 py-1.5',
        separator: '-mx-1.25 my-0.625',
        groupLabel: 'p-2 text-sm',
        scrollUpButton: 'py-1.25',
        scrollDownButton: 'py-1.25',
        arrow: 'text-sm'
      },
      xl: {
        content: 'max-h-100 text-lg',
        trigger: 'h-10 px-3.5 text-lg',
        viewport: 'p-1.5',
        item: 'gap-3 px-3 py-2',
        separator: '-mx-1.5 my-0.75',
        groupLabel: 'p-2.5 text-base',
        scrollUpButton: 'py-1.5',
        scrollDownButton: 'py-1.5',
        arrow: 'text-base'
      },
      '2xl': {
        content: 'max-h-115 text-xl',
        trigger: 'h-12 px-4 text-xl',
        viewport: 'p-1.75',
        item: 'gap-3.5 px-3.5 py-2.5',
        separator: '-mx-1.75 my-0.875',
        groupLabel: 'p-3 text-lg',
        scrollUpButton: 'py-1.75',
        scrollDownButton: 'py-1.75',
        arrow: 'text-lg'
      }
    },
    position: {
      popper: {
        content: `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
        viewport: `h-[--soybean-select-trigger-height] w-full min-w-[--soybean-select-trigger-width]`
      },
      'item-aligned': ''
    }
  },
  defaultVariants: {
    size: 'md',
    position: 'popper'
  }
});

type SelectVariants = VariantProps<typeof selectVariants>;

export type SelectPosition = NonNullable<SelectVariants['position']>;
