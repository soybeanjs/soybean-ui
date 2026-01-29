import { useContext, useUiContext } from '@soybeanjs/headless/composables';
import type { MenuExtraUiSlot, MenuOptionsContextParams } from './types';

export const [provideMenuOptionsContext, useMenuOptionsContext] = useContext(
  'MenuOptionsContext',
  (params: MenuOptionsContextParams) => params
);

export const [provideMenuExtraUi, useMenuExtraUi] = useUiContext<MenuExtraUiSlot>('MenuExtraUi');
