import type { ComputedRef, Ref } from 'vue';
import type {
  AcceptableValue,
  ClassValueProp,
  DataOrientation,
  Direction,
  FormFieldProps,
  SingleOrMultipleProps
} from '../../types';
import type { PrimitiveProps } from '../primitive';
import type { ToggleProps } from '../toggle';

export interface ToggleGroupRootProps<T = AcceptableValue | AcceptableValue[]>
  extends ClassValueProp,
    FormFieldProps,
    SingleOrMultipleProps<T> {
  /** When `false`, navigating through the items using arrow keys will be disabled. */
  rovingFocus?: boolean;
  /** When `true`, prevents the user from interacting with the toggle group and all its items. */
  disabled?: boolean;
  /**
   * The orientation of the component, which determines how focus moves: `horizontal` for left/right arrows and
   * `vertical` for up/down arrows.
   */
  orientation?: DataOrientation;
  /**
   * The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** When `loop` and `rovingFocus` is `true`, keyboard navigation will loop from last item to first, and vice versa. */
  loop?: boolean;
}
export interface ToggleGroupRootPropsWithPrimitive<T = AcceptableValue | AcceptableValue[]>
  extends ToggleGroupRootProps<T>,
    PrimitiveProps {}

export type ToggleGroupRootEmits = {
  /** Event handler called when the value changes. */
  'update:modelValue': [payload: AcceptableValue | AcceptableValue[]];
};

export interface ToggleGroupRootContext {
  isSingle: ComputedRef<boolean>;
  modelValue: Ref<AcceptableValue | AcceptableValue[] | undefined>;
  changeModelValue: (value: AcceptableValue) => void;
  dir?: Ref<Direction>;
  orientation?: DataOrientation;
  loop: Ref<boolean>;
  rovingFocus: Ref<boolean>;
  disabled?: Ref<boolean>;
}

export interface ToggleGroupItemProps extends Omit<ToggleProps, 'name' | 'required'> {
  /** A string value for the toggle group item. All items within a toggle group should use a unique value. */
  value: AcceptableValue;
}
export type ToggleGroupItemPropsWithPrimitive = ToggleGroupItemProps & PrimitiveProps;
