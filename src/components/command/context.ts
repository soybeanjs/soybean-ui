import { useUiContext } from '@soybeanjs/headless/composables';
import type { CommandExtraUiSlot } from './types';

export const [provideCommandExtraUi, useCommandExtraUi] = useUiContext<CommandExtraUiSlot>('CommandExtraUi');
