import { useContext } from '@soybeanjs/headless/composables';
import type { TreeMenuContextParams, TreeMenuExtraThemeContextParams } from './types';

export const [provideTreeMenuContext, useTreeMenuContext] = useContext(
  'TreeMenu',
  (params: TreeMenuContextParams) => params
);

export const [provideTreeMenuExtraThemeContext, useTreeMenuExtraThemeContext] = useContext(
  'TreeMenuExtraTheme',
  (params: TreeMenuExtraThemeContextParams) => params
);
