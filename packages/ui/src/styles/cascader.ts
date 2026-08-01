// @unocss-include
import { scv } from '@soybeanjs/cva';

export const cascaderVariants = scv({
  slots: {
    trigger: [
      `flex items-center justify-between w-full rounded-md border border-input bg-background transition-all-150`,
      `outline-none focus-visible:ring-3 focus-visible:ring-offset-background focus-visible:ring-primary/30 focus:ring-3 focus:ring-offset-background focus:ring-primary/30 disabled:pointer-events-none disabled:opacity-50`,
      `placeholder:text-muted-foreground data-[placeholder]:text-muted-foreground`
    ],
    triggerIcon: `shrink-0 text-muted-foreground opacity-70`,
    value: 'grow truncate text-start',
    tag: [
      `inline-flex items-center gap-1 rounded-sm bg-accent text-accent-foreground`,
      `data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    clear: `shrink-0 rounded-sm text-muted-foreground opacity-70 outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-primary/30 focus:ring-3 focus:ring-primary/30`,
    searchInput: `h-full w-full grow bg-transparent outline-none placeholder:text-muted-foreground`,
    positioner: '',
    popup: [
      `relative z-50 rounded-md border bg-popover text-popover-foreground shadow-md`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    panel: 'flex items-stretch',
    menu: [
      `max-h-80 overflow-y-auto overflow-x-hidden py-1`,
      `scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted`
    ],
    option: [
      `relative flex items-center w-full gap-2 outline-none cursor-pointer select-none`,
      `rounded-sm focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground`,
      `data-[selected]:bg-primary/10 data-[selected]:text-primary data-[selected]:font-medium`,
      `data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`
    ],
    optionText: 'grow truncate text-start',
    optionCheck: `shrink-0 text-primary`,
    optionArrow: `shrink-0 text-muted-foreground`,
    empty: 'flex items-center justify-center py-4 text-sm text-muted-foreground',
    arrow: 'w-1em h-0.5em fill-popover stroke-border'
  },
  variants: {
    size: {
      xs: {
        popup: 'text-2xs',
        trigger: 'gap-1 h-6 px-1.5 text-2xs',
        searchInput: 'text-2xs',
        tag: 'gap-0.5 h-4 px-1 text-2xs',
        clear: 'size-3.5 text-2xs',
        menu: 'w-32',
        option: 'px-1 py-1',
        empty: 'py-2.5 text-2xs'
      },
      sm: {
        popup: 'text-xs',
        trigger: 'gap-1.5 h-7 px-2 text-xs',
        searchInput: 'text-xs',
        tag: 'gap-1 h-4.5 px-1.5 text-xs',
        clear: 'size-4 text-xs',
        menu: 'w-36',
        option: 'px-1.5 py-1',
        empty: 'py-3 text-xs'
      },
      md: {
        popup: 'text-sm',
        trigger: 'gap-2 h-8 px-2.5 text-sm',
        searchInput: 'text-sm',
        tag: 'gap-1 h-5 px-2 text-sm',
        clear: 'size-4.5 text-sm',
        menu: 'w-40',
        option: 'px-2 py-1.5',
        empty: 'py-4 text-sm'
      },
      lg: {
        popup: 'text-base',
        trigger: 'gap-2.5 h-9 px-3 text-base',
        searchInput: 'text-base',
        tag: 'gap-1 h-5.5 px-2 text-base',
        clear: 'size-5 text-base',
        menu: 'w-44',
        option: 'px-2.5 py-1.5',
        empty: 'py-4.5 text-base'
      },
      xl: {
        popup: 'text-lg',
        trigger: 'gap-3 h-10 px-3.5 text-lg',
        searchInput: 'text-lg',
        tag: 'gap-1 h-6 px-2.5 text-lg',
        clear: 'size-5.5 text-lg',
        menu: 'w-48',
        option: 'px-3 py-2',
        empty: 'py-5 text-lg'
      },
      '2xl': {
        popup: 'text-xl',
        trigger: 'gap-3.5 h-12 px-4 text-xl',
        searchInput: 'text-xl',
        tag: 'gap-1 h-7 px-3 text-xl',
        clear: 'size-6 text-xl',
        menu: 'w-52',
        option: 'px-3.5 py-2.5',
        empty: 'py-6 text-xl'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
