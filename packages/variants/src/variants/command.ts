// @unocss-include
import { tv } from 'tailwind-variants';

export const commandVariants = tv({
  slots: {
    root: `flex w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground`,
    inputWrapper: 'flex items-center border-b',
    input: `flex w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:(cursor-not-allowed opacity-50)`,
    inputIcon: `shrink-0 opacity-50`,
    empty: `text-center`,
    list: `overflow-y-auto overflow-x-hidden`,
    group: `overflow-hidden text-foreground`,
    groupLabel: `font-medium text-muted-foreground`,
    item: [
      `relative flex cursor-default select-none items-center rounded-sm outline-none`,
      `data-[highlighted]:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    itemIcon: '',
    separator: `h-px bg-border`,
    shortcut: `ml-auto`,
    dialog: `p-0 gap-0`
  },
  variants: {
    size: {
      xs: {
        inputWrapper: 'px-1.5 py-0.5',
        input: 'h-6',
        inputIcon: 'size-3 mr-1.5',
        empty: 'py-3 text-xs',
        list: 'max-h-[280px] p-0.75',
        groupLabel: 'p-0.75 text-xs',
        item: 'gap-1 px-1 py-1 text-xs',
        separator: '-mx-1 my-0.75'
      },
      sm: {
        inputWrapper: 'px-2 py-0.5',
        input: 'h-7',
        inputIcon: 'size-3.5 mr-1.75',
        empty: 'py-3.5 text-sm',
        list: 'max-h-[300px] p-1',
        groupLabel: 'p-1.25 text-xs',
        item: 'gap-1.5 px-1.5 py-1 text-sm',
        separator: '-mx-1.5 my-1'
      },
      md: {
        inputWrapper: 'px-3 py-0.5',
        input: 'h-8',
        inputIcon: 'size-4 mr-2',
        empty: 'py-4 text-sm',
        list: 'max-h-[320px] p-1',
        groupLabel: 'p-1.75 text-xs',
        item: 'gap-2 px-2 py-1.5 text-sm',
        separator: '-mx-2 my-1'
      },
      lg: {
        inputWrapper: 'px-3.5 py-0.75',
        input: 'h-9',
        inputIcon: 'size-4.5 mr-2.5',
        empty: 'py-4.5 text-base',
        list: 'max-h-[350px] p-1.25',
        groupLabel: 'p-2 text-sm',
        item: 'gap-2.5 px-2.5 py-1.5 text-sm',
        separator: '-mx-2.5 my-1.25'
      },
      xl: {
        inputWrapper: 'px-4 py-1',
        input: 'h-10',
        inputIcon: 'size-5 mr-3',
        empty: 'py-5 text-base',
        list: 'max-h-[400px] p-1.5',
        groupLabel: 'p-2.5 text-sm',
        item: 'gap-3 px-3 py-2 text-base',
        separator: '-mx-3 my-1.5'
      },
      xxl: {
        inputWrapper: 'px-4.5 py-1',
        input: 'h-12',
        inputIcon: 'size-6 mr-3.5',
        empty: 'py-6 text-lg',
        list: 'max-h-[450px] p-2',
        groupLabel: 'p-3 text-base',
        item: 'gap-3.5 px-3.5 py-2.5 text-base',
        separator: '-mx-3.5 my-2'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type CommandSlots = keyof typeof commandVariants.slots;
