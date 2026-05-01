import type {
  AutocompleteCompactEmits,
  AutocompleteCompactProps,
  AutocompleteCompactSlots,
  AutocompleteSingleOptionData,
  AutocompleteUi
} from '@soybeanjs/headless/autocomplete';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

/**
 * Props for the autocomplete component.
 */
export interface AutocompleteProps<
  T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData
> extends AutocompleteCompactProps<T> {
  /** Root class. */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<AutocompleteUi>;
}

/**
 * Emits for the autocomplete component.
 */
export type AutocompleteEmits<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> =
  AutocompleteCompactEmits<T>;

/**
 * Slots for the autocomplete component.
 */
export type AutocompleteSlots<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> =
  AutocompleteCompactSlots<T>;
