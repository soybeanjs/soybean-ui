// @unocss-include
import { tv } from 'tailwind-variants';

export const autocompleteVariants = tv({
  slots: {
    root: 'flex w-full flex-col',
    anchor: [
      'group flex w-full items-center rounded-md border border-input bg-background text-foreground shadow-xs transition-all-150',
      'outline-none focus-within:ring-3 focus-within:ring-offset-background focus-within:ring-primary/30',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    inputRoot: 'flex min-w-0 grow items-center gap-2 bg-transparent',
    inputControl: 'min-w-0 grow border-0 bg-transparent px-0 outline-none placeholder:text-muted-foreground',
    inputIcon: 'shrink-0 text-muted-foreground',
    inputClearable: [
      'flex shrink-0 items-center justify-center rounded-sm text-muted-foreground opacity-70 outline-none transition-opacity',
      'hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1',
      'disabled:cursor-not-allowed disabled:opacity-40'
    ],
    trigger: 'flex shrink-0 items-center justify-center text-muted-foreground outline-none disabled:cursor-not-allowed',
    triggerIcon: 'size-1em',
    popup: [
      'relative z-50 min-w-[--soybean-popper-anchor-width] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
    ],
    viewport: 'max-h-80 overflow-y-auto overflow-x-hidden p-1',
    empty: 'py-6 text-center text-sm text-muted-foreground',
    group: 'overflow-hidden',
    groupLabel: 'px-2 py-1.5 text-xs font-medium text-muted-foreground',
    item: [
      'relative flex w-full items-center rounded-sm outline-none select-none',
      'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    ],
    itemIcon: 'shrink-0 text-muted-foreground',
    itemText: 'grow truncate text-left',
    itemIndicator: 'ml-auto shrink-0 text-muted-foreground',
    separator: '-mx-1 my-1 h-px bg-border'
  },
  variants: {
    size: {
      xs: {
        anchor: 'min-h-6 gap-1 px-1.5 text-2xs',
        inputRoot: 'gap-1',
        popup: 'text-2xs',
        viewport: 'max-h-70 p-0.75',
        groupLabel: 'px-1 py-1 text-3xs',
        item: 'gap-1 px-1 py-1',
        separator: '-mx-0.75 my-0.75'
      },
      sm: {
        anchor: 'min-h-7 gap-1.5 px-2 text-xs',
        inputRoot: 'gap-1.5',
        popup: 'text-xs',
        viewport: 'max-h-75 p-0.875',
        groupLabel: 'px-1.5 py-1.25 text-2xs',
        item: 'gap-1.5 px-1.5 py-1.25',
        separator: '-mx-0.875 my-0.875'
      },
      md: {
        anchor: 'min-h-8 gap-2 px-2.5 text-sm',
        inputRoot: 'gap-2',
        popup: 'text-sm',
        viewport: 'max-h-80 p-1',
        groupLabel: 'px-2 py-1.5 text-xs',
        item: 'gap-2 px-2 py-1.5',
        separator: '-mx-1 my-1'
      },
      lg: {
        anchor: 'min-h-9 gap-2.5 px-3 text-base',
        inputRoot: 'gap-2.5',
        popup: 'text-base',
        viewport: 'max-h-90 p-1.25',
        groupLabel: 'px-2.5 py-1.75 text-sm',
        item: 'gap-2.5 px-2.5 py-1.75',
        separator: '-mx-1.25 my-1.25'
      },
      xl: {
        anchor: 'min-h-10 gap-3 px-3.5 text-lg',
        inputRoot: 'gap-3',
        popup: 'text-lg',
        viewport: 'max-h-100 p-1.5',
        groupLabel: 'px-3 py-2 text-base',
        item: 'gap-3 px-3 py-2',
        separator: '-mx-1.5 my-1.5'
      },
      '2xl': {
        anchor: 'min-h-12 gap-3.5 px-4 text-xl',
        inputRoot: 'gap-3.5',
        popup: 'text-xl',
        viewport: 'max-h-115 p-1.75',
        groupLabel: 'px-3.5 py-2.5 text-lg',
        item: 'gap-3.5 px-3.5 py-2.5',
        separator: '-mx-1.75 my-1.75'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
