import { createContext } from '../../composables';
import type { ProgressRootContext } from './types';

export const [provideProgressRootContext, injectProgressRootContext] =
  createContext<ProgressRootContext>('ProgressRoot');
