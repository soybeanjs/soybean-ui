import { useContext, useUiContext } from '@soybeanjs/headless/composables';
import type { TreeMenuContextParams, TreeMenuOptionsContextParams, TreeMenuExtraUiSlot } from './types';

export const [provideTreeMenuContext, useTreeMenuContext] = useContext(
  'TreeMenu',
  (params: TreeMenuContextParams) => params
);

export const [provideTreeMenuOptionsContext, useTreeMenuOptionsContext] = useContext(
  'TreeMenuOptions',
  (params: TreeMenuOptionsContextParams) => params
);

export const [provideTreeMenuExtraUi, useTreeMenuExtraUi] = useUiContext<TreeMenuExtraUiSlot>('TreeMenuExtraUi');
