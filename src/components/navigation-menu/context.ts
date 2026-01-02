import { useUiContext } from '@soybeanjs/headless/composables';
import type { NavigationMenuExtraUiSlot } from './types';

export const [provideNavigationMenuExtraUi, useNavigationMenuExtraUi] =
  useUiContext<NavigationMenuExtraUiSlot>('NavigationMenuExtraUi');
