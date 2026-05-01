import { useContext, useUiContext } from '../../composables';
import type { YearPickerRootContext, YearPickerUiSlot } from './types';

export const [provideYearPickerRootContext, useYearPickerRootContext] =
  useContext<YearPickerRootContext>('YearPickerRoot');
export const [provideYearPickerUi, useYearPickerUi] = useUiContext<YearPickerUiSlot>('YearPickerUi');
