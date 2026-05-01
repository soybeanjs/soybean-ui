import type { HTMLAttributes, ImgHTMLAttributes } from 'vue';
import type { ImageLoadingStatus, UiClass } from '../../types';

/**
 * Props for the avatar root component.
 */
export interface AvatarRootProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the avatar image component.
 */
export interface AvatarImageProps extends /** @vue-ignore */ ImgHTMLAttributes {
  /** The image source URL */
  src: string;
  /** The referrer policy for the image */
  referrerpolicy?: ImgHTMLAttributes['referrerpolicy'];
  /** The cross-origin setting for the image */
  crossorigin?: ImgHTMLAttributes['crossorigin'];
}
/**
 * Emits for the avatar image component.
 */
export type AvatarImageEmits = {
  /**
   * Event handler called when the image loading status changes. This is useful for controlling what to render as the
   * image is loading.
   */
  loadingStatusChange: [status: ImageLoadingStatus];
};

/**
 * Props for the avatar fallback component.
 */
export interface AvatarFallbackProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Useful for delaying rendering so it only appears for those with slower connections.
   *
   * @defaultValue undefined
   */
  delayMs?: number;
}

/**
 * Available UI slots for the avatar component.
 */
export type AvatarUiSlot = 'root' | 'image' | 'fallback';

/**
 * UI class overrides for the avatar component.
 */
export type AvatarUi = UiClass<AvatarUiSlot>;
