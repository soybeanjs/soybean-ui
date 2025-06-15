import type {
  AvatarFallbackProps,
  AvatarImageEmits,
  AvatarImageProps,
  AvatarRootProps,
  AvatarSlot,
  ClassValue
} from '@headless';
import type { ThemeSize } from '@theme';

export type AvatarUi = Partial<Record<AvatarSlot, ClassValue>>;

export interface AvatarProps extends AvatarRootProps {
  size?: ThemeSize;
  ui?: AvatarUi;
  fallbackLabel?: string;
  imageProps: AvatarImageProps;
  fallbackProps?: AvatarFallbackProps;
}

export type AvatarEmits = AvatarImageEmits;
