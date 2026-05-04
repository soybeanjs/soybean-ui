import type {
  ComputedRef,
  HTMLAttributes,
  FormHTMLAttributes,
  ComponentOptionsMixin,
  CreateComponentPublicInstanceWithMixins,
  EmitsOptions,
  PublicProps,
  SlotsType
} from 'vue';
import type { DataOrientation, Path, PathValue, PropsToContext, UiClass } from '../../types';
import type { LabelProps } from '../label/types';
import type {
  UseHeadlessFormReturn,
  FormValues,
  FormRegisterOptions,
  FormFieldState,
  FormFieldArrayStates
} from './core/types';

/**
 * Properties for the FormField component.
 */
export interface FormFieldProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Error.
   */
  error?: string;
  /**
   * Whether the field is an array.
   */
  isFieldArray?: boolean;
}

/**
 * Properties for the FormLabel component.
 */
export interface FormLabelProps extends LabelProps {}

/**
 * Properties for the FormControl component.
 */
export interface FormControlProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the FormDescription component.
 */
export interface FormDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the FormError component.
 */
export interface FormErrorProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Context for the FormField component.
 */
export interface FormFieldContext {
  /**
   * Error used by the component context.
   */
  error: ComputedRef<string | undefined>;
}

/**
 * Common properties for form field and form field array components, used in both compact and non-compact modes.
 */
export interface FormFieldCommonProps {
  /**
   * Orientation of the form field.
   *
   * @default 'vertical'
   */
  orientation?: DataOrientation;
  /**
   * Label text rendered by the component.
   */
  label?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
  /**
   * Properties forwarded to the label element.
   */
  labelProps?: FormLabelProps;
  /**
   * Properties forwarded to the control element.
   */
  controlProps?: FormControlProps;
  /**
   * Properties forwarded to the description element.
   */
  descriptionProps?: FormDescriptionProps;
  /**
   * Properties forwarded to the error element.
   */
  errorProps?: FormErrorProps;
}

/**
 * Properties for the FormFieldBaseCompact component.
 */
export interface FormFieldBaseCompactProps extends FormFieldProps, FormFieldCommonProps {}

/**
 * Slots for the FormFieldBaseCompact component.
 */
export type FormFieldBaseCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: () => any;
  /**
   * Custom content for the label slot.
   */
  label?: () => any;
  /**
   * Custom content for the description slot.
   */
  description?: () => any;
};

/**
 * State and methods provided by the form field context.
 */
export interface FormFieldCompactProps<Values extends FormValues, Name extends Path<Values>>
  extends
    Omit<FormFieldProps, 'error' | 'isFieldArray'>,
    FormFieldCommonProps,
    FormRegisterOptions<PathValue<Values, Name>> {
  /**
   * The name of the form field, used for registration and value retrieval.
   */
  name: Name;
}

/**
 * Slots for the FormFieldCompact component.
 */
export type FormFieldCompactSlots<Values extends FormValues, Name extends Path<Values>> = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: FormFieldState<Values, Name>) => any;
  /**
   * Custom content for the label slot.
   */
  label?: (props: FormFieldState<Values, Name>) => any;
  /**
   * Custom content for the description slot.
   */
  description?: (props: FormFieldState<Values, Name>) => any;
};

/**
 * Type information for FormFieldComponent.
 */
export type FormFieldComponent<Values extends FormValues, ExtraProps extends Record<string, any> = {}> = new <
  Name extends Path<Values>
>(
  props: FormFieldCompactProps<Values, Name> & PublicProps & ExtraProps
) => CreateComponentPublicInstanceWithMixins<
  FormFieldCompactProps<Values, Name> & ExtraProps,
  {},
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  PublicProps,
  {},
  false,
  {},
  SlotsType<FormFieldCompactSlots<Values, Name>>
>;

/**
 * Slots for the FormFieldArrayCompact component.
 */
export type FormFieldArrayCompactSlots<Values extends FormValues, Name extends Path<Values>> = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: FormFieldArrayStates<Values, Name>) => any;
  /**
   * Custom content for the label slot.
   */
  label?: (props: FormFieldArrayStates<Values, Name>) => any;
  /**
   * Custom content for the description slot.
   */
  description?: (props: FormFieldArrayStates<Values, Name>) => any;
};

/**
 * Type information for FormFieldArrayComponent.
 */
export type FormFieldArrayComponent<Values extends FormValues, ExtraProps extends Record<string, any> = {}> = new <
  Name extends Path<Values>
>(
  props: FormFieldCompactProps<Values, Name> & PublicProps & ExtraProps
) => CreateComponentPublicInstanceWithMixins<
  FormFieldCompactProps<Values, Name> & ExtraProps,
  {},
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  PublicProps,
  {},
  false,
  {},
  SlotsType<FormFieldArrayCompactSlots<Values, Name>>
>;

/**
 * Properties for the FormCompact component.
 */
export interface FormCompactProps
  extends
    Pick<FormFieldCommonProps, 'orientation' | 'labelProps' | 'controlProps' | 'descriptionProps' | 'errorProps'>,
    /** @vue-ignore */ FormHTMLAttributes {
  fieldProps?: FormFieldProps;
  fieldArrayProps?: FormFieldProps;
}

/**
 * Context for the FormCompact component.
 */
export interface FormCompactContext extends PropsToContext<
  FormCompactProps,
  'orientation' | 'fieldProps' | 'fieldArrayProps' | 'labelProps' | 'controlProps' | 'descriptionProps' | 'errorProps'
> {}

export type UseFormReturn<
  Values extends FormValues,
  FieldExtraProps extends Record<string, any> = {},
  FieldArrayExtraProps extends Record<string, any> = {}
> = [
  UseHeadlessFormReturn<Values>,
  Field: FormFieldComponent<Values, FieldExtraProps>,
  FieldArray: FormFieldArrayComponent<Values, FieldArrayExtraProps>
];

/**
 * Available UI slots for the FormField component.
 */
export type FormFieldUiSlot = 'field' | 'fieldArray' | 'label' | 'control' | 'description' | 'error';

/**
 * UI class overrides for the FormField component.
 */
export type FormFieldUi = UiClass<FormFieldUiSlot>;

export type FormUiSlot = 'form' | FormFieldUiSlot;

export type FormUi = UiClass<FormUiSlot>;
