// @unocss-include
import { scv } from '@soybeanjs/cva';

export const treeNavVariants = scv({
  slots: {
    root: 'flex w-fit items-center rounded-md bg-background',
    item: [
      'group/item relative flex cursor-pointer select-none items-center gap-1.5 rounded-sm px-3 py-1.5',
      'font-medium text-sm outline-none transition-colors-200',
      'hover:bg-accent focus-visible:bg-accent focus-visible:text-accent-foreground',
      'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      'data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary',
      'data-[child-selected]:text-primary'
    ],
    itemIcon: 'shrink-0 text-muted-foreground',
    itemChevron: [
      'ms-auto shrink-0 text-muted-foreground transition-colors-200',
      'group-data-[child-selected]/item:text-primary'
    ],
    itemLinkIcon: 'shrink-0 self-start text-muted-foreground rtl:rotate-270'
  },
  variants: {
    size: {
      xs: {
        root: 'gap-1.5 p-0.5 text-2xs',
        item: 'gap-1.5 px-2 py-1 text-2xs',
        itemIcon: 'size-3.5',
        itemChevron: 'size-3',
        itemLinkIcon: 'size-2 -ms-1'
      },
      sm: {
        root: 'gap-1.75 p-0.625 text-xs',
        item: 'gap-1.75 px-2.5 py-1 text-xs',
        itemIcon: 'size-4',
        itemChevron: 'size-3.5',
        itemLinkIcon: 'size-2.5 -ms-1.5'
      },
      md: {
        root: 'gap-2 p-1 text-sm',
        item: 'gap-2 px-3 py-1.25',
        itemIcon: 'size-4',
        itemChevron: 'size-3.5',
        itemLinkIcon: 'size-3 -ms-2'
      },
      lg: {
        root: 'gap-2.5 p-0.875 text-base',
        item: 'gap-2.5 px-3.5 py-1.5 text-base',
        itemIcon: 'size-4',
        itemChevron: 'size-4',
        itemLinkIcon: 'size-3.5 -ms-2.5'
      },
      xl: {
        root: 'gap-3 p-1 text-base',
        item: 'gap-3 px-4 py-2 text-base',
        itemIcon: 'size-4.5',
        itemChevron: 'size-4',
        itemLinkIcon: 'size-4 -ms-3'
      },
      '2xl': {
        root: 'gap-3.5 p-1.25 text-lg',
        item: 'gap-3.5 px-4 py-2 text-lg',
        itemIcon: 'size-5',
        itemChevron: 'size-4.5',
        itemLinkIcon: 'size-4.5 -ms-3.5'
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
