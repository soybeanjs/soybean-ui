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
  LayoutUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface LayoutProps extends LayoutRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<LayoutUi>;
  sidebarProps?: LayoutSidebarProps;
  headerProps?: LayoutHeaderProps;
  mainProps?: LayoutMainProps;
  tabProps?: LayoutTabProps;
  footerProps?: LayoutFooterProps;
  railProps?: LayoutRailProps;
  mobileProps?: LayoutMobileProps;
}

export type LayoutEmits = LayoutRootEmits;
