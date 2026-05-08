import { useUiContext } from '../../composables';
import { providePopoverUi } from '../popover/context';
import { provideDateFieldUi } from '../date-field/context';
import type { DatePickerUiSlot } from './types';

export const [provideDatePickerUi, useDatePickerUi] = useUiContext<DatePickerUiSlot>('DatePickerUi', ui => {
  providePopoverUi(ui);
  provideDateFieldUi(ui);

  return ui;
});
