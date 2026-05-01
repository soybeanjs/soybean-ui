import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DataOrientation, HorizontalSide, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Type information for the layout variant component.
 */
export type LayoutVariant = 'sidebar' | 'floating' | 'inset';

/**
 * Type information for the layout side component.
 */
export type LayoutSide = HorizontalSide;

/**
 * Type information for the layout collapsible component.
 */
export type LayoutCollapsible = 'offcanvas' | 'icon';

/**
 * State values for the layout component.
 */
export type LayoutSidebarState = 'expanded' | 'collapsed';

/**
 * Props for the layout root component.
 */
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

/**
 * Emits for the layout root component.
 */
export type LayoutRootEmits = {
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};

/**
 * Props for the layout sidebar component.
 */
export interface LayoutSidebarProps extends /* @vue-ignore */ HTMLAttributes {}

/**
 * Props for the layout rail component.
 */
export interface LayoutRailProps extends /* @vue-ignore */ HTMLAttributes {}

/**
 * Props for the layout main component.
 */
export interface LayoutMainProps extends /* @vue-ignore */ HTMLAttributes {}

/**
 * Props for the layout header component.
 */
export interface LayoutHeaderProps extends /* @vue-ignore */ HTMLAttributes {}

/**
 * Props for the layout tab component.
 */
export interface LayoutTabProps extends /* @vue-ignore */ HTMLAttributes {}

/**
 * Props for the layout content component.
 */
export interface LayoutContentProps extends /* @vue-ignore */ HTMLAttributes {}

/**
 * Props for the layout footer component.
 */
export interface LayoutFooterProps extends /* @vue-ignore */ HTMLAttributes {}

/**
 * Props for the layout trigger component.
 */
export interface LayoutTriggerProps extends PrimitiveProps, /* @vue-ignore */ HTMLAttributes {}

/**
 * Props for the layout mobile component.
 */
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

/**
 * Props for the layout compact component.
 */
export interface LayoutCompactProps extends LayoutRootProps, LayoutOthersProps {}

/**
 * Emits for the layout compact component.
 */
export type LayoutCompactEmits = LayoutRootEmits;

/**
 * Slots for the layout compact component.
 */
export type LayoutCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: () => any;
  /**
   * Custom content for the sidebar slot.
   */
  sidebar?: (props: { open: boolean | undefined; collapsedSidebarWidth: number }) => any;
  /**
   * Custom content for the header slot.
   */
  header?: () => any;
  /**
   * Custom content for the tab slot.
   */
  tab?: () => any;
  /**
   * Custom content for the content slot.
   */
  content?: () => any;
  /**
   * Custom content for the footer slot.
   */
  footer?: () => any;
};

/**
 * Type information for the layout classic scroll behavior component.
 */
export type LayoutClassicScrollBehavior = 'wrapper' | 'content';

/**
 * Props for the layout classic root component.
 */
export interface LayoutClassicRootProps extends Omit<LayoutRootProps, 'variant' | 'collapsible'> {
  /**
   * Orientation of the component.
   */
  orientation?: DataOrientation;
  /**
   * Scroll behavior.
   */
  scrollBehavior?: LayoutClassicScrollBehavior;
  /**
   * Scroll id.
   */
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

/**
 * Emits for the layout classic root component.
 */
export type LayoutClassicRootEmits = LayoutRootEmits;

/**
 * Props for the layout classic compact component.
 */
export interface LayoutClassicCompactProps extends LayoutClassicRootProps, LayoutOthersProps {}

/**
 * Emits for the layout classic compact component.
 */
export type LayoutClassicCompactEmits = LayoutClassicRootEmits;

/**
 * Slots for the layout classic compact component.
 */
export type LayoutClassicCompactSlots = LayoutCompactSlots;

/**
 * Parameters used to create the layout root context.
 */
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
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
  /**
   * Whether mobile open.
   */
  mobileOpen: ShallowRef<boolean>;
  /**
   * The width of the sidebar in the mobile view. (rem)
   */
  mobileSidebarWidth: ComputedRef<number>;
}

/**
 * Parameters used to create the layout compact root context.
 */
export interface LayoutCompactRootContextParams extends LayoutRootContextParams {
  /**
   * Whether fixed top.
   */
  fixedTop: ComputedRef<boolean>;
  /**
   * Whether fixed footer.
   */
  fixedFooter: ComputedRef<boolean>;
}

/**
 * Available UI slots for the layout component.
 */
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

/**
 * UI class overrides for the layout component.
 */
export type LayoutUi = UiClass<LayoutUiSlot>;

/**
 * Available UI slots for the layout component.
 */
export type LayoutClassicUiSlot = LayoutUiSlot | 'headerPlaceholder' | 'tabPlaceholder' | 'footerPlaceholder';

/**
 * UI class overrides for the layout component.
 */
export type LayoutClassicUi = UiClass<LayoutClassicUiSlot>;
