import { createContext } from '../../composables';
import type { AcceptableValue } from '../../types';
import type {
  SelectContentContext,
  SelectGroupContext,
  SelectItemAlignedPositionContext,
  SelectItemContext,
  SelectRootContext
} from './types';

export const [provideSelectRootContext, injectSelectRootContext] =
  createContext<SelectRootContext<AcceptableValue>>('SelectRoot');

export const [provideSelectContentContext, injectSelectContentContext] =
  createContext<SelectContentContext>('SelectContent');

export const [provideSelectGroupContext, injectSelectGroupContext] = createContext<SelectGroupContext>('SelectGroup');

export const [provideSelectItemContext, injectSelectItemContext] =
  createContext<SelectItemContext<AcceptableValue>>('SelectItem');

export const [provideSelectItemAlignedPositionContext, injectSelectItemAlignedPositionContext] =
  createContext<SelectItemAlignedPositionContext>('SelectItemAlignedPosition');
