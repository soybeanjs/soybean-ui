// @unocss-include
import { tv } from 'tailwind-variants';

export const commandVariants = tv({
  slots: {
    root: `flex w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground`,
    inputRoot: 'group flex items-center border-b',
    inputControl: `flex w-full rounded-md bg-transparent outline-none placeholder:text-muted-foreground disabled:(cursor-not-allowed opacity-50)`,
    inputIcon: `shrink-0 opacity-50`,
    inputClearable: 'hidden group-hover:block size-1em cursor-pointer opacity-50 hover:opacity-100',
    empty: `text-center`,
    list: `overflow-y-auto overflow-x-hidden`,
    group: `overflow-hidden text-foreground`,
    groupLabel: `font-medium text-muted-foreground`,
    item: [
      `relative flex cursor-default select-none items-center rounded-sm outline-none`,
      `data-[highlighted]:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemLabel: '',
    itemIcon: 'shrink-0',
    separator: `h-px bg-border`,
    shortcut: `ml-auto`
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        inputRoot: 'px-1.5 py-0.5',
        inputControl: 'h-6',
        inputIcon: 'mr-1.5',
        empty: 'py-3',
        list: 'max-h-70 p-0.75',
        groupLabel: 'p-0.75',
        item: 'gap-1 px-1 py-1',
        separator: '-mx-1 my-0.75'
      },
      sm: {
        root: 'text-xs',
        inputRoot: 'px-2 py-0.625',
        inputControl: 'h-7',
        inputIcon: 'mr-1.75',
        empty: 'py-3.5',
        list: 'max-h-75 p-0.875',
        groupLabel: 'p-1.25',
        item: 'gap-1.5 px-1.5 py-1',
        separator: '-mx-1.5 my-1'
      },
      md: {
        root: 'text-sm',
        inputRoot: 'px-2.5 py-0.75',
        inputControl: 'h-8',
        inputIcon: 'mr-2',
        empty: 'py-4 text-sm',
        list: 'max-h-80 p-1',
        groupLabel: 'p-1.75',
        item: 'gap-2 px-2 py-1.5',
        separator: '-mx-2 my-1'
      },
      lg: {
        root: 'text-base',
        inputRoot: 'px-3.5 py-0.875',
        inputControl: 'h-9',
        inputIcon: 'mr-2.5',
        empty: 'py-4.5',
        list: 'max-h-90 p-1.25',
        groupLabel: 'p-2',
        item: 'gap-2.5 px-2.5 py-1.5',
        separator: '-mx-2.5 my-1.25'
      },
      xl: {
        root: 'text-lg',
        inputRoot: 'px-4 py-1',
        inputControl: 'h-10',
        inputIcon: 'mr-3',
        empty: 'py-5',
        list: 'max-h-100 p-1.5',
        groupLabel: 'p-2.5',
        item: 'gap-3 px-3 py-2',
        separator: '-mx-3 my-1.5'
      },
      '2xl': {
        root: 'text-xl',
        inputRoot: 'px-4.5 py-1.25',
        inputControl: 'h-12',
        inputIcon: 'mr-3.5',
        empty: 'py-6',
        list: 'max-h-115 p-1.75',
        groupLabel: 'p-3',
        item: 'gap-3.5 px-3.5 py-2.5',
        separator: '-mx-3.5 my-2'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
