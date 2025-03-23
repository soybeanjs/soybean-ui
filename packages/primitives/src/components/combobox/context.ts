import type { AcceptableValue } from '../../types';
import { createContext } from '../../composables';
import { injectListboxItemContext as injectComboboxItemContext } from '../listbox/context';
import type { ComboboxContentContext, ComboboxGroupContext, ComboboxRootContext } from './types';

export const [provideComboboxRootContext, injectComboboxRootContext] =
  createContext<ComboboxRootContext<AcceptableValue>>('ComboboxRoot');

export const [provideComboboxGroupContext, injectComboboxGroupContext] =
  createContext<ComboboxGroupContext>('ComboboxGroup');

export const [provideComboboxContentContext, injectComboboxContentContext] =
  createContext<ComboboxContentContext>('ComboboxContent');

export { injectComboboxItemContext };
