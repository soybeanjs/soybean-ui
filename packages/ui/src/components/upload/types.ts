import type { ClassValue } from '@soybeanjs/headless/types';
import type {
  UploadUi,
  UploadFile,
  UploadCompactProps as _UploadCompactProps,
  UploadCompactEmits,
  UploadCompactSlots
} from '@soybeanjs/headless/upload';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the Upload component.
 */
export interface UploadProps extends _UploadCompactProps {
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
  ui?: Partial<UploadUi>;
}

/**
 * Events for the Upload component.
 */
export type UploadEmits = UploadCompactEmits;

/**
 * Slots for the Upload component.
 */
export type UploadSlots = UploadCompactSlots;

export type { UploadFile };
