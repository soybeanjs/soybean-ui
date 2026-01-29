import type {
  ClassValue,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutMainProps,
  LayoutContentProps,
  LayoutMobileProps,
  LayoutRailProps,
  LayoutRootEmits,
  LayoutRootProps,
  LayoutSidebarProps,
  LayoutTabProps,
  LayoutUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface LayoutProps extends LayoutRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<LayoutUi>;
  fullContent?: boolean;
  sidebarProps?: LayoutSidebarProps;
  railProps?: LayoutRailProps;
  mainProps?: LayoutMainProps;
  headerProps?: LayoutHeaderProps;
  tabProps?: LayoutTabProps;
  contentProps?: LayoutContentProps;
  footerProps?: LayoutFooterProps;
  mobileProps?: LayoutMobileProps;
}

export type LayoutEmits = LayoutRootEmits;
