import type { ComputedRef } from 'vue';
import { useContext } from '@headless/composables';
import type { ThemeSize } from '@theme';

export interface DialogSizeContextParams {
  size: ComputedRef<ThemeSize>;
}

export const [provideDialogSizeContext, useDialogSizeContext] = useContext(
  'DialogSizeContext',
  (params: DialogSizeContextParams) => params
);
