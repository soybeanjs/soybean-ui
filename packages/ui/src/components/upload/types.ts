import type { ClassValue } from '@soybeanjs/headless/types';
import type { UploadUi, UploadFile, UploadCompactProps as _UploadCompactProps } from '@soybeanjs/headless/upload';
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

export type { UploadFile };
