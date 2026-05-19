import { useContext, useUiContext } from '../../composables';
import type { WatermarkRootContext, WatermarkUiSlot } from './types';

export const [provideWatermarkRootContext, useWatermarkRootContext] = useContext(
  'WatermarkRoot',
  (params: WatermarkRootContext) => params
);

export const [provideWatermarkUi, useWatermarkUi] = useUiContext<WatermarkUiSlot>('WatermarkUi');
