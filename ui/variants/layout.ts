// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const layoutVariants = tv({
  slots: {
    root: 'group relative flex w-full min-h-full data-[side=right]:flex-row-reverse',
    sidebarRoot: 'hidden md:block',
    sidebarWrapper: `absolute inset-y-0 z-10 hidden h-full w-[--sidebar-width] transition-[left,right,width,opacity] duration-200 ease-linear md:flex`,
    sidebar: [
      `flex flex-col size-full bg-sidebar-background`,
      `group-data-[variant=floating]:(rounded-lg border border-border border-solid shadow)`
    ],
    sidebarGapHandler: [
      `relative h-full w-[--sidebar-width] bg-transparent transition-width duration-200 ease-linear`,
      `group-data-[collapsible=offcanvas]:w-0`,
      `group-data-[side=right]:rotate-180`
    ],
    mobileRoot: 'w-[--sidebar-width] bg-sidebar-background p-0 [&>button]:hidden',
    mobile: 'flex flex-col size-full',
    trigger: '',
    main: 'relative flex flex-1 flex-col min-h-full bg-background',
    header: 'relative flex items-center',
    rail: [
      'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear',
      `after:(absolute inset-y-0 left-1/2 w-[2px]) hover:after:bg-border sm:flex`
    ]
  },
  variants: {
    variant: {
      sidebar: {
        sidebarGapHandler: 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
        sidebarWrapper: `group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l`
      },
      floating: {
        sidebarGapHandler: `w-[calc(var(--sidebar-width)+1rem)] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]`,
        sidebarWrapper: `p-2 w-[calc(var(--sidebar-width)+1rem)] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]`
      },
      inset: {
        root: 'bg-sidebar-background',
        sidebarGapHandler: `w-[calc(var(--sidebar-width)+1rem)] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]`,
        sidebarWrapper: `p-2 w-[calc(var(--sidebar-width)+1rem)] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]`,
        main: `md:(m-2 ml-0 rounded-xl shadow)`
      }
    },
    side: {
      left: {
        sidebarWrapper: 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]',
        rail: 'cursor-w-resize group-data-[state=collapsed]:cursor-e-resize -right-4'
      },
      right: {
        sidebarWrapper: 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
        rail: 'cursor-e-resize group-data-[state=collapsed]:cursor-w-resize left-0'
      }
    },
    collapsible: {
      offcanvas: {
        sidebarWrapper: 'group-data-[state=collapsed]:opacity-0',
        rail: `translate-x-0 after:left-full hover:bg-sidebar-background`
      },
      icon: {}
    }
  },
  compoundVariants: [
    {
      side: 'left',
      collapsible: 'offcanvas',
      class: {
        rail: '-right-2'
      }
    },
    {
      side: 'right',
      collapsible: 'offcanvas',
      class: {
        rail: '-left-2'
      }
    },
    {
      side: 'left',
      variant: 'inset',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]:right-0'
      }
    },
    {
      side: 'right',
      variant: 'inset',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]:left-0'
      }
    },
    {
      side: 'left',
      variant: 'floating',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]:right-2'
      }
    },
    {
      side: 'right',
      variant: 'floating',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]:left-2'
      }
    },
    {
      variant: 'inset',
      collapsible: 'offcanvas',
      class: {
        main: 'md:group-data-[state=collapsed]:ml-2'
      }
    }
  ],
  defaultVariants: {
    variant: 'sidebar',
    side: 'left',
    collapsible: 'icon'
  }
});

type LayoutVariants = VariantProps<typeof layoutVariants>;

export type LayoutVariant = NonNullable<LayoutVariants['variant']>;
export type LayoutCollapsible = NonNullable<LayoutVariants['collapsible']>;
export type LayoutSide = NonNullable<LayoutVariants['side']>;

export type LayoutSlots = keyof typeof layoutVariants.slots;
