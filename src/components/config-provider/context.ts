import { useContext } from '@soybeanjs/headless/composables';
import type { ConfigProviderContextParams } from './types';

export const [provideConfigProviderContext, useConfigProvider] = useContext(
  'UIConfigProvider',
  (params: ConfigProviderContextParams) => params
);
