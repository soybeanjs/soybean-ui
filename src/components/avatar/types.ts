import type {
  AvatarFallbackProps,
  AvatarImageEmits,
  AvatarImageProps,
  AvatarRootProps,
  AvatarUi,
  ClassValue
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface AvatarProps extends AvatarRootProps {
  /**
   * root class
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<AvatarUi>;
  /** The image source URL */
  src: string;
  /**
   * Useful for delaying rendering so it only appears for those with slower connections.
   *
   * @defaultValue undefined
   */
  delayMs?: number;
  fallbackLabel?: string;
  imageProps?: Omit<AvatarImageProps, 'src'>;
  fallbackProps?: Omit<AvatarFallbackProps, 'delayMs'>;
}

export type AvatarEmits = AvatarImageEmits;
