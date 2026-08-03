import type { MenuAccent, MenuColor } from './types';
import { COLOR_VARIABLES, MENU_VARIABLES } from './variables';

export const menuColorCss: Record<MenuColor, Record<string, string>> = {
  default: {
    [MENU_VARIABLES.bg]: `var(${COLOR_VARIABLES.popover})`,
    [MENU_VARIABLES.bgAlpha]: '1',
    [MENU_VARIABLES.dropBlur]: '0px',
    [MENU_VARIABLES.backdropSaturate]: '1'
  },
  'default-translucent': {
    [MENU_VARIABLES.bg]: `var(${COLOR_VARIABLES.popover})`,
    [MENU_VARIABLES.bgAlpha]: '0.7',
    [MENU_VARIABLES.dropBlur]: '40px',
    [MENU_VARIABLES.backdropSaturate]: '1.5'
  },
  inverted: {
    [MENU_VARIABLES.bg]: `var(${COLOR_VARIABLES.card})`,
    [MENU_VARIABLES.bgAlpha]: '1',
    [MENU_VARIABLES.dropBlur]: '0px',
    [MENU_VARIABLES.backdropSaturate]: '1'
  },
  'inverted-translucent': {
    [MENU_VARIABLES.bg]: `var(${COLOR_VARIABLES.card})`,
    [MENU_VARIABLES.bgAlpha]: '0.7',
    [MENU_VARIABLES.dropBlur]: '40px',
    [MENU_VARIABLES.backdropSaturate]: '1.5'
  }
};

export const menuAccentCss: Record<MenuAccent, Record<string, string>> = {
  subtle: {
    [MENU_VARIABLES.itemAccentBackground]: `hsl(var(${COLOR_VARIABLES.foreground}) / 0.05)`,
    [MENU_VARIABLES.itemAccentForeground]: `var(${COLOR_VARIABLES.foreground})`
  },
  bold: {
    [MENU_VARIABLES.itemAccentBackground]: `hsl(var(${COLOR_VARIABLES.primary}) / 0.1)`,
    [MENU_VARIABLES.itemAccentForeground]: `var(${COLOR_VARIABLES.primary})`
  }
};
