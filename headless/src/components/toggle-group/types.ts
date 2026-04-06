import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  DataOrientation,
  DefinedValue,
  Direction,
  FormFieldCommonProps,
  PropsToContext,
  SelectionEmits,
  SelectionProps,
  UiClass
} from '../../types';
import type { ButtonProps } from '../button/types';

export interface ToggleGroupRootProps<M extends boolean = false, T extends DefinedValue = string>
  extends SelectionProps<M, T>, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** When `false`, navigating through items with arrow keys is disabled. */
  rovingFocus?: boolean;
  /** When `true`, prevents interaction with all items in the group. */
  disabled?: boolean;
  /** The orientation of the component. */
  orientation?: DataOrientation;
  /** The reading direction of the group when applicable. */
  dir?: Direction;
  /** When `true`, keyboard navigation loops from last to first item, and vice versa. */
  loop?: boolean;
}

export type ToggleGroupRootEmits<M extends boolean = false, T extends DefinedValue = string> = SelectionEmits<M, T>;

export type ToggleGroupRootContextParams = PropsToContext<
  ToggleGroupRootProps<boolean, DefinedValue>,
  'disabled' | 'rovingFocus' | 'orientation' | 'dir' | 'loop' | 'name' | 'required'
> & {
  modelValue: ShallowRef<SelectionProps<boolean, DefinedValue>['modelValue']>;
  onModelValueChange: (value: DefinedValue) => void;
  isValueSelected: (value: DefinedValue) => boolean;
  isMultiple: ComputedRef<boolean>;
};

export interface ToggleGroupItemProps<T extends DefinedValue = string> extends ButtonProps {
  /** A unique value that identifies the item inside the group. */
  value: T;
  /** When `true`, prevents interaction with the item. */
  disabled?: boolean;
}

export type ToggleGroupUiSlot = 'root' | 'item';

export type ToggleGroupUi = UiClass<ToggleGroupUiSlot>;
