import type { DefaultTheme } from 'vitepress';
import type { BadgeProps, MenuOptionData } from 'soy-ui';

export interface NavItem extends MenuOptionData {}

export type SidebarBadgeProps = Pick<BadgeProps, 'color' | 'variant' | 'shape' | 'content'>;

export interface SidebarItem extends DefaultTheme.SidebarItem {
  icon?: string;
  badge?: string | SidebarBadgeProps;
  items?: SidebarItem[];
}

export interface CustomThemeConfig extends Omit<DefaultTheme.Config, 'nav' | 'sidebar'> {
  nav: NavItem[];
  sidebar: SidebarItem[];
}
