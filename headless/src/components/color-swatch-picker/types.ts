import type { ComputedRef, HTMLAttributes } from 'vue';
import type {
  ListboxItemEmits,
  ListboxItemIndicatorProps,
  ListboxItemProps,
  ListboxRootEmits,
  ListboxRootProps
} from '../listbox/types';
import type { UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Props for the color swatch picker root component.
 */
export interface ColorSwatchPickerRootProps<M extends boolean = false> extends PrimitiveProps, ListboxRootProps<M> {}

/**
 * Emits for the color swatch picker root component.
 */
export type ColorSwatchPickerRootEmits<M extends boolean = false> = ListboxRootEmits<M>;

/**
 * Props for the color swatch picker item component.
 */
export interface ColorSwatchPickerItemProps extends ListboxItemProps {}

/**
 * Emits for the color swatch picker item component.
 */
export type ColorSwatchPickerItemEmits = ListboxItemEmits;

/**
 * Props for the color swatch picker item indicator component.
 */
export interface ColorSwatchPickerItemIndicatorProps extends ListboxItemIndicatorProps {}

/**
 * Props for the color swatch picker item swatch component.
 */
export interface ColorSwatchPickerItemSwatchProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Label text rendered by the component.
   */
  label?: string;
}

/**
 * Context for the color swatch picker item component.
 */
export interface ColorSwatchPickerItemContext {
  /**
   * Theme color of the component.
   */
  color: ComputedRef<string>;
}

/**
 * Available UI slots for the color swatch picker component.
 */
export type ColorSwatchPickerUiSlot = 'root' | 'item' | 'itemIndicator' | 'swatch';

/**
 * UI class overrides for the color swatch picker component.
 */
export type ColorSwatchPickerUi = UiClass<ColorSwatchPickerUiSlot>;
