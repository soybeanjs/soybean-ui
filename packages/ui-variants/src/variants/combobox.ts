// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const comboboxVariants = tv({
  slots: {
    anchor: 'w-full',
    empty: `text-center`,
    group: `overflow-hidden text-foreground`,
    groupLabel: `font-medium text-muted-foreground`,
    input: [
      `flex w-full bg-transparent shadow-sm transition-colors-200`,
      `file:(border-0 bg-transparent font-medium)`,
      `placeholder:text-muted-foreground outline-none disabled:(cursor-not-allowed opacity-50)`
    ],
    inputWrapper: 'relative w-full items-center',
    item: [
      `relative flex justify-between items-center cursor-default select-none rounded-sm outline-none`,
      `data-[highlighted]:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemIcon: '',
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
        input: 'h-6 px-1.5 text-xs file:py-0.75 file:text-xs',
        inputIcon: 'size-3 mr-1.5',
        empty: 'py-3 text-xs',
        list: 'max-h-[280px] p-0.75',
        groupLabel: 'p-0.75 text-xs',
        item: 'gap-1 px-1 py-1 text-xs',
        separator: '-mx-1 my-0.75',
        trigger: 'text-xs px-1.5',
        searchIcon: 'text-xs px-1.5'
      },
      sm: {
        input: 'h-7 px-2 text-sm file:py-0.75 file:text-sm',
        inputIcon: 'size-3.5 mr-1.75',
        empty: 'py-3.5 text-sm',
        list: 'max-h-[300px] p-1',
        groupLabel: 'p-1.25 text-xs',
        item: 'gap-1.5 px-1.5 py-1 text-sm',
        separator: '-mx-1.5 my-1',
        trigger: 'text-sm px-2',
        searchIcon: 'text-sm px-2'
      },
      md: {
        input: 'h-8 px-2.5 text-sm file:py-1.25 file:text-sm',
        inputIcon: 'size-4 mr-2',
        empty: 'py-4 text-sm',
        list: 'max-h-[320px] p-1',
        groupLabel: 'p-1.75 text-xs',
        item: 'gap-2 px-2 py-1.5 text-sm',
        separator: '-mx-2 my-1',
        trigger: 'text-sm px-2.5',
        searchIcon: 'text-sm px-2.5'
      },
      lg: {
        input: 'h-9 px-3 text-base file:py-1.25 file:text-base',
        inputIcon: 'size-4.5 mr-2.5',
        empty: 'py-4.5 text-base',
        list: 'max-h-[350px] p-1.25',
        groupLabel: 'p-2 text-sm',
        item: 'gap-2.5 px-2.5 py-1.5 text-sm',
        separator: '-mx-2.5 my-1.25',
        trigger: 'text-base px-3',
        searchIcon: 'text-base px-3'
      },
      xl: {
        input: 'h-10 px-3.5 text-base file:py-1.75 file:text-base',
        inputIcon: 'size-5 mr-3',
        empty: 'py-5 text-base',
        list: 'max-h-[400px] p-1.5',
        groupLabel: 'p-2.5 text-sm',
        item: 'gap-3 px-3 py-2 text-base',
        separator: '-mx-3 my-1.5',
        trigger: 'text-base px-3.5',
        searchIcon: 'text-base px-3.5'
      },
      '2xl': {
        input: 'h-12 px-4 text-lg file:py-2.25 file:text-lg',
        inputIcon: 'size-6 mr-3.5',
        empty: 'py-6 text-lg',
        list: 'max-h-[450px] p-1.75',
        groupLabel: 'p-3 text-base',
        item: 'gap-3.5 px-3.5 py-2.5 text-base',
        separator: '-mx-3.5 my-2',
        trigger: 'text-lg px-4',
        searchIcon: 'text-lg px-4'
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
        input: 'pl-6'
      }
    },
    {
      mode: 'modern',
      size: 'sm',
      class: {
        input: 'pl-7'
      }
    },
    {
      mode: 'modern',
      size: 'md',
      class: {
        input: 'pl-8'
      }
    },
    {
      mode: 'modern',
      size: 'lg',
      class: {
        input: 'pl-9'
      }
    },
    {
      mode: 'modern',
      size: 'xl',
      class: {
        input: 'pl-10'
      }
    },
    {
      mode: 'modern',
      size: '2xl',
      class: {
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
