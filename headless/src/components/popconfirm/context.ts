import { useContext, useUiContext } from '../../composables';
import { providePopoverUi } from '../popover/context';
import type { PopconfirmContext, PopconfirmUiSlot } from './types';

export const [providePopconfirmContext, usePopconfirmContext] = useContext<PopconfirmContext>('Popconfirm');

export const [providePopconfirmUi, usePopconfirmUi] = useUiContext<PopconfirmUiSlot>('Popconfirm', ui => {
  providePopoverUi(ui);

  return ui;
});
