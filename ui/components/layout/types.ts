import type {
  ClassValue,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutMainProps,
  LayoutMobileProps,
  LayoutRailProps,
  LayoutRootEmits,
  LayoutRootProps,
  LayoutSidebarProps,
  LayoutTabProps,
  LayoutThemeSlot
} from '@headless';
import type { ThemeSize } from '@theme';

export type LayoutUi = Partial<Record<LayoutThemeSlot, ClassValue>>;

export interface LayoutProps extends LayoutRootProps {
  size?: ThemeSize;
  ui?: LayoutUi;
  sidebarProps?: LayoutSidebarProps;
  headerProps?: LayoutHeaderProps;
  mainProps?: LayoutMainProps;
  tabProps?: LayoutTabProps;
  footerProps?: LayoutFooterProps;
  railProps?: LayoutRailProps;
  mobileProps?: LayoutMobileProps;
}

export type LayoutEmits = LayoutRootEmits;

export type * from '@headless/components/layout';
