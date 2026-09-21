// @unocss-include
import { scv } from '@soybeanjs/cva';
import type { VariantProps } from '@soybeanjs/cva';
import { buttonIconVariants } from './button';
import { sheetVariants } from './sheet';

export const layoutVariants = scv({
  extendBase: props => ({
    trigger: buttonIconVariants({ size: props.size }),
    mobileDrawer: sheetVariants({ size: props.size, side: props.side }).popup
  }),
  slots: {
    // --sl-* 是本库的间距/gap 别名(aria 注入的 --layout-* 保持不变),在 root 上按状态计算,各槽位直接应用
    root: [
      'group/layout relative h-full transition-all-300',
      '[--sl-half-spacing:calc(var(--sl-spacing)/2)]',
      '[--sl-main-gap:var(--vean-layout-start-gap)]',
      '[--sl-header-gap:var(--vean-layout-header-start-gap)]',
      '[--sl-footer-gap:var(--vean-layout-footer-start-gap)]',
      '[--sl-end-gap:0px]'
    ],
    main: 'flex flex-col h-full group-data-[scroll-behavior=wrapper]/layout:overflow-y-auto transition-all-300',
    sidebarRoot: 'lt-md:hidden',
    sidebarWrapper: [
      `absolute inset-y-0 z-[--vean-layout-sidebar-z-index] flex h-[--vean-layout-sidebar-height] w-[--vean-sidebar-width] transition-[width,opacity] duration-200 ease-linear lt-md:hidden`,
      'group-data-[state=collapsed]/layout:w-[--vean-collapsed-sidebar-width] mt-[--vean-layout-sidebar-top-gap] mb-[--vean-layout-sidebar-bottom-gap]'
    ],
    sidebar: [
      `flex flex-col w-full h-full bg-sidebar`,
      `group-data-[variant=floating]/layout:rounded-lg group-data-[variant=floating]/layout:border group-data-[variant=floating]/layout:border-border group-data-[variant=floating]/layout:border-solid group-data-[variant=floating]/layout:shadow`
    ],
    mobileDrawer: 'w-[--vean-sidebar-width] bg-sidebar p-0',
    mobileOverlay: [
      // 移动端导航遮罩比模态遮罩更重：同一个 token，用修饰符覆盖浓度
      `fixed inset-0 z-base bg-mask/80`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0`
    ],
    mobile: 'flex flex-col w-full h-full',
    rail: [
      'absolute inset-y-0 z-20 flex w-[--sl-spacing] -translate-x-1/2 rtl:translate-x-1/2 transition-all ease-linear lt-sm:hidden',
      'after:absolute after:inset-y-0 after:start-1/2 after:content-empty after:w-[calc(var(--sl-spacing)/8)] hover:after:bg-sidebar-border'
    ],
    trigger: '',
    header: [
      'shrink-0 flex items-center h-[--vean-layout-header-height] transition-all-300',
      'group-data-[fixed-top=true]/layout:absolute z-[--vean-layout-header-z-index] top-0 inset-x-0'
    ],
    headerPlaceholder: 'shrink-0 h-[--vean-layout-header-height] overflow-hidden',
    tab: 'group-data-[fixed-top=true]/layout:absolute inset-x-0 top-[--vean-layout-header-height] shrink-0 h-[--vean-layout-tab-height] z-[--vean-layout-tab-z-index] transition-all-300',
    tabPlaceholder: 'shrink-0 h-[--vean-layout-tab-height] overflow-hidden',
    content: `relative grow bg-card group-data-[scroll-behavior=content]/layout:overflow-y-auto`,
    footer: [
      'shrink-0 h-[--vean-layout-footer-height] transition-all-300',
      'group-data-[fixed-footer=true]/layout:absolute z-[--vean-layout-footer-z-index] inset-x-0 bottom-0'
    ],
    footerPlaceholder: 'shrink-0 h-[--vean-layout-footer-height] overflow-hidden'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs [--sl-spacing:0.75rem]'
      },
      sm: {
        root: 'text-xs [--sl-spacing:0.875rem]'
      },
      md: {
        root: 'text-sm [--sl-spacing:1rem]'
      },
      lg: {
        root: 'text-base [--sl-spacing:1.25rem]'
      },
      xl: {
        root: 'text-lg [--sl-spacing:1.5rem]'
      },
      '2xl': {
        root: 'text-xl [--sl-spacing:1.75rem]'
      }
    },
    side: {
      left: {
        main: ['ms-[var(--sl-main-gap)]', 'me-[var(--sl-end-gap)]'],
        sidebarWrapper: 'start-0 border-e',
        rail: 'cursor-w-resize group-data-[state=collapsed]/layout:cursor-e-resize -end-[var(--sl-spacing)]',
        header: ['group-data-[fixed-top=true]/layout:ms-[var(--sl-header-gap)]', 'me-[var(--sl-end-gap)]'],
        tab: [
          'group-data-[full-content=false]/layout:group-data-[fixed-top=true]/layout:ms-[var(--sl-main-gap)]',
          'group-data-[full-content=false]/layout:group-data-[fixed-top=true]/layout:me-[var(--sl-end-gap)]'
        ],
        footer: [
          'group-data-[fixed-footer=true]/layout:ms-[var(--sl-footer-gap)]',
          'group-data-[fixed-footer=true]/layout:me-[var(--sl-end-gap)]'
        ]
      },
      right: {
        main: ['me-[var(--sl-main-gap)]', 'ms-[var(--sl-end-gap)]'],
        sidebarWrapper: 'end-0 border-s',
        rail: 'cursor-e-resize group-data-[state=collapsed]/layout:cursor-w-resize start-0',
        header: ['group-data-[fixed-top=true]/layout:me-[var(--sl-header-gap)]', 'ms-[var(--sl-end-gap)]'],
        tab: [
          'group-data-[full-content=false]/layout:group-data-[fixed-top=true]/layout:me-[var(--sl-main-gap)]',
          'group-data-[full-content=false]/layout:group-data-[fixed-top=true]/layout:ms-[var(--sl-end-gap)]'
        ],
        footer: [
          'group-data-[fixed-footer=true]/layout:me-[var(--sl-footer-gap)]',
          'group-data-[fixed-footer=true]/layout:ms-[var(--sl-end-gap)]'
        ]
      }
    },
    variant: {
      sidebar: {
        sidebarGapHandler: 'group-data-[collapsible=icon]/layout:w-[--vean-collapsed-sidebar-width]',
        sidebarWrapper: `group-data-[collapsible=icon]/layout:w-[--vean-collapsed-sidebar-width] group-data-[side=left]/layout:border-e group-data-[side=right]/layout:border-s`
      },
      floating: {
        root: [
          'data-[state=expanded]:[--sl-main-gap:calc(var(--vean-layout-start-gap)+var(--sl-spacing))]',
          'data-[state=expanded]:[--sl-footer-gap:calc(var(--vean-layout-footer-start-gap)+var(--sl-spacing))]',
          'data-[collapsible=icon]:[--sl-main-gap:calc(var(--vean-layout-start-gap)+var(--sl-spacing))]',
          'data-[collapsible=icon]:[--sl-footer-gap:calc(var(--vean-layout-footer-start-gap)+var(--sl-spacing))]',
          'data-[state=expanded]:data-[orientation=horizontal]:[--sl-header-gap:calc(var(--vean-layout-header-start-gap)+var(--sl-spacing))]',
          'data-[collapsible=icon]:data-[orientation=horizontal]:[--sl-header-gap:calc(var(--vean-layout-header-start-gap)+var(--sl-spacing))]',
          'data-[orientation=vertical]:data-[stretch-footer=true]:[--sl-footer-gap:0px]'
        ],
        sidebarGapHandler: `w-[calc(var(--vean-sidebar-width)+var(--sl-spacing))] group-data-[collapsible=icon]/layout:group-data-[state=collapsed]/layout:w-[calc(var(--vean-collapsed-sidebar-width)+var(--sl-spacing))]`,
        sidebarWrapper: `w-[calc(var(--vean-sidebar-width)+var(--sl-spacing))] p-[--sl-half-spacing] group-data-[collapsible=icon]/layout:group-data-[state=collapsed]/layout:w-[calc(var(--vean-collapsed-sidebar-width)+var(--sl-spacing))] border-e-0`
      },
      inset: {
        root: [
          'py-[--sl-half-spacing] bg-sidebar',
          // data-[variant=inset] 前缀用于保证特异性高于 base 上的默认值
          'data-[variant=inset]:[--sl-main-gap:calc(var(--vean-layout-start-gap)+var(--sl-spacing))]',
          'data-[variant=inset]:[--sl-footer-gap:calc(var(--vean-layout-footer-start-gap)+var(--sl-spacing))]',
          'data-[variant=inset]:data-[orientation=horizontal]:[--sl-header-gap:calc(var(--vean-layout-header-start-gap)+var(--sl-spacing))]',
          'data-[variant=inset]:data-[orientation=vertical]:[--sl-header-gap:var(--sl-half-spacing)]',
          'data-[variant=inset]:[--sl-end-gap:var(--sl-half-spacing)]',
          'data-[variant=inset]:data-[orientation=vertical]:data-[stretch-footer=true]:[--sl-footer-gap:var(--sl-half-spacing)]'
        ],
        sidebarGapHandler: `w-[calc(var(--vean-sidebar-width)+var(--sl-spacing))] group-data-[collapsible=icon]/layout:group-data-[state=collapsed]/layout:w-[calc(var(--vean-collapsed-sidebar-width)+var(--sl-spacing))]`,
        sidebarWrapper: `p-[--sl-half-spacing] w-[calc(var(--vean-sidebar-width)+var(--sl-spacing))] group-data-[collapsible=icon]/layout:group-data-[state=collapsed]/layout:w-[calc(var(--vean-collapsed-sidebar-width)+var(--sl-spacing))] border-e-0`,
        main: `rounded-xl shadow`,
        header: [
          `top-[--sl-half-spacing] rounded-t-xl`,
          `group-data-[orientation=vertical]/layout:border-0`,
          `group-data-[orientation=vertical]/layout:shadow group-data-[orientation=vertical]/layout:rounded-xl`
        ],
        tab: `top-[calc(var(--vean-layout-header-height)+var(--sl-half-spacing))]`,
        footer: [
          'bottom-[--sl-half-spacing] rounded-b-xl',
          `group-data-[orientation=vertical]/layout:shadow group-data-[orientation=vertical]/layout:rounded-xl`,
          `group-data-[orientation=vertical]/layout:group-data-[stretch-footer=true]/layout:bottom-[calc(var(--sl-half-spacing)-2px)]`
        ]
      }
    },
    collapsible: {
      offcanvas: {
        sidebarWrapper: 'group-data-[state=collapsed]/layout:opacity-0 group-data-[state=collapsed]/layout:z-0',
        rail: `translate-x-0 after:start-full hover:bg-sidebar`
      },
      icon: {}
    },
    fullContent: {
      true: {
        tab: ['fixed top-0 z-[--vean-layout-base-z-index] rounded-none', 'group-data-[fixed-top=true]/layout:fixed'],
        content: `fixed inset-0 z-[--vean-layout-base-z-index] group-data-[tab-visible=true]/layout:mt-[--vean-layout-tab-height] overflow-auto`
      }
    }
  },
  compoundVariants: [
    {
      side: 'left',
      collapsible: 'offcanvas',
      class: {
        rail: '-end-[--sl-half-spacing]'
      }
    },
    {
      side: 'right',
      collapsible: 'offcanvas',
      class: {
        rail: '-start-[--sl-half-spacing]'
      }
    },
    {
      side: 'left',
      variant: 'inset',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]/layout:end-0'
      }
    },
    {
      side: 'right',
      variant: 'inset',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]/layout:start-0'
      }
    },
    {
      side: 'left',
      variant: 'floating',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]/layout:end-[--sl-half-spacing]'
      }
    },
    {
      side: 'right',
      variant: 'floating',
      collapsible: 'offcanvas',
      class: {
        rail: 'group-data-[state=collapsed]/layout:start-[--sl-half-spacing]'
      }
    },
    {
      variant: 'inset',
      collapsible: 'offcanvas',
      class: {
        main: 'md:group-data-[state=collapsed]/layout:ms-[--sl-half-spacing]'
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
