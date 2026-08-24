import { providePopperV2Ui } from '../popper-v2/context';
import { useUiContext } from '../../composables';
import type { PopoverUiSlot } from './types';

export const [providePopoverUi, usePopoverUi] = useUiContext<PopoverUiSlot>('Popover', ui => {
  providePopperV2Ui(ui);

  return ui;
});
