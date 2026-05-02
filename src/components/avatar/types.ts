import type {
  AvatarFallbackProps,
  AvatarImageEmits,
  AvatarImageProps,
  AvatarRootProps,
  AvatarUi
} from '@soybeanjs/headless/avatar';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Props for the avatar component.
 */
export interface AvatarProps extends AvatarRootProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<AvatarUi>;
  /** The image source URL */
  src: string;
  /**
   * Useful for delaying rendering so it only appears for those with slower connections.
   *
   * @defaultValue undefined
   */
  delayMs?: number;
  /**
   * Fallback label.
   */
  fallbackLabel?: string;
  /**
   * Props forwarded to the image element.
   */
  imageProps?: Omit<AvatarImageProps, 'src'>;
  /**
   * Props forwarded to the fallback element.
   */
  fallbackProps?: Omit<AvatarFallbackProps, 'delayMs'>;
}

/**
 * Emits for the avatar component.
 */
export type AvatarEmits = AvatarImageEmits;
