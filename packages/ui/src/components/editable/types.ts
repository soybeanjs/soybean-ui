import type {
  EditableCompactProps,
  EditableCompactEmits,
  EditableCompactSlots,
  EditableUi
} from '@soybeanjs/headless/editable';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the Editable component.
 */
export interface EditableProps extends EditableCompactProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<EditableUi>;
}

/**
 * Events for the Editable component.
 */
export type EditableEmits = EditableCompactEmits;

/**
 * Slot properties for the Editable component.
 */
export type EditableSlots = EditableCompactSlots;
