import { useContext } from '../../composables';
import type { AlertRootContextParams, AlertThemeContextParams } from './types';

export const [provideAlertRootContext, useAlertRootContext] = useContext(
  'AlertRoot',
  (params: AlertRootContextParams) => {
    const { open } = params;

    const onOpenChange = (value: boolean) => {
      open.value = value;
    };

    return {
      open,
      onOpenChange
    };
  }
);

export const [provideAlertThemeContext, useAlertThemeContext] = useContext(
  'AlertTheme',
  (params: AlertThemeContextParams) => params
);
