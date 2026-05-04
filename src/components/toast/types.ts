import type { ToastProviderProps as _ToastProviderProps, ToastUi } from '@soybeanjs/headless/toast';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the toast provider component.
 */
export interface ToastProviderProps extends _ToastProviderProps {
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: ToastUi;
}
