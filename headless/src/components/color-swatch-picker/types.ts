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

export interface ColorSwatchPickerRootProps<M extends boolean = false> extends PrimitiveProps, ListboxRootProps<M> {}

export type ColorSwatchPickerRootEmits<M extends boolean = false> = ListboxRootEmits<M>;

export interface ColorSwatchPickerItemProps extends ListboxItemProps {}

export type ColorSwatchPickerItemEmits = ListboxItemEmits;

export interface ColorSwatchPickerItemIndicatorProps extends ListboxItemIndicatorProps {}

export interface ColorSwatchPickerItemSwatchProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  label?: string;
}

export interface ColorSwatchPickerItemContext {
  color: ComputedRef<string>;
}

export type ColorSwatchPickerUiSlot = 'root' | 'item' | 'itemIndicator' | 'swatch';

export type ColorSwatchPickerUi = UiClass<ColorSwatchPickerUiSlot>;
