import type {
  ComboboxCompactEmits,
  ComboboxCompactProps,
  ComboboxCompactSlots,
  ComboboxUi
} from '@soybeanjs/headless/combobox';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

/**
 * Props for the combobox component.
 */
export interface ComboboxProps<M extends boolean = false> extends ComboboxCompactProps<M> {
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
  ui?: Partial<ComboboxUi>;
}

/**
 * Emits for the combobox component.
 */
export type ComboboxEmits<M extends boolean = false> = ComboboxCompactEmits<M>;

/**
 * Slots for the combobox component.
 */
export type ComboboxSlots<M extends boolean = false> = ComboboxCompactSlots<M>;
