import { provideCollapsibleUi } from '../collapsible/context';
import { useUiContext } from '../../composables';
import type { CardUiSlot } from './types';

export const [provideCardUi, useCardUi] = useUiContext<CardUiSlot>('CardUi', ui => {
  provideCollapsibleUi(ui);

  return ui;
});
