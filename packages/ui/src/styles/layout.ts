// @unocss-include
import { scv } from '@soybeanjs/cva';
import type { VariantProps } from '@soybeanjs/cva';
import { buttonIconVariants } from './button';
import { drawerVariants } from './drawer';

export const layoutVariants = scv({
  extendBase: props => ({
    trigger: buttonIconVariants({ size: props.size }),
    mobileDrawer: drawerVariants({ size: props.size, side: props.side }).popup
  }),
  slots: {
    root: 'group relative h-full transition-all-300 [--soybean-layout-half-spacing:calc(var(--soybean-layout-spacing)/2)]',
    main: 'flex flex-col h-full group-data-[scroll-behavior=wrapper]:overflow-y-auto transition-all-300',
    sidebarRoot: 'lt-md:hidden',
    sidebarWrapper: [
      `absolute inset-y-0 z-[--soybean-layout-sidebar-z-index] flex h-[--soybean-layout-sidebar-height] w-[--soybean-sidebar-width] transition-[width,opacity] duration-200 ease-linear lt-md:hidden`,
      'group-data-[state=collapsed]:w-[--soybean-collapsed-sidebar-width] mt-[--soybean-layout-sidebar-top-gap] mb-[--soybean-layout-sidebar-bottom-gap]'
    ],
    sidebar: [
      `flex flex-col w-full h-full bg-sidebar`,
      `group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-border group-data-[variant=floating]:border-solid group-data-[variant=floating]:shadow`
    ],
    mobileDrawer: 'w-[--soybean-sidebar-width] bg-sidebar p-0',
    mobileOverlay: [
      `fixed inset-0 z-50 bg-black/80`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0`
    ],
    mobile: 'flex flex-col w-full h-full',
    rail: [
      'absolute inset-y-0 z-20 flex w-[--soybean-layout-spacing] -translate-x-1/2 rtl:translate-x-1/2 transition-all ease-linear lt-sm:hidden',
      'after:absolute after:inset-y-0 after:start-1/2 after:content-empty after:w-[calc(var(--soybean-layout-spacing)/8)] hover:after:bg-sidebar-border'
    ],
    trigger: '',
    header: [
      'shrink-0 flex items-center h-[--soybean-layout-header-height] transition-all-300',
      'group-data-[fixed-top=true]:absolute z-[--soybean-layout-header-z-index] top-0 inset-x-0'
    ],
    headerPlaceholder: 'shrink-0 h-[--soybean-layout-header-height] overflow-hidden',
    tab: 'group-data-[fixed-top=true]:absolute inset-x-0 top-[--soybean-layout-header-height] shrink-0 h-[--soybean-layout-tab-height] z-[--soybean-layout-tab-z-index] transition-all-300',
    tabPlaceholder: 'shrink-0 h-[--soybean-layout-tab-height] overflow-hidden',
    content: `relative grow bg-background group-data-[scroll-behavior=content]:overflow-y-auto`,
    footer: [
      'shrink-0 h-[--soybean-layout-footer-height] transition-all-300',
      'group-data-[fixed-footer=true]:absolute z-[--soybean-layout-footer-z-index] inset-x-0 bottom-0'
    ],
    footerPlaceholder: 'shrink-0 h-[--soybean-layout-footer-height] overflow-hidden'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs [--soybean-layout-spacing:0.75rem]'
      },
      sm: {
        root: 'text-xs [--soybean-layout-spacing:0.875rem]'
      },
      md: {
        root: 'text-sm [--soybean-layout-spacing:1rem]'
      },
      lg: {
        root: 'text-base [--soybean-layout-spacing:1.25rem]'
      },
      xl: {
        root: 'text-lg [--soybean-layout-spacing:1.5rem]'
      },
      '2xl': {
        root: 'text-xl [--soybean-layout-spacing:1.75rem]'
      }
    },
    side: {
      left: {
        main: [
          'ms-[var(--soybean-layout-main-gap,var(--soybean-layout-start-gap))]',
          'group-data-[variant=inset]:me-[--soybean-layout-half-spacing]'
        ],
        sidebarWrapper: 'start-0 border-e',
        rail: 'cursor-w-resize group-data-[state=collapsed]:cursor-e-resize -end-[var(--soybean-layout-spacing)]',
        header: [
          'group-data-[fixed-top=true]:ms-[var(--soybean-layout-header-gap,var(--soybean-layout-header-start-gap))]',
          'group-data-[variant=inset]:me-[--soybean-layout-half-spacing]'
        ],
        tab: [
          'group-data-[full-content=false]:group-data-[fixed-top=true]:ms-[var(--soybean-layout-main-gap,var(--soybean-layout-start-gap))]',
          'group-data-[full-content=false]:group-data-[fixed-top=true]:group-data-[variant=inset]:me-[--soybean-layout-half-spacing]'
        ],
        footer: [
          'group-data-[fixed-footer=true]:ms-[var(--soybean-layout-footer-gap,var(--soybean-layout-footer-start-gap))]',
          'group-data-[fixed-footer=true]:group-data-[variant=inset]:me-[--soybean-layout-half-spacing]',
          'group-data-[orientation=vertical]:group-data-[variant=floating]:group-data-[stretch-footer=true]:ms-0'
        ]
      },
      right: {
        main: [
          'me-[var(--soybean-layout-main-gap,var(--soybean-layout-start-gap))]',
          'group-data-[variant=inset]:ms-[--soybean-layout-half-spacing]'
        ],
        sidebarWrapper: 'end-0 border-s',
        rail: 'cursor-e-resize group-data-[state=collapsed]:cursor-w-resize start-0',
        header: [
          'group-data-[fixed-top=true]:me-[var(--soybean-layout-header-gap,var(--soybean-layout-header-start-gap))]',
          'group-data-[variant=inset]:ms-[--soybean-layout-half-spacing]'
        ],
        tab: [
          'group-data-[full-content=false]:group-data-[fixed-top=true]:me-[var(--soybean-layout-main-gap,var(--soybean-layout-start-gap))]',
          'group-data-[full-content=false]:group-data-[fixed-top=true]:group-data-[variant=inset]:ms-[--soybean-layout-half-spacing]'
        ],
        footer: [
          'group-data-[fixed-footer=true]:me-[var(--soybean-layout-footer-gap,var(--soybean-layout-footer-start-gap))]',
          'group-data-[fixed-footer=true]:group-data-[variant=inset]:ms-[--soybean-layout-half-spacing]',
          'group-data-[orientation=vertical]:group-data-[variant=floating]:group-data-[stretch-footer=true]:me-0'
        ]
      }
    },
    variant: {
      sidebar: {
        sidebarGapHandler: 'group-data-[collapsible=icon]:w-[--soybean-collapsed-sidebar-width]',
        sidebarWrapper: `group-data-[collapsible=icon]:w-[--soybean-collapsed-sidebar-width] group-data-[side=left]:border-e group-data-[side=right]:border-s`
      },
      floating: {
        root: [
          'data-[state=expanded]:[--soybean-layout-main-gap:calc(var(--soybean-layout-start-gap)+var(--soybean-layout-spacing))]',
          'data-[state=expanded]:[--soybean-layout-footer-gap:calc(var(--soybean-layout-footer-start-gap)+var(--soybean-layout-spacing))]',
          'data-[collapsible=icon]:[--soybean-layout-main-gap:calc(var(--soybean-layout-start-gap)+var(--soybean-layout-spacing))]',
          'data-[collapsible=icon]:[--soybean-layout-footer-gap:calc(var(--soybean-layout-footer-start-gap)+var(--soybean-layout-spacing))]',
          'data-[state=expanded]:data-[orientation=horizontal]:[--soybean-layout-header-gap:calc(var(--soybean-layout-header-start-gap)+var(--soybean-layout-spacing))]',
          'data-[collapsible=icon]:data-[orientation=horizontal]:[--soybean-layout-header-gap:calc(var(--soybean-layout-header-start-gap)+var(--soybean-layout-spacing))]'
        ],
        sidebarGapHandler: `w-[calc(var(--soybean-sidebar-width)+var(--soybean-layout-spacing))] group-data-[collapsible=icon]:group-data-[state=collapsed]:w-[calc(var(--soybean-collapsed-sidebar-width)+var(--soybean-layout-spacing))]`,
        sidebarWrapper: `w-[calc(var(--soybean-sidebar-width)+var(--soybean-layout-spacing))] p-[--soybean-layout-half-spacing] group-data-[collapsible=icon]:group-data-[state=collapsed]:w-[calc(var(--soybean-collapsed-sidebar-width)+var(--soybean-layout-spacing))] border-e-0`
      },
      inset: {
        root: [
          'py-[--soybean-layout-half-spacing] bg-sidebar',
          '[--soybean-layout-main-gap:calc(var(--soybean-layout-start-gap)+var(--soybean-layout-spacing))]',
          '[--soybean-layout-footer-gap:calc(var(--soybean-layout-footer-start-gap)+var(--soybean-layout-spacing))]',
          'data-[orientation=horizontal]:[--soybean-layout-header-gap:calc(var(--soybean-layout-header-start-gap)+var(--soybean-layout-spacing))]'
        ],
        sidebarGapHandler: `w-[calc(var(--soybean-sidebar-width)+var(--soybean-layout-spacing))] group-data-[collapsible=icon]:group-data-[state=collapsed]:w-[calc(var(--soybean-collapsed-sidebar-width)+var(--soybean-layout-spacing))]`,
        sidebarWrapper: `p-[--soybean-layout-half-spacing] w-[calc(var(--soybean-sidebar-width)+var(--soybean-layout-spacing))] group-data-[collapsible=icon]:group-data-[state=collapsed]:w-[calc(var(--soybean-collapsed-sidebar-width)+var(--soybean-layout-spacing))] border-e-0`,
        main: `rounded-xl shadow`,
        header: [
          `top-[--soybean-layout-half-spacing] rounded-t-xl`,
          `group-data-[variant=inset]:group-data-[orientation=vertical]:ms-[--soybean-layout-half-spacing]`,
          `group-data-[variant=inset]:group-data-[orientation=vertical]:me-[--soybean-layout-half-spacing]`,
          `group-data-[orientation=vertical]:border-0`,
          `group-data-[orientation=vertical]:shadow group-data-[orientation=vertical]:rounded-xl`
        ],
        tab: `top-[calc(var(--soybean-layout-header-height)+var(--soybean-layout-half-spacing))]`,
        footer: [
          'bottom-[--soybean-layout-half-spacing] rounded-b-xl',
          `group-data-[orientation=vertical]:shadow group-data-[orientation=vertical]:rounded-xl`,
          `group-data-[variant=inset]:group-data-[orientation=vertical]:group-data-[stretch-footer=true]:ms-[--soybean-layout-half-spacing]`,
          `group-data-[variant=inset]:group-data-[orientation=vertical]:group-data-[stretch-footer=true]:me-[--soybean-layout-half-spacing]`,
          `group-data-[orientation=vertical]:group-data-[stretch-footer=true]:bottom-[calc(var(--soybean-layout-half-spacing)-2px)]`
        ]
      }
    },
    collapsible: {
      offcanvas: {
        sidebarWrapper: 'group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:z-0',
        rail: `translate-x-0 after:start-full hover:bg-sidebar`
      },
      icon: {}
    },
    fullContent: {
      true: {
        tab: ['fixed top-0 z-[--soybean-layout-base-z-index] rounded-none', 'group-data-[fixed-top=true]:fixed'],
        content: `fixed inset-0 z-[--soybean-layout-base-z-index] group-data-[tab-visible=true]:mt-[--soybean-layout-tab-height] overflow-auto`
      }
    }
  },
  compoundVariants: [
    {
      side: 'left',
      collapsible: 'offcanvas',
      class: {
        rail: '-end-[--soybean-layout-half-spacing]'
      }
    },
    {
      side: 'right',
      collapsible: 'offcanvas',
      class: {
        rail: '-start-[--soybean-layout-half-spacing]'
      }
    },
    {
      side: 'left',
      variant: 'inset',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]:end-0'
      }
    },
    {
      side: 'right',
      variant: 'inset',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]:start-0'
      }
    },
    {
      side: 'left',
      variant: 'floating',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]:end-[--soybean-layout-half-spacing]'
      }
    },
    {
      side: 'right',
      variant: 'floating',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]:start-[--soybean-layout-half-spacing]'
      }
    },
    {
      variant: 'inset',
      collapsible: 'offcanvas',
      class: {
        main: 'md:group-data-[state=collapsed]:ms-[--soybean-layout-half-spacing]'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    variant: 'sidebar',
    collapsible: 'icon',
    side: 'left'
  }
});

type LayoutVariants = VariantProps<typeof layoutVariants>;

export type LayoutVariant = NonNullable<LayoutVariants['variant']>;
export type LayoutCollapsible = NonNullable<LayoutVariants['collapsible']>;
export type LayoutSide = NonNullable<LayoutVariants['side']>;
