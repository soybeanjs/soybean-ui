import { createContext } from '../../composables';
import type { EditableRootContext } from './types';

export const [provideEditableRootContext, injectEditableRootContext] =
  createContext<EditableRootContext>('EditableRoot');
