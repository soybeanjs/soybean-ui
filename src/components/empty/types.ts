import type { EmptyCompactProps, EmptyCompactSlots, EmptyUi } from '@soybeanjs/headless/empty';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the Empty component.
 */
export interface EmptyProps extends EmptyCompactProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<EmptyUi>;
  /**
   * Size variant of the component.
   */
  size?: ThemeSize;
}

/**
 * Slots for the Empty component.
 */
export type EmptySlots = EmptyCompactSlots;
