import type { AcceptableValue } from '../../types';
import { createContext } from '../../composables';
import type { ComboboxContentContext, ComboboxGroupContext, ComboboxItemContext, ComboboxRootContext } from './types';

export const [provideComboboxRootContext, injectComboboxRootContext] =
  createContext<ComboboxRootContext<AcceptableValue>>('ComboboxRoot');

export const [provideComboboxGroupContext, injectComboboxGroupContext] =
  createContext<ComboboxGroupContext>('ComboboxGroup');

export const [provideComboboxItemContext, injectComboboxItemContext] =
  createContext<ComboboxItemContext>('ComboboxItem');

export const [provideComboboxContentContext, injectComboboxContentContext] =
  createContext<ComboboxContentContext>('ComboboxContent');
