import { useContext } from '@soybeanjs/headless/composables';
import { UI_CONFIG_PROVIDER_CONTEXT_KEY } from '../../constants';
import type { ConfigProviderContext } from './types';

/**
 * UI-level ConfigProvider context.
 *
 * Separate from the headless `ConfigProvider` context (different inject key): it
 * carries the resolved theme options so consumers can read the active theme
 * without prop drilling.
 */
export const [provideConfigProviderContext, useConfigProvider] = useContext<ConfigProviderContext>({
  name: 'UIConfigProvider',
  key: UI_CONFIG_PROVIDER_CONTEXT_KEY
});
