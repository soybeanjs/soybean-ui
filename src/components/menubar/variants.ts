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
    indicatorIcon: 'size-4',
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
    },
    size: {
      xs: {
        root: 'min-h-7 gap-0.75 p-0.75',
        trigger: 'px-1 py-0.75 text-2xs',
        content: 'min-w-36 p-0.75 text-2xs',
        subContent: 'min-w-36 p-0.75 text-2xs',
        item: 'gap-1 px-1 py-1 text-2xs',
        checkboxItem: 'gap-1 py-1 pr-1 ps-6 text-2xs',
        radioItem: 'gap-1 py-1 pr-1 ps-6 text-2xs',
        itemIndicator: 'start-1 size-3',
        indicatorIcon: 'size-3',
        label: 'px-1 py-1 text-2xs',
        separator: '-mx-0.75 my-0.75',
        subTrigger: 'gap-1 px-1 py-1 text-2xs',
        subTriggerIcon: 'size-3',
        shortcut: 'text-3xs'
      },
      sm: {
        root: 'min-h-8 gap-0.875 p-0.875',
        trigger: 'px-1.5 py-1 text-xs',
        content: 'min-w-40 p-0.875 text-xs',
        subContent: 'min-w-40 p-0.875 text-xs',
        item: 'gap-1.5 px-1.5 py-1 text-xs',
        checkboxItem: 'gap-1.5 py-1 pr-1.5 ps-7 text-xs',
        radioItem: 'gap-1.5 py-1 pr-1.5 ps-7 text-xs',
        itemIndicator: 'start-1.5 size-3.5',
        indicatorIcon: 'size-3.5',
        label: 'px-1.5 py-1 text-xs',
        separator: '-mx-0.875 my-0.875',
        subTrigger: 'gap-1.5 px-1.5 py-1 text-xs',
        subTriggerIcon: 'size-3.5',
        shortcut: 'text-2xs'
      },
      md: {
        root: 'min-h-9 gap-1 p-1',
        trigger: 'px-2 py-1 text-sm',
        content: 'min-w-48 p-1 text-sm',
        subContent: 'min-w-48 p-1 text-sm',
        item: 'gap-2 px-2 py-1.5 text-sm',
        checkboxItem: 'gap-2 py-1.5 pr-2 ps-8 text-sm',
        radioItem: 'gap-2 py-1.5 pr-2 ps-8 text-sm',
        itemIndicator: 'start-2 size-3.5',
        indicatorIcon: 'size-4',
        label: 'px-2 py-1.5 text-sm',
        separator: '-mx-1 my-1',
        subTrigger: 'gap-2 px-2 py-1.5 text-sm',
        subTriggerIcon: 'size-4',
        shortcut: 'text-xs'
      },
      lg: {
        root: 'min-h-10 gap-1.25 p-1.25',
        trigger: 'px-2.5 py-1.5 text-base',
        content: 'min-w-52 p-1.25 text-base',
        subContent: 'min-w-52 p-1.25 text-base',
        item: 'gap-2.5 px-2.5 py-1.5 text-base',
        checkboxItem: 'gap-2.5 py-1.5 pr-2.5 ps-9 text-base',
        radioItem: 'gap-2.5 py-1.5 pr-2.5 ps-9 text-base',
        itemIndicator: 'start-2.5 size-4',
        indicatorIcon: 'size-4.5',
        label: 'px-2.5 py-1.5 text-base',
        separator: '-mx-1.25 my-1.25',
        subTrigger: 'gap-2.5 px-2.5 py-1.5 text-base',
        subTriggerIcon: 'size-4.5',
        shortcut: 'text-sm'
      },
      xl: {
        root: 'min-h-11 gap-1.5 p-1.5',
        trigger: 'px-3 py-2 text-lg',
        content: 'min-w-56 p-1.5 text-lg',
        subContent: 'min-w-56 p-1.5 text-lg',
        item: 'gap-3 px-3 py-2 text-lg',
        checkboxItem: 'gap-3 py-2 pr-3 ps-10 text-lg',
        radioItem: 'gap-3 py-2 pr-3 ps-10 text-lg',
        itemIndicator: 'start-3 size-4.5',
        indicatorIcon: 'size-5',
        label: 'px-3 py-2 text-lg',
        separator: '-mx-1.5 my-1.5',
        subTrigger: 'gap-3 px-3 py-2 text-lg',
        subTriggerIcon: 'size-5',
        shortcut: 'text-base'
      },
      '2xl': {
        root: 'min-h-12 gap-1.75 p-1.75',
        trigger: 'px-3.5 py-2.5 text-xl',
        content: 'min-w-60 p-1.75 text-xl',
        subContent: 'min-w-60 p-1.75 text-xl',
        item: 'gap-3.5 px-3.5 py-2.5 text-xl',
        checkboxItem: 'gap-3.5 py-2.5 pr-3.5 ps-12 text-xl',
        radioItem: 'gap-3.5 py-2.5 pr-3.5 ps-12 text-xl',
        itemIndicator: 'start-3.5 size-5',
        indicatorIcon: 'size-5',
        label: 'px-3.5 py-2.5 text-xl',
        separator: '-mx-1.75 my-1.75',
        subTrigger: 'gap-3.5 px-3.5 py-2.5 text-xl',
        subTriggerIcon: 'size-5',
        shortcut: 'text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
