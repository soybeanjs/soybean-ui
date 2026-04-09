// @unocss-include
import { tv } from 'tailwind-variants';

export const menubarVariants = tv({
  slots: {
    root: 'flex min-h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs',
    trigger: [
      'flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-none select-none',
      'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    ],
    content: [
      'z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none',
      'origin-(--soybean-menu-popup-transform-origin)',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
    ],
    subContent: [
      'z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg outline-none',
      'origin-(--soybean-sub-menu-popup-transform-origin)',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
    ],
    item: [
      'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none',
      'focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'
    ],
    checkboxItem: [
      'relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 ps-8 text-sm outline-none select-none',
      'focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'
    ],
    radioItem: [
      'relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 ps-8 text-sm outline-none select-none',
      'focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'
    ],
    itemIndicator: 'pointer-events-none absolute start-2 flex size-3.5 items-center justify-center',
    label: 'px-2 py-1.5 text-sm font-medium',
    separator: '-mx-1 my-1 h-px bg-border',
    subTrigger: [
      'flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none',
      'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'
    ],
    subTriggerIcon: 'ms-auto size-4 rtl:rotate-180',
    shortcut: 'ms-auto text-xs tracking-widest opacity-60'
  },
  variants: {
    destructive: {
      true: {
        item: [
          'text-destructive-foreground',
          'focus:bg-destructive/10 focus:text-destructive-foreground dark:focus:bg-destructive/40',
          '[&_svg:not([class*=text-])]:text-destructive-foreground'
        ]
      }
    },
    inset: {
      true: {
        item: 'ps-8',
        label: 'ps-8',
        subTrigger: 'ps-8'
      }
    }
  }
});
