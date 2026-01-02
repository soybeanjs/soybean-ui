import { useContext, useUiContext } from '@soybeanjs/headless/composables';
import type { TreeMenuContextParams, TreeMenuExtraUiSlot } from './types';

export const [provideTreeMenuContext, useTreeMenuContext] = useContext(
  'TreeMenu',
  (params: TreeMenuContextParams) => params
);

export const [provideTreeMenuExtraUi, useTreeMenuExtraUi] = useUiContext<TreeMenuExtraUiSlot>('TreeMenuExtraUi');
