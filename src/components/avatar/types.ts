import type { ComputedRef, HTMLAttributes, ImgHTMLAttributes } from 'vue';
import type { ClassValue, ImageLoadingStatus } from '../../types';

export interface AvatarRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface AvatarImageProps extends /** @vue-ignore */ ImgHTMLAttributes {
  /** The image source URL */
  src: string;
  /** The referrer policy for the image */
  referrerpolicy?: ImgHTMLAttributes['referrerpolicy'];
  /** The cross-origin setting for the image */
  crossorigin?: ImgHTMLAttributes['crossorigin'];
}
export type AvatarImageEmits = {
  /**
   * Event handler called when the image loading status changes. This is useful for controlling what to render as the
   * image is loading.
   */
  loadingStatusChange: [status: ImageLoadingStatus];
};

export interface AvatarFallbackProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Useful for delaying rendering so it only appears for those with slower connections.
   *
   * @defaultValue undefined
   */
  delayMs?: number;
}

export type AvatarThemeSlot = 'root' | 'image' | 'fallback';

export interface AvatarThemeContextParams {
  ui: ComputedRef<Record<AvatarThemeSlot, ClassValue>>;
}
