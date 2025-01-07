import type { DefaultTheme } from 'vitepress';
import type { DropdownMenuItemOption, DropdownMenuOptionType } from 'soy-ui';

export interface NavItem extends DropdownMenuItemOption {
  link?: string;
}

export interface SidebarItem extends DefaultTheme.SidebarItem {
  icon?: string;
}

export interface CustomThemeConfig extends Omit<DefaultTheme.Config, 'nav' | 'sidebar'> {
  nav: DropdownMenuOptionType<NavItem>[];
  sidebar: SidebarItem[];
}
