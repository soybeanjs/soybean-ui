// @unocss-include
import { scv } from '@soybeanjs/cva';

export const splitNavVariants = scv({
  slots: {
    verticalPane: 'flex h-full min-h-0 min-w-0 w-fit',
    firstLevel: [
      'flex outline-none',
      'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[--soybean-split-nav-first-level-width] data-[orientation=vertical]:shrink-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:overflow-y-auto data-[orientation=vertical]:border-e data-[orientation=vertical]:border-sidebar-border',
      'data-[orientation=horizontal]:h-fit data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center'
    ],
    firstLevelItem: [
      'group/split-nav-first-level-item flex cursor-pointer select-none rounded-sm outline-none',
      'data-[orientation=horizontal]:items-center',
      'data-[orientation=vertical]:h-auto data-[orientation=vertical]:min-w-0 data-[orientation=vertical]:w-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center data-[orientation=vertical]:justify-center data-[orientation=vertical]:overflow-hidden data-[orientation=vertical]:text-center',
      'data-[state=active]:bg-primary/10 data-[state=active]:text-primary',
      'data-[state=open]:bg-accent',
      'data-[child-active]:text-primary',
      'data-[state=inactive]:hover:bg-accent data-[state=inactive]:focus:bg-accent',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    ],
    firstLevelItemIcon: 'shrink-0',
    firstLevelItemLabel: [
      'min-w-0 truncate',
      'group-data-[orientation=vertical]/split-nav-first-level-item:block group-data-[orientation=vertical]/split-nav-first-level-item:w-full group-data-[orientation=vertical]/split-nav-first-level-item:px-0.5 group-data-[orientation=vertical]/split-nav-first-level-item:text-center group-data-[orientation=vertical]/split-nav-first-level-item:leading-none'
    ],
    subVertical: [
      'flex h-full min-h-0 shrink-0 flex-col overflow-hidden',
      'w-[--soybean-split-nav-tree-width] data-[state=collapsed]:w-[--soybean-split-nav-tree-collapsed-width]',
      'transition-[width]-200 ease-out'
    ],
    subHorizontal: 'flex h-fit min-w-0 flex-1 items-center'
  },
  variants: {
    size: {
      xs: {
        subVertical: '[--soybean-split-nav-tree-width:11.25rem]',
        firstLevel: [
          `[--soybean-split-nav-first-level-width:4rem] text-2xs`,
          `data-[orientation=vertical]:text-3xs gap-0.625 data-[orientation=vertical]:p-0.625`,
          `data-[orientation=horizontal]:p-1`
        ],
        firstLevelItem: `gap-1 px-1 data-[orientation=horizontal]:h-6 data-[orientation=vertical]:gap-0.625 data-[orientation=vertical]:p-0.625`,
        firstLevelItemIcon: 'size-3.5'
      },
      sm: {
        subVertical: '[--soybean-split-nav-tree-width:13.125rem]',
        firstLevel: [
          `[--soybean-split-nav-first-level-width:4.5rem] text-xs`,
          `data-[orientation=vertical]:text-2xs gap-0.75 data-[orientation=vertical]:p-0.75`,
          `data-[orientation=horizontal]:p-1.5`
        ],
        firstLevelItem: `gap-1.5 px-1.5 data-[orientation=horizontal]:h-7 data-[orientation=vertical]:gap-0.75 data-[orientation=vertical]:p-0.75`,
        firstLevelItemIcon: 'size-4'
      },
      md: {
        subVertical: '[--soybean-split-nav-tree-width:15rem]',
        firstLevel: [
          `[--soybean-split-nav-first-level-width:5rem] text-sm`,
          `data-[orientation=vertical]:text-xs gap-1 data-[orientation=vertical]:p-1`,
          `data-[orientation=horizontal]:p-2`
        ],
        firstLevelItem: `gap-2 px-2 data-[orientation=horizontal]:h-8 data-[orientation=vertical]:gap-1 data-[orientation=vertical]:p-1`,
        firstLevelItemIcon: 'size-4.5'
      },
      lg: {
        subVertical: '[--soybean-split-nav-tree-width:16.875rem]',
        firstLevel: [
          `[--soybean-split-nav-first-level-width:5.5rem] text-base`,
          `data-[orientation=vertical]:text-sm gap-1.5 data-[orientation=vertical]:p-1.5`,
          `data-[orientation=horizontal]:p-2.5`
        ],
        firstLevelItem: `gap-2.5 px-2.5 data-[orientation=horizontal]:h-9 data-[orientation=vertical]:gap-1.5 data-[orientation=vertical]:p-1.5`,
        firstLevelItemIcon: 'size-5'
      },
      xl: {
        subVertical: '[--soybean-split-nav-tree-width:18.75rem]',
        firstLevel: [
          `[--soybean-split-nav-first-level-width:6rem] text-lg`,
          `data-[orientation=vertical]:text-base gap-2 data-[orientation=vertical]:p-2`,
          `data-[orientation=horizontal]:p-3`
        ],
        firstLevelItem: `gap-3 px-3 data-[orientation=horizontal]:h-10 data-[orientation=vertical]:gap-2 data-[orientation=vertical]:p-2`,
        firstLevelItemIcon: 'size-5.5'
      },
      '2xl': {
        subVertical: '[--soybean-split-nav-tree-width:22.5rem]',
        firstLevel: [
          `[--soybean-split-nav-first-level-width:6.5rem] text-xl`,
          `data-[orientation=vertical]:text-lg gap-2 data-[orientation=vertical]:p-2.5`,
          `data-[orientation=horizontal]:p-3.5`
        ],
        firstLevelItem: `gap-3.5 px-3.5 data-[orientation=horizontal]:h-11 data-[orientation=vertical]:gap-2.5 data-[orientation=vertical]:p-2.5`,
        firstLevelItemIcon: 'size-6'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
