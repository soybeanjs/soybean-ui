import { useUiContext } from '../../composables';
import { provideCollapsibleUi } from '../collapsible/context';
import type { CardUiSlot } from './types';

export const [provideCardUi, useCardUi] = useUiContext<CardUiSlot>('CardUi', ui => {
  provideCollapsibleUi(ui);

  return ui;
});
