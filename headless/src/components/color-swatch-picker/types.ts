import type { ComputedRef } from 'vue';
import type {
  ListboxItemEmits,
  ListboxItemIndicatorProps,
  ListboxItemProps,
  ListboxRootEmits,
  ListboxRootProps
} from '../listbox/types';
import type { BaseProps, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the ColorSwatchPickerRoot component.
 */
export interface ColorSwatchPickerRootProps<M extends boolean = false> extends PrimitiveProps, ListboxRootProps<M> {}

/**
 * Events for the ColorSwatchPickerRoot component.
 */
export type ColorSwatchPickerRootEmits<M extends boolean = false> = ListboxRootEmits<M>;

/**
 * Properties for the ColorSwatchPickerItem component.
 */
export interface ColorSwatchPickerItemProps extends ListboxItemProps {}

/**
 * Events for the ColorSwatchPickerItem component.
 */
export type ColorSwatchPickerItemEmits = ListboxItemEmits;

/**
 * Properties for the ColorSwatchPickerItemIndicator component.
 */
export interface ColorSwatchPickerItemIndicatorProps extends ListboxItemIndicatorProps {}

/**
 * Properties for the ColorSwatchPickerItemSwatch component.
 */
export interface ColorSwatchPickerItemSwatchProps extends PrimitiveProps, BaseProps {
  /**
   * Label text rendered by the component.
   */
  label?: string;
}

/**
 * Context for the ColorSwatchPickerItem component.
 */
export interface ColorSwatchPickerItemContext {
  /**
   * Theme color of the component.
   */
  color: ComputedRef<string>;
}

/**
 * Available UI slots for the ColorSwatchPicker component.
 */
export type ColorSwatchPickerUiSlot = 'root' | 'item' | 'itemIndicator' | 'swatch';

/**
 * UI class overrides for the ColorSwatchPicker component.
 */
export type ColorSwatchPickerUi = UiClass<ColorSwatchPickerUiSlot>;
