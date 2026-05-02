import type { SelectCompactEmits, SelectCompactProps, SelectCompactSlots, SelectUi } from '@soybeanjs/headless/select';
import type { ClassValue, DefinedValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Props for the select component.
 */
export interface SelectProps<
  T extends DefinedValue = DefinedValue,
  M extends boolean = false
> extends SelectCompactProps<T, M> {
  /**
   * the class of select trigger
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<SelectUi>;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
}

/**
 * Emits for the select component.
 */
export type SelectEmits<T extends DefinedValue = DefinedValue, M extends boolean = false> = SelectCompactEmits<T, M>;

/**
 * Slots for the select component.
 */
export type SelectSlots<T extends DefinedValue = DefinedValue, M extends boolean = false> = SelectCompactSlots<T, M>;

export type {
  SelectSingleOptionData,
  SelectGroupOptionData,
  SelectOptionData,
  SelectItemEvent
} from '@soybeanjs/headless/select';
