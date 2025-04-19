import type { ComputedRef, Ref } from 'vue';
import type { ClassValue, ClassValueProp } from '@soybean-ui/primitives';
import type {
  LayoutCollapsible,
  LayoutSide,
  LayoutSlots,
  LayoutVariant,
  SheetSide,
  ThemeSize
} from '@soybean-ui/variants';

export type SidebarState = 'expanded' | 'collapsed';

export interface LayoutContext {
  /** Whether the layout is on mobile. */
  isMobile: ComputedRef<boolean>;
  /** Whether the sidebar is open on mobile. */
  openMobile: Ref<boolean>;
  /** Callback when the sidebar is opened or closed on mobile. */
  onOpenMobileChange: (open: boolean) => void;
  /** The state of the sidebar. */
  state: ComputedRef<SidebarState>;
  /** Whether the sidebar is open. */
  open: Ref<boolean>;
  /** Callback when the sidebar is opened or closed. */
  onOpenChange: (open: boolean) => void;
  /** The width of the sidebar. */
  sidebarWidth?: ComputedRef<number>;
  /** The width of the sidebar when it's collapsed. */
  collapsedSidebarWidth?: ComputedRef<number>;
  /** Toggle the sidebar. */
  toggleSidebar: () => void;
}

export interface LayoutRootProps extends ClassValueProp {
  /** The size of the layout. */
  size?: ThemeSize;
  /** The variant of the layout. */
  variant?: LayoutVariant;
  /** The side of the layout. */
  side?: LayoutSide;
  /** Whether the sidebar is collapsible. */
  collapsible?: LayoutCollapsible;
  /** Whether the sidebar is open. */
  open?: boolean;
  /** The default open state of the sidebar. */
  defaultOpen?: boolean;
  /** The width of the sidebar. */
  sidebarWidth?: number;
  /** The width of the sidebar when it's collapsed. */
  collapsedSidebarWidth?: number;
}

export type LayoutRootEmits = {
  (e: 'update:open', open: boolean): void;
};

type LayoutUi = Partial<Record<LayoutSlots, ClassValue>>;

export interface LayoutMobileProps extends ClassValueProp {
  rootClass?: ClassValue;
  side?: SheetSide;
}

export interface LayoutTriggerProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface LayoutMainProps extends ClassValueProp {
  variant?: LayoutVariant;
  collapsible?: LayoutCollapsible;
}

export interface LayoutHeaderProps extends ClassValueProp {}

export interface LayoutSidebarProps extends ClassValueProp {
  size?: ThemeSize;
  ui?: LayoutUi;
  side?: LayoutSide;
  variant?: LayoutVariant;
  collapsible?: LayoutCollapsible;
}

export interface LayoutRailProps extends ClassValueProp {
  side?: LayoutSide;
  variant?: LayoutVariant;
  collapsible?: LayoutCollapsible;
}

export interface LayoutProps extends LayoutRootProps, LayoutSidebarProps {}

export type LayoutEmits = LayoutRootEmits;

export type { LayoutVariant, LayoutCollapsible, LayoutSide };
