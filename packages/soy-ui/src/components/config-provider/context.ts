import { createContext } from '@soybean-ui/primitives';
import type { ConfigProviderContext } from './types';

export const [provideConfigProviderContext, injectConfigProviderContext] =
  createContext<ConfigProviderContext>('ConfigProvider');

export function useConfigProvider(required = false) {
  const context = injectConfigProviderContext();

  if (required && !context) {
    throw new Error('ConfigProviderContext is not provided');
  }

  return context;
}
