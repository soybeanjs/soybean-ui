import { useContext } from '@soybeanjs/headless/composables';
import type { MenuExtraThemeContextParams } from './types';

export const [provideMenuExtraThemeContext, useMenuExtraThemeContext] = useContext(
  'MenuExtraTheme',
  (params: MenuExtraThemeContextParams) => params
);
