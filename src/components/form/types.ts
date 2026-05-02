import type {
  ComponentOptionsMixin,
  CreateComponentPublicInstanceWithMixins,
  EmitsOptions,
  FormHTMLAttributes,
  PublicProps,
  SlotsType
} from 'vue';
import type {
  FormDescriptionProps,
  FormErrorProps,
  FormFieldArrayStates,
  FormFieldState,
  FormFieldUi,
  FormLabelProps,
  FormControlProps,
  FormRegisterOptions,
  FormValues,
  FormFieldProps as _FormFieldProps
} from '@soybeanjs/headless/form';
import type { ClassValue, Path, PathValue, PropsToContext } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Props for the form field base component.
 */
export interface FormFieldBaseProps extends Omit<_FormFieldProps, 'class'> {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<FormFieldUi>;
  /**
   * Whether the label is inline with the control.
   */
  inline?: boolean;
  /**
   * Label text rendered by the component.
   */
  label?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
  /**
   * Props forwarded to the label element.
   */
  labelProps?: FormLabelProps;
  /**
   * Props forwarded to the control element.
   */
  controlProps?: FormControlProps;
  /**
   * Props forwarded to the description element.
   */
  descriptionProps?: FormDescriptionProps;
  /**
   * Props forwarded to the error element.
   */
  errorProps?: FormErrorProps;
}

/**
 * Slot props for the form field base component.
 */
export interface FormFieldBaseSlotProps {
  /**
   * Form field id exposed in the slot scope.
   */
  formFieldId: string;
  /**
   * Aria described by exposed in the slot scope.
   */
  ariaDescribedBy: string;
  /**
   * Whether aria invalid.
   */
  ariaInvalid: boolean;
}

/**
 * Props for the form field component.
 */
export interface FormFieldProps<Values extends FormValues, Name extends Path<Values>>
  extends Omit<FormFieldBaseProps, 'error' | 'fieldArray'>, FormRegisterOptions<PathValue<Values, Name>> {
  /**
   * Name.
   */
  name: Name;
}

/**
 * Slots for the form field component.
 */
export type FormFieldSlots<Values extends FormValues, Name extends Path<Values>> = SlotsType<{
  /**
   * Custom content for the default slot.
   */
  default: (props: FormFieldState<Values, Name>) => any;
  /**
   * Custom content for the label slot.
   */
  label: (props: FormFieldState<Values, Name>) => any;
  /**
   * Custom content for the description slot.
   */
  description: (props: FormFieldState<Values, Name>) => any;
}>;

/**
 * Type information for the form field component component.
 */
export type FormFieldComponent<Values extends FormValues> = new <Name extends Path<Values>>(
  props: FormFieldProps<Values, Name> & PublicProps
) => CreateComponentPublicInstanceWithMixins<
  FormFieldProps<Values, Name>,
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
  FormFieldSlots<Values, Name>
>;

/**
 * Props for the form field array component.
 */
export type FormFieldArrayProps<Values extends FormValues, Name extends Path<Values>> = FormFieldProps<Values, Name>;

/**
 * Slots for the form field array component.
 */
export type FormFieldArraySlots<Values extends FormValues, Name extends Path<Values>> = SlotsType<{
  /**
   * Custom content for the default slot.
   */
  default: (props: FormFieldArrayStates<Values, Name>) => any;
  /**
   * Custom content for the label slot.
   */
  label: (props: FormFieldArrayStates<Values, Name>) => any;
  /**
   * Custom content for the description slot.
   */
  description: (props: FormFieldArrayStates<Values, Name>) => any;
}>;

/**
 * Type information for the form field array component component.
 */
export type FormFieldArrayComponent<Values extends FormValues> = new <Name extends Path<Values>>(
  props: FormFieldArrayProps<Values, Name> & PublicProps
) => CreateComponentPublicInstanceWithMixins<
  FormFieldArrayProps<Values, Name>,
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
  FormFieldArraySlots<Values, Name>
>;

/**
 * Props for the form component.
 */
export interface FormProps extends /** @vue-ignore */ FormHTMLAttributes {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<FormFieldUi>;
  /**
   * Whether the label is inline with the control.
   */
  inline?: boolean;
  /**
   * Props forwarded to the field element.
   */
  fieldProps?: FormFieldBaseProps;
  /**
   * Props forwarded to the field array element.
   */
  fieldArrayProps?: FormFieldBaseProps;
  /**
   * Props forwarded to the label element.
   */
  labelProps?: FormLabelProps;
  /**
   * Props forwarded to the control element.
   */
  controlProps?: FormControlProps;
  /**
   * Props forwarded to the description element.
   */
  descriptionProps?: FormDescriptionProps;
  /**
   * Props forwarded to the error element.
   */
  errorProps?: FormErrorProps;
}

/**
 * Context for the form component.
 */
export interface FormContext extends PropsToContext<FormProps> {}
