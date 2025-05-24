import type {
  ClassValueProp,
  HTMLAttributeCrossOrigin,
  HTMLAttributeReferrerPolicy,
  ImageLoadingStatus
} from '../../types';

export interface AvatarRootProps extends ClassValueProp {}

export interface AvatarImageProps extends ClassValueProp {
  /** The image source URL */
  src: string;
  /** The referrer policy for the image */
  referrerPolicy?: HTMLAttributeReferrerPolicy;
  /** The cross-origin setting for the image */
  crossOrigin?: HTMLAttributeCrossOrigin;
}
export type AvatarImageEmits = {
  /**
   * Event handler called when the image loading status changes. This is useful for controlling what to render as the
   * image is loading.
   */
  loadingStatusChange: [status: ImageLoadingStatus];
};

export interface AvatarFallbackProps extends ClassValueProp {
  /**
   * Useful for delaying rendering so it only appears for those with slower connections.
   *
   * @defaultValue undefined
   */
  delayMs?: number;
}
