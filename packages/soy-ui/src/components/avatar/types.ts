import type {
  AvatarFallbackProps,
  AvatarImageEmits,
  AvatarImageProps,
  ClassValue,
  AvatarRootProps as _AvatarRootProps
} from '@soybean-ui/primitives';
import type { AvatarSlots, ThemeSize } from '@soybean-ui/variants';

export type AvatarRootProps = _AvatarRootProps & {
  size?: ThemeSize;
};

export type AvatarUi = Partial<Record<AvatarSlots, ClassValue>>;

export interface AvatarProps extends AvatarRootProps, AvatarImageProps, AvatarFallbackProps {
  ui?: AvatarUi;
  fallbackLabel?: string;
}

export type AvatarEmits = AvatarImageEmits;

export type { AvatarFallbackProps, AvatarImageProps, AvatarImageEmits };
