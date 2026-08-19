import { useContext, useUiContext } from '../../composables';
import type { UploadRootContext, UploadUiSlot } from './types';

export const [provideUploadRootContext, useUploadRootContext] = useContext(
  'UploadRoot',
  (context: UploadRootContext) => context
);

export const [provideUploadUi, useUploadUi] = useUiContext<UploadUiSlot>('UploadUi');
