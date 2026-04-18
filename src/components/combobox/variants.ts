// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const comboboxVariants = tv({
  slots: {
    anchor: '',
    trigger: [
      'flex w-full items-center justify-between rounded-md border border-input bg-background transition-all-150',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-background focus-visible:ring-primary/30 focus:ring-3 focus:ring-offset-background focus:ring-primary/30 disabled:pointer-events-none disabled:opacity-50',
      'data-[placeholder]:text-muted-foreground'
    ],
    triggerIcon: 'shrink-0 text-muted-foreground opacity-70',
    cancel: [
      'flex shrink-0 items-center justify-center rounded-md bg-transparent text-accent-foreground hover:bg-accent-foreground/10 active:bg-accent-foreground/20',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-background focus-visible:ring-accent-foreground/20',
      'disabled:cursor-not-allowed disabled:opacity-40'
    ],
    positioner: '',
    popup: [
      'relative z-50 min-w-32 w-[--soybean-combobox-trigger-width] rounded-md border bg-popover text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
    ],
    arrow: 'fill-popover',
    viewport: 'overflow-x-hidden overflow-y-auto',
    inputRoot: 'group flex items-center border-b',
    inputControl:
      'flex w-full rounded-md bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    group: 'overflow-hidden text-foreground',
    groupLabel: 'font-medium text-muted-foreground',
    item: [
      'relative flex w-full cursor-default select-none items-center rounded-sm outline-none',
      'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    itemIndicator: 'ms-auto shrink-0 text-muted-foreground',
    empty: 'py-4 text-center text-sm text-muted-foreground',
    separator: 'h-px bg-muted'
  },
  variants: {
    size: {
      xs: {
        trigger: 'h-6 gap-1 px-1.5 text-2xs',
        triggerIcon: 'text-3xs',
        popup: 'text-2xs',
        cancel: 'p-0.75',
        inputRoot: 'px-1.5 py-0.5',
        inputControl: 'h-6',
        viewport: 'max-h-70 p-0.75',
        groupLabel: 'p-1 text-3xs',
        item: 'gap-1 px-1 py-1',
        separator: '-mx-0.75 my-0.375'
      },
      sm: {
        trigger: 'h-7 gap-1.5 px-2 text-xs',
        triggerIcon: 'text-2xs',
        popup: 'text-xs',
        cancel: 'p-0.875',
        inputRoot: 'px-2 py-0.625',
        inputControl: 'h-7',
        viewport: 'max-h-75 p-0.875',
        groupLabel: 'p-1.25 text-2xs',
        item: 'gap-1.5 px-1.5 py-1',
        separator: '-mx-0.875 my-0.4375'
      },
      md: {
        trigger: 'h-8 gap-2 px-2.5 text-sm',
        triggerIcon: 'text-xs',
        popup: 'text-sm',
        cancel: 'p-1',
        inputRoot: 'px-2.5 py-0.75',
        inputControl: 'h-8',
        viewport: 'max-h-80 p-1',
        groupLabel: 'p-1.75 text-xs',
        item: 'gap-2 px-2 py-1.5',
        separator: '-mx-1 my-0.5'
      },
      lg: {
        trigger: 'h-9 gap-2.5 px-3 text-base',
        triggerIcon: 'text-sm',
        popup: 'text-base',
        cancel: 'p-1.25',
        inputRoot: 'px-3 py-0.875',
        inputControl: 'h-9',
        viewport: 'max-h-90 p-1.25',
        groupLabel: 'p-2 text-sm',
        item: 'gap-2.5 px-2.5 py-1.5',
        separator: '-mx-1.25 my-0.625'
      },
      xl: {
        trigger: 'h-10 gap-3 px-3.5 text-lg',
        triggerIcon: 'text-base',
        popup: 'text-lg',
        cancel: 'p-1.5',
        inputRoot: 'px-3.5 py-1',
        inputControl: 'h-10',
        viewport: 'max-h-100 p-1.5',
        groupLabel: 'p-2.5 text-base',
        item: 'gap-3 px-3 py-2',
        separator: '-mx-1.5 my-0.75'
      },
      '2xl': {
        trigger: 'h-12 gap-3.5 px-4 text-xl',
        triggerIcon: 'text-lg',
        popup: 'text-xl',
        cancel: 'p-1.75',
        inputRoot: 'px-4 py-1.25',
        inputControl: 'h-12',
        viewport: 'max-h-115 p-1.75',
        groupLabel: 'p-3 text-lg',
        item: 'gap-3.5 px-3.5 py-2.5',
        separator: '-mx-1.75 my-0.875'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type ComboboxVariantProps = VariantProps<typeof comboboxVariants>;
