import { useContext } from '@headless/composables';
import type { AlertDialogSizeContextParams } from './types';

export const [provideAlertDialogSizeContext, useAlertDialogSizeContext] = useContext(
  'AlertDialogSizeContext',
  (params: AlertDialogSizeContextParams) => params
);
