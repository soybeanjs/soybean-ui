import { useContext, useUiContext } from '../../composables';
import type { ColorPickerRootContext, ColorPickerUiSlot } from './types';

export const [provideColorPickerRootContext, useColorPickerRootContext] =
  useContext<ColorPickerRootContext>('ColorPickerRootContext');

export const [provideColorPickerUi, useColorPickerUi] = useUiContext<ColorPickerUiSlot>('ColorPickerUi');
