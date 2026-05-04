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
 * Props for the avatar compact component.
 */
export interface AvatarCompactProps extends AvatarRootProps {
  /** The image source URL. */
  src: string;
  /**
   * Useful for delaying fallback rendering so it only appears for those with slower connections.
   *
   * @defaultValue undefined
   */
  delayMs?: number;
  /** Fallback text rendered when no custom fallback slot is provided. */
  fallbackLabel?: string;
  /** Props forwarded to the image element. */
  imageProps?: AvatarImageProps;
  /** Props forwarded to the fallback element. */
  fallbackProps?: AvatarFallbackProps;
}

/**
 * Emits for the avatar compact component.
 */
export type AvatarCompactEmits = AvatarImageEmits;

/**
 * Slots for the avatar compact component.
 */
export type AvatarCompactSlots = {
  /** Custom content for the default slot. */
  default?: () => any;
  /** Custom content for the image slot. */
  image?: () => any;
  /** Custom content for the fallback slot. */
  fallback?: () => any;
};

/**
 * Available UI slots for the avatar component.
 */
export type AvatarUiSlot = 'root' | 'image' | 'fallback';

/**
 * UI class overrides for the avatar component.
 */
export type AvatarUi = UiClass<AvatarUiSlot>;
