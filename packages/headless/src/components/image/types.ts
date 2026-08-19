import type { BaseProps, Direction, ImageLoadingStatus, UiClass } from '../../types';

/**
 * Properties for the ImageRoot component.
 */
export interface ImageRootProps extends BaseProps {
  /**
   * The image source URL.
   */
  src?: string;
  /**
   * Alternative text for the image.
   */
  alt?: string;
  /**
   * Fallback source shown when the image fails to load.
   */
  fallback?: string;
  /**
   * The loading behavior of the image element.
   *
   * @default 'eager'
   */
  loading?: 'eager' | 'lazy';
  /**
   * Whether clicking the image opens the fullscreen preview.
   */
  preview?: boolean;
  /**
   * The reading direction of the image.
   */
  dir?: Direction;
}

/**
 * Events for the ImageRoot component.
 */
export type ImageRootEmits = {
  /**
   * Emitted when the image is clicked while `preview` is enabled.
   */
  preview: [];
};

/**
 * The loading status of the image.
 */
export type ImageStatus = ImageLoadingStatus;

/**
 * Properties for the ImagePreview component.
 */
export interface ImagePreviewProps extends BaseProps {
  /**
   * The controlled open state of the preview.
   */
  open?: boolean;
  /**
   * The initial open state when uncontrolled.
   */
  defaultOpen?: boolean;
  /**
   * The image source shown in the preview.
   */
  src?: string;
  /**
   * Alternative text for the preview image.
   */
  alt?: string;
  /**
   * The initial zoom level of the preview image.
   *
   * @default 1
   */
  initialZoom?: number;
  /**
   * The initial rotation of the preview image, in degrees.
   *
   * @default 0
   */
  initialRotate?: number;
  /**
   * The reading direction of the preview.
   */
  dir?: Direction;
}

/**
 * Events for the ImagePreview component.
 */
export type ImagePreviewEmits = {
  /**
   * Emitted when the preview open state changes.
   */
  'update:open': [value: boolean];
};

/**
 * Slot props exposed by the ImagePreview toolbar slot.
 */
export interface ImagePreviewToolbarSlotProps {
  /** Zoom in by one step. */
  zoomIn: () => void;
  /** Zoom out by one step. */
  zoomOut: () => void;
  /** Reset zoom and rotation to their initial values. */
  reset: () => void;
  /** Rotate the image 90 degrees clockwise. */
  rotate: () => void;
  /** Close the preview. */
  close: () => void;
  /** The current zoom level. */
  zoom: number;
  /** The current rotation in degrees. */
  rotateDeg: number;
}

/**
 * Available UI slots for the Image component.
 */
export type ImageUiSlot = 'root' | 'image' | 'placeholder' | 'error' | 'mask';

/**
 * UI class overrides for the Image component.
 */
export type ImageUi = UiClass<ImageUiSlot>;

/**
 * Available UI slots for the ImagePreview component.
 */
export type ImagePreviewUiSlot = 'root' | 'backdrop' | 'image';

/**
 * UI class overrides for the ImagePreview component.
 */
export type ImagePreviewUi = UiClass<ImagePreviewUiSlot>;
