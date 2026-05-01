import { useContext, useUiContext } from '../../composables';
import type { MonthRangePickerRootContext, MonthRangePickerUiSlot } from './types';

export const [provideMonthRangePickerRootContext, useMonthRangePickerRootContext] =
  useContext<MonthRangePickerRootContext>('MonthRangePickerRoot');
export const [provideMonthRangePickerUi, useMonthRangePickerUi] =
  useUiContext<MonthRangePickerUiSlot>('MonthRangePickerUi');
