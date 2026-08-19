import type {
  ImageRootProps as _ImageRootProps,
  ImagePreviewProps as _ImagePreviewProps,
  ImageUi,
  ImagePreviewUi
} from '@soybeanjs/headless/image';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * How the image fits its container.
 */
export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

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
  ui?: Partial<ImagePreviewUi>;
}
