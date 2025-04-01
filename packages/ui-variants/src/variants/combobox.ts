// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const comboboxVariants = tv({
  slots: {
    root: '',
    anchor: 'w-full',
    empty: `text-center`,
    group: `overflow-hidden text-foreground`,
    groupLabel: `font-medium text-muted-foreground`,
    input: [
      `flex w-full bg-transparent shadow-sm transition-colors-200`,
      `placeholder:text-muted-foreground outline-none disabled:(cursor-not-allowed opacity-50)`
    ],
    inputWrapper: `relative w-full items-center`,
    item: [
      `relative flex justify-start items-center cursor-default select-none rounded-sm outline-none`,
      `data-[highlighted]:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemIcon: '',
    itemIndicator: 'ml-auto',
    list: [
      `z-50 w-[--soybean-combobox-trigger-width] rounded-md border bg-popover text-popover-foreground shadow-md outline-none`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[state=closed]:(animate-out fade-out-0 zoom-out-95)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    separator: `h-px bg-border`,
    trigger: 'flex items-center text-muted-foreground',
    searchIcon: 'absolute start-0 inset-y-0 flex items-center justify-center text-muted-foreground'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        input: 'h-6 px-1.5',
        inputIcon: 'size-3 mr-1.5',
        empty: 'py-3',
        list: 'max-h-70 p-0.75 text-2xs',
        groupLabel: 'p-0.75',
        item: 'gap-1 px-1 py-1',
        separator: '-mx-1 my-0.75',
        trigger: 'px-1.5',
        searchIcon: 'px-1.5'
      },
      sm: {
        root: 'text-xs',
        input: 'h-7 px-2',
        inputIcon: 'size-3.5 mr-1.75',
        empty: 'py-3.5',
        list: 'max-h-75 p-1 text-xs',
        groupLabel: 'p-1.25',
        item: 'gap-1.5 px-1.5 py-1',
        separator: '-mx-1.5 my-1',
        trigger: 'px-2',
        searchIcon: 'px-2'
      },
      md: {
        root: 'text-sm',
        input: 'h-8 px-2.5',
        inputIcon: 'size-4 mr-2',
        empty: 'py-4',
        list: 'max-h-80 p-1 text-sm',
        groupLabel: 'p-1.75',
        item: 'gap-2 px-2 py-1.5',
        separator: '-mx-2 my-1',
        trigger: 'px-2.5',
        searchIcon: 'px-2.5'
      },
      lg: {
        root: 'text-base',
        input: 'h-9 px-3',
        inputIcon: 'size-4.5 mr-2.5',
        empty: 'py-4.5',
        list: 'max-h-87.5 p-1.25 text-base',
        groupLabel: 'p-2',
        item: 'gap-2.5 px-2.5 py-1.5',
        separator: '-mx-2.5 my-1.25',
        trigger: 'px-3',
        searchIcon: 'px-3'
      },
      xl: {
        root: 'text-lg',
        input: 'h-10 px-3.5',
        inputIcon: 'size-5 mr-3',
        empty: 'py-5',
        list: 'max-h-100 p-1.5 text-lg',
        groupLabel: 'p-2.5',
        item: 'gap-3 px-3 py-2',
        separator: '-mx-3 my-1.5',
        trigger: 'px-3.5',
        searchIcon: 'px-3.5'
      },
      '2xl': {
        root: 'text-xl',
        input: 'h-12 px-4',
        inputIcon: 'size-6 mr-3.5',
        empty: 'py-6',
        list: 'max-h-112.5 p-1.75 text-xl',
        groupLabel: 'p-3',
        item: 'gap-3.5 px-3.5 py-2.5',
        separator: '-mx-3.5 my-2',
        trigger: 'px-4',
        searchIcon: 'px-4'
      }
    },
    mode: {
      modern: {
        input: 'focus-visible:ring-0 border-0 border-b rounded-none',
        trigger: 'w-full justify-between'
      },
      traditional: {
        input: 'rounded-md border border-solid border-input',
        trigger: 'absolute end-0 inset-y-0 justify-center'
      }
    }
  },
  compoundVariants: [
    {
      mode: 'modern',
      size: 'xs',
      class: {
        inputWrapper: 'mb-0.75',
        input: 'pl-6'
      }
    },
    {
      mode: 'modern',
      size: 'sm',
      class: {
        inputWrapper: 'mb-1',
        input: 'pl-7'
      }
    },
    {
      mode: 'modern',
      size: 'md',
      class: {
        inputWrapper: 'mb-1',
        input: 'pl-8'
      }
    },
    {
      mode: 'modern',
      size: 'lg',
      class: {
        inputWrapper: 'mb-1.25',
        input: 'pl-9'
      }
    },
    {
      mode: 'modern',
      size: 'xl',
      class: {
        inputWrapper: 'mb-1.75',
        input: 'pl-10'
      }
    },
    {
      mode: 'modern',
      size: '2xl',
      class: {
        inputWrapper: 'mb-2',
        input: 'pl-12'
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
