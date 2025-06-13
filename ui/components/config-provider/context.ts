import { useContext } from '@headless/composables';
import type { ConfigProviderContextParams } from './types';

export const [provideConfigProviderContext, useConfigProvider] = useContext(
  'UIConfigProvider',
  (params: ConfigProviderContextParams) => params
);
