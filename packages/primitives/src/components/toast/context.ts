import { createContext } from '../../composables';
import type { ToastProviderContext, ToastRootContext } from './types';

export const [provideToastProviderContext, injectToastProviderContext] =
  createContext<ToastProviderContext>('ToastProvider');

export const [provideToastRootContext, injectToastRootContext] = createContext<ToastRootContext>('ToastRoot');
