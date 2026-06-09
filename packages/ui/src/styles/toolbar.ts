// @unocss-include
import { scv } from '@soybeanjs/cva';

const sharedButtonClasses = [
  'inline-flex items-center justify-center rounded-sm font-medium transition-colors',
  'outline-none hover:bg-accent hover:text-accent-foreground',
  'focus-visible:ring-3 focus-visible:ring-primary/30',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  'aria-disabled:pointer-events-none aria-disabled:opacity-50',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'
];

export const toolbarVariants = scv({
  slots: {
    root: [
      'inline-flex items-center rounded-md border border-border bg-background shadow-xs',
      'data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-col'
    ],
    button: sharedButtonClasses,
    link: [...sharedButtonClasses, 'select-none no-underline'],
    linkIcon: 'shrink-0 self-start text-muted-foreground rtl:rotate-270',
    separator: [
      'shrink-0 bg-border data-[orientation=vertical]:w-px',
      'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full'
    ],
    toggleGroup: 'inline-flex items-center data-[orientation=vertical]:flex-col',
    toggleItem: [...sharedButtonClasses, 'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground']
  },
  variants: {
    size: {
      xs: {
        root: 'gap-0.5 p-0.5 data-[orientation=horizontal]:h-6',
        button: 'h-5 min-w-5 gap-1 px-1 text-2xs',
        link: 'h-5 min-w-5 gap-1 px-1 text-2xs',
        linkIcon: 'size-2 -ms-1',
        separator: `data-[orientation=vertical]:mx-0.5 data-[orientation=vertical]:h-3 data-[orientation=horizontal]:my-0.5`,
        toggleGroup: 'gap-0.5',
        toggleItem: 'h-5 min-w-5 gap-1 px-1 text-2xs'
      },
      sm: {
        root: 'gap-0.5 p-0.5 data-[orientation=horizontal]:h-7',
        button: 'h-6 min-w-6 gap-1 px-1.5 text-xs',
        link: 'h-6 min-w-6 gap-1 px-1.5 text-xs',
        linkIcon: 'size-2.5 -ms-1.5',
        separator: `data-[orientation=vertical]:mx-0.5 data-[orientation=vertical]:h-4 data-[orientation=horizontal]:my-0.5`,
        toggleGroup: 'gap-0.5',
        toggleItem: 'h-6 min-w-6 gap-1 px-1.5 text-xs'
      },
      md: {
        root: 'gap-1 p-1 data-[orientation=horizontal]:h-9',
        button: 'h-7 min-w-7 gap-1 px-2 text-sm',
        link: 'h-7 min-w-7 gap-1 px-2 text-sm',
        linkIcon: 'size-3 -ms-2',
        separator: `data-[orientation=vertical]:mx-1 data-[orientation=vertical]:h-4 data-[orientation=horizontal]:my-1`,
        toggleGroup: 'gap-1',
        toggleItem: 'h-7 min-w-7 gap-1 px-2 text-sm'
      },
      lg: {
        root: 'gap-1 p-1 data-[orientation=horizontal]:h-10',
        button: 'h-8 min-w-8 gap-2 px-2.5 text-base',
        link: 'h-8 min-w-8 gap-2 px-2.5 text-base',
        linkIcon: 'size-3.5 -ms-2.5',
        separator: `data-[orientation=vertical]:mx-1 data-[orientation=vertical]:h-5 data-[orientation=horizontal]:my-1`,
        toggleGroup: 'gap-1',
        toggleItem: 'h-8 min-w-8 gap-2 px-2.5 text-base'
      },
      xl: {
        root: 'gap-1.5 p-1.5 data-[orientation=horizontal]:h-12',
        button: 'h-9 min-w-9 gap-2.5 px-3 text-lg',
        link: 'h-9 min-w-9 gap-2.5 px-3 text-lg',
        linkIcon: 'size-4 -ms-3',
        separator: `data-[orientation=vertical]:mx-1.5 data-[orientation=vertical]:h-6 data-[orientation=horizontal]:my-1.5`,
        toggleGroup: 'gap-1.5',
        toggleItem: 'h-9 min-w-9 gap-2.5 px-3 text-lg'
      },
      '2xl': {
        root: 'gap-2 p-2 data-[orientation=horizontal]:h-14',
        button: 'h-10 min-w-10 gap-3 px-3.5 text-xl',
        link: 'h-10 min-w-10 gap-3 px-3.5 text-xl',
        linkIcon: 'size-4.5 -ms-3.5',
        separator: `data-[orientation=vertical]:mx-2 data-[orientation=vertical]:h-7 data-[orientation=horizontal]:my-2`,
        toggleGroup: 'gap-2',
        toggleItem: 'h-10 min-w-10 gap-3 px-3.5 text-xl'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
