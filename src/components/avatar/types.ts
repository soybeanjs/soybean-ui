import type {
  AvatarFallbackProps,
  AvatarImageEmits,
  AvatarImageProps,
  AvatarRootProps,
  AvatarUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface AvatarProps extends AvatarRootProps {
  size?: ThemeSize;
  ui?: Partial<AvatarUi>;
  fallbackLabel?: string;
  imageProps: AvatarImageProps;
  fallbackProps?: AvatarFallbackProps;
}

export type AvatarEmits = AvatarImageEmits;
