import type { AlertUi } from '@soybeanjs/headless/alert';
import type { AlertCompactEmits, AlertCompactProps, AlertCompactSlots } from '@soybeanjs/headless/alert';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { AlertVariant } from './variants';

/**
 * Extended UI class overrides for the alert component.
 */
export type AlertExtendedUi = AlertUi;

/**
 * Props for the alert component.
 */
export interface AlertProps extends AlertCompactProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual variant of the component.
   */
  variant?: AlertVariant;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<AlertExtendedUi>;
}

/**
 * Emits for the alert component.
 */
export type AlertEmits = AlertCompactEmits;

/**
 * Slots for the alert component.
 */
export type AlertSlots = AlertCompactSlots;

export type { AlertVariant };
