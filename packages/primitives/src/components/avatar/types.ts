import type { Ref } from 'vue';
import type {
  ClassValueProp,
  HTMLAttributeReferrerPolicy,
  ImageCrossOrigin,
  ImageLoadingStatus,
  PrimitiveProps
} from '../../types';

// AvatarRoot
export interface AvatarRootProps extends ClassValueProp {}
export type AvatarRootPropsWithPrimitive = AvatarRootProps & PrimitiveProps;

// AvatarRootContext
export interface AvatarRootContextParams {
  imageLoadingStatus: Ref<ImageLoadingStatus>;
}
export interface AvatarRootContext extends AvatarRootContextParams {
  updateImageLoadingStatus: (status: ImageLoadingStatus) => void;
}

// AvatarImage
export interface AvatarImageProps extends ClassValueProp {
  /** The image source to display */
  src: string;
  /** The image alt text */
  alt?: string;
  /** The image referrer policy */
  referrerPolicy?: HTMLAttributeReferrerPolicy;
  crossOrigin?: ImageCrossOrigin;
}
export type AvatarImagePropsWithPrimitive = AvatarImageProps & PrimitiveProps;

export interface AvatarImageEmits {
  loadingStatusChange: [status: ImageLoadingStatus];
}

// AvatarFallback
export interface AvatarFallbackProps extends ClassValueProp {
  /** Time to wait before showing fallback in milliseconds */
  delayMs?: number;
}
export type AvatarFallbackPropsWithPrimitive = AvatarFallbackProps & PrimitiveProps;
