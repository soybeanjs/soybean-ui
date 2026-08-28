// @unocss-include
import { scv } from '@soybeanjs/cva';

export const treeNavVariants = scv({
  slots: {
    root: 'flex w-fit items-center rounded-md bg-background',
    item: [
      'flex cursor-pointer select-none items-center gap-1.5 rounded-sm px-3 py-1.5',
      'font-medium text-sm outline-none transition-colors-200',
      'hover:bg-accent focus-visible:bg-accent focus-visible:text-accent-foreground',
      'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      'data-[active=true]:bg-primary/10 data-[active=true]:text-primary',
      'data-[child-active]:text-primary'
    ],
    itemIcon: 'size-4 shrink-0 text-muted-foreground',
    itemChevron: 'ms-auto size-3.5 shrink-0 text-muted-foreground',
    itemLinkIcon: 'size-3.5 shrink-0'
  },
  variants: {
    size: {
      xs: {
        root: 'gap-2.5 p-0.5 text-2xs',
        item: 'gap-1 px-2 py-1 text-2xs',
        itemIcon: 'size-3.5'
      },
      sm: {
        root: 'gap-3 p-0.625 text-xs',
        item: 'gap-1.25 px-2.5 py-1 text-xs',
        itemIcon: 'size-4'
      },
      md: {
        root: 'gap-3 p-0.75 text-sm',
        item: 'gap-1.5 px-3 py-1.25 text-sm',
        itemIcon: 'size-4'
      },
      lg: {
        root: 'gap-3.5 p-0.875 text-base',
        item: 'gap-1.75 px-3.5 py-1.5 text-base',
        itemIcon: 'size-4'
      },
      xl: {
        root: 'gap-4 p-1 text-base',
        item: 'gap-2 px-4 py-2 text-base',
        itemIcon: 'size-4.5'
      },
      '2xl': {
        root: 'gap-4.5 p-1.25 text-lg',
        item: 'gap-2 px-4 py-2 text-lg',
        itemIcon: 'size-5'
      }
    },
    collapsible: {
      true: {
        // Keep the bar at its natural content width so the collapsible overflow
        // measurement can detect items that exceed the container.
        root: 'min-w-max'
      },
      false: {}
    }
  },
  defaultVariants: {
    size: 'md',
    collapsible: false
  }
});
