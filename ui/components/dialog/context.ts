import { useContext } from '@headless/composables';
import type { DialogSizeContextParams } from './types';

export const [provideDialogSizeContext, useDialogSizeContext] = useContext(
  'DialogSizeContext',
  (params: DialogSizeContextParams) => params
);
