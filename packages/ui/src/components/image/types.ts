import type {
  ImageRootProps as _ImageRootProps,
  ImagePreviewProps as _ImagePreviewProps,
  ImagePreviewUiSlot,
  ImageUi
} from '@soybeanjs/headless/image';
import type { ClassValue, UiClass } from '@soybeanjs/headless/types';

/**
 * How the image fits its container.
 */
export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

/**
 * UI slots added by the styled layer on top of the headless preview slots.
 */
export type ImagePreviewExtraUiSlot = 'toolbar' | 'toolbarButton';

/**
 * UI class overrides for the preview including styled-layer structural slots.
 */
export type ImagePreviewExtendedUi = UiClass<ImagePreviewUiSlot | ImagePreviewExtraUiSlot>;

/**
 * Properties for the Image component.
 */
export interface ImageProps extends _ImageRootProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * How the image fits its container.
   *
   * @default 'cover'
   */
  fit?: ImageFit;
  /**
   * Whether to apply rounded corners.
   */
  rounded?: boolean;
  /**
   * Source used in the preview when it differs from `src`.
   */
  previewSrc?: string;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<ImageUi>;
}

/**
 * Properties for the ImagePreview component.
 */
export interface ImagePreviewProps extends _ImagePreviewProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<ImagePreviewExtendedUi>;
}
