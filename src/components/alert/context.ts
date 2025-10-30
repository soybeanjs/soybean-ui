import { useContext } from '../../composables';
import type { AlertRootContentParams, AlertThemeContentParams } from './types';

export const [provideAlertRootContext, useAlertRootContext] = useContext(
  'AlertRoot',
  (params: AlertRootContentParams) => {
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
  (params: AlertThemeContentParams) => params
);
