// @unocss-include
import { tv } from 'tailwind-variants';

export const commandVariants = tv({
  slots: {
    root: `flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground`,
    dialog: `overflow-hidden p-0 shadow-lg`,
    inputWrapper: 'flex items-center border-b px-3',
    input: `flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50`,
    inputIcon: `mr-2 h-4 w-4 shrink-0 opacity-50`,
    empty: `py-6 text-center text-sm`,
    list: `max-h-[300px] overflow-y-auto overflow-x-hidden`,
    group: `overflow-hidden p-1 text-foreground`,
    groupHeading: `px-2 py-1.5 text-xs font-medium text-muted-foreground`,
    item: [
      `relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none`,
      `data-[highlighted]:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)`
    ],
    separator: `-mx-1 h-px bg-border`,
    shortcut: `ml-auto text-xs tracking-widest text-muted-foreground`
  }
});
