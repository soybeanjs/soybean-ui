import { createContext } from '../../composables';
import type { SliderOrientation, SliderRootContext } from './types';

export const [provideSliderRootContext, injectSliderRootContext] = createContext<SliderRootContext>('SliderRoot');

export const [provideSliderOrientationContext, injectSliderOrientationContext] =
  createContext<SliderOrientation>('SliderOrientation');
