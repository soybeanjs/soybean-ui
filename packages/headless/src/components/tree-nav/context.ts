import { provideMenuUi } from '../menu/context';
import { useUiContext } from '../../composables';
import type { TreeNavUiSlot } from './types';

export const [provideTreeNavUi, useTreeNavUi] = useUiContext<TreeNavUiSlot>('TreeNavUi', ui => {
  provideMenuUi(ui);

  return ui;
});
