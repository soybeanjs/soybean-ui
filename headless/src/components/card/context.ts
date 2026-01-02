import { useUiContext } from '../../composables';
import type { CardUiSlot } from './types';

export const [provideCardUi, useCardUi] = useUiContext<CardUiSlot>('CardUi');
