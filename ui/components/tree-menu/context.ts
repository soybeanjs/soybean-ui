import { useContext } from '@headless/composables';
import type { TreeMenuContextParams, TreeMenuThemeContextParams } from './types';

export const [provideTreeMenuContext, useTreeMenuContext] = useContext(
  'TreeMenu',
  (params: TreeMenuContextParams) => params
);

export const [provideTreeMenuThemeContext, useTreeMenuThemeContext] = useContext(
  'TreeMenuTheme',
  (params: TreeMenuThemeContextParams) => params
);
