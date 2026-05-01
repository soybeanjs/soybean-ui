import { useContext, useUiContext } from '../../composables';
import type { DateRangePickerRootContext, DateRangePickerUiSlot } from './types';

export const [provideDateRangePickerRootContext, useDateRangePickerRootContext] =
  useContext<DateRangePickerRootContext>('DateRangePickerRoot');
export const [provideDateRangePickerUi, useDateRangePickerUi] =
  useUiContext<DateRangePickerUiSlot>('DateRangePickerUi');
