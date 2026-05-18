import type { AlertUi } from '@soybeanjs/headless/alert';
import type { AlertCompactEmits, AlertCompactProps, AlertCompactSlots } from '@soybeanjs/headless/alert';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { AlertVariant } from '@/styles/alert';

/**
 * Extended UI class overrides for the Alert component.
 */
export type AlertExtendedUi = AlertUi;

/**
 * Properties for the Alert component.
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
 * Events for the Alert component.
 */
export type AlertEmits = AlertCompactEmits;

/**
 * Slots for the Alert component.
 */
export type AlertSlots = AlertCompactSlots;

export type { AlertVariant };
