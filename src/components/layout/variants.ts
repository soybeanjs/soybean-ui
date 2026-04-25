// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const layoutVariants = tv({
  slots: {
    root: 'group relative flex w-full h-full data-[side=right]:flex-row-reverse',
    sidebarRoot: 'h-full block lt-md:hidden',
    sidebarWrapper: `absolute inset-y-0 z-10 flex h-full w-[--soybean-sidebar-width] transition-[left,right,width,opacity] duration-200 ease-linear lt-md:hidden`,
    sidebar: [
      `flex flex-col w-full h-full bg-sidebar`,
      `group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-border group-data-[variant=floating]:border-solid group-data-[variant=floating]:shadow`
    ],
    sidebarGapHandler: [
      `relative h-full w-[--soybean-sidebar-width] bg-transparent transition-width duration-200 ease-linear`,
      `group-data-[collapsible=offcanvas]:w-0`,
      `group-data-[side=right]:rotate-180`
    ],
    mobileDrawer: 'w-[--soybean-sidebar-width] bg-sidebar p-0',
    mobileOverlay: [
      `fixed inset-0 z-50 bg-black/80`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0`
    ],
    mobile: 'flex flex-col w-full h-full',
    rail: [
      'absolute inset-y-0 z-20 flex w-[--soybean-layout-spacing] -translate-x-1/2 transition-all ease-linear lt-sm:hidden',
      'after:absolute after:inset-y-0 after:left-1/2 after:content-empty after:w-[calc(var(--soybean-layout-spacing)/8)] hover:after:bg-sidebar-border'
    ],
    trigger: '',
    main: 'relative flex flex-1 flex-col items-stretch bg-background overflow-hidden',
    header: 'relative flex items-center shrink-0 h-[--soybean-layout-header-height]',
    tab: 'shrink-0 h-[--soybean-layout-tab-height] bg-background',
    content: `grow overflow-auto bg-background`,
    footer: 'shrink-0 h-[--soybean-layout-footer-height]'
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
    variant: {
      sidebar: {
        sidebarGapHandler: 'group-data-[collapsible=icon]:w-[--soybean-collapsed-sidebar-width]',
        sidebarWrapper: `group-data-[collapsible=icon]:w-[--soybean-collapsed-sidebar-width] group-data-[side=left]:border-r group-data-[side=right]:border-l`
      },
      floating: {
        sidebarGapHandler: `w-[calc(var(--soybean-sidebar-width)+var(--soybean-layout-spacing))] group-data-[collapsible=icon]:w-[calc(var(--soybean-collapsed-sidebar-width)+var(--soybean-layout-spacing))]`,
        sidebarWrapper: `p-[calc(var(--soybean-layout-spacing)/2)] w-[calc(var(--soybean-sidebar-width)+var(--soybean-layout-spacing))] group-data-[collapsible=icon]:w-[calc(var(--soybean-collapsed-sidebar-width)+var(--soybean-layout-spacing))]`
      },
      inset: {
        root: 'bg-sidebar',
        sidebarGapHandler: `w-[calc(var(--soybean-sidebar-width)+var(--soybean-layout-spacing))] group-data-[collapsible=icon]:w-[calc(var(--soybean-collapsed-sidebar-width)+var(--soybean-layout-spacing))]`,
        sidebarWrapper: `p-[calc(var(--soybean-layout-spacing)/2)] w-[calc(var(--soybean-sidebar-width)+var(--soybean-layout-spacing))] group-data-[collapsible=icon]:w-[calc(var(--soybean-collapsed-sidebar-width)+var(--soybean-layout-spacing))]`,
        main: `md:m-[calc(var(--soybean-layout-spacing)/2)] md:ms-0 md:rounded-xl md:shadow`
      }
    },
    side: {
      left: {
        sidebarWrapper: 'start-0 group-data-[collapsible=offcanvas]:start-[calc(var(--soybean-sidebar-width)*-1)]',
        rail: 'cursor-w-resize group-data-[state=collapsed]:cursor-e-resize -end-[var(--soybean-layout-spacing)]'
      },
      right: {
        sidebarWrapper: 'end-0 group-data-[collapsible=offcanvas]:end-[calc(var(--soybean-sidebar-width)*-1)]',
        rail: 'cursor-e-resize group-data-[state=collapsed]:cursor-w-resize start-0'
      }
    },
    collapsible: {
      offcanvas: {
        sidebarWrapper: 'group-data-[state=collapsed]:opacity-0',
        rail: `translate-x-0 after:start-full hover:bg-sidebar`
      },
      icon: {}
    },
    fullContent: {
      true: {
        tab: 'fixed left-0 top-0 z-49 w-full',
        content: 'fixed inset-0 z-49 group-data-[tab-visible=true]:mt-[--soybean-layout-tab-height]'
      },
      false: {
        content: 'relative'
      }
    }
  },
  compoundVariants: [
    {
      side: 'left',
      collapsible: 'offcanvas',
      class: {
        rail: '-end-[var(--soybean-layout-spacing)/2]'
      }
    },
    {
      side: 'right',
      collapsible: 'offcanvas',
      class: {
        rail: '-start-[var(--soybean-layout-spacing)/2]'
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
        rail: 'group-data-[state=collapsed]:end-[calc(var(--soybean-layout-spacing)/2)]'
      }
    },
    {
      side: 'right',
      variant: 'floating',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]:start-[calc(var(--soybean-layout-spacing)/2)]'
      }
    },
    {
      variant: 'inset',
      collapsible: 'offcanvas',
      class: {
        main: 'md:group-data-[state=collapsed]:ms-[calc(var(--soybean-layout-spacing)/2)]'
      }
    }
  ],
  defaultVariants: {
    variant: 'sidebar',
    side: 'left',
    collapsible: 'icon'
  }
});

export const layoutClassicVariants = tv({
  slots: {
    root: 'group relative h-full transition-all-300',
    main: 'flex flex-col h-full group-data-[scroll-behavior=wrapper]:overflow-y-auto transition-all-300',
    sidebarRoot: 'lt-md:hidden',
    sidebarWrapper: [
      `absolute inset-y-0 z-[--soybean-layout-sidebar-z-index] flex h-full w-[--soybean-sidebar-width] transition-[left,right,width,opacity] duration-200 ease-linear lt-md:hidden`,
      'group-data-[state=collapsed]:w-[--soybean-collapsed-sidebar-width] pt-[--soybean-layout-sidebar-top-gap] pb-[--soybean-layout-sidebar-bottom-gap]'
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
      'absolute inset-y-0 z-20 flex w-[--soybean-layout-spacing] -translate-x-1/2 transition-all ease-linear lt-sm:hidden',
      'after:absolute after:inset-y-0 after:start-1/2 after:content-empty after:w-[calc(var(--soybean-layout-spacing)/8)] hover:after:bg-sidebar-border'
    ],
    trigger: '',
    header: [
      'shrink-0 flex items-center h-[--soybean-layout-header-height]',
      'group-data-[fixed-top=true]:absolute group-data-[fixed-top=true]:z-[--soybean-layout-header-z-index] group-data-[fixed-top=true]:top-0 group-data-[fixed-top=true]:inset-x-0'
    ],
    headerPlaceholder: 'shrink-0 h-[--soybean-layout-header-height] overflow-hidden',
    tab: 'shrink-0 h-[--soybean-layout-tab-height] group-data-[fixed-top=true]:z-[--soybean-layout-tab-z-index]',
    tabPlaceholder: 'shrink-0 h-[--soybean-layout-tab-height] overflow-hidden',
    content: `grow bg-background group-data-[scroll-behavior=content]:overflow-y-auto`,
    footer: [
      'shrink-0 h-[--soybean-layout-footer-height]',
      'group-data-[fixed-footer=true]:absolute group-data-[fixed-footer=true]:z-[--soybean-layout-footer-z-index] group-data-[fixed-footer=true]:bottom-0 group-data-[fixed-footer=true]:inset-x-0'
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
        main: 'ps-[--soybean-layout-start-gap]',
        sidebarWrapper: 'start-0 border-r',
        rail: 'cursor-w-resize group-data-[state=collapsed]:cursor-e-resize -end-[var(--soybean-layout-spacing)]',
        header: 'group-data-[fixed-top=true]:ps-[--soybean-layout-header-start-gap]',
        footer: 'group-data-[fixed-footer=true]:ps-[--soybean-layout-footer-start-gap]'
      },
      right: {
        main: 'pe-[--soybean-layout-start-gap]',
        sidebarWrapper: 'end-0 border-l',
        rail: 'cursor-e-resize group-data-[state=collapsed]:cursor-w-resize start-0',
        header: 'group-data-[fixed-top=true]:pe-[--soybean-layout-header-start-gap]',
        footer: 'group-data-[fixed-footer=true]:pe-[--soybean-layout-footer-start-gap]'
      }
    },
    fullContent: {
      true: {
        tab: 'fixed left-0 top-0 z-[--soybean-layout-base-z-index] w-full',
        content: `fixed inset-0 z-[--soybean-layout-base-z-index] group-data-[tab-visible=true]:mt-[--soybean-layout-tab-height] overflow-auto`
      },
      false: {
        tab: 'group-data-[fixed-top=true]:absolute group-data-[fixed-top=true]:inset-x-0 group-data-[fixed-top=true]:top-[--soybean-layout-header-height]',
        content: 'relative'
      }
    }
  },
  compoundVariants: [
    {
      side: 'left',
      fullContent: false,
      class: {
        tab: 'group-data-[fixed-top=true]:ps-[--soybean-layout-start-gap]'
      }
    },
    {
      side: 'right',
      fullContent: false,
      class: {
        tab: 'group-data-[fixed-top=true]:pe-[--soybean-layout-start-gap]'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    side: 'left',
    fullContent: false
  }
});

type LayoutVariants = VariantProps<typeof layoutVariants>;

export type LayoutVariant = NonNullable<LayoutVariants['variant']>;
export type LayoutCollapsible = NonNullable<LayoutVariants['collapsible']>;
export type LayoutSide = NonNullable<LayoutVariants['side']>;
