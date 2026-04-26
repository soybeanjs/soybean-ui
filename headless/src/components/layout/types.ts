import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DataOrientation, HorizontalSide, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export type LayoutVariant = 'sidebar' | 'floating' | 'inset';

export type LayoutSide = HorizontalSide;

export type LayoutCollapsible = 'offcanvas' | 'icon';

export type LayoutSidebarState = 'expanded' | 'collapsed';

export interface LayoutRootProps extends /* @vue-ignore */ HTMLAttributes {
  /** The controlled open state of the layout. Can be bound with `v-model`. */
  open?: boolean;
  /** The open state of the layout when it is initially rendered.
   *
   * Use when you do not need to control its open state.
   */
  defaultOpen?: boolean;
  /** The side of the layout. */
  side?: LayoutSide;
  /** The variant of the layout. */
  variant?: LayoutVariant;
  /** The collapsible state of the layout. */
  collapsible?: LayoutCollapsible;
  /**
   * whether to show the sidebar.
   *
   * @default true
   */
  sidebarVisible?: boolean;
  /**
   * The width of the sidebar. (px)
   *
   * @default 240
   */
  sidebarWidth?: number;
  /**
   * The width of the sidebar when it is collapsed. (px)
   *
   * @default 50
   */
  collapsedSidebarWidth?: number;
  /**
   * Whether the layout is in mobile view.
   *
   * @default false
   */
  isMobile?: boolean;
  /**
   * The width of the sidebar in the mobile view. (px)
   *
   * @default 240
   */
  mobileSidebarWidth?: number;
  /**
   * whether to show the header.
   *
   * @default true
   */
  headerVisible?: boolean;
  /**
   * The height of the header. (px)
   * @default 56
   */
  headerHeight?: number;
  /**
   * whether to show the tab.
   *
   * @default true
   */
  tabVisible?: boolean;
  /**
   * The height of the tab. (px)
   * @default 44
   */
  tabHeight?: number;
  /**
   * whether to show the footer.
   *
   * @default true
   */
  footerVisible?: boolean;
  /**
   * The height of the footer. (px)
   * @default 48
   */
  footerHeight?: number;
  /**
   * whether the content takes the full height of the layout (include).
   *
   * @default false
   */
  fullContent?: boolean;
  /**
   * The function to convert pixels to rem.
   *
   * @param px - The width in pixels
   * @default (px: number) => px / 16 (16 is the base font size)
   * @returns The width in rem
   */
  pxToRem?: (px: number) => number;
}

export type LayoutRootEmits = {
  'update:open': [open: boolean];
};

export interface LayoutSidebarProps extends /* @vue-ignore */ HTMLAttributes {}

export interface LayoutRailProps extends /* @vue-ignore */ HTMLAttributes {}

export interface LayoutMainProps extends /* @vue-ignore */ HTMLAttributes {}

export interface LayoutHeaderProps extends /* @vue-ignore */ HTMLAttributes {}

export interface LayoutTabProps extends /* @vue-ignore */ HTMLAttributes {}

export interface LayoutContentProps extends /* @vue-ignore */ HTMLAttributes {}

export interface LayoutFooterProps extends /* @vue-ignore */ HTMLAttributes {}

export interface LayoutTriggerProps extends PrimitiveProps, /* @vue-ignore */ HTMLAttributes {}

export interface LayoutMobileProps extends /* @vue-ignore */ HTMLAttributes {}

interface LayoutOthersProps {
  sidebarProps?: LayoutSidebarProps;
  railProps?: LayoutRailProps;
  mainProps?: LayoutMainProps;
  headerProps?: LayoutHeaderProps;
  tabProps?: LayoutTabProps;
  contentProps?: LayoutContentProps;
  footerProps?: LayoutFooterProps;
  mobileProps?: LayoutMobileProps;
}

export interface LayoutCompactProps extends LayoutRootProps, LayoutOthersProps {}

export type LayoutCompactEmits = LayoutRootEmits;

export type LayoutCompactSlots = {
  default?: () => any;
  sidebar?: (props: { open: boolean | undefined; collapsedSidebarWidth: number }) => any;
  header?: () => any;
  tab?: () => any;
  content?: () => any;
  footer?: () => any;
};

export type LayoutClassicScrollBehavior = 'wrapper' | 'content';

export interface LayoutClassicRootProps extends Omit<LayoutRootProps, 'variant' | 'collapsible'> {
  orientation?: DataOrientation;
  scrollBehavior?: LayoutClassicScrollBehavior;
  scrollId?: string;
  /**
   * The base z-index of the layout. The z-index of the sidebar, header, tab, footer, and their fixed versions will be calculated based on this value.
   *
   * @default 50
   */
  baseZIndex?: number;
  /**
   * Whether the header and tab are fixed to the top of the layout when the orientation is vertical. If true, the header and tab will be fixed to the top of the layout when the orientation is vertical, and will scroll with the content when the orientation is horizontal.
   *
   * @default true
   */
  fixedTop?: boolean;
  /**
   * whether the content takes the full height of the layout (include).
   *
   * @default false
   */
  fullContent?: boolean;
  /**
   * whether to show the sidebar.
   *
   * @default true
   */
  sidebarVisible?: boolean;
  /**
   * whether to show the header.
   *
   * @default true
   */
  headerVisible?: boolean;
  /**
   * whether to show the tab.
   *
   * @default true
   */
  tabVisible?: boolean;
  /**
   * whether to show the footer.
   *
   * @default true
   */
  footerVisible?: boolean;
  /**
   * Whether footer is fixed
   *
   * @default true
   */
  fixedFooter?: boolean;
  /**
   * Whether the footer should stretch to the full width of the layout or the content when layout orientation is vertical.
   *
   * @default true
   */
  stretchFooter?: boolean;
}

export type LayoutClassicRootEmits = LayoutRootEmits;

export interface LayoutClassicCompactProps extends LayoutClassicRootProps, LayoutOthersProps {}

export type LayoutClassicCompactEmits = LayoutClassicRootEmits;

export type LayoutClassicCompactSlots = LayoutCompactSlots;

export interface LayoutRootContextParams extends PropsToContext<
  LayoutRootProps,
  | 'sidebarWidth'
  | 'collapsedSidebarWidth'
  | 'isMobile'
  | 'sidebarVisible'
  | 'headerVisible'
  | 'tabVisible'
  | 'footerVisible'
> {
  open: ShallowRef<boolean | undefined>;
  mobileOpen: ShallowRef<boolean>;
  /**
   * The width of the sidebar in the mobile view. (rem)
   */
  mobileSidebarWidth: ComputedRef<number>;
}

export interface LayoutCompactRootContextParams extends LayoutRootContextParams {
  fixedTop: ComputedRef<boolean>;
  fixedFooter: ComputedRef<boolean>;
}

export type LayoutUiSlot =
  | 'root'
  | 'sidebar'
  | 'sidebarRoot'
  | 'sidebarWrapper'
  | 'sidebarGapHandler'
  | 'main'
  | 'header'
  | 'tab'
  | 'content'
  | 'footer'
  | 'rail'
  | 'trigger'
  | 'mobile'
  | 'mobileDrawer'
  | 'mobileOverlay';

export type LayoutUi = UiClass<LayoutUiSlot>;

export type LayoutClassicUiSlot = LayoutUiSlot | 'headerPlaceholder' | 'tabPlaceholder' | 'footerPlaceholder';

export type LayoutClassicUi = UiClass<LayoutClassicUiSlot>;
