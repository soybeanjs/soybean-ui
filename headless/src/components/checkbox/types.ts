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

/**
 * Props for the checkbox root component.
 */
export interface CheckboxRootProps extends FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Id.
   */
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

/**
 * Emits for the checkbox root component.
 */
export type CheckboxRootEmits = {
  /** Event handler called when the value of the checkbox changes. */
  'update:modelValue': [value: CheckedState | null];
};

/**
 * Props for the checkbox control component.
 */
export interface CheckboxControlProps extends /** @vue-ignore */ ButtonHTMLAttributes {
  /** Id of the element */
  id?: string;
}

/**
 * Props for the checkbox indicator component.
 */
export interface CheckboxIndicatorProps extends PrimitiveProps, ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Option data for the checkbox group component.
 */
export type CheckboxGroupOptionData<T extends DefinedValue = DefinedValue> = {
  /**
   * Value associated with the current item.
   */
  value: T;
  /**
   * Label text rendered by the component.
   */
  label: string;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
};

/**
 * Option data for the checkbox card group component.
 */
export type CheckboxCardGroupOptionData<T extends DefinedValue = DefinedValue> = CheckboxGroupOptionData<T> & {
  /**
   * Icon rendered by the component.
   */
  icon?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
};

/**
 * Props for the checkbox group root component.
 */
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

/**
 * Emits for the checkbox group root component.
 */
export type CheckboxGroupRootEmits<T extends DefinedValue = DefinedValue> = {
  /** Event handler called when the value of the checkbox group changes. */
  'update:modelValue': [value: T[]];
};

/**
 * Props for the checkbox compact component.
 */
export interface CheckboxCompactProps extends CheckboxRootProps {
  /**
   * Label text rendered by the component.
   */
  label?: string;
  /**
   * Props forwarded to the control element.
   */
  controlProps?: CheckboxControlProps;
  /**
   * Props forwarded to the indicator element.
   */
  indicatorProps?: CheckboxIndicatorProps;
  /**
   * Props forwarded to the label element.
   */
  labelProps?: CheckboxLabelProps;
}

/**
 * Emits for the checkbox compact component.
 */
export type CheckboxCompactEmits = CheckboxRootEmits;

/**
 * Props for the checkbox card compact component.
 */
export interface CheckboxCardCompactProps extends CheckboxCompactProps {
  /**
   * Icon rendered by the component.
   */
  icon?: IconValue;
  /**
   * Description text rendered by the component.
   */
  description?: string;
}

/**
 * Emits for the checkbox card compact component.
 */
export type CheckboxCardCompactEmits = CheckboxCompactEmits;

/**
 * Props for the checkbox group compact component.
 */
export interface CheckboxGroupCompactProps<
  T extends CheckboxGroupOptionData = CheckboxGroupOptionData
> extends CheckboxGroupRootProps<T['value']> {
  /**
   * Items rendered by the component.
   */
  items: T[];
  /**
   * Props forwarded to the root element.
   */
  rootProps?: CheckboxRootProps;
  /**
   * Props forwarded to the control element.
   */
  controlProps?: CheckboxControlProps;
  /**
   * Props forwarded to the indicator element.
   */
  indicatorProps?: CheckboxIndicatorProps;
  /**
   * Props forwarded to the label element.
   */
  labelProps?: CheckboxLabelProps;
}

/**
 * Props for the checkbox card group compact component.
 */
export interface CheckboxCardGroupCompactProps<
  T extends CheckboxCardGroupOptionData = CheckboxCardGroupOptionData
> extends CheckboxGroupCompactProps<T> {}

/**
 * Emits for the checkbox group compact component.
 */
export type CheckboxGroupCompactEmits<T extends DefinedValue = DefinedValue> = CheckboxGroupRootEmits<T>;

/**
 * Emits for the checkbox card group compact component.
 */
export type CheckboxCardGroupCompactEmits<T extends DefinedValue = DefinedValue> = CheckboxGroupRootEmits<T>;

/**
 * Parameters used to create the checkbox group root context.
 */
export type CheckboxGroupRootContextParams = PropsToContext<CheckboxGroupRootProps, 'rovingFocus' | 'disabled'> & {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<DefinedValue[] | undefined>;
};

/**
 * Parameters used to create the checkbox root context.
 */
export type CheckboxRootContextParams = PropsToContext<
  CheckboxRootProps,
  'value' | 'disabled' | 'name' | 'required'
> & {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<CheckedState | null | undefined>;
  /**
   * State used by the component context.
   */
  state: ComputedRef<CheckedState>;
};

/**
 * Available UI slots for the checkbox component.
 */
export type CheckboxUiSlot = 'groupRoot' | 'root' | 'indicator' | 'indicator-icon' | 'label' | 'control';

/**
 * Available UI slots for the checkbox component.
 */
export type CheckboxCardUiSlot = CheckboxUiSlot | 'content' | 'icon' | 'textContent' | 'description';

/**
 * UI class overrides for the checkbox component.
 */
export type CheckboxUi = UiClass<CheckboxUiSlot>;

/**
 * UI class overrides for the checkbox component.
 */
export type CheckboxCardUi = UiClass<CheckboxCardUiSlot>;

export type { CheckboxLabelProps };
