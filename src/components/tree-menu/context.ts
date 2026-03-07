import { useContext, useUiContext } from '@soybeanjs/headless/composables';
import type { TreeMenuContext, TreeMenuOptionsContext, TreeMenuExtraUiSlot } from './types';

export const [provideTreeMenuContext, useTreeMenuContext] = useContext<TreeMenuContext>('TreeMenu');

export const [provideTreeMenuOptionsContext, useTreeMenuOptionsContext] =
  useContext<TreeMenuOptionsContext>('TreeMenuOptions');

export const [provideTreeMenuExtraUi, useTreeMenuExtraUi] = useUiContext<TreeMenuExtraUiSlot>('TreeMenuExtraUi');
