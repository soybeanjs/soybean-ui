import { useContext } from '../../composables';
import type { AlertDialogContentContext, AlertDialogContentContextParams } from './types';

export const [provideAlertDialogContentContext, injectAlertDialogContentContext] = useContext(
  'AlertDialogContent',
  (params: AlertDialogContentContextParams) => {
    const context: AlertDialogContentContext = {
      ...params,
      onCancelElementChange: el => {
        params.cancelElement.value = el;
      }
    };

    return context;
  }
);
