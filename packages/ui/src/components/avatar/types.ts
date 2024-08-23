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
};

export type AvatarProps = AvatarRootProps &
  Pick<AvatarImageProps, 'src' | 'alt'> &
  Pick<AvatarFallbackProps, 'delayMs'> & {
    imageClass?: ClassValue;
    fallbackLabel?: string;
    fallbackClass?: ClassValue;
  };

export type { AvatarSize };
