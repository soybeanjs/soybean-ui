import type {
  AvatarImageEmits,
  AvatarFallbackProps as _AvatarFallbackProps,
  AvatarImageProps as _AvatarImageProps
} from '@soybean-ui/primitive';
import type { ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type AvatarRootProps = ClassValueProp & {
  size?: ThemeSize;
};

export type AvatarImageProps = ClassValueProp &
  Pick<_AvatarImageProps, 'src'> & {
    alt?: string;
  };

export type AvatarFallbackProps = ClassValueProp & Pick<_AvatarFallbackProps, 'delayMs'>;

export type AvatarProps = AvatarRootProps &
  AvatarImageProps &
  AvatarFallbackProps & {
    imageClass?: ClassValue;
    fallbackLabel?: string;
    fallbackClass?: ClassValue;
  };

export type AvatarEmits = AvatarImageEmits;

export type { AvatarImageEmits };
