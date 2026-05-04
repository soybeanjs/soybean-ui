import type { ComputedRef, HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';
import type { LabelProps } from '../label/types';

/**
 * Properties for the form field component.
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
 * Properties for the form label component.
 */
export interface FormLabelProps extends LabelProps {}

/**
 * Properties for the form control component.
 */
export interface FormControlProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the form description component.
 */
export interface FormDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the form error component.
 */
export interface FormErrorProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Parameters used to create the form field context.
 */
export interface FormFieldContextParams {
  /**
   * Error used by the component context.
   */
  error: ComputedRef<string | undefined>;
}

/**
 * Available UI slots for the form component.
 */
export type FormFieldUiSlot = 'field' | 'fieldArray' | 'label' | 'control' | 'description' | 'error';

/**
 * UI class overrides for the form component.
 */
export type FormFieldUi = UiClass<FormFieldUiSlot>;
