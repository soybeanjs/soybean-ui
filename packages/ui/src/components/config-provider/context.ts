import { useContext } from '@soybeanjs/headless/composables';
import type { ConfigProviderContext } from './types';

export const [provideConfigProviderContext, useConfigProvider] = useContext<ConfigProviderContext>('UiConfigProvider');
