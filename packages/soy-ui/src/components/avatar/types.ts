import type {
  AvatarFallbackProps,
  AvatarImageEmits,
  AvatarImageProps,
  ClassValue,
  AvatarRootProps as _AvatarRootProps
} from '@soybean-ui/primitives';
import type { ThemeSize } from '@soybean-ui/variants';

export type AvatarRootProps = _AvatarRootProps & {
  size?: ThemeSize;
};

export type AvatarProps = AvatarRootProps &
  AvatarImageProps &
  AvatarFallbackProps & {
    imageClass?: ClassValue;
    fallbackLabel?: string;
    fallbackClass?: ClassValue;
  };

export type AvatarEmits = AvatarImageEmits;

export type { AvatarFallbackProps, AvatarImageProps, AvatarImageEmits };
