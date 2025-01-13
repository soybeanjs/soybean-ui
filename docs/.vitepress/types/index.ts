import type { DefaultTheme } from 'vitepress';
import type { MenuOptionData } from 'soy-ui';

export interface NavItem extends MenuOptionData {}

export interface SidebarItem extends DefaultTheme.SidebarItem {
  icon?: string;
}

export interface CustomThemeConfig extends Omit<DefaultTheme.Config, 'nav' | 'sidebar'> {
  nav: NavItem[];
  sidebar: SidebarItem[];
}
