import { createContext } from '../../composables';
import type { RadioGroupItemContext, RadioGroupRootContext } from './types';

export const [provideRadioGroupRootContext, injectRadioGroupRootContext] =
  createContext<RadioGroupRootContext>('RadioGroupRoot');

export const [provideRadioGroupItemContext, injectRadioGroupItemContext] =
  createContext<RadioGroupItemContext>('RadioGroupItem');
