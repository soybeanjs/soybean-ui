import { useContext } from '@soybeanjs/headless/composables';
import type { NavigationMenuExtraThemeContextParams } from './types';

export const [provideNavigationMenuExtraThemeContext, useNavigationMenuExtraThemeContext] = useContext(
  'NavigationMenuExtraTheme',
  (params: NavigationMenuExtraThemeContextParams) => params
);
