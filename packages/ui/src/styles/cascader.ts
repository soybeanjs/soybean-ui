// @unocss-include
import { scv } from '@soybeanjs/cva';

export const cascaderVariants = scv({
  slots: {
    trigger: [
      `data-[multiple]:relative data-[multiple]:flex-wrap`,
      `group flex items-center w-full rounded-md border border-input bg-background transition-all-150`,
      `outline-none focus-visible:ring-3 focus-visible:ring-offset-background focus-visible:ring-primary/30 focus:ring-3 focus:ring-offset-background focus:ring-primary/30 disabled:pointer-events-none disabled:opacity-50`,
      `placeholder:text-muted-foreground data-[placeholder]:text-muted-foreground`
    ],
    triggerIcon: [
      `shrink-0 text-muted-foreground opacity-70`,
      `group-data-[multiple]:absolute group-data-[multiple]:top-1/2 group-data-[multiple]:-translate-y-1/2`
    ],
    value: 'grow truncate text-start',
    tag: [
      `inline-flex shrink-0 items-center rounded-sm bg-accent text-accent-foreground`,
      `data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    clear: [
      `shrink-0 rounded-sm text-muted-foreground opacity-70 outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-primary/30 focus:ring-3 focus:ring-primary/30`,
      `group-data-[multiple]:absolute group-data-[multiple]:top-1/2 group-data-[multiple]:-translate-y-1/2`
    ],
    searchInput: `w-full grow bg-transparent outline-none placeholder:text-muted-foreground data-[faded]:text-muted-foreground`,
    positioner: '',
    popup: [
      `relative z-50 rounded-md border bg-popover text-popover-foreground shadow-md`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    panel: 'flex items-stretch',
    menu: [`overflow-y-auto overflow-x-hidden`, `scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted`],
    option: [
      `relative flex items-center w-full outline-none cursor-pointer select-none`,
      `rounded-sm focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground`,
      `data-[child-active]:text-primary data-[state=indeterminate]:not-data-[highlighted]:text-primary data-[selected]:text-primary data-[selected]:font-medium data-[selected]:bg-primary/10`,
      `data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    optionText: 'grow truncate text-start',
    optionCheck: `shrink-0 text-primary`,
    optionArrow: `shrink-0 rounded-sm p-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground`,
    empty: 'flex items-center justify-center w-full text-muted-foreground',
    arrow: 'w-1em h-0.5em fill-popover stroke-border'
  },
  variants: {
    size: {
      xs: {
        popup: 'text-2xs',
        trigger: 'gap-1 min-h-6 px-1.5 text-2xs data-[multiple]:py-0.5 data-[multiple]:pr-9',
        triggerIcon: 'group-data-[multiple]:end-1.5',
        searchInput: 'min-h-6 text-2xs',
        tag: 'gap-0.5 h-4 px-1 text-2xs',
        clear: 'size-3.5 text-2xs group-data-[multiple]:end-5.5',
        menu: 'max-h-80 py-1 w-32',
        option: 'gap-2 px-1 py-1',
        empty: 'min-w-32 py-2.5 text-2xs'
      },
      sm: {
        popup: 'text-xs',
        trigger: 'gap-1.5 min-h-7 px-2 text-xs data-[multiple]:py-0.75 data-[multiple]:pr-11.5',
        triggerIcon: 'group-data-[multiple]:end-2',
        searchInput: 'min-h-7 text-xs',
        tag: 'gap-1 h-4.5 px-1.5 text-xs',
        clear: 'size-4 text-xs group-data-[multiple]:end-7.5',
        menu: 'max-h-80 py-1 w-36',
        option: 'gap-2 px-1.5 py-1',
        empty: 'min-w-36 py-3 text-xs'
      },
      md: {
        popup: 'text-sm',
        trigger: 'gap-2 min-h-8 px-2.5 text-sm data-[multiple]:py-1 data-[multiple]:pr-13.5',
        triggerIcon: 'group-data-[multiple]:end-2.5',
        searchInput: 'min-h-8 text-sm',
        tag: 'gap-1 h-5 px-2 text-sm',
        clear: 'size-4.5 text-sm group-data-[multiple]:end-9',
        menu: 'max-h-80 py-1 w-40',
        option: 'gap-2 px-2 py-1.5',
        empty: 'min-w-40 py-4 text-sm'
      },
      lg: {
        popup: 'text-base',
        trigger: 'gap-2.5 min-h-9 px-3 text-base data-[multiple]:py-1.25 data-[multiple]:pr-16',
        triggerIcon: 'group-data-[multiple]:end-3',
        searchInput: 'min-h-9 text-base',
        tag: 'gap-1 h-5.5 px-2 text-base',
        clear: 'size-5 text-base group-data-[multiple]:end-11',
        menu: 'max-h-80 py-1 w-44',
        option: 'gap-2 px-2.5 py-1.5',
        empty: 'min-w-44 py-4.5 text-base'
      },
      xl: {
        popup: 'text-lg',
        trigger: 'gap-3 min-h-10 px-3.5 text-lg data-[multiple]:py-1.5 data-[multiple]:pr-18',
        triggerIcon: 'group-data-[multiple]:end-3.5',
        searchInput: 'min-h-10 text-lg',
        tag: 'gap-1 h-6 px-2.5 text-lg',
        clear: 'size-5.5 text-lg group-data-[multiple]:end-12.5',
        menu: 'max-h-80 py-1 w-48',
        option: 'gap-2 px-3 py-2',
        empty: 'min-w-48 py-5 text-lg'
      },
      '2xl': {
        popup: 'text-xl',
        trigger: 'gap-3.5 min-h-12 px-4 text-xl data-[multiple]:py-1.75 data-[multiple]:pr-20.5',
        triggerIcon: 'group-data-[multiple]:end-4',
        searchInput: 'min-h-12 text-xl',
        tag: 'gap-1 h-7 px-3 text-xl',
        clear: 'size-6 text-xl group-data-[multiple]:end-14.5',
        menu: 'max-h-80 py-1 w-52',
        option: 'gap-2 px-3.5 py-2.5',
        empty: 'min-w-52 py-6 text-xl'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
