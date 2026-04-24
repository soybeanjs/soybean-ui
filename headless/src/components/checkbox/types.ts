import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  CheckedState,
  DefinedValue,
  ForceMountProps,
  FormFieldCommonProps,
  PropsToContext,
  UiClass
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { LabelProps as CheckboxLabelProps } from '../label/types';
import type { IconValue } from '../_icon/types';
import type { RovingFocusGroupProps } from '../roving-focus/types';

export interface CheckboxRootProps extends FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  id?: string;
  /** The controlled value of the checkbox. Can be bound with v-model. */
  modelValue?: CheckedState | null;
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: CheckedState;
  /**
   * The value given as data when submitted with a `name`.
   *
   * @defaultValue on
   */
  value?: DefinedValue;
  /**
   * When `true`, prevents the user from interacting with the checkbox
   *
   * @defaultValue false
   */
  disabled?: boolean;
}

export type CheckboxRootEmits = {
  /** Event handler called when the value of the checkbox changes. */
  'update:modelValue': [value: CheckedState | null];
};

export interface CheckboxControlProps extends /** @vue-ignore */ ButtonHTMLAttributes {
  /** Id of the element */
  id?: string;
}

export interface CheckboxIndicatorProps extends PrimitiveProps, ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

export type CheckboxGroupOptionData<T extends DefinedValue = DefinedValue> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type CheckboxCardGroupOptionData<T extends DefinedValue = DefinedValue> = CheckboxGroupOptionData<T> & {
  icon?: string;
  description?: string;
};

export interface CheckboxGroupRootProps<T extends DefinedValue = DefinedValue>
  extends
    Omit<
      RovingFocusGroupProps,
      'currentTabStopId' | 'defaultCurrentTabStopId' | 'preventScrollOnEntryFocus' | 'as' | 'asChild'
    >,
    FormFieldCommonProps {
  /** The controlled value of the checkbox. Can be bound with v-model. */
  modelValue?: T[];
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: T[];
  /**
   * When `false`, navigating through the items using arrow keys will be disabled.
   *
   * @defaultValue true
   */
  rovingFocus?: boolean;
  /**
   * When `true`, prevents the user from interacting with the checkboxes
   *
   * @defaultValue false
   */
  disabled?: boolean;
}

export type CheckboxGroupRootEmits<T extends DefinedValue = DefinedValue> = {
  /** Event handler called when the value of the checkbox group changes. */
  'update:modelValue': [value: T[]];
};

export interface CheckboxCompactProps extends CheckboxRootProps {
  label?: string;
  controlProps?: CheckboxControlProps;
  indicatorProps?: CheckboxIndicatorProps;
  labelProps?: CheckboxLabelProps;
}

export type CheckboxCompactEmits = CheckboxRootEmits;

export interface CheckboxCardCompactProps extends CheckboxCompactProps {
  icon?: IconValue;
  description?: string;
}

export type CheckboxCardCompactEmits = CheckboxCompactEmits;

export interface CheckboxGroupCompactProps<
  T extends CheckboxGroupOptionData = CheckboxGroupOptionData
> extends CheckboxGroupRootProps<T['value']> {
  items: T[];
  rootProps?: CheckboxRootProps;
  controlProps?: CheckboxControlProps;
  indicatorProps?: CheckboxIndicatorProps;
  labelProps?: CheckboxLabelProps;
}

export interface CheckboxCardGroupCompactProps<
  T extends CheckboxCardGroupOptionData = CheckboxCardGroupOptionData
> extends CheckboxGroupCompactProps<T> {}

export type CheckboxGroupCompactEmits<T extends DefinedValue = DefinedValue> = CheckboxGroupRootEmits<T>;

export type CheckboxCardGroupCompactEmits<T extends DefinedValue = DefinedValue> = CheckboxGroupRootEmits<T>;

export type CheckboxGroupRootContextParams = PropsToContext<CheckboxGroupRootProps, 'rovingFocus' | 'disabled'> & {
  modelValue: ShallowRef<DefinedValue[] | undefined>;
};

export type CheckboxRootContextParams = PropsToContext<
  CheckboxRootProps,
  'value' | 'disabled' | 'name' | 'required'
> & {
  modelValue: ShallowRef<CheckedState | null | undefined>;
  state: ComputedRef<CheckedState>;
};

export type CheckboxUiSlot = 'groupRoot' | 'root' | 'indicator' | 'indicator-icon' | 'label' | 'control';

export type CheckboxCardUiSlot = CheckboxUiSlot | 'content' | 'icon' | 'textContent' | 'description';

export type CheckboxUi = UiClass<CheckboxUiSlot>;

export type CheckboxCardUi = UiClass<CheckboxCardUiSlot>;

export type { CheckboxLabelProps };
