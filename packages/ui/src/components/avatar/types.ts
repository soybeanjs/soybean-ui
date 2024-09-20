import type {
  AvatarFallbackProps as $AvatarFallbackProps,
  AvatarImageProps as $AvatarImageProps,
  AvatarRootProps as $AvatarRootProps
} from 'radix-vue';
import type { AvatarSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

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
