import { useUiContext } from '../../composables';
import type { ImagePreviewUiSlot, ImageUiSlot } from './types';

export const [provideImageUi, useImageUi] = useUiContext<ImageUiSlot>('ImageUi');

export const [provideImagePreviewUi, useImagePreviewUi] = useUiContext<ImagePreviewUiSlot>('ImagePreviewUi');
