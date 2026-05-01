import { useContext, useUiContext } from '../../composables';
import type { YearRangePickerRootContext, YearRangePickerUiSlot } from './types';

export const [provideYearRangePickerRootContext, useYearRangePickerRootContext] =
  useContext<YearRangePickerRootContext>('YearRangePickerRoot');
export const [provideYearRangePickerUi, useYearRangePickerUi] =
  useUiContext<YearRangePickerUiSlot>('YearRangePickerUi');
