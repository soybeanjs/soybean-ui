import { useUiContext } from '../../composables';
import { providePopoverUi } from '../popover/context';
import type { PopconfirmUiSlot } from './types';

export const [providePopconfirmUi, usePopconfirmUi] = useUiContext<PopconfirmUiSlot>('Popconfirm', ui => {
  providePopoverUi(ui);

  return ui;
});
