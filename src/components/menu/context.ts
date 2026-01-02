import { useUiContext } from '@soybeanjs/headless/composables';
import type { MenuExtraUiSlot } from './types';

export const [provideMenuExtraUi, useMenuExtraUi] = useUiContext<MenuExtraUiSlot>('MenuExtraUi');
