import { useContext, useUiContext } from '@soybeanjs/headless/composables';
import type { MenuExtraUiSlot, MenuOptionsContext } from './types';

export const [provideMenuOptionsContext, useMenuOptionsContext] = useContext<MenuOptionsContext>('MenuOptionsContext');

export const [provideMenuExtraUi, useMenuExtraUi] = useUiContext<MenuExtraUiSlot>('MenuExtraUi');
