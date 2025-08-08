import type {
  AvatarFallbackProps,
  AvatarImageEmits,
  AvatarImageProps,
  AvatarRootProps,
  AvatarThemeSlot,
  ClassValue
} from '@headless';
import type { ThemeSize } from '@theme';

export type AvatarUi = Partial<Record<AvatarThemeSlot, ClassValue>>;

export interface AvatarProps extends AvatarRootProps {
  size?: ThemeSize;
  ui?: AvatarUi;
  fallbackLabel?: string;
  imageProps: AvatarImageProps;
  fallbackProps?: AvatarFallbackProps;
}

export type AvatarEmits = AvatarImageEmits;
