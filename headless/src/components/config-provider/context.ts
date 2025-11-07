import { useContext } from '../../composables';
import type { ConfigProviderContextParams } from './types';

export const [provideConfigProviderContext, useConfigProvider] = useContext(
  'ConfigProvider',
  (params: ConfigProviderContextParams) => params
);
