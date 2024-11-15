import type { DefaultTheme } from 'vitepress';
import type { DropdownMenuItemOption, DropdownMenuOptionType } from 'soybean-ui';

export interface CustomNavItem extends DropdownMenuItemOption {
  link?: string;
}

export interface CustomThemeConfig extends Omit<DefaultTheme.Config, 'nav'> {
  nav: DropdownMenuOptionType<CustomNavItem>[];
}
