import { useContext } from '../../composables';
import type { ConfigProviderContext } from './types';

export const [provideConfigProviderContext, injectConfigProviderContext] = useContext(
  'ConfigProvider',
  (params: ConfigProviderContext) => params
);
