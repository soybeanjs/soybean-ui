import { useContext, useUiContext } from '../../composables';
import type { MonthPickerRootContext, MonthPickerUiSlot } from './types';

export const [provideMonthPickerRootContext, useMonthPickerRootContext] =
  useContext<MonthPickerRootContext>('MonthPickerRoot');
export const [provideMonthPickerUi, useMonthPickerUi] = useUiContext<MonthPickerUiSlot>('MonthPickerUi');
