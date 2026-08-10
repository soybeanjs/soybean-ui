import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * the selectable sections of the theme customizer.
 */
export type ThemeCustomizerSection = 'mode' | 'palette' | 'radius' | 'size' | 'scheme' | 'advanced';

/**
 * Properties for the ThemeCustomizer component.
 *
 * A real-app reusable theme settings body. It does not own any container
 * (popover / drawer / sidebar) — the caller hosts it and decides the shell.
 */
export interface ThemeCustomizerProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * The sections to show (defaults to all).
   */
  sections?: ThemeCustomizerSection[];
  /**
   * The size forwarded to the underlying controls.
   */
  size?: ThemeSize;
  /**
   * Whether to persist changes to storage.
   *
   * @default true
   */
  persist?: boolean;
  /**
   * Whether to show the bottom action row (save preset / reset).
   *
   * @default true
   */
  showActions?: boolean;
  /**
   * Resolve a label key (section / group / variant token) to a display string.
   */
  labelResolver?: (key: string) => string;
}
