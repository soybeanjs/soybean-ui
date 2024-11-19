import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type { ImageLoadingStatus } from '../../types';

// AvatarRoot
export interface AvatarRootProps {}
export type AvatarRootPropsWithPrimitive = AvatarRootProps & PrimitiveProps;

// AvatarRootContext
export interface AvatarRootContextParams {
  imageLoadingStatus: Ref<ImageLoadingStatus>;
}
export interface AvatarRootContext extends AvatarRootContextParams {
  updateImageLoadingStatus: (status: ImageLoadingStatus) => void;
}

// AvatarImage
export interface AvatarImageProps {
  /** The image source to display */
  src: string;
  /** The image alt text */
  alt?: string;
}
export type AvatarImagePropsWithPrimitive = AvatarImageProps & PrimitiveProps;

export interface AvatarImageEmits {
  loadingStatusChange: [status: ImageLoadingStatus];
}

// AvatarFallback
export interface AvatarFallbackProps {
  /** Time to wait before showing fallback in milliseconds */
  delayMs?: number;
}
export type AvatarFallbackPropsWithPrimitive = AvatarFallbackProps & PrimitiveProps;
