import type { AvatarCompactProps, AvatarImageEmits, AvatarUi } from '@soybeanjs/headless/avatar';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Props for the avatar component.
 */
export interface AvatarProps extends AvatarCompactProps {
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
}

/**
 * Emits for the avatar component.
 */
export type AvatarEmits = AvatarImageEmits;
