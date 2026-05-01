import { useContext, useUiContext } from '../../composables';
import type { DatePickerRootContext, DatePickerUiSlot } from './types';

export const [provideDatePickerRootContext, useDatePickerRootContext] =
  useContext<DatePickerRootContext>('DatePickerRoot');
export const [provideDatePickerUi, useDatePickerUi] = useUiContext<DatePickerUiSlot>('DatePickerUi');
