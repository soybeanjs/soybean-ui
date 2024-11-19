import { createContext } from '../../composables';
import type { ToggleGroupRootContext } from './types';

export const [provideToggleGroupRootContext, injectToggleGroupRootContext] =
  createContext<ToggleGroupRootContext>('ToggleGroupRoot');
