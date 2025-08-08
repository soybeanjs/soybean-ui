import { useContext } from '@headless/composables';
import type { MenuExtraThemeContextParams } from './types';

export const [provideMenuExtraThemeContext, useMenuExtraThemeContext] = useContext(
  'MenuExtraTheme',
  (params: MenuExtraThemeContextParams) => params
);
