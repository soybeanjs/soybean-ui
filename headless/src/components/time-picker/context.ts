import { useContext, useUiContext } from '../../composables';
import type { TimePickerRootContext, TimePickerUiSlot } from './types';

export const [provideTimePickerRootContext, useTimePickerRootContext] =
  useContext<TimePickerRootContext>('TimePickerRoot');
export const [provideTimePickerUi, useTimePickerUi] = useUiContext<TimePickerUiSlot>('TimePickerUi');
