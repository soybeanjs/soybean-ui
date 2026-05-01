import { useContext, useUiContext } from '../../composables';
import type { TimeRangePickerRootContext, TimeRangePickerUiSlot } from './types';

export const [provideTimeRangePickerRootContext, useTimeRangePickerRootContext] =
  useContext<TimeRangePickerRootContext>('TimeRangePickerRoot');
export const [provideTimeRangePickerUi, useTimeRangePickerUi] =
  useUiContext<TimeRangePickerUiSlot>('TimeRangePickerUi');
