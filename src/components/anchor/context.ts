import { useUiContext } from '@soybeanjs/headless/composables';
import type { AnchorExtraUiSlot } from './types';

export const [provideExtraAnchorUi, useExtraAnchorUi] = useUiContext<AnchorExtraUiSlot>('AnchorUi');
