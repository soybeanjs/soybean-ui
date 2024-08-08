import type {
  AvatarFallbackProps as $AvatarFallbackProps,
  AvatarImageProps as $AvatarImageProps,
  AvatarRootProps as $AvatarRootProps
} from 'radix-vue';
import type { AvatarSize, ClassValue } from '@soybean-unify/ui-variants';

export type AvatarRootProps = $AvatarRootProps & {
  class?: ClassValue;
  size?: AvatarSize;
};

export type AvatarImageProps = $AvatarImageProps & {
  class?: ClassValue;
  alt?: string;
};

export type AvatarFallbackProps = $AvatarFallbackProps & {
  class?: ClassValue;
  label?: string;
};

export type AvatarProps = AvatarRootProps & {
  imageProps?: AvatarImageProps;
  fallbackProps?: AvatarFallbackProps;
};

export type { AvatarSize };
