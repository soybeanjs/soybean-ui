// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const comboboxVariants = tv({
  slots: {
    root: '',
    anchor: 'w-full',
    empty: `text-center`,
    content: [
      `z-50 w-[--soybean-combobox-trigger-width] rounded-md border bg-popover text-popover-foreground shadow-md outline-none`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[state=closed]:(animate-out fade-out-0 zoom-out-95)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    list: `overflow-y-auto overflow-x-hidden`,
    group: `overflow-hidden text-foreground`,
    groupLabel: `font-medium text-muted-foreground`,
    inputWrapper: `flex items-center`,
    input: [
      `flex w-full bg-transparent transition-colors-200`,
      `placeholder:text-muted-foreground outline-none disabled:(cursor-not-allowed opacity-50)`
    ],
    item: [
      `relative flex justify-start items-center cursor-default select-none rounded-sm outline-none`,
      `data-[highlighted]:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemIcon: 'shrink-0',
    itemIndicator: 'ml-auto',
    separator: `h-px bg-border`,
    trigger: 'flex items-center text-muted-foreground'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        input: 'h-6 pl-1.5',
        empty: 'py-3',
        content: 'text-2xs',
        list: 'max-h-70 p-0.75',
        groupLabel: 'p-1',
        item: 'gap-1 px-1 py-1',
        separator: '-mx-0.75 my-0.375',
        trigger: 'px-1.5'
      },
      sm: {
        root: 'text-xs',
        input: 'h-7 pl-2',
        empty: 'py-3.5',
        content: 'text-xs',
        list: 'max-h-75 p-0.875',
        groupLabel: 'p-1.25',
        item: 'gap-1.5 px-1.5 py-1',
        separator: '-mx-0.875 my-0.4375',
        trigger: 'px-2'
      },
      md: {
        root: 'text-sm',
        input: 'h-8 pl-2.5',
        empty: 'py-4',
        content: 'text-sm',
        list: 'max-h-80 p-1',
        groupLabel: 'p-1.75',
        item: 'gap-2 px-2 py-1.5',
        separator: '-mx-1 my-0.5',
        trigger: 'px-2.5'
      },
      lg: {
        root: 'text-base',
        input: 'h-9 pl-3',
        empty: 'py-4.5',
        content: 'text-base',
        list: 'max-h-90 p-1.25',
        groupLabel: 'p-2',
        item: 'gap-2.5 px-2.5 py-1.5',
        separator: '-mx-1.25 my-0.625',
        trigger: 'px-3'
      },
      xl: {
        root: 'text-lg',
        input: 'h-10 pl-3.5',
        empty: 'py-5',
        content: 'text-lg',
        list: 'max-h-100 p-1.5',
        groupLabel: 'p-2.5',
        item: 'gap-3 px-3 py-2',
        separator: '-mx-1.5 my-0.75',
        trigger: 'px-3.5'
      },
      '2xl': {
        root: 'text-xl',
        input: 'h-12 pl-4',
        empty: 'py-6',
        content: 'text-xl',
        list: 'max-h-115 p-1.75',
        groupLabel: 'p-3',
        item: 'gap-3.5 px-3.5 py-2.5',
        separator: '-mx-1.75 my-0.875',
        trigger: 'px-4'
      }
    },
    mode: {
      modern: {
        inputWrapper: 'border-b',
        trigger: 'w-full justify-between'
      },
      traditional: {
        inputWrapper: 'rounded-md border border-solid border-input shadow-sm'
      }
    }
  },
  compoundVariants: [
    {
      mode: 'modern',
      size: 'xs',
      class: {
        inputWrapper: 'px-1.5'
      }
    },
    {
      mode: 'modern',
      size: 'sm',
      class: {
        inputWrapper: 'px-2'
      }
    },
    {
      mode: 'modern',
      size: 'md',
      class: {
        inputWrapper: 'px-2.5'
      }
    },
    {
      mode: 'modern',
      size: 'lg',
      class: {
        inputWrapper: 'px-3.5'
      }
    },
    {
      mode: 'modern',
      size: 'xl',
      class: {
        inputWrapper: 'px-4'
      }
    },
    {
      mode: 'modern',
      size: '2xl',
      class: {
        inputWrapper: 'px-4.5'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    mode: 'modern'
  }
});

export type ComboboxSlots = keyof typeof comboboxVariants.slots;

type ComboboxVariants = VariantProps<typeof comboboxVariants>;

export type ComboboxMode = NonNullable<ComboboxVariants['mode']>;
