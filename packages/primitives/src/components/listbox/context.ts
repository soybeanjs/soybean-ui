import { createContext } from '../../composables';
import type { AcceptableValue } from '../../types';
import type { ListboxGroupContext, ListboxItemContext, ListboxRootContext } from './types';

export const [provideListboxRootContext, injectListboxRootContext] =
  createContext<ListboxRootContext<AcceptableValue>>('ListboxRoot');

export const [provideListboxItemContext, injectListboxItemContext] = createContext<ListboxItemContext>('ListboxItem');

export const [provideListboxGroupContext, injectListboxGroupContext] =
  createContext<ListboxGroupContext>('ListboxGroup');
