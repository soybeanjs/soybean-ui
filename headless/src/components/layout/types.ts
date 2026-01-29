import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { HorizontalSide, PropsToContext, UiClass } from '../../types';
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
   * The height of the header. (px)
   * @default 56
   */
  headerHeight?: number;
  /**
   * The height of the tab. (px)
   * @default 44
   */
  tabHeight?: number;
  /**
   * The height of the footer. (px)
   * @default 48
   */
  footerHeight?: number;
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

export interface LayoutRootContextParams extends PropsToContext<
  LayoutRootProps,
  'sidebarWidth' | 'collapsedSidebarWidth' | 'isMobile'
> {
  open: ShallowRef<boolean | undefined>;
  mobileOpen: ShallowRef<boolean>;
  /**
   * The width of the sidebar in the mobile view. (rem)
   */
  mobileSidebarWidth: ComputedRef<number>;
  sidebarState: ComputedRef<LayoutSidebarState>;
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
