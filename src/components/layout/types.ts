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
  /**
   * whether the content takes the full height of the layout (include).
   *
   * @default false
   */
  fullContent?: boolean;
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
