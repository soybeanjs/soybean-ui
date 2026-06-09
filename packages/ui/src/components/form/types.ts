import type {
  FormCompactProps,
  FormFieldCompactProps,
  FormFieldCompactSlots,
  FormFieldArrayCompactSlots,
  FormFieldBaseCompactProps,
  FormFieldBaseCompactSlots,
  FormUi,
  FormFieldUi,
  UseHeadlessFormOptions as UseFormOptions,
  UseHeadlessFormReturn,
  FormValues,
  FormFieldComponent,
  FormFieldArrayComponent
} from '@soybeanjs/headless/form';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

export interface FormProps extends FormCompactProps {
  /**
   * Additional class names applied to the form element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<FormUi>;
}

/**
 * Additional properties for form field components, including styling and UI customization options.
 */
export interface FormFieldExtraProps {
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
}

/**
 * Properties for the FormField component.
 */
export interface FormFieldProps extends FormFieldCompactProps<any, any>, FormFieldExtraProps {}

/**
 * Slots for the FormField component.
 */
export type FormFieldSlots = FormFieldCompactSlots<any, any>;

/**
 * Combined properties for the FormFieldArray component
 */
export interface FormFieldArrayProps extends FormFieldCompactProps<any, any>, FormFieldExtraProps {}

/**
 * Slots for the FormFieldArray component.
 */
export type FormFieldArraySlots = FormFieldArrayCompactSlots<any, any>;

/**
 * Properties for the FormFieldBase component.
 */
export interface FormFieldBaseProps extends FormFieldBaseCompactProps, FormFieldExtraProps {}

/**
 * Slots for the FormFieldBase component.
 */
export type FormFieldBaseSlots = FormFieldBaseCompactSlots;

export interface UseFormReturn<Values extends FormValues> extends UseHeadlessFormReturn<Values> {
  SFormField: FormFieldComponent<Values, FormFieldExtraProps>;
  SFormFieldArray: FormFieldArrayComponent<Values, FormFieldExtraProps>;
}

export type { UseFormOptions };
